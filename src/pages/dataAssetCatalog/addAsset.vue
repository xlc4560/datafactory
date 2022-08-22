<!-- 新增资产表和编辑 -->
<template>
  <div>
    <a-form :model="assetadd" v-bind="layout" @finish="onFinish">
      <div class="base">
        <h3 class="basictitle">数据资产表基础信息</h3>
        <a-form-item label="中文名称" name="assetNameCn" :rules="rules.assetNameCn">
          <a-input v-model:value="assetadd.assetNameCn" placeholder="请输入中文名称" />
        </a-form-item>
        <a-form-item label="英文名称" name="assetNameEn" :rules="rules.assetNameEn">
          <a-input v-model:value="assetadd.assetNameEn" placeholder="请输入英文名称" />
        </a-form-item>
        <a-form-item label="资产表描述" name="assetDesc">
          <a-textarea v-model:value="assetadd.assetDesc" placeholder="请输入资产表描述" :rows="4" />
        </a-form-item>
        <a-form-item label="所属目录" name="categoryCodes" :rules="rules.categoryCodes">
          <div class="scrollable-container">
            <a-form-item v-for="(i, index) in assetadd.categoryCodes" :key="index">
              <a-tree-select
                v-model:value="i.value"
                style="width: 90%"
                show-search
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
      </div>
      <div class="configuration">
        <div class="title">
          <h3 :style="{ margin: '16px 0' }">字段配置</h3>
          <a-button type="primary" @click="addItem">添加字段</a-button>
        </div>
        <a-form :model="assetadd">
          <a-table :columns="columns" :data-source="assetadd.assetConfigs" bordered>
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'assetConfigName' && assetadd.assetConfigs[index].editable">
                <a-form-item has-feedback :name="['assetConfigs', index, 'assetConfigName']" :rules="[{ required: true, message: '必填' }]">
                  <a-input v-model:value="record.assetConfigName" placeholder="请输入"></a-input>
                </a-form-item>
              </template>
              <template v-else-if="column.dataIndex === 'assetConfigNameEn' && assetadd.assetConfigs[index].editable">
                <a-form-item has-feedback :name="['assetConfigs', index, 'assetConfigNameEn']" :rules="[{ required: true, message: '必填' }]">
                  <a-input v-model:value="record.assetConfigNameEn" placeholder="请输入"></a-input>
                </a-form-item>
              </template>
              <template v-else-if="column.dataIndex === 'assetConfigDescription' && assetadd.assetConfigs[index].editable">
                <a-form-item has-feedback :name="['assetConfigs', index, 'assetConfigDescription']" :rules="[{ required: true, message: '必填' }]">
                  <a-input v-model:value="record.assetConfigDescription" placeholder="请输入"></a-input>
                </a-form-item>
              </template>
              <template v-else-if="column.dataIndex === 'standardCode' && assetadd.assetConfigs[index].editable">
                <a-form-item has-feedback :name="['assetConfigs', index, 'standardCode']" :rules="[{ required: true, message: '必填' }]">
                  <a-select v-model:value="record.standardCode" :options="options" placeholder="请输入标准编号、标准中英文名称进行检索" allow-clear></a-select>
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
        </a-form>
      </div>
      <a-divider />
      <div class="buttons">
        <a-button class="buttonclose" @click="closeDrawer">关闭</a-button>
        <a-button type="primary" html-type="submit">确定</a-button>
      </div>
    </a-form>
  </div>
