<!-- 新增资产表和编辑 -->
<template>
  <div>
    <a-form :model="assetadd" @finish="onFinish">
      <div class="base">
        <h3 :style="{ margin: '16px 0' }">数据资产表基础信息</h3>
        <a-form :model="assetadd" name="basic" :label-col="{ span: 2 }" :wrapper-col="{ span: 13 }" autocomplete="off">
          <a-form-item label="中文名称" name="assetNameCn" :rules="[{ required: true, message: '请输入中文名称!' }]">
            <a-input v-model:value="assetadd.assetNameCn" placeholder="请输入中文名称" />
          </a-form-item>

          <a-form-item label="英文名称" name="assetNameEn" :rules="[{ required: true, message: '请输入英文名称!' }]">
            <a-input v-model:value="assetadd.assetNameEn" placeholder="请输入英文名称" />
          </a-form-item>

          <a-form-item label="资产表描述" name="assetDesc">
            <a-textarea v-model:value="assetadd.assetDesc" placeholder="请输入资产表描述" :rows="4" />
          </a-form-item>

          <a-form-item name="assetNameCn" label="所属目录">
            <div class="scrollable-container">
              <a-form-item v-for="(i, index) in assetadd.categoryCodes" :key="index">
                <a-tree-select
                  v-model:value="i.value"
                  style="width: 90%"
                  show-search
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
                <a v-if="index != 0" style="margin-left: 3%" @click="removeUser(index)">删除</a>
              </a-form-item>
            </div>
          </a-form-item>
          <a-form-item label=" " :colon="false">
            <a-button type="dashed" block @click="addSight">
              <PlusOutlined />
              添加一行
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="configuration">
        <div class="title">
          <h3 :style="{ margin: '16px 0' }">字段配置</h3>
          <a-button type="primary" @click="addItem">添加字段</a-button>
        </div>
        <a-table :columns="columns" :data-source="assetadd.assetConfigs" bordered>
          <template #bodyCell="{ column, text, record, index }">
            <template v-if="column.dataIndex === 'assetConfigName' && assetadd.assetConfigs[index].editable">
              <a-form-item has-feedback :name="['assetConfigs', index, 'assetConfigName']" :rules="[{ required: true, message: '必填' }]">
                <a-input v-model:value="record.assetConfigName"></a-input>
              </a-form-item>
            </template>
            <template v-else-if="column.dataIndex === 'assetConfigNameEn' && assetadd.assetConfigs[index].editable">
              <a-form-item has-feedback :name="['assetConfigs', index, 'assetConfigNameEn']" :rules="[{ required: true, message: '必填' }]">
                <a-input v-model:value="record.assetConfigNameEn"></a-input>
              </a-form-item>
            </template>
            <template v-else-if="column.dataIndex === 'assetConfigDescription' && assetadd.assetConfigs[index].editable">
              <a-form-item has-feedback :name="['assetConfigs', index, 'assetConfigDescription']" :rules="[{ required: true, message: '必填' }]">
                <a-input v-model:value="record.assetConfigDescription"></a-input>
              </a-form-item>
            </template>
            <template v-else-if="column.dataIndex === 'standardCode' && assetadd.assetConfigs[index].editable">
              <a-form-item has-feedback :name="['assetConfigs', index, 'standardCode']" :rules="[{ required: true, message: '必填' }]">
                <!-- <a-input v-model:value="record.standardCode"></a-input> -->
                <a-select v-model:value="record.standardCode" :options="options"></a-select>
              </a-form-item>
            </template>
            <template v-else-if="column.dataIndex === 'operation'">
              <div class="editable-row-operations">
                <span v-if="assetadd.assetConfigs[index].editable">
                  <a @click="save(index)">保存</a>
                  <a-popconfirm title="确认取消?" @confirm="cancel(index)">
                    <a class="operation_sep">取消</a>
                  </a-popconfirm>
                </span>
                <span v-else>
                  <a @click="edit(index)">编辑</a>
                  <a-popconfirm title="确认删除?" @confirm="del(index)">
                    <a class="operation_sep">删除</a>
                  </a-popconfirm>
                </span>
              </div>
            </template>
            <template v-else>
              {{ text }}
            </template>
          </template>
        </a-table>
      </div>

      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form>
  </div>
