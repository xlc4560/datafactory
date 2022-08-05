<template>
  <div class="myTabel_yzDQ">
    <a-form ref="formRef" size="small" :model="dataFlat" name="basic">
      <a-table :columns="tableColumns" size="small" :data-source="data" :pagination="false" :row-key="rowKey" :default-expand-all-rows="true">
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
            <span style="margin-right: 5px; color: red">*</span>
            <span>{{ title }}</span>
          </template>
        </template>

        <template #bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'operation'">
            <template v-if="record.isEdit">
              <a-button type="link" @click="formValidate(record, false)">保存</a-button>
              <a-button type="link" @click="dataCancel(record, false)">取消</a-button>
              <!-- 0: string, 1:Integer,2:number -->
              <a-button v-if="[0, 1].includes(record.parameterType)" type="link" @click="showModal">码值定义</a-button>
              <a-button v-else-if="[3, 4].includes(record.parameterType)" type="link" @click="createNewChildParameter(record, false)">添加下级</a-button>
            </template>
            <template v-else>
              <a-button type="link" @click="dataCancel(record, true)">编辑</a-button>
              <a-button type="link" @click="deleteRecord(record, data)">删除</a-button>
            </template>
          </template>
          <template v-else>
            <a-form-item
              v-if="record.isEdit"
              has-feedback
              :name="[index, column.dataIndex]"
              :rules="[{ required: ['参数名称', '参数位置', '数据类型', '是否必填'].includes(column.title), message: '该选项为必填' }]"
            >
              <a-input v-if="['参数名称', '默认值', '参数描述', '参数说明'].includes(column.title)" v-model:value="record[column.dataIndex]" allow-clear placeholder="请输入" />
              <a-select v-else-if="['参数位置', '数据类型', '是否必填'].includes(column.title)" v-model:value="record[column.dataIndex]" allow-clear placeholder="请选择">
                <a-select-option v-for="item in column.selectOption" :key="item.key">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>

            <template v-else>
              <a-tooltip>
                <template #title>{{ dataComputed(column, record) }}</template>
                <span style="display: block; overflow: hidden; max-width: 150px; text-overflow: ellipsis; white-space: nowrap">{{ dataComputed(column, record) }}</span>
              </a-tooltip>
            </template>
          </template>
        </template>
      </a-table>
    </a-form>
  </div>
  <a-modal v-model:visible="visible" title="码值定义" width="1000px" @ok="handleOk">
    <div class="" style="margin-bottom: 10px; padding-left: 25px">
      <a-space size="small">
        <a-button type="primary">新增码表码值</a-button>
        <a-button type="primary">新增自定义码值</a-button>
        <a-button type="primary">码表引用</a-button>
      </a-space>
    </div>
    <div>
      <a-table :columns="columns" :data-source="datasss" :pagination="false"> </a-table>
    </div>
    <div>
      <a-form>
        <a-form-item label="码表名称">
          <a-input placeholder="请输入" />
        </a-form-item>
        <a-form-item label="码表说明">
          <a-textarea placeholder="请输入" />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import _ from 'lodash-es';
  import { FormInstance, message } from 'ant-design-vue';
  import type { inputParameterDataType } from '@/pages/apiRegisterAndUpdate/dataType';
  import { nanoid_ } from '@/pages/apiRegisterAndUpdate/tableConfigData';
  import { PropType } from 'vue';
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
      type: Array as PropType<inputParameterDataType[]>,
      default: () => [],
    },
    tableDataChild: {
      type: Object as PropType<inputParameterDataType>,
      default: () => ({}),
    },
    myNanoid: {
      type: Function,
      default: () => '',
    },
  });
  // 由于可以添加子级项导致data为多层数组，需要扁平化处理
  const data = ref<inputParameterDataType[]>(_.cloneDeep(props.tableData));
  const dataFlat = ref<inputParameterDataType[]>([]);
  const generateList = (data: inputParameterDataType[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      dataFlat.value.push(node);
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  // 数据扁平化
  watch(
    data,
    value => {
      dataFlat.value = [];
      generateList(value);
    },
    { deep: true, immediate: true },
  );
  // 表格row-key配置
  const rowKey = (record: { parameterId: string }): string => record.parameterId;
  // 处理数据（将指定字段转换成汉字）
  const dataComputed = (column: any, record: any): string => {
    if (column.dataIndex === 'parameterPosition') {
      return record.parameterPosition === 0 ? 'query' : record[column.dataIndex] === 1 ? 'header' : '';
    } else if (column.dataIndex === 'parameterType') {
      let str = '';
      switch (record.parameterType) {
        case 0:
          str = 'String';
          break;
        case 1:
          str = 'Integer';
          break;
        case 2:
          str = 'number';
          break;
        case 3:
          str = 'Object';
          break;
        case 4:
          str = 'Array';
          break;
      }
      return str;
    } else if (column.dataIndex === 'parameterRequire') {
      return record.parameterRequire ? '是' : '否';
    } else return record[column.dataIndex];
  };
  // 获取表单组件实例
  const formRef = ref<FormInstance>();
  // 新增参数
  const createNewParameter = () => {
    formRef.value
      ?.validate()
      .then(() => {
        // 校验成功的回调
        data.value.forEach((i: any) => (i.isEdit = false));
        const tableDataChild = _.cloneDeep(props.tableDataChild);
        tableDataChild.parameterId = nanoid_();
        data.value.push(tableDataChild);
      })
      .catch(() => {
        // 校验失败的错误信息
        message.warning('请正确填写上一项!', 1);
        // console.log(error);
      });
  };
  // 触发表单验证的回调(保存时调用)
  const formValidate = (record: inputParameterDataType, edit: boolean) => {
    // console.log('执行保存回调');
    formRef.value
      ?.validate()
      .then(() => {
        // 校验成功的回调
        record.isEdit = edit;
      })
      .catch(() => {
        // 校验失败的错误信息
        message.warning('请正确填字段!', 1);
      });
  };
  // 编辑、取消时调用
  const dataCancel = (record: inputParameterDataType, edit: boolean) => {
    formRef.value
      ?.validate()
      .then(() => {
        // 校验成功的回调
        if (edit) {
          data.value.forEach((i: any) => (i.isEdit = !edit));
          record.isEdit = edit;
        } else {
          formRef.value?.resetFields();
          record.isEdit = edit;
        }
      })
      .catch(() => {
        // 校验失败的错误信息
        if (edit) {
          message.warning('请正确填字段!', 1);
        } else {
          formRef.value?.resetFields();
          record.isEdit = edit;
          if (record.parameterName === '') {
            deleteRecord(record, data.value);
          }
        }
      });
  };

  // 删除
  const deleteRecord = (record: inputParameterDataType, data: inputParameterDataType[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      if (node.parameterId === record.parameterId) {
        data.splice(i, 1);
        return null;
      }
      if (node.children) {
        deleteRecord(record, node.children);
      }
    }
  };
  // 添加子级项
  const createNewChildParameter = (record: inputParameterDataType, edit: boolean) => {
    const childrenData = _.cloneDeep(props.tableDataChild) as inputParameterDataType;
    childrenData.parameterId = nanoid_();
    formRef.value?.validate().then(
      () => {
        if (record.children) {
          record.children?.push(childrenData);
        } else {
          record.children = [{ ...childrenData }];
        }
        record.isEdit = edit;
      },
      () => {
        message.warning('请正确填写字段!', 1);
      },
    );
  };
  const visible = ref<boolean>(false);

  const showModal = () => {
    visible.value = true;
  };

  const handleOk = (e: MouseEvent) => {
    console.log(e);
    visible.value = false;
  };
  // 暴露组件实例对象供父组件使用
  defineExpose({
    formRef,
  });
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

  const datasss = [
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
</script>

<style scoped lang="less">
  .myTabel_yzDQ {
    margin: 10px 0;
    padding: 20px;
    width: 100%;
    min-height: 255px;
    background-color: rgb(255, 255, 255);

    :deep(.ant-form-item) {
      margin: 0;
    }

    :deep(.ant-form-item-explain) {
      position: absolute;
      top: -55px;
      right: 0px;
      display: flex;
      border-radius: 3px;
      padding: 5px 10px;
      background: rgb(255, 255, 255);
      box-shadow: 0 5px 10px 5px rgb(233, 233, 233);
      line-height: 32px;
    }

    :deep(.ant-form-item-explain::before) {
      position: absolute;
      top: 42px;
      right: 20px;
      display: block;
      border-top: 10px solid rgb(255, 255, 255);
      border-right: 5px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 5px solid transparent;
      content: '';
    }

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
