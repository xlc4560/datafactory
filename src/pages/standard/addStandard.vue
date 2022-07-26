<template>
  <a-form :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off" @finish="onFinish" @finish-failed="onFinishFailed">
    <a-form-item label="中文名称" name="cname" :rules="[{ required: true, message: 'Please input your username!' }]">
      <a-input v-model:value="formState.cname" />
    </a-form-item>

    <a-form-item label="英文名称" name="ename" :rules="[{ required: true, message: 'Please input your username!' }]">
      <a-input v-model:value="formState.ename" />
    </a-form-item>

    <a-form-item label="标准说明" name="specification" :rules="[{ required: true, message: 'Please input your username!' }]">
      <a-input v-model:value="formState.specification" />
    </a-form-item>

    <a-form-item label="来源机构" name="Source" :rules="[{ required: true, message: 'Please input your username!' }]">
      <a-input v-model:value="formState.Source" />
    </a-form-item>

    <a-form-item label="是否为空" name="iskong" :rules="[{ required: true, message: 'Please input your username!' }]">
      <a-input v-model:value="formState.iskong" />
    </a-form-item>

    <a-form-item label="数据类型" name="type" :rules="[{ required: true, message: 'Please input your username!' }]">
      <a-input v-model:value="formState.type" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
  interface FormState {
    cname: string; //中文名称
    ename: string; //英文名称
    specification: string; //标准说明
    Source: string; //来源机构
    iskong: string; //是否可为空
    type: string; //数据类型
  }
  const formState = reactive<FormState>({
    cname: '',
    ename: '',
    specification: '', //标准说明
    Source: '', //来源机构
    iskong: '', //是否可为空
    type: '', //数据类型
  });
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
</script>
<style scoped lang="less"></style>
