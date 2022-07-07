<template>
  <a-drawer v-model:visible="drawerVisible" class="custom-class" width="55%" title="接口测试" @after-visible-change="afterVisibleChange">
    <div class="drawer">
      <div class="paramsDetails">
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
        <a-card title="返回结果(JSON)" :bordered="false"> </a-card>
      </div>
    </div>
    <template #footer>
      <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
      <a-button type="primary" @click="onClose">Submit</a-button>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
  const props = defineProps({
    drawerVisible: {
      type: Boolean,
      default: false,
    },
  });

  // 接口测试抽屉
  const drawerVisible = ref<boolean>(props.drawerVisible);
  const afterVisibleChange = (bool: boolean) => {
    console.log('visible', bool);
  };
  const onClose = () => {
    drawerVisible.value = false;
  };
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
      dataIndex: 'dataType',
      key: 'dataType',
    },
    {
      title: '是否必填',
      key: 'tags',
      dataIndex: 'tags',
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
</script>

<style lang="less">
  .drawer {
    display: flex;
    flex-direction: row;

    .paramsDetails {
      padding: 0 20px 10px;
      width: 55%;
      //   background-color: aquamarine;
      & > div {
        margin: 10px 0 0 0;
      }
    }
  }

  .ant-card-body {
    padding: 5px 0;
  }
</style>
