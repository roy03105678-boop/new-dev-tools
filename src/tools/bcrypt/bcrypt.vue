<script setup lang="ts">
import { compareSync, hashSync } from 'bcryptjs';
import { useThemeVars } from 'naive-ui';
import { useCopy } from '@/composable/copy';

const themeVars = useThemeVars();

const input = ref('');
const saltCount = ref(10);
const hashed = computed(() => hashSync(input.value, saltCount.value));
const { copy } = useCopy({ source: hashed, text: '哈希字符串已复制到剪贴板' });

const compareString = ref('');
const compareHash = ref('');
const compareMatch = computed(() => compareSync(compareString.value, compareHash.value));
</script>

<template>
  <c-card title="哈希加密">
    <c-input-text
      v-model:value="input"
      placeholder="请输入要加密的字符串..."
      raw-text
      label="您的字符串："
      label-position="left"
      label-align="right"
      label-width="120px"
      mb-2
    />
    <n-form-item label="盐値轮数：" label-placement="left" label-width="120">
      <n-input-number v-model:value="saltCount" placeholder="盐値轮数..." :max="100" :min="0" w-full />
    </n-form-item>

    <c-input-text :value="hashed" readonly text-center />

    <div mt-5 flex justify-center>
      <c-button @click="copy()">
        复制哈希値
      </c-button>
    </div>
  </c-card>

  <c-card title="字符串与哈希对比">
    <n-form label-width="120">
      <n-form-item label="您的字符串：" label-placement="left">
        <c-input-text v-model:value="compareString" placeholder="请输入要对比的字符串..." raw-text />
      </n-form-item>
      <n-form-item label="您的哈希値：" label-placement="left">
        <c-input-text v-model:value="compareHash" placeholder="请输入要对比的哈希値..." raw-text />
      </n-form-item>
      <n-form-item label="是否匹配？" label-placement="left" :show-feedback="false">
        <div class="compare-result" :class="{ positive: compareMatch }">
          {{ compareMatch ? '是' : '否' }}
        </div>
      </n-form-item>
    </n-form>
  </c-card>
</template>

<style lang="less" scoped>
.compare-result {
  color: v-bind('themeVars.errorColor');

  &.positive {
    color: v-bind('themeVars.successColor');
  }
}
</style>
