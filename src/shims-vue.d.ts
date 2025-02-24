/* eslint-disable */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.vue';
declare module 'papaparse';
declare module '@edenlife/eden-pricing-module';
declare module 'vue-json-csv';
declare module 'vue-json-excel3';