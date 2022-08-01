<template>
  <div>
    <p v-for="(i, index) in dataLi" :key="index">
      <span>{{ i.title }}</span>
      <span>{{ i.value }}</span>
    </p>
    <hr />
    <p v-for="(i, index) in dataInt" :key="index">
      <span>{{ i.title }}</span>
      <span>{{ i.value }}</span>
    </p>
    <hr />
    <div>
      <p>
        <span>数据类型:</span>
        <span>Enum</span>
      </p>
      <p>
        <span>枚举范围:</span>
        <a @click="showModal">待停用码表</a>
      </p>
      <p>
        <span>默认值:</span>
        <span>5</span>
      </p>
    </div>
    <hr />
    <p v-for="(i, index) in dataFloat" :key="index">
      <span>{{ i.title }}</span>
      <span>{{ i.value }}</span>
    </p>
    <hr />
    <p v-for="(i, index) in dataString" :key="index">
      <span>{{ i.title }}</span>
      <span>{{ i.value }}</span>
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
  import type { TableColumnType } from 'ant-design-vue';

  // 基本数据
  const dataLi = [
    { title: '标准编号:', value: 'BZ0035' },
    { title: '中文名称:', value: '邱兴亮' },
    { title: '英文名称:', value: 'comet' },
    { title: '标准说明:', value: 'qxllll' },
    { title: '来源机构:', value: '来源机构' },
    { title: '是否可为空:', value: '可以为空' },
  ];
  //类型为int
  const dataInt = [
    { title: '数据类型:', value: 'Int' },
    { title: '取值范围:', value: '取值范围最小值-1111111111,取值范围最大值1111111111' },
    { title: '默认值:', value: '5' },
  ];
  // 类型为Enum
  // const dataEnum = [
  //   { title: '数据类型:', value: 'Enum' },
  //   { title: '枚举范围:', value: '待停用码表' },
  //   { title: '默认值:', value: '5' },
  // ];
  // 类型为float
  const dataFloat = [
    { title: '数据类型:', value: 'Float' },
    { title: '数据精度:', value: '2' },
    { title: '取值范围:', value: '取值范围最小值-88.88,取值范围最大值88.88' },
    { title: '默认值:', value: '88.22' },
  ];
  // 类型为string
  const dataString = [
    { title: '数据长度:', value: 'string' },
    { title: '默认值:', value: '88.22' },
  ];
  // 弹出框
  const visible1 = ref<boolean>(false);
  const showModal = () => {
    visible1.value = true;

    // 待修复
  };
  const handleOk = () => {
    console.log('11');
  };
  const codeName = '111';
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
  const dataDetails: DataType2[] = [
    {
      key: 1,
      name: '企业类型',
      description: 'api1',
      value: '未发布',
    },
    {
      key: 2,
      name: '企业名称',
      description: 'api1',
      value: '已发布',
    },
    {
      key: 3,
      name: '企业名称',
      description: 'api1',
      value: '已发布',
    },
    {
      key: 4,
      name: '企业名称',
      description: 'api1',
      value: '已发布',
    },
    {
      key: 5,
      name: '企业名称',
      description: 'api1',
      value: '已发布',
    },
    {
      key: 6,
      name: '企业名称',
      description: 'api1',
      value: '已发布',
    },
  ];
</script>
<style scoped lang="less">
  span {
    margin: 0px 5px;
  }
</style>
