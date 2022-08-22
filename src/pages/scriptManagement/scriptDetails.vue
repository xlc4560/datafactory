<template>
  <a-drawer :visible="scriptDetailsDrawer" width="75vw" @close="emits('changeDrawerControlData', { dataName: 'scriptDetailsDrawer', value: false })">
    <a-descriptions :column="1">
      <template #title>
        <div class="scriptTitle_SxGJ"><strong>基本信息</strong></div>
      </template>
      <a-descriptions-item label="脚本名称">
        <a @click="ChangeScriptContentVisible(true)">{{ currentScriptDetails?.scriptName }}</a>
      </a-descriptions-item>
      <a-descriptions-item label="脚本分类">{{ currentScriptDetails?.scriptCategory }}</a-descriptions-item>
      <a-descriptions-item label="脚本类型">{{ currentScriptDetails?.scriptType ? 'SQL脚本' : 'Python脚本' }}</a-descriptions-item>
      <a-descriptions-item label="类名">{{ currentScriptDetails?.scriptClass }}</a-descriptions-item>
      <a-descriptions-item label="函数名">{{ currentScriptDetails?.scriptFunction }}</a-descriptions-item>
      <a-descriptions-item label="自定义异常">{{}}</a-descriptions-item>
      <a-descriptions-item label="描述"> {{ currentScriptDetails?.scriptDescription }} </a-descriptions-item>
    </a-descriptions>
    <a-descriptions :column="1">
      <template #title>
        <div class="scriptTitle_SxGJ"><strong>参数信息</strong></div>
      </template>
      <a-descriptions-item>
        <a-table :columns="inputParameterColumns" :data-source="currentScriptDetails.inputParameter" size="small" :pagination="false">
          <template #title>输入参数</template>
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'parameterType'">
              {{ TypeEnum[record.parameterType] }}
            </template>
            <template v-else-if="column.dataIndex === 'parameterRequire'">
              {{ RequireEnum[record.parameterRequire] }}
            </template>
          </template>
        </a-table>
      </a-descriptions-item>
      <a-descriptions-item>
        <a-table :columns="outputParameterColumns" :data-source="currentScriptDetails.outputParameter" size="small" :pagination="false">
          <template #title>输出参数</template>
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'parameterType'">
              {{ TypeEnum[record.parameterType] }}
            </template>
          </template>
        </a-table>
      </a-descriptions-item>
    </a-descriptions>
  </a-drawer>
  <a-modal v-model:visible="scriptContentVisible" width="1200px" style="top: 12vh" title="脚本内容">
    <template #footer> </template>
    <a-spin :spinning="codemirrorSpinning">
      <codemirror
        class="scroll"
        :model-value="code"
        :disabled="true"
        placeholder="Code goes here...---"
        :style="{ height: '60vh' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        @ready="log('ready', $event)"
        @change="log('change', $event)"
        @focus="log('focus', $event)"
        @blur="log('blur', $event)"
      />
    </a-spin>
  </a-modal>
</template>

<script setup lang="ts">
  import { inputParameterColumns, outputParameterColumns } from './data';
  import { GetScriptContent } from '@/api/scriptManagement';
  import { Codemirror } from 'vue-codemirror';
  import { python } from '@codemirror/lang-python';
  import { javascript } from '@codemirror/lang-javascript';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { TypeEnum, RequireEnum } from './Enum';
  // 从pinia中引入集中管理的状态
  import { currentScriptDetails } from './scriptHooks';
  const props = defineProps({
    scriptDetailsDrawer: {
      type: Boolean,
      default: false,
    },
  });
  const emits = defineEmits(['changeDrawerControlData']);
  // 控制脚本内容展示
  const scriptContentVisible = ref<boolean>(false);
  // 控制脚本内容的加载状态
  const codemirrorSpinning = ref<boolean>(false);
  const ChangeScriptContentVisible = async (visible: boolean) => {
    scriptContentVisible.value = visible;
    debugger;
    code.value = '';
    try {
      codemirrorSpinning.value = true;
      code.value = await GetScriptContent(currentScriptDetails?.value.id as number);
      if (code.value?.code) {
        code.value = undefined;
      }
    } catch (error) {
    } finally {
      debugger;
      codemirrorSpinning.value = false;
    }
  };
  // 脚本代码
  const code = ref(``);
  const extensions = [javascript(), python(), oneDark];
  const log = console.log;
</script>
<style scoped lang="less">
  @import url('./title.less');

  :deep(.ant-table-title) {
    padding: 0;
    font-size: 16px;
  }

  :deep(.ant-descriptions-view) {
    padding-left: 8px;
  }

  :deep(.ant-table-wrapper) {
    flex: 1;
  }
</style>
