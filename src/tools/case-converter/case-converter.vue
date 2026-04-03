<script setup lang="ts">
import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} from 'change-case';
import InputCopyable from '../../components/InputCopyable.vue';

const baseConfig = {
  stripRegexp: /[^A-Za-zÀ-ÖØ-öø-ÿ]+/gi,
};

const input = ref('lorem ipsum dolor sit amet');

const formats = computed(() => [
  {
    label: '小写：',
    value: input.value.toLocaleLowerCase(),
  },
  {
    label: '大写：',
    value: input.value.toLocaleUpperCase(),
  },
  {
    label: '驼峰命名：',
    value: camelCase(input.value, baseConfig),
  },
  {
    label: '首字母大写：',
    value: capitalCase(input.value, baseConfig),
  },
  {
    label: '常量命名：',
    value: constantCase(input.value, baseConfig),
  },
  {
    label: '点分隔命名：',
    value: dotCase(input.value, baseConfig),
  },
  {
    label: '标题命名：',
    value: headerCase(input.value, baseConfig),
  },
  {
    label: '无格式：',
    value: noCase(input.value, baseConfig),
  },
  {
    label: '参数命名：',
    value: paramCase(input.value, baseConfig),
  },
  {
    label: 'Pascal命名：',
    value: pascalCase(input.value, baseConfig),
  },
  {
    label: '路径命名：',
    value: pathCase(input.value, baseConfig),
  },
  {
    label: '句子命名：',
    value: sentenceCase(input.value, baseConfig),
  },
  {
    label: '蛇形命名：',
    value: snakeCase(input.value, baseConfig),
  },
  {
    label: '模拟命名：',
    value: input.value
      .split('')
      .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
      .join(''),
  },
]);

const inputLabelAlignmentConfig = {
  labelPosition: 'left',
  labelWidth: '120px',
  labelAlign: 'right',
};
</script>

<template>
  <c-card>
    <c-input-text
      v-model:value="input"
      label="您的字符串："
      placeholder="请输入字符串..."
      raw-text
      v-bind="inputLabelAlignmentConfig"
    />

    <div my-16px divider />

    <InputCopyable
      v-for="format in formats"
      :key="format.label"
      :value="format.value"
      :label="format.label"
      v-bind="inputLabelAlignmentConfig"
      mb-1
    />
  </c-card>
</template>
