<template>
  <div class="myTabel_yzDQ">
    <a-form ref="formRef" size="small" :model="dataFlat" name="basic">
      <a-table :columns="tableColumns" size="small" :data-source="apiInfo[tableDataName]" :pagination="false" :row-key="rowKey" :default-expand-all-rows="true">
        <template #title>
          <div class="paramTitle">
            <span class="titleStyle">{{ headerTitle }}</span>
            <a-row justify="end" :gutter="16">
              <a-col v-if="isRenderJsonImportBtn">
                <a-button @click="showJSONDataModal">JSON数据导入</a-button>
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
              <a-button v-if="[0, 1].includes(record.parameterType)" type="link" @click="showCodeValueModal(record)">码值定义</a-button>
              <a-button v-else-if="[3, 4].includes(record.parameterType)" type="link" @click="createNewChildParameter(record, false)">添加下级</a-button>
            </template>
            <template v-else>
              <a-button type="link" @click="dataCancel(record, true)">编辑</a-button>
              <a-button type="link" @click="deleteRecord(record, apiInfo[tableDataName])">删除</a-button>
            </template>
          </template>
          <template v-else>
            <template v-if="record.isEdit && !['默认值', '是否必填'].includes(column.title)">
              <a-form-item
                has-feedback
                :name="[index, column.dataIndex]"
                :rules="[
                  { required: ['参数名称', '参数位置', '数据类型', '是否必填'].includes(column.title), message: '该选项为必填' },
                  { validator: checkChildren, trigger: 'change' },
                  { validator: (_rule, value) => checkCodeId(_rule, value, record), trigger: 'change' },
                ]"
              >
                <a-input v-if="['参数名称', '参数描述', '参数说明'].includes(column.title)" v-model:value="record[column.dataIndex]" allow-clear placeholder="请输入" />
                <a-select v-else-if="['参数位置', '数据类型'].includes(column.title)" v-model:value="record[column.dataIndex]" allow-clear placeholder="请选择" @change="selectChange(record)">
                  <a-select-option v-for="item in column.selectOption" :key="item.key">{{ item.label }}</a-select-option>
                </a-select>
              </a-form-item>
            </template>
            <template v-else-if="record.isEdit && ['默认值', '是否必填'].includes(column.title) && ![3, 4].includes(record.parameterType)">
              <a-form-item has-feedback :name="[index, column.dataIndex]" :rules="[{ required: ['参数名称', '参数位置', '数据类型', '是否必填'].includes(column.title), message: '该选项为必填' }]">
                <a-input v-if="['默认值'].includes(column.title)" v-model:value="record[column.dataIndex]" allow-clear placeholder="请输入" />
                <a-select v-else-if="['是否必填'].includes(column.title)" v-model:value="record[column.dataIndex]" allow-clear placeholder="请选择" @change="selectChange(record)">
                  <a-select-option v-for="item in column.selectOption" :key="item.key">{{ item.label }}</a-select-option>
                </a-select>
              </a-form-item>
            </template>
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
  <!-- 新增弹窗 -->
  <defineCodeValueVue v-if="!currentParameter?.codeId" :is-show="isShowModal" @close-modal="closeModal" />
  <codeBindVue v-else :is-show="isShowModal" :is-render-unbind-btn="isRenderUnbindBtn" @close-modal="closeModal" />
  <!-- JSON数据导入弹窗 -->
  <a-modal v-model:visible="JSONDataModalVisible" title="JSON数据导入" width="1000px" style="top: 22vh" @ok="JSONDataHandleOk">
    <a-form layout="vertical" :model="JsonData">
      <a-form-item name="jsonData" label="Json数据" :rules="[{ required: true, message: '请导入参数!' }]">
        <a-textarea v-model:value="JsonData.jsonData" placeholder="请导入参数" :rows="8" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  // 第三方库
  import _ from 'lodash-es';
  import { FormInstance, message } from 'ant-design-vue';
  import type { Rule } from 'ant-design-vue/es/form';
  // 自定义
  import type { inputParameterDataType, columnsType } from '@/pages/apiRegisterAndUpdate/dataType';
  import { nanoid_ } from '@/pages/apiRegisterAndUpdate/tableConfigData';
  import { TypeEnum, RequireEnum } from '@/pages/apiRegisterAndUpdate/dataEnum';
  import { changeIsEdit } from './tableConfig';
  import defineCodeValueVue from './defineCodeValue.vue';
  import codeBindVue from './codeBind.vue';
  // pinia数据
  import { storeToRefs } from 'pinia';
  import useStore from '@/store';
  import { log } from 'console';
  const { useApiRegisterAndUpdateStore } = useStore();
  const { apiInfo, currentParameter } = storeToRefs(useApiRegisterAndUpdateStore);
  const isRenderUnbindBtn = ref<boolean>(false);
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
      default: () => [] as inputParameterDataType[],
    },
    tableDataName: {
      type: String,
      default: 'InputParameter',
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
  // 存储扁平化的数据，用于表单验证触发
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
    apiInfo.value[props.tableDataName],
    (value: inputParameterDataType[]) => {
      dataFlat.value = [];
      generateList(value);
    },
    { deep: true, immediate: true },
  );
  // 表格row-key配置
  const rowKey = (record: { parameterId: string }): string => record.parameterId;
  // 处理数据（将指定字段转换成汉字）
  const dataComputed = (column: columnsType, record: inputParameterDataType): string => {
    if (column.dataIndex === 'parameterPosition') {
      return record.parameterPosition === 0 ? 'query' : record[column.dataIndex] === 1 ? 'header' : '';
    } else if (column.dataIndex === 'parameterType') {
      return TypeEnum[record.parameterType as number];
    } else if (column.dataIndex === 'parameterRequire') {
      return [3, 4].includes(record.parameterType as number) ? '-' : RequireEnum[record.parameterRequire as number];
    } else if (column.dataIndex === 'parameterDefault') {
      return [3, 4].includes(record.parameterType as number) ? '-' : (record[column.dataIndex] as string);
    } else return record[column.dataIndex];
  };
  // 获取表单组件实例
  const formRef = ref<FormInstance>();
  // 新增参数
  const createNewParameter = async () => {
    try {
      await formRef.value?.validate();
      // 校验成功的回调
      apiInfo.value[props.tableDataName].forEach((i: inputParameterDataType) => (i.isEdit = false));
      const tableDataChild = _.cloneDeep(props.tableDataChild);
      tableDataChild.id = nanoid_();
      tableDataChild.parameterPid = '0';
      apiInfo.value[props.tableDataName].push(tableDataChild);
    } catch (error) {
      // 校验失败的错误信息
      message.warning('请正确填写上一项!', 1);
    }
  };
  // 触发表单验证的回调(保存时调用)
  const formValidate = async (record: inputParameterDataType, edit: boolean) => {
    try {
      await formRef.value?.validate();
      // 校验成功的回调
      record.isEdit = edit;
    } catch (error) {
      // 校验失败的错误信息
      message.warning('请正确填写字段!', 1);
    }
  };

  // 编辑、取消时调用
  const dataCancel = async (record: inputParameterDataType, edit: boolean) => {
    try {
      await formRef.value?.validate();
      // 校验成功的回调
      if (edit) {
        changeIsEdit(apiInfo.value[props.tableDataName], edit);
        record.isEdit = edit;
      } else {
        formRef.value?.resetFields();
      }
    } catch (error) {
      // 校验失败的错误信息
      if (edit) {
        message.warning('请正确填字段!', 1);
      } else {
        formRef.value?.resetFields();
      }
    }
  };

  // 删除
  const deleteRecord = (record: inputParameterDataType, data: inputParameterDataType[]) => {
    const parentId = ref<string>('0');
    const arrP = dataFlat.value
      .map(flat => {
        if (record.id === flat.id) {
          parentId.value = flat.parameterPid as string;
        }
        if (flat.parameterPid === parentId.value && parentId.value !== '0') {
          return flat.parameterPid;
        }
      })
      .filter(key => key);
    data.forEach((item: inputParameterDataType, index: number) => {
      if (item.id === record.id) {
        if (arrP.length === 1) {
          message.error('复杂类型最后一条子数据不能删除!', 1);
        } else {
          data.splice(index, 1);
        }
        return null;
      } else if (item.children) {
        deleteRecord(record, item.children);
      }
    });
  };
  // 添加子级项
  const createNewChildParameter = async (record: inputParameterDataType, edit: boolean) => {
    const childrenData = _.cloneDeep(props.tableDataChild) as inputParameterDataType;
    childrenData.id = nanoid_();
    // 将record的id作为子级的parameterPid
    childrenData.parameterPid = record.id;
    try {
      await formRef.value?.validate();
      if (record.children) {
        record.children?.push(childrenData);
      } else {
        record.children = [{ ...childrenData }];
      }
      record.isEdit = edit;
    } catch (error) {
      message.warning('请正确填写字段!', 1);
    }
  };
  // select框change事件 用于验证是否
  const recordGlobal = ref<inputParameterDataType>();
  const selectChange = (record: inputParameterDataType) => {
    recordGlobal.value = record;
    if ([3, 4].includes(record.parameterType as number)) {
      record.parameterRequire = 1;
    }
  };
  // 自定义验证规则
  const checkChildren = async (_rule: Rule, value: number | string) => {
    if (typeof value === 'number') {
      if (recordGlobal.value?.children?.length && [0, 1, 2].includes(value)) {
        return Promise.reject('当前节点存在子级!');
      } else {
        return Promise.resolve();
      }
    }
  };
  // 有码值时，无法切换类型验证
  const checkCodeId = async (_rule: Rule, value: number | string, record: inputParameterDataType) => {
    if (record.codeId && [2, 3, 4].includes(value as number)) {
      return Promise.reject('存在码值引用,不能切换!');
    } else if ((record.code?.codeConfig || record.code?.codeName) && [2, 3, 4].includes(value as number)) {
      return Promise.reject('存在自定义码值,不能切换!');
    }
    return Promise.resolve();
  };
  // 控制弹窗是否显示
  const isShowModal = ref<boolean>(false);
  const showCodeValueModal = (record: inputParameterDataType) => {
    isRenderUnbindBtn.value = true;
    currentParameter.value = record;
    isShowModal.value = true;
    if (!currentParameter.value.code) {
      currentParameter.value.code = {};
      currentParameter.value.code.codeConfig = [];
      currentParameter.value.code.codeName = '';
    }
  };
  const closeModal = () => {
    isShowModal.value = false;
  };

  // JSON数据弹窗
  const JSONDataModalVisible = ref<boolean>(false);
  const showJSONDataModal = () => {
    JSONDataModalVisible.value = true;
  };
  const JSONDataHandleOk = () => {
    try {
      apiInfo.value[props.tableDataName].push(JSON.parse(JsonData.value.jsonData as string));
      JSONDataModalVisible.value = false;
    } catch (error) {
      message.error('json数据格式错误', 1);
    }
  };
  // 表单数据
  const JsonData = ref<{ jsonData?: string }>({
    jsonData: '',
  });

  // 暴露组件实例对象供父组件使用
  defineExpose({
    formRef,
  });
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
      white-space: nowrap; // 控制文本不换行
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
