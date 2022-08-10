<template>
  <!--  数据列表部分-->
  <div class="backColor tableWarp">
    <!-- 按钮操作组 -->
    <div class="tableactionGroup">
      <a-space :size="12">
        <a-button :disabled="btnIsDisabled" @click="updataStopwatchState(UpdateStateApi.RELEASE)">批量发布</a-button>
        <a-button :disabled="btnIsDisabled" @click="updataStopwatchState(UpdateStateApi.DISABLE)">批量停用</a-button>
      </a-space>
      <a-space :size="12">
        <a-button><a href="http://124.223.17.68:6002/code/downloadTemplate">导入模板下载</a></a-button>
        <a-button @click="showModalin">标准导入</a-button>
        <a-button type="primary" @click="stopwatchUpdate(0, { codeId: '' })">新增码表</a-button>
      </a-space>
    </div>
    <!-- 表格组 -->
    <div class="antdTable">
      <a-table
        :row-selection="{ selectedRowKeys: selectedRowKeysRef, onChange: onSelectChange }"
        :columns="stopwatch_columns"
        :row-key="rowKey"
        :data-source="dataSource?.list"
        :pagination="pagination"
        :loading="loading"
        size="small"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'codeId'">
            <a @click="stopwatchDetails(record)">{{ record.codeId }}</a>
          </template>
          <template v-if="column.dataIndex === 'codeState'">
            <span class="isNopublish" :style="{ background: codeState[record.codeState].color }"></span>
            {{ codeState[record.codeState].value }}
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button v-if="record.codeState === 0 || record.codeState === 2" type="link" size="small" @click="updataStopwatchState(UpdateStateApi.RELEASE, record.codeId)">发 布</a-button>
            <a-button v-if="record.codeState === 1" type="link" size="small" @click="updataStopwatchState(UpdateStateApi.DISABLE, record.codeId)">停 用</a-button>
            <a-button v-if="record.codeState === 0 || record.codeState === 2" type="link" @click="stopwatchUpdate(1, record)">编 辑</a-button>
            <a-popconfirm title="确认删除?" ok-text="是" cancel-text="否" @confirm="deleteStopwatch(record.codeId)">
              <a-button v-if="record.codeState === 0" type="link">删 除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </div>
  </div>
  <a-modal v-model:visible="visiblein" title="导入标准文件" :destroy-on-close="true" @ok="handleOkin">
    <div style="display: flex">
      <a-upload v-model:file-list="fileList" name="file" :before-upload="beforeUpload" :headers="headers">
        <span style="color: red">*</span><span style="margin-right: 10px; padding: 5px">上传标准文件:</span>
        <a-button>
          <upload-outlined></upload-outlined>
          选择文件
        </a-button>
      </a-upload>
      <a-button @click="handleUpload">
        <upload-outlined></upload-outlined>
        上传文件
      </a-button>
    </div>

    <a-button v-if="alink" type="text" danger><a :href="alink">下载失败文件</a></a-button>
    <div style="margin: 10px 30px 10px 90px; color: #999999">提示：请下载最新模板，按照模板准备导入文件后导入标准文档，导入后系统将满足正确条件的标准导入到标准目录，错误的标准将被过滤。</div>
  </a-modal>
</template>

