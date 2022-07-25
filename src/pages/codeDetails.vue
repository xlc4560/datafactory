<template>
  <div class="codeDetails scroll_codeDetails">
    <h1>码表详情</h1>
    <div class="tab">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1">
          <a-card size="small">
            <a-table :columns="codeDetails_columns" :data-source="codeDeatils.apiParameter" :pagination="false"> </a-table>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { apiParameter } from './types';
  import { codeDetails_columns } from './data';
  import 'vue3-json-viewer/dist/index.css';

  //码表详情的名称

  // tab标签页初始展示
  const activeKey = ref('1');
  // 使用props接收来自父组件的数据
  const props = defineProps({
    record: {
      type: Object,
      default: () => ({ a: 1, b: 2 }),
    },
  });

  // 所有需要展示的数据
  const codeDeatils = computed(() => {
    let apiParameter: apiParameter[] = [];
    if (props.record.apiParameter === null || props.record.apiParameter === undefined || props.record.apiParameter === '') {
      apiParameter = [];
    } else {
      apiParameter = props.record.apiParameter;
      apiParameter.forEach(item => {
        switch (item.parameterPosition) {
          case 0:
            item.parameterPosition = 'query';
          case 1:
            item.parameterPosition = 'header';
          case 2:
            item.parameterPosition = 'body';
        }
        item.parameterRequire = item.parameterRequire === 0 ? '否' : '是';
        switch (item.parameterType) {
          case 0:
            item.parameterType = 'string';
          case 1:
            item.parameterType = 'integer';
          case 2:
            item.parameterType = 'number';
        }
      });
    }
    return {};
  });
</script>

<style lang="less">
  // 控制滚动条样式
  .scroll_codeDetails {
    /* background-color: aqua; */
    overflow-x: hidden; /*禁止x轴滚动条*/
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.2);
    }
  }

  .codeDetails {
    display: flex;
    flex-direction: column;
    padding: 0px;
    height: 50vh;

    h1 {
      font-size: 20px;
      text-align: center;
    }

    .tab,
    .apiReponseInstance {
      & .ant-card-body {
        padding: 0;
      }
    }

    & > * {
      margin: 10px 0;
    }

    & div .ant-tabs-nav {
      margin: 0;
    }
  }
</style>
