<template>
  <div class="apiDetails_YDHK scroll_apiDetails">
    <h1><strong>接口详情</strong></h1>
    <a-card :title="'接口名称:     ' + props.records.apiBasic.apiName" size="small">
      <a-descriptions>
        <a-descriptions-item v-for="item in apiDeatils.descriptions" :key="item.lable" :label="item.lable">{{ item.value }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <div class="tab">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="请求参数">
          <a-card size="small">
            <a-table size="small" :columns="apiDetails_columns" :data-source="apiDeatils.apiParameter" :pagination="false"> </a-table>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="2" tab="请求body" force-render>
          <a-card size="small" class="scroll_apiDetails">
            <JsonViewer class="scroll_apiDetails" :value="apiDeatils.apiRequestBody" :expand-depth="1" boxed copyable sort theme="light" />
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="3" tab="返回示例" force-render>
          <a-card size="small" class="scroll_apiDetails">
            <JsonViewer class="scroll_apiDetails" :value="apiDeatils.apiResponse" :expand-depth="1" boxed copyable sort theme="light" />
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </div>
    <!-- <div class="apiReponseInstance">
      <a-card title="接口返回示例" size="small">
        <JsonViewer class="scroll_apiDetails" :value="apiDeatils.apiResponse" :expand-depth="1" boxed copyable sort theme="light" />
      </a-card>
    </div> -->
  </div>
</template>

<script setup lang="ts">
  import type { apiParameter } from './types';
  import { apiDetails_columns } from './data';
  import { JsonViewer } from 'vue3-json-viewer';
  import { cloneDeep } from 'lodash-es';
  import { TypeEnum, PositionEnum, RequireEnum } from '@/enums/apiRegisterAndUpdateEnum';
  import 'vue3-json-viewer/dist/index.css';
  // tab标签页初始展示
  const activeKey = ref('1');
  // 使用props接收来自父组件的数据
  const props = defineProps({
    records: {
      type: Object,
      default: () => ({ a: 1, b: 2 }),
    },
  });

  // 所有需要展示的数据
  const apiDeatils = computed(() => {
    let apiParameter: apiParameter[] = [];
    if (props.records.apiParameter === null || props.records.apiParameter === undefined || props.records.apiParameter === '') {
      apiParameter = [];
    } else {
      apiParameter = cloneDeep(props.records.apiParameter);
      apiParameter = apiParameter.map(item => {
        item.parameterPosition = PositionEnum[item.parameterPosition as number];
        item.parameterRequire = RequireEnum[item.parameterRequire as number];
        item.parameterType = TypeEnum[item.parameterType as number];
        return item;
      });
    }
    return {
      descriptions: [
        {
          lable: '接口分类',
          value: props.records?.apiBasic.ApiType,
        },
        {
          lable: '请求协议',
          value: props.records?.apiBasic.apiProtocol === 0 ? 'http' : 'https',
        },
        {
          lable: '请求方式',
          value: props.records?.apiBasic.apiMethod === 0 ? 'get' : 'post',
        },
        {
          lable: '支持格式',
          value: '暂无此数据',
        },
        {
          lable: 'IP端口',
          value: props.records?.apiBasic.apiIpPort,
        },
        {
          lable: 'Path',
          value: props.records?.apiBasic.apiPath,
        },
      ],
      apiParameter,
      apiRequestBody: props.records?.apiBasic.apiRequestBody ? props.records?.apiBasic.apiRequestBody : {},
      apiResponse: props.records?.apiBasic.apiResponse ? props.records?.apiBasic.apiResponse : {},
    };
  });
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

  .apiDetails_YDHK {
    display: flex;
    flex-direction: column;
    padding: 10px;
    height: 50vh;

    h1 {
      font-size: 20px;
      text-align: center;
    }

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
