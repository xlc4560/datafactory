<!-- 资产表详情 -->
<template>
  <div class="details">
    <div class="details-base">
      <div class="title">基本信息</div>
      <div class="content">
        <p><span>中文名称:</span><span>中文名称</span></p>
        <p><span>英文名称:</span><span>中文名称</span></p>
        <p><span>资产表描述:</span><span>中文名称</span></p>
        <p><span>所属目录:</span><span>中文名称</span></p>
      </div>
    </div>
    <div class="details-msg">
      <div class="title">字段信息</div>
      <div class="table"> 表格 </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped lang="less">
  .details {
    .details-base {
      .title {
        margin: 10px;
        border-left: 6px solid #1890ff;
        padding: 0px 10px;
      }

      .content {
        padding: 10px 20px;

        span {
          margin-right: 10px;
        }
      }
    }

    .details-msg {
      .title {
        margin: 10px;
        border-left: 6px solid #1890ff;
        padding: 0px 10px;
      }

      .table {
        padding: 10px 25px;
      }
    }
  }
</style>
