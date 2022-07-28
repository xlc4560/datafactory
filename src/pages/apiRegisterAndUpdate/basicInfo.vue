<template>
  <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }" autocomplete="off" @finish="onFinish" @finish-failed="onFinishFailed">
    <!-- 数据填写 -->
    <div class="baiscInfo_form">
      <div class="title___2CoZR"> 基本信息 </div>
      <a-form-item label="接口分类">
        <a-select>
          <a-select-option key="0">xx分类1</a-select-option>
          <a-select-option key="1">xx分类2</a-select-option>
          <a-select-option key="2">xx分类3</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="接口名称">
        <a-input />
      </a-form-item>

      <a-form-item label="接口来源">
        <a-select>
          <a-select-option key="0">xx分类1</a-select-option>
          <a-select-option key="1">xx分类2</a-select-option>
          <a-select-option key="2">xx分类3</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="接口描述">
        <a-textarea />
      </a-form-item>
      <div class="title___2CoZR"> API参数 </div>
      <a-form-item label="协议">
        <a-select>
          <a-select-option key="0">xx分类1</a-select-option>
          <a-select-option key="1">xx分类2</a-select-option>
          <a-select-option key="2">xx分类3</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="IP端口">
        <a-input />
      </a-form-item>
      <a-form-item label="Path">
        <a-input />
      </a-form-item>
      <a-form-item label="请求方式">
        <a-select>
          <a-select-option key="0">GET</a-select-option>
          <a-select-option key="1">POST</a-select-option>
          <a-select-option key="2">PUT</a-select-option>
          <a-select-option key="2">DELETE</a-select-option>
        </a-select>
      </a-form-item>
    </div>
    <!-- 数据提交、下一步 -->
    <div class="baiscInfo_footer">
      <a-form-item :wrapper-col="{ offset: 16, push: 1 }">
        <a-button class="btn">取 消</a-button>
        <a-button html-type="submit" class="btn"> 保存并退出 </a-button>
        <a-button type="primary" class="btn">下一步</a-button>
      </a-form-item>
    </div>
  </a-form>
</template>

<script setup lang="ts">
  interface FormState {
    username: string;
    password: string;
    remember: boolean;
  }

  const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
  });
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
</script>

<style scoped lang="less">
  .baiscInfo_form {
    display: flex;
    flex-flow: column nowrap;
    padding: 10px;
    // title样式
    .title___2CoZR {
      position: relative;
      padding-left: 8px;
      padding-left: 28%;
      font-weight: 700;
      color: #666;
      line-height: 40px;

      &::after {
        content: '';
        position: absolute;
        top: calc(50% - 8px);
        left: 27.5%;
        width: 3px;
        height: 16px;
        background: #1890ff;
      }
    }
  }

  .baiscInfo_footer {
    position: fixed;
    bottom: 0;
    left: -20px;
    padding-top: 8px;
    width: 100%;
    height: 48px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 -5px 30px 5px rgb(219, 219, 219);

    .btn {
      margin-left: 20px;
    }
  }
</style>
