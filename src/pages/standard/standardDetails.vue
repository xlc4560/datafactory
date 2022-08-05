<template>
  <div>
    <p
      ><span>标准编号:</span><span>{{ data.standardCode }}</span>
    </p>
    <p
      ><span>中文名称：</span><span>{{ data.standardCnName }}</span>
    </p>
    <p
      ><span>英文名称：</span><span>{{ data.standardEnName }}</span>
    </p>
    <p
      ><span>标准说明：</span><span>{{ data.standardExplain }}</span>
    </p>
    <p
      ><span>来源机构:</span><span>{{ data.standardSourceOrganization }}</span>
    </p>
    <p
      ><span>是否可为空:</span><span>{{ IsBlank[data.standardIsBlank] }}</span>
    </p>
    <p
      ><span>数据类型:</span><span>{{ stype[data.standardType || 1] }}</span>
    </p>

    <!-- int -->
    <div v-if="data.standardType == '0'">
      <p>
        <span>取值范围:</span>
        <span> 取值范围最小值{{ data.standardValueMin }},取值范围最大值{{ data.standardValueMax }}</span>
      </p>
    </div>
    <!-- enum -->
    <div v-if="data.standardType == '1'">
      <p>
        <span>枚举范围:</span>
        <a @click="showModal">{{ data.code.codeName }}</a>
      </p>
    </div>
    <!-- float -->
    <div v-if="data.standardType == '2'">
      <p>
        <span>数据精度:</span>
        <span> {{ data.standardDataAccuracy }}</span>
      </p>
      <p>
        <span>取值范围:</span>
        <span> 取值范围最小值{{ data.standardValueMin }},取值范围最大值{{ data.standardValueMax }}</span>
      </p>
    </div>
    <!-- string -->
    <div v-if="data.standardType == '3'">
      <p>
        <span>数据长度:</span>
        <span> {{ data.standardDataLength }}</span>
      </p>
    </div>
    <p
      ><span>默认值:</span><span>{{ data.standardDefault }}</span>
    </p>
  </div>
  <!-- 弹出框 -->
  <a-modal v-model:visible="visible1" width="1000px" :destroy-on-close="true" :title="codeName" @ok="handleOk">
    <!-- 接口详情 -->
    <a-table :columns="columnsDetails" :data-source="dataDetails" :pagination="false" :scroll="{ y: 300 }">
      <!-- <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'">
            <a>{{ text }}</a>
          </template>
        </template> -->
    </a-table>
  </a-modal>
</template>
<script lang="ts" setup>
  import { TableColumnType } from 'ant-design-vue';
  import { standardDetail } from '@/api/standard/standard'; //详情
  const prop = defineProps({
    // visible2: {
    //   type: Boolean,
    //   default: false,
    // },
    standardcode: {
      type: String,
      default: '',
    },
  });
  // 数据类型（0：int，1：enum，2：float，3：String）
  enum stype {
    // 0：int，1：enum，2：float，3：String
    'int' = 0,
    'enum' = 1,
    'float' = 2,
    'String' = 3,
  }
  // 是否可为空：0不可为空，1可为空
  enum IsBlank {
    '不可为空' = 0,
    '可为空' = 1,
  }

  console.log('prop' + prop.standardcode);
  standardDetail(prop.standardcode).then(res => {
    console.log(res);
    data.standardCnName = res.standardCnName;
    data.standardCode = res.standardCode;
    data.standardEnName = res.standardEnName;
    data.standardExplain = res.standardExplain;
    data.standardIsBlank = res.standardIsBlank;
    data.standardSourceOrganization = res.standardSourceOrganization;
    data.standardType = res.standardType;
    data.standardValueMin = res.standardValueMin;
    data.standardValueMax = res.standardValueMax;
    data.standardDataAccuracy = res.standardDataAccuracy;
    data.standardDataLength = res.standardDataLength;
    data.standardDefault = res.standardDefault;
    data.code.codeName = res.code.codeName;
    data.code.codeConfigList = res.code.codeConfigList;
    //详情
    res.code.codeConfigList.forEach((i: any) => {
      let t = {
        key: i.codeId,
        name: i.codeConfigName,
        description: i.codeConfigDescription,
        value: i.codeConfigValue,
      };
      dataDetails.push(t);
    });
    codeName.value = res.code.codeName + '码表' + '(' + res.code.codeId + ')' + '详情';
  });
  const data = reactive({
    standardCode: '',
    standardCnName: '',
    standardEnName: '',
    standardExplain: '',
    standardState: null,
    standardSourceOrganization: '',
    standardIsBlank: 0,
    standardType: null,
    standardValueMin: null,
    standardValueMax: null,
    standardDataAccuracy: null,
    standardDataLength: null,
    standardDefault: '',
    code: {
      codeName: '',
      codeConfigList: [],
    },
  });

  // 弹出框
  const visible1 = ref<boolean>(false);
  const showModal = () => {
    visible1.value = true;

    // 待修复
  };
  const handleOk = () => {
    console.log('11');
  };
  const codeName = ref('');
  interface DataType2 {
    key: number;
    value: string; //码值取值
    name: string; //码值名称
    description: string; //码值含义
  }

  const columnsDetails: TableColumnType<DataType2>[] = [
    {
      title: '码值取值',
      dataIndex: 'value',
    },
    {
      title: '码值名称',
      dataIndex: 'name',
    },
    {
      title: '码值含义',
      dataIndex: 'description',
    },
  ];
  const dataDetails: DataType2[] = [];
</script>
<style scoped lang="less">
  span {
    margin: 0px 5px;
  }

  p {
    display: flex;

    span:nth-child(1) {
      display: block;
      display: flex;
      width: 80px;
    }
  }
</style>
