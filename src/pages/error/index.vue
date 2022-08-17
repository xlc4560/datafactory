<template>
  <div class="form-test_BRkHTm">
    <h2>this is error page</h2>

    <a-form-item :has-feedback="rules.hasFeedback" label="测试输入框" :validate-status="rules.validateStatus" :help="rules.helpValue" :required="true">
      <a-input v-model:value="value" allow-clear />
    </a-form-item>

    <a-button style="margin: 20px 0 0 0" @click="btn">保 存</a-button>
    <a-table :columns="columns" :data-source="data" size="small" :pagination="false">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span> Name </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag v-for="tag in record.tags" :key="tag" :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a>Invite 一 {{ record.name }}</a>
            <a-divider type="vertical" />
            <a>Delete</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link"> More actions </a>
          </span>
        </template>
      </template>
    </a-table>
    <!-- :options="options" -->

    <a-select
      v-model:value="value"
      :first-active-value="['0']"
      show-search
      placeholder="Select a person"
      style="width: 200px"
      :filter-option="filterOption"
      @change="handleChange"
      @search="searchValue"
    >
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
  </div>
</template>

<script setup lang="ts">
  import type { SelectProps } from 'ant-design-vue';
  const value = ref<string>('');
  const rules = ref<any>({
    helpValue: undefined,
    validateStatus: 'success',
    hasFeedback: false,
  });
  watch(
    () => value,
    () => {
      if (value.value === '') {
        rules.value = {
          helpValue: '请输入必填项!',
          validateStatus: 'error',
          hasFeedback: true,
        };
      } else if (parseInt(value.value)) {
        rules.value = {
          helpValue: '不能输入数字!',
          validateStatus: 'error',
          hasFeedback: true,
        };
      } else {
        rules.value = {
          helpValue: undefined,
          validateStatus: 'success',
          hasFeedback: true,
        };
      }
    },
    { deep: true },
  );
  const btn = () => {
    if (value.value === '') {
      rules.value = {
        helpValue: '请输入必填项!',
        validateStatus: 'error',
      };
    } else if (parseInt(value.value)) {
      rules.value = {
        helpValue: '不能输入数字!',
        validateStatus: 'error',
      };
    } else {
      rules.value = {
        helpValue: '',
        validateStatus: 'success',
      };
    }
  };
  const columns = [
    {
      name: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
    },
    {
      title: 'Action',
      key: 'action',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

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
  const searchKeyWord = ref<string>('');
  const filterOption = (input: string, option: any) => {
    return option.key.toLowerCase().indexOf(searchKeyWord.value.toLowerCase()) >= 0;
  };
</script>

<style lang="less">
  .form-test_BRkHTm {
    .ant-form-item {
      margin-bottom: 0 !important;
      // background-color: aquamarine;
      .ant-form-item-explain {
        position: absolute;
        top: -55px;
        right: 0px;
        z-index: 1;
        display: flex;
        border-radius: 3px;
        padding: 5px 10px;
        background: rgb(255, 255, 255);
        box-shadow: 0 5px 10px 5px rgb(233, 233, 233);
        line-height: 32px;
      }

      .ant-form-item-explain::before {
        position: absolute;
        top: 42px;
        right: 20px;
        z-index: 99;
        display: block;
        border-top: 10px solid rgb(255, 255, 255);
        border-right: 5px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 5px solid transparent;
        content: '';
      }
    }
  }
</style>
