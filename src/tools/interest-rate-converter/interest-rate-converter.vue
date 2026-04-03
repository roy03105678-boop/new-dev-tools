<script setup lang="ts">
import { convertFromAnnual, convertFromMonthly, convertFromDaily } from './interest-rate-converter.service';
import InputCopyable from '../../components/InputCopyable.vue';

const annualRate = ref(4.5);
const monthlyRate = ref(0.375);
const dailyRate = ref(0.0125);

function updateFromAnnual(val: number | null) {
  if (val === null) return;
  const res = convertFromAnnual(val);
  monthlyRate.value = Number(res.monthly.toFixed(4));
  dailyRate.value = Number(res.daily.toFixed(4));
}

function updateFromMonthly(val: number | null) {
  if (val === null) return;
  const res = convertFromMonthly(val);
  annualRate.value = Number(res.annual.toFixed(4));
  dailyRate.value = Number(res.daily.toFixed(4));
}

function updateFromDaily(val: number | null) {
  if (val === null) return;
  const res = convertFromDaily(val);
  annualRate.value = Number(res.annual.toFixed(4));
  monthlyRate.value = Number(res.monthly.toFixed(4));
}

watch(annualRate, (newVal) => {
  if(document.activeElement?.id !== 'monthlyRate' && document.activeElement?.id !== 'dailyRate'){
    updateFromAnnual(newVal);
  }
})
watch(monthlyRate, (newVal) => {
  if(document.activeElement?.id !== 'annualRate' && document.activeElement?.id !== 'dailyRate'){
    updateFromMonthly(newVal);
  }
})
watch(dailyRate, (newVal) => {
  if(document.activeElement?.id !== 'annualRate' && document.activeElement?.id !== 'monthlyRate'){
    updateFromDaily(newVal);
  }
})

</script>

<template>
  <div class="flex flex-col gap-4">
    <n-card title="利率换算">
      <div class="flex flex-col gap-4">
        <n-form-item label="年利率 (%)">
          <n-input-number id="annualRate" v-model:value="annualRate" :min="0" :step="0.01" class="w-full" @update:value="updateFromAnnual" />
        </n-form-item>
        
        <n-form-item label="月利率 (%)">
          <n-input-number id="monthlyRate" v-model:value="monthlyRate" :min="0" :step="0.01" class="w-full" @update:value="updateFromMonthly" />
        </n-form-item>
        
        <n-form-item label="日利率 (‰)">
          <n-input-number id="dailyRate" v-model:value="dailyRate" :min="0" :step="0.001" class="w-full" @update:value="updateFromDaily" />
        </n-form-item>
      </div>
    </n-card>

    <n-card title="换算结果一览">
      <div class="flex flex-col gap-2">
        <InputCopyable label="年利率" :value="annualRate.toFixed(4) + '%'" readonly />
        <InputCopyable label="月利率" :value="monthlyRate.toFixed(4) + '%'" readonly />
        <InputCopyable label="日利率" :value="(dailyRate / 10).toFixed(4) + '‰'" readonly />
      </div>
    </n-card>
  </div>
</template>
