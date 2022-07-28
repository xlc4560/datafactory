<template>
  <div class="myTabel_yzDQ">
    <a-table :columns="tableColumns" size="small" :data-source="data" :pagination="false">
      <template #title>
        <div class="paramTitle">
          <span class="titleStyle">{{ headerTitle }}</span>
          <a-row justify="end" :gutter="16">
            <a-col v-if="isRenderJsonImportBtn">
              <a-button>JSON数据导入</a-button>
            </a-col>
            <a-col>
              <a-button type="primary" @click="createNewParameter">新增参数</a-button>
            </a-col>
          </a-row>
        </div>
      </template>
      <template #headerCell="{ title }">
        <template v-if="['参数名称', '参数位置', '数据类型', '是否必填'].includes(title)">
          <span style=" margin-right: 5px;color: red">*</span>
          <span>{{ title }}</span>
        </template>
      </template>

      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a>{{ text }}</a>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
  import _ from 'lodash-es';
  const props = defineProps({
    headerTitle: {
      type: String,
      default: '0',
    },
    isRenderJsonImportBtn: {
      type: Boolean,
      default: false,
    },
    tableColumns: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Object,
      default: () => ({}),
    },
  });
  //   新增参数
  const data = ref<typeof props.tableData[]>([]);
  const createNewParameter = () => {
    data.value.push(_.cloneDeep(props.tableData));
  };
</script>

<style scoped lang="less">
  .myTabel_yzDQ {
    margin: 10px 0;
    padding: 20px;
    width: 100%;
    background-color: rgb(255, 255, 255);

    .paramTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .titleStyle {
        font-size: 16px;
        color: #666;
      }
    }
  }
</style>
