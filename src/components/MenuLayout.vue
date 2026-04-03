<script setup lang="ts">
import { useStyleStore } from '@/stores/style.store';

const styleStore = useStyleStore();
const { isMenuCollapsed, isSmallScreen } = toRefs(styleStore);
const siderPosition = computed(() => (isSmallScreen.value ? 'absolute' : 'static'));
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="0"
      :width="240"
      :collapsed="isMenuCollapsed"
      :show-trigger="false"
      :native-scrollbar="false"
      :position="siderPosition"
      class="sider"
    >
      <slot name="sider" />
    </n-layout-sider>
    <n-layout class="content">
      <slot name="content" />
      <div v-show="isSmallScreen && !isMenuCollapsed" class="overlay" @click="isMenuCollapsed = true" />
    </n-layout>
  </n-layout>
</template>

<style lang="less" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  backdrop-filter: blur(2px);
  animation: fadeIn 0.3s ease-out;
  z-index: 999;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.sider {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  ::v-deep(.n-layout-sider-scroll-container) {
    transition: all 0.3s ease;
  }
}

.content {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  ::v-deep(.n-layout-scroll-container) {
    padding: 0 26px 26px 26px;
  }
}

.n-layout {
  height: 100vh;
}
</style>