</template>
<script setup lang="ts">
  import { PlusOutlined } from '@ant-design/icons-vue';

  interface AssetAdd {
    assetCode?: string; //数据资产编号
    assetDesc?: string; //数据资产表描述
    assetNameCn: string; //数据资产名称
    assetNameEn: string; //数据资产英文名称
    categoryCodes: { value: string }[]; //目录编号数组
    //数据资产配置
    assetConfigs: {
      assetConfigDescription?: string; //字段描述
      assetConfigName: string; //字段中文名称
      assetConfigNameEn: string; //字段英文名称
      standardCode: string; //数据标准目录编号
      editable: boolean; // 编辑状态
    }[];
  }
  const assetadd = reactive<AssetAdd>({
    assetDesc: '',
    assetNameCn: '',
    assetNameEn: '',
    categoryCodes: [{ value: '' }],
    assetConfigs: [
      // {
      //   assetConfigDescription: '1111',
      //   assetConfigName: '111',
      //   assetConfigNameEn: '111',
      //   standardCode: '1111',
      //   editable: false,
      // },
      // {
      //   assetConfigDescription: '222',
      //   assetConfigName: '222',
      //   assetConfigNameEn: '222',
      //   standardCode: '222',
      //   editable: false,
      // },
    ],
  });
  const options = [
    { label: '11', value: '11' },
    { label: '22', value: '22' },
    { label: '33', value: '33' },
  ];

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

  // 添加目录
  const addSight = () => {
    assetadd.categoryCodes.push({ value: '' });
  };
  // 删除目录
  const removeUser = (index: any) => {
    assetadd.categoryCodes.splice(index, 1);
  };

  // 添加一条字段配置
  const addItem = () => {
    let t = {
      assetConfigDescription: '',
      assetConfigName: '',
      assetConfigNameEn: '',
      standardCode: '',
      editable: true,
    };
    assetadd.assetConfigs.push(t);
  };
  // 表格
  const columns = [
    {
      title: '字段英文名称',
      dataIndex: 'assetConfigNameEn',
      width: '15%',
    },
    {
      title: '字段中文名称',
      dataIndex: 'assetConfigName',
      width: '15%',
    },
    {
      title: '字段说明',
      dataIndex: 'assetConfigDescription',
      width: '15%',
    },
    {
      title: '标准映射',
      dataIndex: 'standardCode',
      width: '40%',
    },
    {
      title: '操作',
      dataIndex: 'operation',
    },
  ];
  const edit = (index: number) => {
    assetadd.assetConfigs[index].editable = true;
  };

  const save = (index: number) => {
    assetadd.assetConfigs[index].editable = false;
  };
  const cancel = (index: number) => {
    assetadd.assetConfigs[index].editable = false;
  };
  const del = (index: number) => {
    assetadd.assetConfigs.splice(index, 1);
  };
  //提交
  const onFinish = () => {
    let temp: string[] = [];
    assetadd.categoryCodes.forEach(i => {
      temp.push(i.value);
    });
    assetadd.categoryCodes = temp as any;
    console.log(toRaw(assetadd));
  };
</script>
<style scoped lang="less">
  .base {
    // border-top: 1px solid #f0f0f0;
    padding: 10px;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 30px;
    // background-color: rgb(183, 58, 58);
  }

  .configuration {
    border: 1px solid #f3f3f3;
    padding: 10px 30px;
  }

  .scrollable-container {
    overflow-y: scroll;
    height: 100px;
  }

  .operation_sep {
    margin-left: 5%;
  }
</style>
