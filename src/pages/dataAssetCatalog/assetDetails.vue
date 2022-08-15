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
          <span v-for="(i, index) in dataAssetInformation.catalogue" :key="index" class="catalogue">{{ i }}</span>
        </p>
      </div>
    </div>
    <div class="details-msg">
      <div class="title">字段信息</div>
      <div class="table">
        <a-table :columns="columns" :data-source="dataAssetInformation.fieldinformation" :pagination="{ pageSize: 50 }" :scroll="{ y: 340 }">
          <template #bodyCell="{ column, record, text }">
            <template v-if="column.dataIndex === 'fieldexplain'">
              <span v-if="record.fieldexplain == ''">{{ '-' }}</span>
            </template>
            <template v-if="column.dataIndex === 'datalength'">
              <span v-if="record.datalength == null">{{ '-' }}</span>
            </template>
            <template v-if="column.dataIndex === 'dataprecision'">
              <span v-if="record.dataprecision == null">{{ '-' }}</span>
            </template>
            <template v-if="column.dataIndex === 'default'">
              <span v-if="record.default == null">{{ '-' }}</span>
            </template>
            <template v-if="column.dataIndex === 'valueranges'">
              <span v-if="record.valueranges == 'null-null'">{{ 0 }}</span>
            </template>
            <template v-if="column.dataIndex === 'enumranges'">
              <span v-if="record.enumranges == null">{{ '-' }}</span>
            </template>
            <template v-if="column.dataIndex === 'datatype'">
              <span>{{ datatype[text] }}</span>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { DataAssetInformation } from './types';
  import { assetGetDetail } from '@/api/dataAssetCatalog/index';
  const dataAssetInformation = reactive<DataAssetInformation>({
    chinesename: '',
    englishname: '',
    assetdescription: '',
    catalogue: [],
    fieldinformation: [],
  });
  enum datatype {
    'Int' = 0,
    'Enum' = 1,
    'Float' = 2,
    'String' = 3,
  }
  // 表格
  const columns = [
    {
      title: '字段英文名称',
      dataIndex: 'fieldenglishname',
      width: 150,
    },
    {
      title: '字段中文名称',
      dataIndex: 'fieldchinesename',
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

  const prop = defineProps({
    assetcode: {
      type: String,
      default: '',
    },
  });
  console.log(prop.assetcode);
  assetGetDetail(prop.assetcode).then(res => {
    console.log(res);
    dataAssetInformation.chinesename = res.asset.assetNameCn;
    dataAssetInformation.englishname = res.asset.assetNameEn;
    dataAssetInformation.assetdescription = res.asset.assetDesc;
    dataAssetInformation.catalogue = res.categoryName;
    res.assetConfigStandardMap.forEach((item: any) => {
      let temp = {
        fieldchinesename: item.assetConfigName,
        fieldenglishname: item.assetConfigNameEn,
        fieldexplain: item.assetConfigDescription,
        datatype: item.standardType,
        datalength: item.standardDataLength,
        dataprecision: item.standardDataAccuracy,
        default: item.standardDefault,
        valueranges: item.standardValueMin + '-' + item.standardValueMax,
        enumranges: item.codeId,
      };
      dataAssetInformation.fieldinformation.push(temp);
    });
  });
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