<script setup lang="ts">
  import { message } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import type { UploadProps } from 'ant-design-vue';
  import axios from 'axios';

  import { stopwatch_columns, codeState, UpdateStateApi } from './stopwatchData';
  import type { Key, StopwatchFiltersType } from './stopwatchType';
  import * as request from '@/api/stopwatch/stopwatch';
  import { usePagination } from 'vue-request'; // 分页
  // 定义全局变量接收分页参数
  const order = ref<0 | 1 | null>(null);
  const sizeGlobal = ref<number>(10);
  const pageGlobal = ref<number>(1);
  // 接收来自筛选组件的数据
  const props = defineProps({
    stopwatchFilters: {
      type: Object,
      default: () =>
        reactive<StopwatchFiltersType>({
          codeState: null,
          codeName: '',
        }),
    },
    downloadLink: {
      type: String,
      default: 'http://124.223.17.68:6002/code/importCode',
    },
  });
  // 声明自定义事件用于和父组件通信
  const emits = defineEmits(['openModal', 'openDrawer']);
  // 以下是分页逻辑
  const {
    data: dataSource,
    run,
    loading,
  } = usePagination(request.getStopwatchList, {
    defaultParams: [
      {
        page: 1,
        size: 10,
        orderBy: null,
        codeState: props.stopwatchFilters.codeState,
        codeName: props.stopwatchFilters.codeName,
      },
    ],
  });
  // 表格分页配置
  const pagination = computed(() => ({
    total: dataSource.value?.total,
    current: pageGlobal.value,
    pageSize: sizeGlobal.value,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: () => `共${dataSource.value?.total}条`,
  }));
  // 将run方法封装到函数中,便于后续使用
  const useRun: () => void = () => {
    run({
      page: pageGlobal.value,
      size: sizeGlobal.value,
      orderBy: order.value,
      codeState: props.stopwatchFilters.codeState,
      codeName: props.stopwatchFilters.codeName,
    });
  };
  // 监视数据是否发生变化
  watch(props.stopwatchFilters, () => {
    pageGlobal.value = 1;
    sizeGlobal.value = 10;
    useRun();
  });

  // 控制批量操作按钮是否可点击
  const btnIsDisabled = ref<boolean>(true);
  // 表格row-key配置
  const rowKey = (record: { codeId: string }) => record.codeId;
  // 多选状态
  const state = reactive<{
    selectedRowKeys: (string | number)[];
  }>({
    selectedRowKeys: [], // Check here to configure the default column
  });
  const { selectedRowKeys: selectedRowKeysRef } = toRefs(state);
  // 当选择状态发生改变时的回调
  const onSelectChange = (selectedRowKeys: Key[]) => {
    if (selectedRowKeys.length > 0) {
      btnIsDisabled.value = false;
    } else {
      btnIsDisabled.value = true;
    }
    state.selectedRowKeys = selectedRowKeys;
  };
  // 批量操作按钮回调
  const updataStopwatchState = async (operation: 0 | 1, codeId?: string) => {
    if (codeId) {
      await request.updateStopwatchState({ codeId: [codeId], operation });
    } else {
      await request.updateStopwatchState({ codeId: state.selectedRowKeys, operation });
    }
    // 重新获取列表数据
    useRun();
    // 清空选中的数据
    state.selectedRowKeys = [];
  };
  // 打开码表详情弹窗回调
  const stopwatchDetails = (record: any) => {
    // 触发父组件中的回调emits(事件名, 事件参数)
    emits('openModal', true, record);
  };
  // 打开码表编辑、注册抽屉回调
  const stopwatchUpdate = (isRegister: 0 | 1, record: any) => {
    // 传递函数或数据到index（所有组件共同的父组件）组件中，为了其他兄弟组件中使用
    emits('openDrawer', true, record, isRegister, useRun);
  };
  // 删除码表回调
  const deleteStopwatch = async (codeId: string) => {
    await request.deleteStopwatch(codeId);
    useRun();
  };
  // 当点击分页组件时，该回调被触发
  const handleTableChange = (pag: { pageSize: number; current: number }, filters: any, sorter: any) => {
    order.value = sorter.order === 'ascend' ? 1 : (order.value = sorter.order === 'descend' ? 0 : null);
    sizeGlobal.value = pag.pageSize;
    pageGlobal.value = pag.current;
    // useRun触发usePagination中的queryData请求
    useRun();
  };

  //
  // 需要传入下载上传地址
  // 上传链接
  const downloadLink = ref<string>('');
  downloadLink.value = props.downloadLink || '';

  // 标准导入
  const handleOkin = (e: MouseEvent) => {
    console.log(e);
    if (fileList.value.length) {
      visiblein.value = false;
    } else {
      message.warning('请上传文件');
    }
  };
  const visiblein = ref<boolean>(false);
  const fileList = ref<any>([]);
  const headers = {
    authorization: 'authorization-text',
  };
  const alink = ref();
  const beforeUpload: UploadProps['beforeUpload'] = file => {
    fileList.value = [...fileList.value, file];
    return false;
  };
  const handleUpload = () => {
    const formData = new FormData();
    // const a = fileList.value;
    fileList.value.forEach((file: any) => {
      console.log(file.originFileObj);
      formData.append('file', file.originFileObj);
    });
    // console.log(toRaw(a[0]));
    // formData.append('file', toRaw(a[0]));
    // formData.append('file', '1123s');
    console.log(formData);
    axios(downloadLink.value, {
      method: 'post',
      data: formData,
      // contentType: 'multipart/form-data',
      headers: {
        contentType: 'multipart/form-data',
      },
      responseType: 'blob',
    })
      .then(response => {
        if (response.data.type == 'application/json') {
          let reader = new FileReader(); // 创建读取文件对象
          reader.readAsText(response.data, 'utf-8'); // 设置读取的数据以及返回的数据类型为utf-8
          reader.addEventListener('loadend', function () {
            //
            let res = JSON.parse(reader.result as string); // 返回的数据
            console.log(res, '返回结果'); // { name: "小花" }
            if (res.code === 100200) {
              message.success('上传成功！', 1);
            } else {
              message.error(res.msg, 1);
            }
          });
        } else {
          fileList.value = [];
          // 构造一个blob对象来处理数据，并设置文件类型、type为导出的文件类型 以excel为demo
          const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
          const href = URL.createObjectURL(blob); // 创建新的URL表示指定的blob对象
          const a = document.createElement('a'); // 创建a标签
          a.style.display = 'none';
          a.href = href; // 指定下载链接
          //设置指定元素上的某个属性值。如果属性已经存在，则更新该值
          a.setAttribute('download', '失败数据.xls');
          // a.click(); // 触发下载
          alink.value = a.href;
          // URL.revokeObjectURL(a.href); // 释放URL对象
        }
      })
      .catch(() => {
        message.error('上传失败！');
      });
  };
  const showModalin = () => {
    visiblein.value = true;
  };
</script>

<style lang="less" scoped>
  .backColor {
    background-color: #ffffff;
  }

  .tableWarp {
    margin: 10px 0;
    width: 100%;
    min-height: 70vh;

    .tableactionGroup {
      display: flex;
      //   flex-direction: row-reverse;
      justify-content: space-between;
      padding: 20px 20px;
      width: 100%;
    }

    .antdTable {
      padding: 0 20px 10px;
    }

    .isNopublish {
      display: inline-block;
      // background: #faad14;
      margin-right: 3px;
      border-radius: 50%;
      width: 7px;
      height: 7px;
    }
  }
</style>
