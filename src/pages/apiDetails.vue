<template>
  <div class="apiDetails scroll_apiDetails">
    <h1 style="font-size: 20px; text-align: center"><strong>接口详情</strong></h1>
    <a-card :title="'接口名称:     ' + props.records.apiName" size="small">
      <a-descriptions>
        <a-descriptions-item label="接口分类">Zhou Maomao</a-descriptions-item>
        <a-descriptions-item label="请求协议">1810000000</a-descriptions-item>
        <a-descriptions-item label="请求方式">Hangzhou, Zhejiang</a-descriptions-item>
        <a-descriptions-item label="支持格式">empty</a-descriptions-item>
        <a-descriptions-item label="IP端口"> District, Hangzhou, Zhejiang, China </a-descriptions-item>
        <a-descriptions-item label="Path"> /taskApi/taskradar </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <div class="tab">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="请求参数">
          <a-card size="small">
            <a-table :columns="columns" :data-source="data" :pagination="false"> </a-table>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="2" tab="请求body" force-render>
          <a-card size="small" class="scroll_apiDetails">
            <JsonViewer class="scroll_apiDetails" :value="[...columns, ...columns]" :expand-depth="1" boxed copyable sort theme="light" />
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="apiReponseInstance">
      <a-card title="接口返回示例" size="small">
        <JsonViewer class="scroll_apiDetails" :value="[...columns, ...columns]" :expand-depth="1" boxed copyable sort theme="light" />
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { JsonViewer } from 'vue3-json-viewer';
  import 'vue3-json-viewer/dist/index.css';
  const columns = [
    {
      title: '参数名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '参数位置',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '数据类型',
      dataIndex: 'classify',
      key: 'classify',
    },
    {
      title: '是否必填',
      key: 'isNecessary',
      dataIndex: 'isNecessary',
    },
    {
      title: '默认值',
      dataIndex: 'default',
      key: 'default',
    },
    {
      title: '说明',
      dataindex: 'descrip',
      key: 'descrip',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      address: 'New York No. 1 Lake Park',
      classify: '数据工厂',
      isNecessary: '是',
      default: '0',
      descrip: '暂无',
    },
    {
      key: '2',
      name: 'John Brown',
      address: 'New York No. 1 Lake Park',
      classify: '数据工厂',
      isNecessary: '是',
      default: '0',
      descrip: '暂无',
    },
    {
      key: '3',
      name: 'John Brown',
      address: 'New York No. 1 Lake Park',
      classify: '数据工厂',
      isNecessary: '是',
      default: '0',
      descrip: '暂无',
    },
  ];
  const props = defineProps({
    records: {
      type: Object,
      default: () => ({ a: 1, b: 2 }),
    },
  });
  // const { records } = toRefs(props);
  console.log(props.records);

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
    height: 600px;

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
