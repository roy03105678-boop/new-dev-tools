<script setup lang="ts">
import { calculateSimpleInterest, calculateCompoundInterest } from './interest-calculator.service';
import InputCopyable from '../../components/InputCopyable.vue';

const principal = ref(10000);
const rate = ref(4.5);
const period = ref(1);
const compoundFrequency = ref(1);

const simpleResult = computed(() => calculateSimpleInterest(principal.value, rate.value, period.value));
const compoundResult = computed(() => calculateCompoundInterest(principal.value, rate.value, period.value, compoundFrequency.value));

const frequencies = [
  { label: '按年复利', value: 1 },
  { label: '半年复利', value: 2 },
  { label: '按季复利', value: 4 },
  { label: '按月复利', value: 12 },
  { label: '按日复利', value: 365 },
];
</script>

<template>
  <div class="flex flex-col gap-4">
    <n-card title="输入参数">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <n-form-item label="本金 (元)">
          <n-input-number v-model:value="principal" :min="0" class="w-full" placeholder="请输入本金" />
        </n-form-item>
        <n-form-item label="年利率 (%)">
          <n-input-number v-model:value="rate" :min="0" :step="0.1" class="w-full" placeholder="请输入年利率" />
        </n-form-item>
        <n-form-item label="期限 (年)">
          <n-input-number v-model:value="period" :min="0" :step="0.5" class="w-full" placeholder="请输入期限" />
        </n-form-item>
        <n-form-item label="复利频率">
          <n-select v-model:value="compoundFrequency" :options="frequencies" />
        </n-form-item>
      </div>
    </n-card>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <n-card title="单利计算结果">
        <div class="flex flex-col gap-2">
          <InputCopyable label="利息总额" :value="simpleResult.totalInterest.toFixed(2)" readonly />
          <InputCopyable label="本息合计" :value="simpleResult.totalAmount.toFixed(2)" readonly />
        </div>
      </n-card>

      <n-card title="复利计算结果">
        <div class="flex flex-col gap-2">
          <InputCopyable label="利息总额" :value="compoundResult.totalInterest.toFixed(2)" readonly />
          <InputCopyable label="本息合计" :value="compoundResult.totalAmount.toFixed(2)" readonly />
        </div>
      </n-card>
    </div>
  </div>
</template>
