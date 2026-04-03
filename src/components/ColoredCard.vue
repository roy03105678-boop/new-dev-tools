<script setup lang="ts">
import type { Component } from 'vue';

const props = defineProps<{ icon: Component; title: string }>();
const { icon, title } = toRefs(props);
</script>

<template>
  <c-card class="colored-card">
    <div class="card-content">
      <n-icon class="icon" size="40" :component="icon" />
      <n-h3 class="title">
        <n-ellipsis>{{ title }}</n-ellipsis>
      </n-h3>

      <div class="description">
        <n-ellipsis :line-clamp="2" :tooltip="false">
          <slot />
        </n-ellipsis>
      </div>
    </div>
  </c-card>
</template>

<style lang="less" scoped>
.colored-card {
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #06b6d4 100%);
  color: #ffffff;
  border: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: shimmer 3s ease-in-out infinite;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(37, 99, 108, 0.3);
  }

  .card-content {
    position: relative;
    z-index: 1;
  }

  .icon {
    opacity: 0.9;
    transition: all 0.3s ease;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));

    .colored-card:hover & {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  .title {
    color: #ffffff;
    margin: 12px 0;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.5px;
  }

  .description {
    opacity: 0.95;
    margin: 8px 0;
    font-size: 13px;
    line-height: 1.5;

    ::v-deep(a) {
      color: #ffffff;
      text-decoration: underline;
      font-weight: 600;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        color: #f0f9ff;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
    }
  }
}

@keyframes shimmer {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  50% {
    transform: translate(-50%, -50%) rotate(180deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
