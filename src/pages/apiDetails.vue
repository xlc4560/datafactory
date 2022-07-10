<template>
  <div class="apiDetails scroll_apiDetails">
    <h1 style="font-size: 20px; text-align: center"><strong>接口详情</strong></h1>
    <a-card :title="'接口名称:     ' + props.records.apiName" size="small">
      <a-descriptions>
        <a-descriptions-item v-for="item in apiDeatils.descriptions" :key="item.lable" :label="item.lable">{{ item.value }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <div class="tab">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="请求参数">
          <a-card size="small">
            <a-table :columns="columns" :data-source="apiDeatils.apiParameter" :pagination="false"> </a-table>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="2" tab="请求body" force-render>
          <a-card size="small" class="scroll_apiDetails">
            <JsonViewer class="scroll_apiDetails" :value="apiDeatils.apiRequestBody" :expand-depth="1" boxed copyable sort theme="light" />
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="apiReponseInstance">
      <a-card title="接口返回示例" size="small">
        <JsonViewer class="scroll_apiDetails" :value="apiDeatils.apiResponse" :expand-depth="1" boxed copyable sort theme="light" />
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { JsonViewer } from 'vue3-json-viewer';
  import 'vue3-json-viewer/dist/index.css';
  // 表格配置项
  const columns = [
    {
      title: '参数名称',
      dataIndex: 'parameterName',
      key: 'parameterName',
    },
    {
      title: '参数位置',
      dataIndex: 'parameterPosition',
      key: 'parameterPosition',
    },
    {
      title: '数据类型',
      dataIndex: 'parameterType',
      key: 'parameterType',
    },
    {
      title: '是否必填',
      key: 'parameterRequire',
      dataIndex: 'parameterRequire',
    },
    {
      title: '默认值',
      dataIndex: 'parameterDefault',
      key: 'parameterDefault',
    },
    {
      title: '说明',
      dataindex: 'parameterDescription',
      key: 'parameterDescription',
    },
  ];
  // 使用props接收来自父组件的数据
  const props = defineProps({
    records: {
      type: Object,
      default: () => ({ a: 1, b: 2 }),
    },
  });
  // 所有需要展示的数据
  const apiDeatils = computed(() => {
    let apiParameter: object[] = [];
    if (props.records.apiParameter === null || props.records.apiParameter === undefined || props.records.apiParameter === '') {
      apiParameter = [];
    } else {
      apiParameter = [...props.records.apiParameter];
    }
    return {
      descriptions: [
        {
          lable: '接口分类',
          value: props.records?.ApiType,
        },
        {
          lable: '请求协议',
          value: props.records?.apiProtocol === 0 ? 'http' : 'https',
        },
        {
          lable: '请求方式',
          value: props.records?.ApiType === 0 ? 'get' : 'post',
        },
        {
          lable: '支持格式',
          value: '暂无此数据',
        },
        {
          lable: 'IP端口',
          value: props.records?.apiIpPort,
        },
        {
          lable: 'Path',
          value: props.records?.apiPath,
        },
      ],
      apiParameter,
      apiRequestBody: props.records?.apiRequestBody,
      apiResponse: props.records?.apiResponse,
    };
  });

  const activeKey = ref<string>('1');
</script>

<style lang="less">
  // 控制滚动条样式
  .scroll_apiDetails {
    /* background-color: aqua; */
    overflow-x: hidden; /*禁止x轴滚动条*/
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.2);
    }
  }

  .apiDetails {
    display: flex;
    flex-direction: column;
    padding: 10px;
    height: 62vh;

    .tab,
    .apiReponseInstance {
      & .ant-card-body {
        padding: 0;
      }
    }

    & > * {
      margin: 10px 0;
    }

    & div .ant-tabs-nav {
      margin: 0;
    }
  }
</style>
