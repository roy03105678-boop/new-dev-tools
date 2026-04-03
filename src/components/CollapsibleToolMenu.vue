<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { useThemeVars } from 'naive-ui';
import { RouterLink, useRoute } from 'vue-router';
import MenuIconItem from './MenuIconItem.vue';
import type { Tool, ToolCategory } from '@/tools/tools.types';

const props = withDefaults(defineProps<{ toolsByCategory?: ToolCategory[] }>(), { toolsByCategory: () => [] });
const { toolsByCategory } = toRefs(props);
const route = useRoute();

const makeLabel = (tool: Tool) => () => h(RouterLink, { to: tool.path }, { default: () => tool.name });
const makeIcon = (tool: Tool) => () => h(MenuIconItem, { tool });

const collapsedCategories = useStorage<Record<string, boolean>>(
  'menu-tool-option:collapsed-categories',
  {},
  undefined,
  {
    deep: true,
    serializer: {
      read: v => (v ? JSON.parse(v) : null),
      write: v => JSON.stringify(v),
    },
  },
);

function toggleCategoryCollapse({ name }: { name: string }) {
  collapsedCategories.value[name] = !collapsedCategories.value[name];
}

const menuOptions = computed(() =>
  toolsByCategory.value.map(({ name, components }) => ({
    name,
    isCollapsed: collapsedCategories.value[name],
    tools: components.map(tool => ({
      label: makeLabel(tool),
      icon: makeIcon(tool),
      key: tool.path,
    })),
  })),
);

const themeVars = useThemeVars();
</script>

<template>
  <div v-for="{ name, tools, isCollapsed } of menuOptions" :key="name">
    <div ml-6px mt-12px flex cursor-pointer items-center op-70 transition-all hover:op-100 @click="toggleCategoryCollapse({ name })" class="category-header">
      <span :class="{ 'rotate-0': isCollapsed, 'rotate-90': !isCollapsed }" text-16px lh-1 op-60 transition-transform>
        <icon-mdi-chevron-right />
      </span>

      <span ml-8px text-13px font-600>
        {{ name }}
      </span>
    </div>

    <n-collapse-transition :show="!isCollapsed">
      <div class="menu-wrapper">
        <div class="toggle-bar" @click="toggleCategoryCollapse({ name })" />

        <n-menu
          class="menu"
          :value="route.path"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="tools"
          :indent="8"
          :default-expand-all="true"
        />
      </div>
    </n-collapse-transition>
  </div>
</template>

<style scoped lang="less">
.menu-wrapper {
  display: flex;
  flex-direction: row;
  .menu {
    flex: 1;
    margin-bottom: 5px;

    ::v-deep(.n-menu-item-content::before) {
      left: 0;
      right: 13px;
      background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%) !important;
      border-radius: 0 3px 3px 0;
      transition: all 0.2s ease;
    }

    ::v-deep(.n-menu-item-content) {
      transition: all 0.2s ease;
    }
  }

  .toggle-bar {
    width: 24px;
    opacity: 0.15;
    transition: opacity ease 0.2s;
    position: relative;
    cursor: pointer;

    &::before {
      width: 2px;
      height: 100%;
      content: ' ';
      background: linear-gradient(180deg, #2563eb 0%, #3b82f6 100%);
      border-radius: 2px;
      position: absolute;
      top: 0;
      left: 14px;
      box-shadow: 0 0 8px rgba(20, 160, 88, 0.3);
      transition: all 0.2s ease;
    }

    &:hover {
      opacity: 0.6;

      &::before {
        box-shadow: 0 0 12px rgba(20, 160, 88, 0.5);
      }
    }
  }
}

.category-header {
  color: v-bind('themeVars.textColor2');
  border-left: 3px solid transparent;
  padding-left: 3px;
  transition: all 0.2s ease;

  &:hover {
    color: #2563eb;
    border-left-color: #2563eb;
  }
}

::v-deep(.n-menu-item) {
  transition: all 0.2s ease;

  &.n-menu-item--selected,
  &.n-menu-item--selected:hover {
    .n-menu-item-content {
      color: #ffffff !important;
    }

    .n-icon {
      color: #ffffff !important;
    }
  }

  &:hover {
    .n-menu-item-content {
      color: #2563eb !important;
    }
  }
}
</style>
