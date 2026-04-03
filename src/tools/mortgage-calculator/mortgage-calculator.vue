<script setup lang="ts">
import { calculateEqualInstallment, calculateEqualPrincipal } from './mortgage-calculator.service';

const principal = ref(1000000);
const annualRate = ref(4.5);
const years = ref(30);
const method = ref('installment');

const months = computed(() => years.value * 12);

const result = computed(() => {
  if (method.value === 'installment') {
    return calculateEqualInstallment(principal.value, annualRate.value, months.value);
  } else {
    return calculateEqualPrincipal(principal.value, annualRate.value, months.value);
  }
});

const methodOptions = [
  { label: '等额本息 (每月还款额固定)', value: 'installment' },
  { label: '等额本金 (每月还款本金固定)', value: 'principal' },
];

const columns = [
  { title: '期数', key: 'month', width: 80 },
  { title: '月还款额', key: 'payment', render: (row: any) => row.payment.toFixed(2) },
  { title: '应还本金', key: 'principal', render: (row: any) => row.principal.toFixed(2) },
  { title: '应还利息', key: 'interest', render: (row: any) => row.interest.toFixed(2) },
  { title: '剩余本金', key: 'remainingPrincipal', render: (row: any) => row.remainingPrincipal.toFixed(2) },
];
</script>

<template>
  <div class="flex flex-col gap-4">
    <n-card title="房贷参数">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <n-form-item label="贷款金额 (元)">
          <n-input-number v-model:value="principal" :min="0" class="w-full" placeholder="请输入贷款总额" />
        </n-form-item>
        <n-form-item label="年利率 (%)">
          <n-input-number v-model:value="annualRate" :min="0" :step="0.01" class="w-full" placeholder="请输入年利率" />
        </n-form-item>
        <n-form-item label="贷款期限 (年)">
          <n-input-number v-model:value="years" :min="1" :max="50" class="w-full" placeholder="请输入贷款年限" />
        </n-form-item>
        <n-form-item label="还款方式">
          <n-select v-model:value="method" :options="methodOptions" />
        </n-form-item>
      </div>
    </n-card>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <n-card title="月均还款">
        <div class="text-2xl font-bold">
          {{ result.monthlyPayment.toFixed(2) }} <span class="text-sm font-normal text-gray-500">元</span>
        </div>
        <div v-if="method === 'principal'" class="text-xs text-gray-400 mt-1">
          (逐月递减)
        </div>
      </n-card>
      <n-card title="利息总额">
        <div class="text-2xl font-bold text-orange-500">
          {{ result.totalInterest.toFixed(2) }} <span class="text-sm font-normal text-gray-500">元</span>
        </div>
      </n-card>
      <n-card title="还款总额">
        <div class="text-2xl font-bold text-blue-500">
          {{ result.totalPayment.toFixed(2) }} <span class="text-sm font-normal text-gray-500">元</span>
        </div>
      </n-card>
    </div>

    <n-card title="还款详情">
      <n-data-table
        :columns="columns"
        :data="result.monthlyDetails"
        :pagination="{ pageSize: 12 }"
        max-h-400
      />
    </n-card>
  </div>
</template>
