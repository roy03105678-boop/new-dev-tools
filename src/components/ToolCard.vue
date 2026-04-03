<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import FavoriteButton from './FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const props = defineProps<{ tool: Tool & { category: string } }>();
const { tool } = toRefs(props);
const theme = useThemeVars();
</script>

<template>
  <router-link :to="tool.path" class="tool-card-link">
    <c-card class="tool-card">
      <div class="card-header">
        <div class="icon-wrapper">
          <n-icon class="tool-icon" size="40" :component="tool.icon" />
        </div>

        <div class="badge-group">
          <div
            v-if="tool.isNew"
            class="new-badge"
            :style="{
              'background-color': theme.primaryColor,
            }"
          >
            {{ $t('toolCard.new') }}
          </div>

          <FavoriteButton :tool="tool" />
        </div>
      </div>

      <div class="tool-name">
        {{ tool.name }}
      </div>

      <div class="tool-description">
        {{ tool.description }}
      </div>
    </c-card>
  </router-link>
</template>

<style lang="less" scoped>
.tool-card-link {
  text-decoration: none;
  display: block;
  height: 100%;
}

.tool-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: linear-gradient(135deg, v-bind('theme.primaryColor')15, v-bind('theme.primaryColor')05);
  transition: all 0.3s ease;

  .tool-card:hover & {
    background: linear-gradient(135deg, v-bind('theme.primaryColor')25, v-bind('theme.primaryColor')10);
    transform: scale(1.05);
  }
}

.tool-icon {
  color: v-bind('theme.primaryColor');
  transition: all 0.3s ease;

  .tool-card:hover & {
    transform: scale(1.1);
  }
}

.badge-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.new-badge {
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.tool-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: v-bind('theme.textColor1');
  word-break: break-word;
  line-height: 1.4;
  transition: color 0.3s ease;

  .tool-card:hover & {
    color: v-bind('theme.primaryColor');
  }
}

.tool-description {
  font-size: 13px;
  color: v-bind('theme.textColor3');
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
  transition: color 0.3s ease;

  .tool-card:hover & {
    color: v-bind('theme.textColor2');
  }
}
</style>
