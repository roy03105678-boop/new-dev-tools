<script lang="ts" setup>
import { NIcon, useThemeVars } from 'naive-ui';

import { RouterLink } from 'vue-router';
import { Heart, Home2, Menu2 } from '@vicons/tabler';

import { storeToRefs } from 'pinia';
import NewLogo from '../assets/new-logo.png';
import MenuLayout from '../components/MenuLayout.vue';
import NavbarButtons from '../components/NavbarButtons.vue';
import { useStyleStore } from '@/stores/style.store';
import { config } from '@/config';
import type { ToolCategory } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';
import { useTracker } from '@/modules/tracker/tracker.services';
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue';

const themeVars = useThemeVars();
const styleStore = useStyleStore();
const version = config.app.version;
const commitSha = config.app.lastCommitSha.slice(0, 7);

const { tracker } = useTracker();
const { t } = useI18n();

const toolStore = useToolStore();
const { favoriteTools, toolsByCategory } = storeToRefs(toolStore);

const tools = computed<ToolCategory[]>(() => [
  ...(favoriteTools.value.length > 0 ? [{ name: t('tools.categories.favorite-tools'), components: favoriteTools.value }] : []),
  ...toolsByCategory.value,
]);
</script>

<template>
  <MenuLayout class="menu-layout" :class="{ isSmallScreen: styleStore.isSmallScreen }">
    <template #sider>
      <RouterLink to="/" class="hero-wrapper">
        <div class="logo-container">
          <img :src="NewLogo" class="logo-img" alt="小牛工具" />
          <div class="title">小牛工具</div>
          <div class="subtitle">专注打造即用即走的开发者助手</div>
        </div>
      </RouterLink>

      <div class="sider-content">
        <div v-if="styleStore.isSmallScreen" flex flex-col items-center>
          <locale-selector w="90%" />

          <div flex justify-center>
            <NavbarButtons />
          </div>
        </div>

        <CollapsibleToolMenu :tools-by-category="tools" />

        <div class="footer">

          <div>
            © {{ new Date().getFullYear() }}
            <c-link target="_blank" rel="noopener" href="https://dev.fktool.com">
              dev.fktool.com
            </c-link>
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div class="navbar-container">
        <c-button
          circle
          variant="text"
          :aria-label="$t('home.toggleMenu')"
          @click="styleStore.isMenuCollapsed = !styleStore.isMenuCollapsed"
        >
          <NIcon size="25" :component="Menu2" />
        </c-button>

        <c-tooltip :tooltip="$t('home.home')" position="bottom">
          <c-button to="/" circle variant="text" :aria-label="$t('home.home')">
            <NIcon size="25" :component="Home2" />
          </c-button>
        </c-tooltip>

        <c-tooltip :tooltip="$t('home.uiLib')" position="bottom">
          <c-button v-if="config.app.env === 'development'" to="/c-lib" circle variant="text" :aria-label="$t('home.uiLib')">
            <icon-mdi:brush-variant text-20px />
          </c-button>
        </c-tooltip>

        <command-palette />

        <locale-selector v-if="!styleStore.isSmallScreen" />

        <div>
          <NavbarButtons v-if="!styleStore.isSmallScreen" />
        </div>

      </div>
      <slot />
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
.navbar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid;
  border-bottom-color: v-bind('themeVars.dividerColor');
  margin-bottom: 20px;
  background: v-bind('themeVars.bodyColor');
  transition: all 0.3s ease;
}

.support-button {
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  color: #fff !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 4px 6px rgba(37, 99, 108, 0.1);

  &:hover {
    color: #fff;
    box-shadow: 0 8px 12px rgba(37, 99, 108, 0.2);
    transform: translateY(-2px);
  }
}

.footer {
  text-align: center;
  color: v-bind('themeVars.textColor3');
  margin-top: 20px;
  padding: 20px 0;
  border-top: 1px solid;
  border-top-color: v-bind('themeVars.dividerColor');
  font-size: 12px;
  transition: all 0.3s ease;
}

  .sider-content {
    padding-top: 160px;
  padding-bottom: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: v-bind('themeVars.textColor3');
    border-radius: 3px;
    
    &:hover {
      background: v-bind('themeVars.textColor2');
    }
  }
}

.hero-wrapper {
  position: absolute;
  display: block;
  left: 0;
  width: 100%;
  z-index: 10;
  padding: 20px 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  transition: all 0.3s ease;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);

  :deep(.dark) & {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border-bottom-color: #334155;
  }

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #1e293b;

    :deep(.dark) & {
      color: #e2e8f0;
    }

    .logo-img {
      width: 60px;
      height: 60px;
      object-fit: contain;
      margin-bottom: 8px;
      filter: none;
      opacity: 0.9;
      mix-blend-mode: multiply;
      transition: all 0.3s ease;

      :deep(.dark) & {
        opacity: 0.85;
        mix-blend-mode: screen;
      }
    }

    .title {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #2563eb;
      text-shadow: none;
      margin-bottom: 4px;

      :deep(.dark) & {
        color: #60a5fa;
      }
    }

    .subtitle {
      font-size: 12px;
      font-weight: 500;
      color: #64748b;
      letter-spacing: 0.5px;
      text-align: center;
      max-width: 140px;
      line-height: 1.4;

      :deep(.dark) & {
        color: #94a3b8;
      }
    }
  }
}
</style>