</template>
<script setup lang="ts">
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { standardAssetConfigAdapt, categoryListTree, assetAdd, asseUpdate, assetGetDetail } from '@/api/dataAssetCatalog/index';
  import { message } from 'ant-design-vue';
  //表单样式
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 15 },
  };
  //验证
  const rules = reactive({
    assetNameCn: [
      { required: true, message: '请输入中文名称!' },
      { pattern: /^[a-zA-Z\u4e00-\u9fa5]+$/, message: '只支持中文及英文大小写' },
    ],
    assetNameEn: [
      { required: true, message: '请输入英文名称!' },
      { pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/, message: '英文大小写数字及下划线，且只能英文开头' },
    ],
    categoryCodes: [{ required: true, message: '请选择目录!' }],
  });

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
      standardCode: string | undefined; //数据标准目录编号
      editable?: boolean; // 编辑状态
    }[];
  }

  //初始化数据
  const assetadd = reactive<AssetAdd>({
    assetDesc: '',
    assetNameCn: '',
    assetNameEn: '',
    categoryCodes: [{ value: '' }],
    assetConfigs: [],
  });

  //声明选择类型
  const options: { label: string; value: string }[] = [];

  // 定义树形结构
  let treedata = ref([]);
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
  function treeToArr1(data: any, pid: any = null, res: any) {
    data.forEach((item: any) => {
      res.push({ pid: item.pid, id: item.id, name: item.name });
      if (item.children && item.children.length !== 0) {
        treeToArr1(item.children, item.id, res);
      }
    });
    return res;
  }
  //判断是否有孩子节点
  function ischildren(arr: any) {
    for (let i = 0; i < arr.length; i++) {
      let t = 0;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i].id == arr[j].pid) {
          t++;
        } else {
        }
      }
      if (t == 0) {
        // console.log('无孩子', resArr[i]);
      } else {
        // console.log('有孩子', resArr[i]);
        arr[i].disabled = true;
      }
    }
  }
  //数组转回树形结构
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
  //请求树形结构数据
  categoryListTree('数据资产目录分类').then(res => {
    treedata.value = res;
    //暂存展开数组
    let resArr: any = [];
    //调用展开树形结构方法
    treeToArr(treedata.value, 0, resArr);
    //调用判断是否有孩子节点并禁用方法
    ischildren(resArr);
    //调用并赋值转换回树形结构方法
    treedata.value = convert(resArr) as any;
    let newcategory = reactive([{ value: '' }]);
    //编辑页面获取数据
    if (prop.codeid != 'new') {
      assetGetDetail(prop.codeid).then(res => {
        // 基本信息
        assetadd.assetCode = res.asset.assetCode;
        assetadd.assetDesc = res.asset.assetDesc;
        assetadd.assetNameCn = res.asset.assetNameCn;
        assetadd.assetNameEn = res.asset.assetNameEn;
        assetadd.categoryCodes.splice(0, 1);
        // 所属目录
        res.categoryName.forEach((i: any) => {
          let temp = {
            value: i,
          };
          newcategory.push(temp);
        });
        // 字段配置
        res.assetConfigStandardMap.forEach((i: any) => {
          let temp = {
            assetConfigDescription: i.assetConfigDescription,
            assetConfigName: i.assetConfigName,
            assetConfigNameEn: i.assetConfigNameEn,
            standardCode: i.standardCode,
          };
          assetadd.assetConfigs.push(temp);
        });
        // 将获取的目录数据id赋给选择框
        resArr.forEach((i: any) => {
          newcategory.forEach((e: any) => {
            if (i.name == e.value) {
              console.log(i.id);
              let temp = {
                value: i.id,
              };
              assetadd.categoryCodes.push(temp);
            }
          });
        });
      });
    }
    // 监听目录数组变化
    watch(
      () => assetadd.categoryCodes,
      newV => {
        let selected1 = JSON.stringify(newV);
        let selected2 = JSON.parse(selected1);
        // 树形结构展开方法并暂存;
        let resArr1 = ref([]);
        treeToArr1(treedata.value, 0, resArr1.value);
        // 调用判断是否具有孩子节点方法
        ischildren(resArr1.value);
        // 选中禁用
        resArr1.value.forEach((i: any) => {
          selected2.forEach((e: any) => {
            if (e.value == i.id) {
              i.disabled = true;
            }
          });
        });
        //调用转换回树形结构并赋值
        treedata.value = convert(resArr1.value) as any;
      },
      {
        deep: true,
      },
    );
  });
  //请求标准映射数据
  standardAssetConfigAdapt().then(res => {
    res.forEach((i: any) => {
      let temp = {
        label: i.standardCode + ' - ' + i.standardCnName + ' - ' + i.standardEnName,
        value: i.standardCode,
      };
      options.push(temp);
    });
  });

  //接收组件传值
  const prop = defineProps({
    codeid: {
      type: String,
      default: '',
    },
    changevisible: {
      type: Boolean,
      default: false,
    },
  });
  const props = toRefs(prop);
  const changevisible = ref<boolean>();
  changevisible.value = props.changevisible.value;
  const emit1 = defineEmits(['changevisible', 'reset']);
  const closeDrawer = () => {
    changevisible.value = false;
    emit1('changevisible', changevisible.value);
  };
  function reset() {
    emit1('reset');
  }

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
      standardCode: undefined,
      editable: true,
    };
    if (assetadd.assetConfigs.length == 0) {
      assetadd.assetConfigs.push(t);
    } else if (assetadd.assetConfigs[assetadd.assetConfigs.length - 1].editable == true && assetadd.assetConfigs.length >= 1) {
      message.warn('只能同时编辑一行');
    } else {
      assetadd.assetConfigs.push(t);
    }
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
    if (prop.codeid == 'new') {
      assetAdd(toRaw(assetadd)).then(res => {
        console.log(res);
        closeDrawer();
        reset();
      });
    } else {
      asseUpdate(toRaw(assetadd)).then(res => {
        console.log(res);
        closeDrawer();
        reset();
      });
    }
  };
</script>
<style scoped lang="less">
  .base {
    // border-top: 1px solid #f0f0f0;
    padding: 10px;
  }

  .basictitle {
    margin: '16px 0';
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

  .buttons {
    margin-right: 3%;
    text-align: right;

    .buttonclose {
      margin-right: 2%;
    }
  }
</style>
