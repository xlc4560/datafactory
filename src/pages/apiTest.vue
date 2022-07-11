<template>
  <a-drawer :visible="drawerVisible" class="custom-class" width="55%" title="接口测试" @close="onClose" @after-visible-change="afterVisibleChange">
    <div class="drawer">
      <div class="paramsDetails scroll_apiTest">
        <a-descriptions :column="1">
          <a-descriptions-item v-for="item in computedApiInfo.descriptions" :key="item.label" :label="item.label">{{ item.value }}</a-descriptions-item>
        </a-descriptions>
        <div>
          <a-card title="输入参数" :bordered="false">
            <a-table :columns="columns" :data-source="computedApiInfo.apiParameter" size="small" :pagination="false">
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'tags'">
                  <span>
                    <a-tag v-for="tag in record.tags" :key="tag" :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                      {{ tag.toUpperCase() }}
                    </a-tag>
                  </span>
                </template>
                <template v-else-if="column.key === 'action'">
                  <a-input v-model:value="testValue" placeholder="请输入" />
                </template>
              </template>
            </a-table>
          </a-card>
        </div>
        <div>
          <a-card v-if="computedApiInfo.apiRequestBody" title="请求body" :bordered="false">
            <a-textarea v-model:value="resBody" placeholder="请输入" :rows="15" />
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
      <a-button type="primary" @click="apiTestBtn">接口测试</a-button>
      <a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
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
  });
  // 接口测试抽屉
  const onClose = () => {
    emit('onClose', false);
  };
  // 接口所有数据在这里
  const apiInfo = ref<any>();
  const afterVisibleChange = async (bool: boolean) => {
    if (bool) {
      apiInfo.value = { ...(await request.GetApiDetails(props.apiId)) };
      console.log(apiInfo.value);
    }
    console.log(apiInfo.value);
  };
  const testValue = ref<string>('');
  const resBody = ref<string>('');
  const computedApiInfo = computed(() => {
    let apiParameter: {
      id?: number;
      parameterApiId?: number;
      parameterName: string;
      parameterType: number;
      parameterRequire: number; //是否必须 (0:非必填 1:必填)
      parameterPosition: number; //参数位置(0:query 1:header 3:body)
      parameterDescription?: string;
      parameterDefault: string;
    }[] = [];
    if (apiInfo.value?.apiParameter === null || apiInfo.value?.apiParameter === undefined || apiInfo.value?.apiParameter === '') {
      apiParameter = [];
    } else {
      apiParameter = [...apiInfo.value.apiParameter];
    }
    resBody.value = apiInfo.value?.apiRequestBody;
    return {
      descriptions: [
        {
          label: '接口名称',
          value: apiInfo.value?.apiName,
        },
        {
          label: 'Request URL',
          value: (apiInfo.value?.apiProtocol === 0 ? 'http://' : 'https://') + apiInfo.value?.apiIpPort + '/' + apiInfo.value?.apiPath,
        },
        {
          label: '请求方式',
          value: apiInfo.value?.apiMethod === 0 ? 'get' : apiInfo.value?.apiMethod === 1 ? 'post' : '无数据',
        },
      ],
      apiParameter,
      apiRequestBody: apiInfo.value?.apiRequestBody,
    };
  });
  const ApiDataRes = ref<any>();
  const apiTestBtn = async () => {
    computedApiInfo.value.apiParameter.forEach(item => {
      delete item.id;
      delete item.parameterApiId;
    });
    ApiDataRes.value = await request.ApiTest({
      apiPath: computedApiInfo.value.descriptions[1].value,
      apiName: apiInfo.value?.apiName,
      apiMethod: apiInfo.value?.apiMethod,
      apiRequestBody: resBody.value,
      apiParameter: computedApiInfo.value.apiParameter as {
        parameterName: string;
        parameterType: number;
        parameterRequire: number; //是否必须 (0:非必填 1:必填)
        parameterPosition: number; //参数位置(0:query 1:header 3:body)
        parameterDescription?: string;
        parameterDefault: string;
      }[],
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
  @import url('./scorll.less');

  .ant-drawer-body {
    padding: 0;
  }

  .drawer {
    display: flex;
    flex-direction: row;
    min-height: 80vh;
    // background: skyblue;
    .paramsDetails {
      padding: 0 20px 10px;
      flex: 0 0 30vw;
      min-height: 80vh;
      max-height: 80vh;
      // background-color: aquamarine;
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
        // min-height: 70vh;
        // max-height: 70vh;
        // background: rgb(40, 44, 52);
      }

      & .jsonViewerStyle {
        // background-color: black;
        // color: white;
        min-height: 75vh;
        max-height: 75vh;
      }
    }
  }
</style>
