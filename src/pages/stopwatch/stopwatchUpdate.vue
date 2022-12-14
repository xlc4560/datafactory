<template>
  <a-drawer :title="drawerData.isRegister" width="800px" :visible="drawerVisible" @close="onClose">
    <a-form
      ref="formRef"
      :model="formState"
      name="basic"
      class="stopwatchUpdate"
      :label-col="{ style: { width: '100px' } }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finish-failed="onFinishFailed"
    >
      <div class="title___2CoZR">码表基本信息</div>
      <a-form-item
        has-feedback
        label="码表名称"
        name="codeName"
        :rules="[
          { required: true, message: '请输入码表名称' },
          {
            pattern: /^[a-zA-Z\u4e00-\u9fa5]+$/,
            message: '只能输入中文和字母',
          },
        ]"
      >
        <a-input v-model:value="formState.codeName" :allow-clear="true" />
      </a-form-item>
      <a-form-item label="码表说明" name="codeDescription">
        <a-textarea v-model:value="formState.codeDescription" :rows="3" />
      </a-form-item>
      <a-divider />
      <div class="table-form-item">
        <a-table :columns="stopwatchUpdate_columns" :data-source="formState.codeConfig" size="small" :pagination="false">
          <template #title>
            <div class="table_title">
              <div class="title___2CoZR">码值配置</div>
              <a-button type="primary" ghost @click="addConfigurationItem">添加配置项</a-button>
            </div>
          </template>
          <template #headerCell="{ column }">
            <template v-if="column.dataIndex === 'codeConfigValue'">
              <span>
                <span style="color: red">*</span>
                码值取值
              </span>
            </template>
            <template v-else-if="column.dataIndex === 'codeConfigName'">
              <span>
                <span style="color: red">*</span>
                码值名称
              </span>
            </template>
          </template>
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.dataIndex === 'codeConfigValue'">
              <a-form-item class="form-item-bottom" has-feedback :name="['codeConfig', index, 'codeConfigValue']" :rules="[{ required: true, message: '必填' }]">
                <a-input v-model:value="record.codeConfigValue" style="margin: -5px 0" :allow-clear="true" @blur="blurAndFocus(index, 0)" @focus="blurAndFocus(index, 1)" />
              </a-form-item>
            </template>
            <template v-else-if="column.dataIndex === 'codeConfigName'">
              <a-form-item class="form-item-bottom" has-feedback :name="['codeConfig', index, 'codeConfigName']" :rules="codeConfigNameRules">
                <a-input v-model:value="record.codeConfigName" style="margin: -5px 0" :allow-clear="true" @blur="blurAndFocus(index, 0)" @focus="blurAndFocus(index, 1)" />
              </a-form-item>
            </template>
            <template v-else-if="column.dataIndex === 'codeConfigDescription'">
              <a-form-item class="form-item-bottom">
                <a-input v-model:value="record.codeConfigDescription" style="margin: -5px 0" />
              </a-form-item>
            </template>
            <template v-else-if="column.dataIndex === 'action'">
              <a-popconfirm title="确认删除?" ok-text="是" cancel-text="否" @confirm="deleteConfigurationItem(record)">
                <a href="#">删 除</a>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </div>
    </a-form>
    <template #footer>
      <a-button type="primary" @click="formSubmit">确 认</a-button>
      <a-button @click="onClose">取 消</a-button>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
  import { stopwatchUpdate_columns } from './stopwatchData';
  import { FormState } from './stopwatchType';
  import { FormInstance, message } from 'ant-design-vue';
  import { addStopwatch, getStopwatchDetails, editStopwatch } from '@/api/stopwatch/stopwatch';
  const props = defineProps({
    drawerData: {
      type: Object,
      default: () => reactive<{ visible: boolean; isRegister: string }>({ visible: false, isRegister: '' }),
    },
    run: {
      type: Function,
      default: null,
    },
  });
  // 表单数据
  const formState = reactive<FormState>({
    codeName: '',
    codeDescription: '',
    // codeState: 0,
    codeConfig: ref<
      {
        codeConfigName: string;
        codeConfigValue: string;
        codeConfigDescription: string | null | undefined;
      }[]
    >([]),
  });
  const drawerVisible = ref<boolean>(false);
  watch(
    props.drawerData,
    async () => {
      drawerVisible.value = props.drawerData.visible;
      if (props.drawerData.codeId) {
        let data = await getStopwatchDetails(props.drawerData.codeId);
        formState.codeId = data.codeId;
        formState.codeName = data.codeName;
        // formState.codeDescription = data.code
        //   响应式列表数据
        formState.codeConfig = data.codeConfig?.reduce((total: any, currentValue): object[] => {
          delete currentValue.codeId;
          delete currentValue.id;
          total.push(reactive<any>(currentValue));
          return total;
        }, []);
      } else {
        formState.codeId = '';
        formState.codeName = '';
        formState.codeDescription = '';
        //   响应式列表数据
        formState.codeConfig = [];
      }
    },
    { immediate: true },
  );
  // 自定义表单校验规则
  const codeConfigNameRules = [
    { required: true, message: '必填' },
    {
      pattern: /^[a-zA-Z\u4e00-\u9fa5]+$/,
      message: '只能输入中文和字母',
    },
  ];
  // 抽屉关闭
  const onClose = () => {
    drawerVisible.value = false;
    // 调用来自stopwatchTableList.vue组件的run方法，用于刷新页面数据
    props.run();
    formRef?.value?.resetFields();
  };
  // 表单验证通过
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  // 表单验证失败
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // 添加配置项回调
  const addConfigurationItem = () => {
    formState.codeConfig.push(
      reactive<any>({
        codeConfigValue: '',
        codeConfigName: '',
        codeConfigDescription: '',
      }),
    );
  };
  //   删除配置项回调
  const deleteConfigurationItem = (item: any) => {
    const index = formState.codeConfig.indexOf(item);
    formState.codeConfig.splice(index, 1);
  };
  // 提交
  const formRef = ref<FormInstance>();
  const formSubmit = () => {
    formRef?.value
      ?.validate()
      .then(async () => {
        if (formState.codeConfig.length > 0) {
          if (formState.codeId) {
            // 码表编辑
            const res = await editStopwatch(formState);
            res === null ? '' : onClose();
          } else {
            // 新增码表
            const res = await addStopwatch(formState);
            res === null ? '' : onClose();
          }
        } else {
          message.error('码表配置项不能为空');
        }
      })
      .catch(error => {
        // message.warning(error);
        console.log('error', error);
      });
  };
  // 输入框失去焦点回调
  const blurAndFocus = (index: number, opacity: number) => {
    const warn = document.getElementsByClassName('ant-form-item-explain');
    if (warn[index]) {
      if (!opacity) {
        for (let i = 0; i < warn.length; i++) {
          const element = warn[i];
          element.setAttribute('style', 'opacity:0');
        }
      } else {
        for (let i = 0; i < warn.length; i++) {
          const element = warn[i];
          element.setAttribute('style', 'opacity:1');
        }
      }
    }
  };
