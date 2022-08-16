<template>
  <a-drawer
    :visible="scriptTestDrawer"
    title="脚本测试"
    :body-style="{ padding: '9px 10px 10px 24px' }"
    width="75vw"
    @close="emits('changeDrawerControlData', { dataName: 'scriptTestDrawer', value: false })"
    @after-visible-change="afterDrawerVisibleChange"
  >
    <div class="modal_3aZ6I">
      <div class="first_2FlHe">
        <a-descriptions :column="1">
          <template #title>
            <div class="scriptTitle_SxGJ"><strong>脚本名称</strong></div>
          </template>
          <a-descriptions-item label="脚本名称"> {{ currentScriptDetails.scriptName }} </a-descriptions-item>
        </a-descriptions>
        <a-descriptions :column="1">
          <template #title>
            <div class="scriptTitle_SxGJ"><strong>输入参数</strong></div>
          </template>
          <a-descriptions-item>
            <a-table :columns="scriptTestTable" :data-source="tableData" size="small" :pagination="false">
              <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'testValue'">
                  <a-form-item>
                    <a-input v-model:value="record.parameterValue" placeholder="请输入" />
                  </a-form-item>
                </template>
                <template v-else-if="column.dataIndex === 'parameterType'">
                  {{ TypeEnum[record.parameterType] }}
                </template>
                <template v-else-if="column.dataIndex === 'parameterRequire'">
                  {{ RequireEnum[record.parameterRequire] }}
                </template>
              </template>
            </a-table>
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="second_2PGJM">
        <a-card :bordered="false" :head-style="{ paddingTop: '0' }" :body-style="{ padding: '0' }">
          <template #title>
            <div class="scriptTitle_SxGJ"><strong>返回结果(JSON)</strong></div>
          </template>
          <JsonViewer class="jsonViewerStyle scroll_apiTest" :value="scriptTestResult" :expand-depth="3" copyable sort theme="dark" @on-key-click="keyClick" />
        </a-card>
      </div>
    </div>
    <template #footer>
      <a-row :gutter="16">
        <a-col>
          <a-button @click="scriptTest">脚本测试</a-button>
        </a-col>
        <a-col>
          <a-button @click="copyText(scriptTestResult)">复制返回结果</a-button>
        </a-col>
        <a-col>
          <a-button @click="emits('changeDrawerControlData', { dataName: 'scriptTestDrawer', value: false })">关闭</a-button>
        </a-col>
      </a-row>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
  import { scriptTestTable } from './data';
  import { ScriptParameterType } from './type';
  import { JsonViewer } from 'vue3-json-viewer';
  import 'vue3-json-viewer/dist/index.css';
  import { TypeEnum, RequireEnum } from './Enum';
  import { ScriptTest__ } from '@/api/scriptManagement';
  import { copyText } from '@/utils/copyText';
  // 从pinia中引入集中管理的状态
  import { currentScriptDetails } from './scriptHooks';
  const props = defineProps({
    scriptTestDrawer: {
      type: Boolean,
      default: false,
    },
  });
  const emits = defineEmits(['changeDrawerControlData']);
  const keyClick = (keyName: string): void => {
    console.log(keyName, '被点击了');
  };
  const tableData = ref<ScriptParameterType[]>([]);
  // // 监视当前字段，
  watch(currentScriptDetails, () => {
    tableData.value = currentScriptDetails.value.inputParameter as ScriptParameterType[];
  });
  // 测试结果
  const scriptTestResult = ref<string | object | number | null>('');
  // 测试按钮回调
  const scriptTest = async () => {
    try {
      const arr: {
        parameterName: string;
        parameterValue: string;
      }[] = [];
      if (tableData.value) {
        tableData.value.forEach((item: ScriptParameterType) => {
          arr.push({ parameterName: item.parameterName, parameterValue: item.parameterValue + '' });
        });
      }
      scriptTestResult.value = await ScriptTest__({ id: currentScriptDetails.value.id as number, parameterList: arr });
    } catch (error) {
      console.log(error);
    }
  };
  // 切换抽屉时动画结束后的回调
  const afterDrawerVisibleChange = () => {
    if (!props.scriptTestDrawer) {
      scriptTestResult.value = '';
    }
  };
</script>

<style scoped lang="less">
  @import url('./title.less');
  @import url('../apiManagement/scorll.less');

  :deep(.ant-table-wrapper) {
    flex: 1;
  }

  .modal_3aZ6I {
    display: flex;
    height: calc(100vh - 132px);

    .first_2FlHe {
      display: flex;
      margin-right: 10px;
      height: 100%;
      flex: 6;
      flex-direction: column;
      // background-color: aquamarine;
      :deep(.ant-descriptions-header) {
        margin-bottom: 10px;
      }

      :deep(.ant-form-item) {
        margin-bottom: 0;
      }
    }

    .second_2PGJM {
      flex: 4;
      // background-color: antiquewhite;
      height: 100%;

      .jsonViewerStyle {
        height: calc(100vh - 200px);
      }
    }
  }
</style>
