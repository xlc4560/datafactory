<template>
  <a-form :model="formStateAdd" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off" @finish="onFinish" @finish-failed="onFinishFailed">
    <a-form-item label="中文名称" name="standardCnName" :rules="[{ required: true, message: '请输入标准中文名称!' }]">
      <a-input v-model:value="formStateAdd.standardCnName" />
    </a-form-item>

    <a-form-item label="英文名称" name="standardEnName" :rules="[{ required: true, message: '请输入标准英文名称!' }]">
      <a-input v-model:value="formStateAdd.standardEnName" />
    </a-form-item>

    <a-form-item label="标准说明" name="standardExplain" :rules="[{ required: false, message: '请输入标准说明!' }]">
      <a-input v-model:value="formStateAdd.standardExplain" />
    </a-form-item>

    <a-form-item label="来源机构" name="standardSourceOrganization" :rules="[{ required: true, message: '请选择来源机构!' }]">
      <a-input v-model:value="formStateAdd.standardSourceOrganization" />
    </a-form-item>

    <a-form-item label="是否为空" name="standardIsBlank" :rules="[{ required: true, message: '请选择是否为空!' }]">
      <!-- <a-input v-model:value="formState.iskong" /> -->
      <a-select v-model:value="formStateAdd.standardIsBlank" placeholder="请选择是否为空" :options="optionsEmpty" @change="handleChangeEmpty"></a-select>
    </a-form-item>

    <a-form-item label="数据类型" name="standardType" :rules="[{ required: true, message: 'Please input your username!' }]">
      <!-- <a-input v-model:value="formState.type" /> -->
      <a-select v-model:value="formStateAdd.standardType" placeholder="请选择" :options="optionsType" @change="handleChangeType"></a-select>
    </a-form-item>
    <!-- Int类型 -->
    <div v-if="formStateAdd.standardType == 0">
      <a-form-item label="取值范围" name="standardValueMin" :rules="[{ required: false, message: '请输入!' }]">
        <div style="display: flex; justify-content: space-around; padding: 0">
          <a-input v-model:value="formStateAdd.standardValueMin" style="width: 160px; height: 32.19px" />
          <!-- <a-input v-model:value="formStateAdd.max" style="width: 200px" /> -->
          <a-form-item name="standardValueMax" :rules="[{ required: false, message: '请输入!' }]">
            <a-input v-model:value="formStateAdd.standardValueMax" style="width: 160px" />
          </a-form-item>
        </div>
      </a-form-item>
      <a-form-item label="默认值" name="standardDefault" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.standardDefault" />
      </a-form-item>
    </div>
    <!-- Enum类型 -->
    <div v-else-if="formStateAdd.standardType == 1">
      <a-form-item label="枚举范围" name="standardDataAccuracy" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.standardDataAccuracy" />
      </a-form-item>
      <a-form-item label="默认值" name="standardDefault" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.standardDefault" />
      </a-form-item>
    </div>
    <!-- Float类型 -->
    <div v-else-if="formStateAdd.standardType == 2">
      <a-form-item label="数据精度" name="standardDataAccuracy" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.standardDataAccuracy" />
      </a-form-item>
      <a-form-item label="取值范围" name="standardValueMin" :rules="[{ required: false, message: '请输入!' }]">
        <div style="display: flex; justify-content: space-around; padding: 0">
          <a-input v-model:value="formStateAdd.standardValueMin" style="width: 160px; height: 32.19px" />
          <!-- <a-input v-model:value="formStateAdd.max" style="width: 200px" /> -->
          <a-form-item name="standardValueMax" :rules="[{ required: false, message: '请输入!' }]">
            <a-input v-model:value="formStateAdd.standardValueMax" style="width: 160px" />
          </a-form-item>
        </div>
      </a-form-item>
      <a-form-item label="默认值" name="standardDefault" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.standardDefault" />
      </a-form-item>
    </div>
    <!-- String类型 -->
    <div v-else-if="formStateAdd.standardType == 3">
      <a-form-item label="数据长度" name="standardDataLength" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.standardDataLength" />
      </a-form-item>
      <a-form-item label="默认值" name="standardDefault" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.standardDefault" />
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
