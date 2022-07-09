<template>
  <a-drawer :visible="drawerVisible" class="custom-class" width="55%" title="接口测试" @close="onClose">
    <div class="drawer">
      <div class="paramsDetails scroll_apiTest">
        <a-descriptions :column="1">
          <a-descriptions-item label="接口名称">Zhou Maomao</a-descriptions-item>
          <a-descriptions-item label="Request URL"> http://10.255.68.192:8080/taskApi/runppt</a-descriptions-item>
          <a-descriptions-item label="请求方式">Hangzhou, Zhejiang</a-descriptions-item>
        </a-descriptions>
        <div>
          <a-card title="输入参数" :bordered="false">
            <a-table :columns="columns" :data-source="data" size="small" :pagination="false">
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'tags'">
                  <span>
                    <a-tag v-for="tag in record.tags" :key="tag" :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                      {{ tag.toUpperCase() }}
                    </a-tag>
                  </span>
                </template>
                <template v-else-if="column.key === 'action'">
                  <a-input placeholder="请输入" />
                </template>
              </template>
            </a-table>
          </a-card>
        </div>
        <div>
          <a-card title="请求body" :bordered="false">
            <a-textarea placeholder="请输入" :rows="15" />
          </a-card>
        </div>
      </div>
      <div class="responseResult">
        <a-card title="返回结果(JSON)" :bordered="false">
          <JsonViewer class="jsonViewerStyle scroll_apiTest" :value="[...columns, ...columns]" :expand-depth="3" copyable sort theme="dark" @on-key-click="keyClick" />
        </a-card>
      </div>
    </div>
    <template #footer>
      <a-button type="primary" @click="onClose">接口测试</a-button>
      <a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
  import { JsonViewer } from 'vue3-json-viewer';
  import 'vue3-json-viewer/dist/index.css';
  import { defineEmits } from 'vue';
  // 使用defineEmits创建名称，接受一个数组
  const emit = defineEmits(['onClose']);
  const props = defineProps({
    drawerVisible: {
      type: Boolean,
      default: false,
    },
  });

  // 接口测试抽屉
  const onClose = () => {
    // drawerVisible.value = false;
    emit('onClose', false);
  };
  const columns = [
    {
      title: '参数名称',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: '参数位置',
      dataIndex: 'address',
      key: 'address',
      width: '20%',
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
      key: 'dataType',
      width: '20%',
    },
    {
      title: '是否必填',
      key: 'tags',
      dataIndex: 'tags',
      width: '20%',
    },
    {
      title: '测试值',
      key: 'action',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'name',
      address: 'query',
      dataType: 'string',
      tags: '是',
    },
    {
      key: '2',
      name: 'name',
      address: 'query',
      dataType: 'string',
      tags: '否',
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