</script>
<style lang="less">
  th.column-money,
  td.column-money {
    text-align: right !important;
  }
  //   表单class
  .stopwatchUpdate {
    .ant-table-title {
      padding: 0 !important;
    }

    & .ant-drawer-content-wrapper {
      .ant-drawer-content {
        .ant-drawer-footer {
          .btn {
            margin: 0 1vw 0 0;
          }
        }
      }
    }
    // 控制校验失败提示样式
    .table-form-item {
      & .ant-form-item-explain {
        position: absolute;
        top: -55px;
        right: 0px;
        z-index: 1;
        display: flex;
        border-radius: 3px;
        padding: 5px 10px;
        white-space: nowrap;
        background: rgb(255, 255, 255);
        box-shadow: 0 5px 10px 5px rgb(233, 233, 233);
        line-height: 32px;
      }

      & .ant-form-item-explain::before {
        position: absolute;
        top: 42px;
        right: 20px;
        z-index: 99;
        display: block;
        border-top: 10px solid rgb(255, 255, 255);
        border-right: 5px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 5px solid transparent;
        content: '';
      }
    }

    & .ant-form-item-control {
      flex: auto !important;
      max-width: 100% !important;
    }

    & .form-item-bottom {
      margin: 0;
    }
    // 标题样式
    & .title___2CoZR {
      position: relative;
      padding-left: 8px;
      font-weight: 700;
      line-height: 40px;

      &:before {
        content: '';
        position: absolute;
        top: calc(50% - 8px);
        left: 0;
        width: 3px;
        height: 16px;
        background: #1890ff;
      }
    }
    // 标题（码值配置）配置
    & .table_title {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
