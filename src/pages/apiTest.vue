<template>
  <a-drawer :visible="drawerVisible" class="custom-class" width="55%" title="接口测试" @close="onClose" @after-visible-change="afterVisibleChange">
    <div class="drawer">
      <div class="paramsDetails scroll_apiTest">
        <a-descriptions :column="1">
          <a-descriptions-item v-for="item in computedApiInfo.descriptions" :key="item.label" :label="item.label">{{ item.value }}</a-descriptions-item>
        </a-descriptions>
        <div>
          <a-card title="输入参数" :bordered="false">
            <a-table :columns="columns" :data-source="computedApiInfo.apiParameter.value" size="small" :pagination="false">
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'parameterPosition'">
                  {{ record.parameterPosition === 0 ? 'query' : 'header' }}
                </template>
                <template v-else-if="column.key === 'parameterRequire'">
                  {{ record.parameterType === 0 ? 'string' : record.parameterType === 1 ? 'integer' : 'number' }}
                </template>
                <template v-else-if="column.key === 'parameterType'">
                  {{ record.parameterRequire === 0 ? '否' : '是' }}
                </template>
                <template v-else-if="column.key === 'action'">
                  <a-input v-model:value="record.parameterDefault" placeholder="请输入" />
                </template>
              </template>
            </a-table>
          </a-card>
        </div>
        <div>
          <a-card title="请求body" :bordered="false">
            <a-textarea v-model:value="computedApiInfo.apiRequestBody.value" placeholder="请输入" :rows="15" />
          </a-card>
        </div>
      </div>
      <div class="responseResult">
        <a-card title="返回结果(JSON)" :bordered="false">
          <JsonViewer class="jsonViewerStyle scroll_apiTest" :value="ApiDataRes" :expand-depth="3" copyable sort theme="dark" @on-key-click="keyClick" />
        </a-card>
      </div>
    </div>
    <template #footer>
      <a-button class="btn" type="primary" @click="apiTestBtn">接口测试</a-button>
      <a-button class="btn" @click="onClose">关闭</a-button>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
  import type { apiParameter } from './types';
  import * as _ from 'lodash-es';
  import { JsonViewer } from 'vue3-json-viewer';
  import * as request from '@/api/test';
  import 'vue3-json-viewer/dist/index.css';
  // 使用defineEmits创建名称，接受一个数组
  const emit = defineEmits(['onClose']);
  const props = defineProps({
    drawerVisible: {
      type: Boolean,
      default: false,
    },
    apiId: {
      type: String,
      default: '',
    },
    apiBasic: {
      type: Object,
      default: () => {
        return {
          apiParameter: [],
        };
      },
    },
  });
  // 用于接收接口测试响应数据
  const ApiDataRes = ref<any>();
  // 接口测试抽屉
  const onClose = () => {
    emit('onClose', false);
  };
  // 接口所有数据在这里
  const apiInfo = ref<any>({
    apiParameter: [],
  });
  const afterVisibleChange = async (bool: boolean) => {
    if (bool) {
      if (props.apiId === '' || props.apiId === null || props.apiId === undefined) {
        apiInfo.value = props.apiBasic;
      } else {
        apiInfo.value = { ...(await request.GetApiDetails(props.apiId)) };
      }
    } else {
      ApiDataRes.value = {};
    }
  };

  const computedApiInfo = computed(() => {
    const apiParameter = ref<apiParameter[]>([]);
    if (apiInfo.value?.apiParameter === null || apiInfo.value?.apiParameter === undefined || apiInfo.value?.apiParameter === '') {
      apiParameter.value = [];
    } else {
      // 深克隆数据防止数据污染问题
      apiParameter.value = _.cloneDeep(apiInfo.value.apiParameter);
    }
    return {
      descriptions: [
        {
          label: '接口名称',
          value: apiInfo.value?.apiName,
        },
        {
          label: 'Request URL',
          value: (apiInfo.value?.apiProtocol === 0 ? 'http://' : 'https://') + apiInfo.value?.apiIpPort + apiInfo.value?.apiPath,
        },
        {
          label: '请求方式',
          value: apiInfo.value?.apiMethod === 0 ? 'get' : apiInfo.value?.apiMethod === 1 ? 'post' : '无数据',
        },
      ],
      apiParameter,
      apiRequestBody: ref<string>(apiInfo.value?.apiRequestBody),
    };
  });

  // 点击测试按钮回调
  const apiTestBtn = async () => {
    computedApiInfo.value.apiParameter.value.forEach(item => {
      delete item.id;
      delete item.parameterApiId;
    });
    ApiDataRes.value = await request.ApiTest({
      apiPath: computedApiInfo.value.descriptions[1].value,
      apiName: apiInfo.value?.apiName,
      apiMethod: apiInfo.value?.apiMethod,
      apiRequestBody: computedApiInfo.value.apiRequestBody.value,
      apiParameter: computedApiInfo.value.apiParameter.value,
    });

    ApiDataRes.value = JSON.parse(ApiDataRes.value);
  };
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
      title: '测试值',
      key: 'action',
    },
  ];

  const keyClick = (keyName: string): void => {
    console.log(keyName, '被点击了');
  };
</script>

<style lang="less">
  // 滚动条样式
  @import url('./scorll.less');

  .ant-drawer-content-wrapper {
    .ant-drawer-content {
      .ant-drawer-body {
        padding: 0;
      }

      .ant-drawer-footer {
        .btn {
          margin: 0 1vw 0 0;
        }
      }
    }
  }

  .drawer {
    display: flex;
    flex-direction: row;
    min-height: 80vh;

    .paramsDetails {
      padding: 0 20px 10px;
      flex: 0 0 30vw;
      min-height: 80vh;
      max-height: 80vh;

      & > div {
        margin: 10px 0 0 0;

        .ant-card-body {
          padding: 0;
        }
      }
    }

    .responseResult {
      flex: 1;

      .ant-card-body {
        padding: 0;
      }

      & .jsonViewerStyle {
        min-height: 75vh;
        max-height: 75vh;
      }
    }
  }
</style>
