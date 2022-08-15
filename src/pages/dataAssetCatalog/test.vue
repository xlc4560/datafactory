<template>
  <a-form :model="formdata">
    <a-form-item v-for="(i, index) in formdata.treeselect" :key="index">
      <a-tree-select
        v-model:value="i.value"
        show-search
        style="width: 90%"
        placeholder="Please select"
        allow-clear
        tree-default-expand-all
        :tree-data="treedata"
        :field-names="{
          children: 'children',
          label: 'name',
          value: 'id',
        }"
      >
      </a-tree-select>
      <a v-if="index != 0" style="margin-left: 2%" @click="removeUser(index)">删除</a>
    </a-form-item>
    <a-button type="primary" @click="addnew">增加一行</a-button>
    <a-button type="primary" style="margin-left: 5%" @click="submit1">提交</a-button>
  </a-form>
</template>
<script lang="ts" setup>
  import { categoryListTree } from '@/api/dataAssetCatalog/index';

  const formdata = reactive({
    treeselect: [{ value: '' }],
  });
  //请求树形结构数据
  let treedata = ref([]);

  categoryListTree('数据资产目录分类').then(res => {
    treedata.value = res;
    // 树形结构展开方法;
    function treeToArr(data: any, pid: any = null, res: any) {
      data.forEach((item: any) => {
        res.push({ pid: item.parentId, id: item.categoryCode, name: item.name });
        if (item.children && item.children.length !== 0) {
          treeToArr(item.children, item.id, res);
        }
      });
      return res;
    }
    //暂存展开数组
    let resArr: any = [];
    //调用展开树形结构方法
    treeToArr(treedata.value, 0, resArr);
    //判断是否有孩子节点
    for (let i = 0; i < resArr.length; i++) {
      let t = 0;
      for (let j = i + 1; j < resArr.length; j++) {
        if (resArr[i].id == resArr[j].pid) {
          t++;
        } else {
        }
      }
      if (t == 0) {
        // console.log('无孩子', resArr[i]);
      } else {
        // console.log('有孩子', resArr[i]);
        resArr[i].disabled = true;
      }
    }

    //数组转换树形结构
    function convert(list: any) {
      const res = [];
      const map = list.reduce((res: any, v: any) => ((res[v.id] = v), (v.children = []), res), {});
      for (const item of list) {
        if (item.pid === '0') {
          res.push(item);
          continue;
        }
        if (item.pid in map) {
          const parent = map[item.pid];
          parent.children = parent.children || [];
          parent.children.push(item);
        }
      }
      return res;
    }
    //调用并赋值转换回树形结构方法
    treedata.value = convert(resArr) as any;

    console.log(treedata.value);
  });

  const addnew = () => {
    formdata.treeselect.push({ value: '' });
  };
  // 删除目录
  const removeUser = (index: any) => {
    formdata.treeselect.splice(index, 1);
  };
  const submit1 = () => {
    let arr: any = [];
    formdata.treeselect.forEach(i => {
      arr.push(i.value);
    });
    formdata.treeselect = arr;
    console.log(formdata.treeselect);
  };
</script>
<style lang="less"></style>
