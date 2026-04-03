<script setup lang="ts">
import { types as extensionToMimeType, extensions as mimeTypeToExtension } from 'mime-types';

const mimeInfos = Object.entries(mimeTypeToExtension).map(([mimeType, extensions]) => ({ mimeType, extensions }));

const mimeToExtensionsOptions = Object.keys(mimeTypeToExtension).map(label => ({ label, value: label }));
const selectedMimeType = ref(undefined);

const extensionsFound = computed(() => (selectedMimeType.value ? mimeTypeToExtension[selectedMimeType.value] : []));

const extensionToMimeTypeOptions = Object.keys(extensionToMimeType).map((label) => {
  const extension = `.${label}`;

  return { label: extension, value: label };
});
const selectedExtension = ref(undefined);

const mimeTypeFound = computed(() => (selectedExtension.value ? extensionToMimeType[selectedExtension.value] : []));
</script>

<template>
  <c-card>
    <n-h2 style="margin-bottom: 0">
      MIME 类型转文件扩展名
    </n-h2>
    <div style="opacity: 0.8">
      查询与 MIME 类型关联的文件扩展名
    </div>
    <c-select
      v-model:value="selectedMimeType"
      searchable
      my-4
      :options="mimeToExtensionsOptions"
      placeholder="在此选择 MIME 类型（如：application/pdf）"
    />

    <div v-if="extensionsFound.length > 0">
      具有 <n-tag round :bordered="false">
        {{ selectedMimeType }}
      </n-tag> MIME 类型的文件扩展名：
      <div style="margin-top: 10px">
        <n-tag
          v-for="extension of extensionsFound"
          :key="extension"
          round
          :bordered="false"
          type="primary"
          style="margin-right: 10px"
        >
          .{{ extension }}
        </n-tag>
      </div>
    </div>
  </c-card>

  <c-card>
    <n-h2 style="margin-bottom: 0">
      文件扩展名转 MIME 类型
    </n-h2>
    <div style="opacity: 0.8">
      查询与文件扩展名关联的 MIME 类型
    </div>
    <c-select
      v-model:value="selectedExtension"
      searchable
      my-4
      :options="extensionToMimeTypeOptions"
      placeholder="在此选择文件扩展名（如：.pdf）"
    />

    <div v-if="selectedExtension">
      与扩展名 <n-tag round :bordered="false">
        {{ selectedExtension }}
      </n-tag> 关联的 MIME 类型：
      <div style="margin-top: 10px">
        <n-tag round :bordered="false" type="primary" style="margin-right: 10px">
          {{ mimeTypeFound }}
        </n-tag>
      </div>
    </div>
  </c-card>

  <div>
    <n-table>
      <thead>
        <tr>
          <th>MIME 类型</th>
          <th>文件扩展名</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ mimeType, extensions } of mimeInfos" :key="mimeType">
          <td>{{ mimeType }}</td>
          <td>
            <n-tag v-for="extension of extensions" :key="extension" round :bordered="false" style="margin-right: 10px">
              .{{ extension }}
            </n-tag>
          </td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>
