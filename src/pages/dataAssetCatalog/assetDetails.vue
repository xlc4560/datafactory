<!-- 资产表详情 -->
<template>
  <div class="details">
    <div class="details-base">
      <div class="title">基本信息</div>
      <div class="content">
        <p>
          <span>中文名称:</span>
          <span>{{ dataAssetInformation.chinesename }}</span>
        </p>
        <p>
          <span>英文名称:</span>
          <span>{{ dataAssetInformation.englishname }}</span>
        </p>
        <p>
          <span>资产表描述:</span>
          <span>{{ dataAssetInformation.assetdescription }}</span>
        </p>
        <p>
          <span>所属目录:</span>
          <span class="catalogue">{{ dataAssetInformation.catalogue }}</span>
        </p>
      </div>
    </div>
    <div class="details-msg">
      <div class="title">字段信息</div>
      <div class="table">
        <a-table :columns="columns" :data-source="dataAssetInformation.fieldinformation" :pagination="{ pageSize: 50 }" :scroll="{ y: 340 }" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { DataAssetInformation } from './types';
  const dataAssetInformation = reactive<DataAssetInformation>({
    chinesename: 'chinesename',
    englishname: 'englishname',
    assetdescription: 'assetdescription',
    catalogue: '基本信息',
    fieldinformation: [
      {
        key: 1,
        fieldchinesename: 'englishname',
        fieldenglishage: '数据1',
        fieldexplain: 'fieldexplain',
        datatype: 'datatype',
        datalength: 'datalength',
        dataprecision: 'dataprecision',
        default: 'default',
        valueranges: 'valueranges',
        enumranges: 'enumranges',
      },
      {
        key: 2,
        fieldchinesename: 'englishname',
        fieldenglishage: '数据1',
        fieldexplain: 'fieldexplain',
        datatype: 'datatype',
        datalength: 'datalength',
        dataprecision: 'dataprecision',
        default: 'default',
        valueranges: 'valueranges',
        enumranges: 'enumranges',
      },
    ],
  });
  // 表格
  const columns = [
    {
      title: '字段英文名称',
      dataIndex: 'fieldchinesename',
      width: 150,
    },
    {
      title: '字段中文名称',
      dataIndex: 'fieldenglishage',
      width: 150,
    },
    {
      title: '字段说明',
      dataIndex: 'fieldexplain',
    },
    {
      title: '数据类型',
      dataIndex: 'datatype',
    },
    {
      title: '数据长度',
      dataIndex: 'datalength',
    },
    {
      title: '数据精度',
      dataIndex: 'dataprecision',
    },
    {
      title: '默认值',
      dataIndex: 'default',
    },
    {
      title: '取值范围',
      dataIndex: 'valueranges',
    },
    {
      title: '枚举范围',
      dataIndex: 'enumranges',
    },
  ];
</script>
<style scoped lang="less">
  .details {
    .details-base {
      .title {
        margin: 10px;
        border-left: 6px solid #1890ff;
        padding: 0px 10px;
      }

      .content {
        margin-left: 2%;
        padding: 10px 20px;

        span {
          margin-right: 10px;
        }

        .catalogue {
          border: 1px solid #e9e9e9;
          border-radius: 24px;
          padding: 0 10px;
          color: #f28d41;
          background: #f3f3f3;
        }
      }
    }

    .details-msg {
      .title {
        margin: 10px;
        border-left: 6px solid #1890ff;
        padding: 0px 10px;
      }

      .table {
        padding: 10px 25px;
      }
    }
  }
</style>
