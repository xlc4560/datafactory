<template>
  <a-drawer :visible="scriptDetailsDrawer" width="1000px" @close="emits('changeDrawerControlData', { dataName: 'scriptDetailsDrawer', value: false })">
    <a-descriptions :column="1">
      <template #title>
        <div class="scriptTitle_SxGJ"><strong>基本信息</strong></div>
      </template>
      <a-descriptions-item label="脚本名称">
        <a @click="ChangeScriptContentVisible(true)">Zhou Maomao</a>
      </a-descriptions-item>
      <a-descriptions-item label="脚本分类">1810000000</a-descriptions-item>
      <a-descriptions-item label="脚本类型">Hangzhou, Zhejiang</a-descriptions-item>
      <a-descriptions-item label="类名">empty</a-descriptions-item>
      <a-descriptions-item label="函数名">empty</a-descriptions-item>
      <a-descriptions-item label="自定义异常">empty</a-descriptions-item>
      <a-descriptions-item label="描述"> No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China </a-descriptions-item>
    </a-descriptions>
    <a-descriptions :column="1">
      <template #title>
        <div class="scriptTitle_SxGJ"><strong>参数信息</strong></div>
      </template>
      <a-descriptions-item>
        <a-table :columns="inputParameterColumns" size="small" :pagination="false">
          <template #title>输入参数</template>
        </a-table>
      </a-descriptions-item>
      <a-descriptions-item>
        <a-table :columns="outputParameterColumns" size="small" :pagination="false">
          <template #title>输出参数</template>
        </a-table>
      </a-descriptions-item>
    </a-descriptions>
  </a-drawer>
  <a-modal v-model:visible="scriptContentVisible" width="1200px" style="top: 12vh" title="脚本内容">
    <template #footer> </template>
    <codemirror
      class="scroll"
      :model-value="code"
      :disabled="true"
      placeholder="Code goes here...---"
      :style="{ height: '600px' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="log('ready', $event)"
      @change="log('change', $event)"
      @focus="log('focus', $event)"
      @blur="log('blur', $event)"
    />
  </a-modal>
</template>

<script setup lang="ts">
  import { inputParameterColumns, outputParameterColumns } from './data';
  import { Codemirror } from 'vue-codemirror';
  import { python } from '@codemirror/lang-python';
  import { javascript } from '@codemirror/lang-javascript';
  import { oneDark } from '@codemirror/theme-one-dark';
  const props = defineProps({
    scriptDetailsDrawer: {
      type: Boolean,
      default: false,
    },
  });
  const emits = defineEmits(['changeDrawerControlData']);
  const scriptContentVisible = ref<boolean>(false);
  const ChangeScriptContentVisible = (visible: boolean) => {
    scriptContentVisible.value = visible;
  };
  const code = ref(`from PIL import Image
import numpy as np
import pandas as pd

size = [150,200]
filename = './1644660317429.jpg'
im = Image.open(filename)
width,height = im.size
Lim = im.convert('L')
Lim = Lim.resize([150,200])
threshold = 170
table = []
for i in range(256):
    if i < threshold:
        table.append(0)
    else:
        table.append(1)
bim = Lim.point(table,'1')

test = bim.getdata()
test1 = np.array(test)
test1 = test1.reshape(size[::-1])

pd.DataFrame(test1).to_csv('./小李.csv',index=None,header=None)`);
  const extensions = [javascript(), python(), oneDark];
  const log = console.log;
</script>

<style scoped lang="less">
  .scriptTitle_SxGJ {
    position: relative;
    line-height: 40px;
    padding-left: 8px;
    font-size: 16px;
  }

  .scriptTitle_SxGJ::before {
    position: absolute;
    top: calc(50% - 8px);
    left: 0;
    width: 3px;
    height: 16px;
    background-color: #1890ff;
    content: '';
  }

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
