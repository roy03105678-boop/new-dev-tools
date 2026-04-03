<script lang="ts" setup>
import { useTheme } from './c-card.theme';

const props = defineProps<{
  title?: string
}>();

const { title } = toRefs(props);

const theme = useTheme();
</script>

<template>
  <div class="c-card">
    <div v-if="title" class="c-card-title">
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<style lang="less" scoped>
.c-card {
  background-color: v-bind('theme.backgroundColor');
  border: 1px solid v-bind('theme.borderColor');
  border-radius: 8px;
  padding: 20px 24px;
  box-shadow: v-bind('theme.boxShadow');
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, v-bind('theme.accentColor'), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    box-shadow: v-bind('theme.boxShadowHover');
    transform: translateY(-2px);

    &::before {
      opacity: 1;
    }
  }

  &-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    color: v-bind('theme.titleColor');
  }
}
</style>
