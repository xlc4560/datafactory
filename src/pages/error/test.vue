<template>
  <a-select v-model:value="value" :first-active-value="['0']" show-search placeholder="Select a person" style="width: 200px" :filter-option="filterOption" @change="handleChange" @search="searchValue">
    <a-select-option v-for="item in options" :key="item.label" :value="item.value">
      <span v-if="item.label.toLocaleLowerCase().indexOf(searchKeyWord.toLocaleLowerCase()) > -1" class="titleName">
        {{ item.label.substr(0, item.label.toLowerCase().indexOf(searchKeyWord.toLocaleLowerCase())) }}
        <span style="color: rgb(89, 166, 253)">
          {{ item.label.substr(item.label.toLowerCase().indexOf(searchKeyWord.toLocaleLowerCase()), searchKeyWord.length) }}
        </span>
        {{ item.label.substr(item.label.toLowerCase().indexOf(searchKeyWord.toLocaleLowerCase()) + searchKeyWord?.length) }}
      </span>
      <span v-else class="titleName">{{ item.label }}</span>
    </a-select-option>
  </a-select>
</template>

<script setup lang="ts">
  import type { SelectProps } from 'ant-design-vue';
  const value = ref<string>('');
  const options = ref<SelectProps['options']>([
    { value: '0', label: 'Jack' },
    { value: '1', label: 'Lucy' },
    { value: '2', label: 'Tom' },
    { value: '3', label: 'JackKKK' },
  ]);

  const handleChange = (value: string) => {
    searchKeyWord.value = '';
    console.log(value);
  };
  const searchValue = (value: string) => {
    searchKeyWord.value = value;
  };
  const searchKeyWord = ref<string>('aaaa');
  const filterOption = (input: string, option: any) => {
    return option.key.toLowerCase().indexOf(searchKeyWord.value.toLowerCase()) >= 0;
  };
</script>

<style></style>
