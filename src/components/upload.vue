<!-- 上传下载组件 -->
<template>
  <div>
    <a-button type="primary" style="margin-left: 10px"><a :href="uploadLink">导入模板下载</a></a-button>
    <a-button type="primary" style="margin-left: 10px" @click="showModalin">标准导入</a-button>
    <!-- 标准导入 -->

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
  </div>
</template>
<script setup lang="ts">
  import { message } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import type { UploadProps } from 'ant-design-vue';
  import axios from 'axios';
  // 需要传入下载上传地址
  // 下载链接
  const uploadLink = ref<string>('http://10.8.21.143:6002/code/downloadTemplate');
  // 上传链接
  const downloadLink = ref<string>('http://10.8.21.143:6002/code/importCode');

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
        console.log(response);
        console.log(response.data);

        if (response.data.type == 'application/json') {
          let reader = new FileReader(); // 创建读取文件对象
          reader.readAsText(response.data, 'utf-8'); // 设置读取的数据以及返回的数据类型为utf-8
          reader.addEventListener('loadend', function () {
            //
            let res = JSON.parse(reader.result as string); // 返回的数据
            console.log(res, '返回结果'); // { name: "小花" }
            message.success('上传成功！');
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
  .test {
    position: absolute;
    width: 100%;
    height: 20%;
  }
</style>
