<template>
  <div>
    <p v-for="(i, index) in dataLi" :key="index">
      <span>{{ i.title }}</span>
      <span>{{ i.value }}</span>
    </p>
    <p v-for="(i, index) in dataInt" :key="index">
      <span>{{ i.title }}</span>
      <span>{{ i.value }}</span>
    </p>
  </div>
</template>
<script lang="ts" setup>
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
  // 类型为float
  // const dataFloat = [
  //   { title: '数据类型:', value: 'Float' },
  //   { title: '数据精度:', value: '2' },
  //   { title: '取值范围:', value: '取值范围最小值-88.88,取值范围最大值88.88' },
  //   { title: '默认值:', value: '88.22' },
  // ];
</script>
<style scoped lang="less">
  span {
    margin: 0px 5px;
  }
</style>
