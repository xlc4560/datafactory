<template>
  <div class="apiDetails scroll">
    <h1 style="font-size: 20px; text-align: center"><strong>接口详情</strong></h1>
    <a-card title="基本信息" size="small">
      <a-descriptions>
        <a-descriptions-item label="UserName">Zhou Maomao</a-descriptions-item>
        <a-descriptions-item label="Telephone">1810000000</a-descriptions-item>
        <a-descriptions-item label="Live">Hangzhou, Zhejiang</a-descriptions-item>
        <a-descriptions-item label="Remark">empty</a-descriptions-item>
        <a-descriptions-item label="Address"> No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <div class="tab">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="请求参数">
          <a-card size="small">
            <a-table :columns="columns" :data-source="data" :pagination="false">
              <template #headerCell="{ column }">
                <template v-if="column.key === 'name'">
                  <span>
                    <smile-outlined />
                    Name
                  </span>
                </template>
              </template>

              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                  <a>
                    {{ record.name }}
                  </a>
                </template>
                <template v-else-if="column.key === 'tags'">
                  <span>
                    <a-tag v-for="tag in record.tags" :key="tag" :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                      {{ tag.toUpperCase() }}
                    </a-tag>
                  </span>
                </template>
                <template v-else-if="column.key === 'action'">
                  <span>
                    <a>Invite 一 {{ record.name }}</a>
                    <a-divider type="vertical" />
                    <a>Delete</a>
                    <a-divider type="vertical" />
                    <a class="ant-dropdown-link">
                      More actions
                      <down-outlined />
                    </a>
                  </span>
                </template>
              </template>
            </a-table>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="2" tab="请求body" force-render>
          <a-card size="small">
            <pre> {{ JSON.stringify(data, null, 4) }}</pre>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </div>

    <a-card title="接口返回示例" size="small">
      <!-- style="background-color: black; color: aliceblue" -->
      <pre> {{ JSON.stringify(columns, null, 4) }}</pre>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
  const columns = [
    {
      name: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
    },
    {
      title: 'Action',
      key: 'action',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  //   const props = defineProps({
  //     records: {
  //       type: Object,
  //       default: () => ({ a: 1, b: 2 }),
  //     },
  //   });
  //   const { records } = toRefs(props);
  const activeKey = ref<string>('1');
</script>

<style lang="less">
  // 控制滚动条样式
  .scroll {
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

    & > * {
      margin: 10px 0;
    }

    & div .ant-tabs-nav {
      margin: 0;
    }
  }

  .ant-card-body {
    padding: 10px;
  }
</style>
