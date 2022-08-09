<!-- 新增资产表和编辑 -->
<template>
  <div>
    <h3 :style="{ margin: '16px 0' }">数据资产表基础信息</h3>
    <div class="base">
      <a-form :model="assetadd" name="basic" :label-col="{ span: 2 }" :wrapper-col="{ span: 8 }" autocomplete="off">
        <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="assetadd.assetNameCn" />
        </a-form-item>

        <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input v-model:value="assetadd.assetNameCn" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup lang="ts">
  interface AssetAdd {
    assetDesc?: string; //数据资产表描述
    assetNameCn: string; //数据资产名称
    assetNameEn: string; //数据资产英文名称
    categoryCodes: string[]; //目录编号数组
    //数据资产配置
    assetConfigs: [
      {
        assetConfigDescription?: string; //字段描述
        assetConfigName: string; //字段中文名称
        assetConfigNameEn: string; //字段英文名称
        standardCode: string; //数据标准目录编号
      },
    ];
  }
  const assetadd = reactive<AssetAdd>({
    assetDesc: '',
    assetNameCn: '',
    assetNameEn: '',
    categoryCodes: [''],
    assetConfigs: [
      {
        assetConfigDescription: '',
        assetConfigName: '',
        assetConfigNameEn: '',
        standardCode: '',
      },
    ],
  });
</script>
<style scoped lang="less">
  .base {
    border-top: 1px solid #f0f0f0;
  }
</style>
