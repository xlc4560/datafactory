<template>
  <a-form :model="formStateAdd" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off" @finish="onFinish" @finish-failed="onFinishFailed">
    <a-form-item label="中文名称" name="cname" :rules="[{ required: true, message: '请输入标准中文名称!' }]">
      <a-input v-model:value="formStateAdd.cname" />
    </a-form-item>

    <a-form-item label="英文名称" name="ename" :rules="[{ required: true, message: '请输入标准英文名称!' }]">
      <a-input v-model:value="formStateAdd.ename" />
    </a-form-item>

    <a-form-item label="标准说明" name="specification" :rules="[{ required: false, message: '请输入标准说明!' }]">
      <a-input v-model:value="formStateAdd.specification" />
    </a-form-item>

    <a-form-item label="来源机构" name="Source" :rules="[{ required: true, message: '请选择来源机构!' }]">
      <a-input v-model:value="formStateAdd.Source" />
    </a-form-item>

    <a-form-item label="是否为空" name="iskong" :rules="[{ required: true, message: '请选择是否为空!' }]">
      <!-- <a-input v-model:value="formState.iskong" /> -->
      <a-select v-model:value="formStateAdd.iskong" placeholder="请选择是否为空" :options="optionsEmpty" @change="handleChangeEmpty"></a-select>
    </a-form-item>

    <a-form-item label="数据类型" name="type" :rules="[{ required: true, message: 'Please input your username!' }]">
      <!-- <a-input v-model:value="formState.type" /> -->
      <a-select v-model:value="formStateAdd.type" placeholder="请选择" :options="optionsType" @change="handleChangeType"></a-select>
    </a-form-item>
    <!-- Int类型 -->
    <div v-if="formStateAdd.type == 'Int'">
      <a-form-item label="取值范围" name="specification" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.specification" style="width: 200px" />---
        <a-input v-model:value="formStateAdd.specification" style="width: 200px" />
      </a-form-item>
      <a-form-item label="默认值" name="specification" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.specification" />
      </a-form-item>
    </div>
    <!-- Enum类型 -->
    <div v-else-if="formStateAdd.type == 'Enum'">
      <a-form-item label="枚举范围" name="specification" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.specification" />
      </a-form-item>
      <a-form-item label="默认值" name="specification" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.specification" />
      </a-form-item>
    </div>
    <!-- Float类型 -->
    <div v-else-if="formStateAdd.type == 'Float'">
      <a-form-item label="数据精度" name="specification" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.specification" />
      </a-form-item>
      <a-form-item label="取值范围" name="specification" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.specification" style="width: 200px" />---
        <a-input v-model:value="formStateAdd.specification" style="width: 200px" />
      </a-form-item>
      <a-form-item label="默认值" name="specification" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.specification" />
      </a-form-item>
    </div>
    <!-- String类型 -->
    <div v-else-if="formStateAdd.type == 'String'">
      <a-form-item label="数据长度" name="specification" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.specification" />
      </a-form-item>
      <a-form-item label="默认值" name="specification" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.specification" />
      </a-form-item>
    </div>

    <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
  import type { SelectProps } from 'ant-design-vue';
  import { formStateAdd, optionsEmpty, optionsType } from './standardData'; //新增数据、是否为空选择、类型选择
  // import {} from './standardType'; //
  const prop = defineProps({
    // visible2: {
    //   type: Boolean,
    //   default: false,
    // },
    codeid: {
      type: String,
      default: '',
    },
  });
  console.log('prop' + prop.codeid);

  // 提交
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  // 下拉选择是否为空
  const handleChangeEmpty: SelectProps['onChange'] = value => {
    console.log(value); // { key: "lucy", label: "Lucy (101)" }
  };
  //optionsType handleChangeType
  // 选择类型
  const handleChangeType: SelectProps['onChange'] = value => {
    console.log(value); // { key: "lucy", label: "Lucy (101)" }
  };
</script>
<style scoped lang="less"></style>
