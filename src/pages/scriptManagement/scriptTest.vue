<template>
  <a-drawer
    :visible="scriptTestDrawer"
    title="脚本测试"
    :body-style="{ padding: '24px 10px 10px 24px' }"
    width="75vw"
    @close="emits('changeDrawerControlData', { dataName: 'scriptTestDrawer', value: false })"
  >
    <div class="modal_3aZ6I">
      <div class="first_2FlHe">
        <a-descriptions :column="1">
          <template #title>
            <div class="scriptTitle_SxGJ"><strong>脚本名称</strong></div>
          </template>
          <a-descriptions-item label="脚本名称"> Zhou Maomao </a-descriptions-item>
        </a-descriptions>
        <a-descriptions :column="1">
          <template #title>
            <div class="scriptTitle_SxGJ"><strong>输入参数</strong></div>
          </template>
          <a-descriptions-item>
            <a-table :columns="scriptTestTable" :data-source="[{}]" size="small" :pagination="false">
              <template #bodyCell="{ column }">
                <template v-if="column.dataIndex === 'testValue'">
                  <a-form-item>
                    <a-input placeholder="请输入" />
                  </a-form-item>
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
          <JsonViewer class="jsonViewerStyle scroll_apiTest" :value="{ data: { data: { data: 'ssssss' } } }" :expand-depth="3" copyable sort theme="dark" @on-key-click="keyClick" />
        </a-card>
      </div>
    </div>
    <template #footer>
      <a-row :gutter="16">
        <a-col>
          <a-button>脚本测试</a-button>
        </a-col>
        <a-col>
          <a-button>复制返回结果</a-button>
        </a-col>
        <a-col>
          <a-button>关闭</a-button>
        </a-col>
      </a-row>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
  import { scriptTestTable } from './data';
  import { JsonViewer } from 'vue3-json-viewer';
  import 'vue3-json-viewer/dist/index.css';
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
