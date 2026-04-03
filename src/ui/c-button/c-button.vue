<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router';
import { useAppTheme } from '../theme/themes';
import { useTheme } from './c-button.theme';

const props = withDefaults(
  defineProps<{
    type?: 'default' | 'primary' | 'warning' | 'error'
    variant?: 'basic' | 'text'
    disabled?: boolean
    round?: boolean
    circle?: boolean
    href?: string
    to?: RouteLocationRaw
    size?: 'small' | 'medium' | 'large'
  }>(),
  {
    type: 'default',
    variant: 'basic',
    disabled: false,
    round: false,
    circle: false,
    href: undefined,
    to: undefined,
    size: 'medium',
  },
);
const emits = defineEmits(['click']);

const { variant, disabled, round, circle, href, type, to, size: sizeName } = toRefs(props);

function handleClick(event: MouseEvent) {
  if (!disabled.value) {
    emits('click', event);
  }
}

const theme = useTheme();
const variantTheme = computed(() => theme.value[variant.value][type.value]);
const tag = computed(() => {
  if (href.value) {
    return 'a';
  }
  if (to.value) {
    return 'router-link';
  }
  return 'button';
});
const appTheme = useAppTheme();

const size = computed(() => theme.value.size[sizeName.value]);
</script>

<template>
  <component
    :is="tag"
    :href="href ?? to"
    class="c-button"
    :class="{ disabled, round, circle }"
    :to="to"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<style lang="less" scoped>
.c-button {
  line-height: 1;
  font-family: inherit;
  font-size: v-bind('size.fontSize');
  border: none;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  height: v-bind('size.width');
  font-weight: 500;
  color: v-bind('variantTheme.textColor');
  padding: 0 14px;
  border-radius: 6px;
  transition: all cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
  background-color: v-bind('variantTheme.backgroundColor');
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &.round {
    border-radius: 100px;
  }

  &.circle {
    border-radius: v-bind('size.width');
    width: v-bind('size.width');
    padding: 0;
  }

  &:not(.disabled) {
    &:hover {
      background-color: v-bind('variantTheme.hover.backgroundColor');
      transform: translateY(-2px);
      box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);

      &::before {
        width: 300px;
        height: 300px;
      }
    }

    &:active {
      background-color: v-bind('variantTheme.pressed.backgroundColor');
      transform: translateY(0);
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    }
  }

  &:focus {
    outline: 2px solid v-bind('appTheme.primary.color');
    outline-offset: 2px;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
