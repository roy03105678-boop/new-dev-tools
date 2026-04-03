<script setup lang="ts">
import cronstrue from 'cronstrue';
import { isValidCron } from 'cron-validator';
import { useStyleStore } from '@/stores/style.store';

function isCronValid(v: string) {
  return isValidCron(v, { allowBlankDay: true, alias: true, seconds: true });
}

const styleStore = useStyleStore();

const cron = ref('40 * * * *');
const cronstrueConfig = reactive({
  verbose: true,
  dayOfWeekStartIndexZero: true,
  use24HourTimeFormat: true,
  throwExceptionOnParseError: true,
});

const helpers = [
  {
    symbol: '*',
    meaning: '任意値',
    example: '* * * *',
    equivalent: '每分钟',
  },
  {
    symbol: '-',
    meaning: '値的范围',
    example: '1-10 * * *',
    equivalent: '第 1 到 10 分钟',
  },
  {
    symbol: ',',
    meaning: '値的列表',
    example: '1,10 * * *',
    equivalent: '在第 1 和第 10 分钟',
  },
  {
    symbol: '/',
    meaning: '步进値',
    example: '*/10 * * *',
    equivalent: '每 10 分钟',
  },
  {
    symbol: '@yearly',
    meaning: '每年 1 月 1 日凌晨执行一次',
    example: '@yearly',
    equivalent: '0 0 1 1 *',
  },
  {
    symbol: '@annually',
    meaning: '与 @yearly 相同',
    example: '@annually',
    equivalent: '0 0 1 1 *',
  },
  {
    symbol: '@monthly',
    meaning: '每月第一天凌晨执行一次',
    example: '@monthly',
    equivalent: '0 0 1 * *',
  },
  {
    symbol: '@weekly',
    meaning: '每周日凌晨执行一次',
    example: '@weekly',
    equivalent: '0 0 * * 0',
  },
  {
    symbol: '@daily',
    meaning: '每天凌晨执行一次',
    example: '@daily',
    equivalent: '0 0 * * *',
  },
  {
    symbol: '@midnight',
    meaning: '与 @daily 相同',
    example: '@midnight',
    equivalent: '0 0 * * *',
  },
  {
    symbol: '@hourly',
    meaning: '每小时整点执行一次',
    example: '@hourly',
    equivalent: '0 * * * *',
  },
  {
    symbol: '@reboot',
    meaning: '启动时执行',
    example: '',
    equivalent: '',
  },
];

const cronString = computed(() => {
  if (isCronValid(cron.value)) {
    return cronstrue.toString(cron.value, cronstrueConfig);
  }
  return ' ';
});

const cronValidationRules = [
  {
    validator: (value: string) => isCronValid(value),
    message: '该 Cron 表达式无效',
  },
];
</script>

<template>
  <c-card>
    <div mx-auto max-w-sm>
      <c-input-text
        v-model:value="cron"
        size="large"
        placeholder="* * * * *"
        :validation-rules="cronValidationRules"
        mb-3
      />
    </div>

    <div class="cron-string">
      {{ cronString }}
    </div>

    <n-divider />

    <div flex justify-center>
      <n-form :show-feedback="false" label-width="170" label-placement="left">
        <n-form-item label="详细模式">
          <n-switch v-model:value="cronstrueConfig.verbose" />
        </n-form-item>
        <n-form-item label="使用24小时格式">
          <n-switch v-model:value="cronstrueConfig.use24HourTimeFormat" />
        </n-form-item>
        <n-form-item label="星期从 0 开始">
          <n-switch v-model:value="cronstrueConfig.dayOfWeekStartIndexZero" />
        </n-form-item>
      </n-form>
    </div>
  </c-card>
  <c-card>
    <pre>
┌──────────── [optional] seconds (0 - 59)
| ┌────────── minute (0 - 59)
| | ┌──────── hour (0 - 23)
| | | ┌────── day of month (1 - 31)
| | | | ┌──── month (1 - 12) OR jan,feb,mar,apr ...
| | | | | ┌── day of week (0 - 6, sunday=0) OR sun,mon ...
| | | | | |
* * * * * * command</pre>

    <div v-if="styleStore.isSmallScreen">
      <c-card v-for="{ symbol, meaning, example, equivalent } in helpers" :key="symbol" mb-3 important:border-none>
        <div>
          符号： <strong>{{ symbol }}</strong>
        </div>
        <div>
          含义： <strong>{{ meaning }}</strong>
        </div>
        <div>
          示例：
          <strong><code>{{ example }}</code></strong>
        </div>
        <div>
          等价： <strong>{{ equivalent }}</strong>
        </div>
      </c-card>
    </div>

    <c-table v-else :data="helpers" />
  </c-card>
</template>

<style lang="less" scoped>
::v-deep(input) {
  font-size: 30px;
  font-family: monospace;
  padding: 5px;
  text-align: center;
}

.cron-string {
  text-align: center;
  font-size: 22px;
  opacity: 0.8;
  margin: 5px 0 15px;
}

pre {
  overflow: auto;
  padding: 10px 0;
}
</style>
