<script setup lang="ts">
import type { SignatureInfo } from '../pdf-signature-checker.types';

const props = defineProps<{ signature: SignatureInfo }>();
const { signature } = toRefs(props);

const tableHeaders = {
  validityPeriod: '有效期',
  issuedBy: '签发方',
  issuedTo: '颁发对象',
  pemCertificate: 'PEM 证书',
};

const certs = computed(() => signature.value.meta.certs.map((certificate, index) => ({
  ...certificate,
  validityPeriod: {
    notBefore: new Date(certificate.validityPeriod.notBefore).toLocaleString(),
    notAfter: new Date(certificate.validityPeriod.notAfter).toLocaleString(),
  },
  certificateName: `证书 ${index + 1}`,
})),
);
</script>

<template>
  <div flex flex-col gap-2>
    <c-table :data="certs" :headers="tableHeaders">
      <template #validityPeriod="{ value }">
        <c-key-value-list
          :items="[{
            label: '生效日期',
            value: value.notBefore,
          }, {
            label: '失效日期',
            value: value.notAfter,
          }]"
        />
      </template>

      <template #issuedBy="{ value }">
        <c-key-value-list
          :items="[{
            label: '通用名称',
            value: value.commonName,
          }, {
            label: '组织名称',
            value: value.organizationName,
          }, {
            label: '国家名称',
            value: value.countryName,
          }, {
            label: '地区名称',
            value: value.localityName,
          }, {
            label: '组织单位名称',
            value: value.organizationalUnitName,
          }, {
            label: '州/省名称',
            value: value.stateOrProvinceName,
          }]"
        />
      </template>

      <template #issuedTo="{ value }">
        <c-key-value-list
          :items="[{
            label: '通用名称',
            value: value.commonName,
          }, {
            label: '组织名称',
            value: value.organizationName,
          }, {
            label: '国家名称',
            value: value.countryName,
          }, {
            label: '地区名称',
            value: value.localityName,
          }, {
            label: '组织单位名称',
            value: value.organizationalUnitName,
          }, {
            label: '州/省名称',
            value: value.stateOrProvinceName,
          }]"
        />
      </template>

      <template #pemCertificate="{ value }">
        <c-modal-value :value="value" label="查看 PEM 证书">
          <template #value>
            <div break-all text-xs>
              {{ value }}
            </div>
          </template>
        </c-modal-value>
      </template>
    </c-table>
  </div>
</template>
