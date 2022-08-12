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
        :tree-data="newdata"
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
  const formdata = reactive({
    treeselect: [{ value: '' }],
  });
  let data = [
    {
      categoryCode: '8b8848adbb0946f5bc489429268c329b',
      parentId: '0',
      name: '判决文书',
      disabled: true,
      categorySchema: '接口分类',
      children: [
        {
          categoryCode: '508428bccd794002ab75be4e0831afcd',
          parentId: '8b8848adbb0946f5bc489429268c329b',
          name: '法院判决',
          categorySchema: '接口分类',
        },
        {
          categoryCode: '76ae1a9b606c42e39118326b0468293d',
          parentId: '8b8848adbb0946f5bc489429268c329b',
          name: '私人判决',
          categorySchema: '接口分类',
        },
        {
          categoryCode: '8c0e0298492b48dc850d8f8a7a74ae85',
          parentId: '8b8848adbb0946f5bc489429268c329b',
          name: '单位',
          categorySchema: '接口分类',
        },
      ],
    },
    {
      categoryCode: 'b458737de2ab40fcbb60c160b5391191',
      parentId: '0',
      name: '工商',
      categorySchema: '接口分类',
    },
    {
      categoryCode: '5ce2cd7a11fc420ab853119d6da529d8',
      parentId: '0',
      name: '工商司法',
      categorySchema: '接口分类',
      children: [
        {
          categoryCode: '6cd13a2520864cb990222738053354e9',
          parentId: '5ce2cd7a11fc420ab853119d6da529d8',
          name: '失信被执行人',
          categorySchema: '接口分类',
        },
        {
          categoryCode: 'f3f35867c273443fb037a4ca56519f38',
          parentId: '5ce2cd7a11fc420ab853119d6da529d8',
          name: '环保处罚',
          categorySchema: '接口分类',
        },
        {
          categoryCode: '67ea4af318674ae486ce14c4b335db2b',
          parentId: '5ce2cd7a11fc420ab853119d6da529d8',
          name: '财务信息',
          categorySchema: '接口分类',
          children: [
            {
              categoryCode: '8b4f286c1b864161aa4f10910f878b11',
              parentId: '67ea4af318674ae486ce14c4b335db2b',
              name: '集体',
              categorySchema: '接口分类',
            },
            {
              categoryCode: 'e81541df294b42c4848eea3a3fa648d7',
              parentId: '67ea4af318674ae486ce14c4b335db2b',
              name: '个人',
              categorySchema: '接口分类',
            },
          ],
        },
        {
          categoryCode: '57c33b682386463c92b51ee42a73cecb',
          parentId: '5ce2cd7a11fc420ab853119d6da529d8',
          name: '工商注册基本信息',
          categorySchema: '接口分类',
        },
      ],
    },
    {
      categoryCode: '3ea70483580b488e8813a2e8a57b80c4',
      parentId: '0',
      name: '贷前审批',
      icon: '',
      information: '',
      categorySchema: '接口分类',
    },
    {
      categoryCode: 'df7e7f6b679e42dc913100434d692185',
      parentId: '0',
      name: '资产负债',
      icon: '',
      information: '',
      categorySchema: '接口分类',
    },
    {
      categoryCode: 'fcc2d2da2e7f404ab99ccc467cb7ca5d',
      parentId: '0',
      name: '工商注册信息',
      icon: '',
      information: '',
      categorySchema: '接口分类',
    },
    {
      categoryCode: '689c3208fce7470e89bb30b97656c27a',
      parentId: '0',
      name: '工商股东信息',
      icon: '',
      information: '',
      categorySchema: '接口分类',
      children: [
        {
          categoryCode: '7a1d1241a8e24c22b59d3082fdecfdf4',
          parentId: '689c3208fce7470e89bb30b97656c27a',
          name: '统一社会信用代码',
          icon: '',
          information: '',
          categorySchema: '接口分类',
        },
      ],
    },
    {
      categoryCode: '1dd37300fc0244db95e06e6e03b728ac',
      parentId: '0',
      name: '汇法失信',
      icon: '',
      information: '',
      categorySchema: '接口分类',
    },
  ];

  //树形结构展开方法
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
  treeToArr(data, 0, resArr);

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
  let newdata = convert(resArr);

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
