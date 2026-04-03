<script setup lang="ts">
import { convertToRMB } from './rmb-converter.service';
import InputCopyable from '../../components/InputCopyable.vue';

const inputAmount = ref(123456.78);
const result = computed(() => convertToRMB(inputAmount.value || 0));
</script>

<template>
  <div class="flex flex-col gap-4">
    <n-card title="输入金额">
      <n-form-item label="数字金额 (元)">
        <n-input-number v-model:value="inputAmount" :step="0.01" class="w-full" placeholder="请输入数字金额" />
      
</n-form-item>
    </n-card>

    <n-card title="转换结果">
      <div class="flex flex-col gap-4">
        <InputCopyable label="大写金额" :value="result" readonly />
        
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div class="text-sm text-gray-500 mb-1">预览</div>
          <div class="text-xl font-medium break-all">{{ result }}</div>
        </div>
      </div>
    </n-card>
  </div>
</template>
