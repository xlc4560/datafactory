<!-- 新增资产表和编辑 -->
<template>
  <div>
    <div class="base">
      <h3 :style="{ margin: '16px 0' }">数据资产表基础信息</h3>
      <a-form :model="assetadd" name="basic" :label-col="{ span: 2 }" :wrapper-col="{ span: 8 }" autocomplete="off">
        <a-form-item label="中文名称" name="assetNameCn" :rules="[{ required: true, message: '请输入中文名称!' }]">
          <a-input v-model:value="assetadd.assetNameCn" placeholder="请输入中文名称" />
        </a-form-item>

        <a-form-item label="英文名称" name="assetNameCn" :rules="[{ required: true, message: '请输入英文名称!' }]">
          <a-input v-model:value="assetadd.assetNameCn" placeholder="请输入英文名称" />
        </a-form-item>

        <a-form-item label="资产表描述" name="assetNameCn" :rules="[]">
          <a-textarea v-model:value="assetadd.assetNameCn" placeholder="请输入资产表描述" :rows="4" />
        </a-form-item>

        <a-form-item name="assetNameCn" label="所属目录">
          <div class="scrollable-container">
            <a-space v-for="(user, index) in assetadd.categoryCodes" :key="index">
              <!-- <a-input v-model:value="assetadd.categoryCodes[index]" placeholder="请选择所属目录" /> -->
              <a-select
                v-model:value="assetadd.categoryCodes[index]"
                mode="combobox"
                style="width: 350px"
                placeholder="请选择所属目录"
                :options="[{ value: 0, label: 'Int' }]"
                @change="handleChange"
              ></a-select>

              <MinusCircleOutlined v-if="index != 0" @click="removeUser(index)" />
            </a-space>
          </div>
        </a-form-item>

        <a-form-item label=" ">
          <a-button type="dashed" block @click="addSight">
            <PlusOutlined />
            Add sights
          </a-button>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit" @finish="onFinish">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="configuration">
      <div class="title">
        <h3 :style="{ margin: '16px 0' }">字段配置</h3>
        <a-button type="primary" @click="addItem">添加字段</a-button>
      </div>
      <a-table :columns="columns" :data-source="dataSource" bordered>
        <template #bodyCell="{ column, text, record }">
          <template v-if="['name', 'age', 'address'].includes(column.dataIndex)">
            <div>
              <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0" />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <span v-if="editableData[record.key]">
                <a-typography-link style="margin-right: 10px" @click="save(record.key)">保存</a-typography-link>
                <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
                  <a>取消</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a style="margin-right: 10px" @click="edit(record.key)">编辑</a>
                <a @click="edit(record.key)">删除</a>
              </span>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { cloneDeep } from 'lodash-es';
  // import { defineComponent, reactive, ref } from 'vue';
  import type { UnwrapRef } from 'vue';
  // import { cloneDeep } from 'lodash-es';
  // const issave = ref(false);
  interface AssetAdd {
    assetDesc?: string; //数据资产表描述
    assetNameCn: string; //数据资产名称
    assetNameEn: string; //数据资产英文名称
    categoryCodes: string[]; //目录编号数组
    //数据资产配置
    assetConfigs: [
      {
        assetConfigDescription?: string; //字段描述
        assetConfigName: string; //字段中文名称
        assetConfigNameEn: string; //字段英文名称
        standardCode: string; //数据标准目录编号
      },
    ];
  }
  const assetadd = reactive<AssetAdd>({
    assetDesc: '',
    assetNameCn: '',
    assetNameEn: '',
    categoryCodes: [''],
    assetConfigs: [
      {
        assetConfigDescription: '',
        assetConfigName: '',
        assetConfigNameEn: '',
        standardCode: '',
      },
    ],
  });

  // 添加
  const addSight = () => {
    assetadd.categoryCodes.push('');
  };
  // 删除
  const removeUser = (index: any) => {
    assetadd.categoryCodes.splice(index, 1);
  };
  // 选择
  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  // 添加一条字段配置
  const addItem = () => {
    assetadd.assetConfigs.push({
      assetConfigDescription: '',
      assetConfigName: '',
      assetConfigNameEn: '',
      standardCode: '',
    });
  };
  // 提交
  const onFinish = (values: any) => {
    console.log('Success:', values);
    console.log(assetadd);
  };
  // 表格
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
    },
  ];
  interface DataItem {
    key: string;
    name: string;
    age: number;
    address: string;
  }
  const data: DataItem[] = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
  const dataSource = ref(data);
  const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

  const edit = (key: string) => {
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
  };
  const save = (key: string) => {
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    delete editableData[key];
  };
  const cancel = (key: string) => {
    delete editableData[key];
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
    padding: 10px 50px;
  }

  .scrollable-container {
    overflow-y: scroll;
    height: 100px;
  }
</style>
