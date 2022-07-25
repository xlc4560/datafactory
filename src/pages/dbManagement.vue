<template>
  <!--  数据筛选部分-->
  <div class="backColor ApiManagement">
    <!-- 筛选组 -->
    <a-form layout="inline" class="formAction">
      <a-form-item label="数据源名称名称:">
        <a-input class="width" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="应用状态:">
        <a-select class="width" :allow-clear="true" size="middle" placeholder="请选择">
          <!-- <a-select-option v-for="item in codeStateOptions" :key="item.value">{{ item.lable }}</a-select-option> -->
        </a-select>
      </a-form-item>
      <a-form-item class="formBtn">
        <a-button type="primary" html-type="submit">查 询</a-button>
        <a-button type="primary" ghost>重 置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="less">
  .backColor {
    background-color: #ffffff;
  }

  .ApiManagement {
    // margin: 0 0 10px;
    .formAction {
      display: flex;
      margin: 20px;
      padding: 0 10px;
    }

    .width {
      width: 200px;
    }

    .formBtn {
      flex: 1;

      button {
        float: right;

        &:nth-child(1) {
          margin: 0 0 0 10px;
        }
      }
    }
  }
</style>
