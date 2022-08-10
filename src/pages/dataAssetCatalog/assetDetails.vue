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
      <div class="table">
        <a-table :columns="columns" :data-source="data" :pagination="{ pageSize: 50 }" :scroll="{ y: 340 }" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  // 表格
  const columns = [
    {
      title: '字段英文名称',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '字段中文名称',
      dataIndex: 'age',
      width: 150,
    },
    {
      title: '字段说明',
      dataIndex: 'address',
    },
    {
      title: '数据类型',
      dataIndex: 'address',
    },
    {
      title: '数据长度',
      dataIndex: 'address',
    },
    {
      title: '数据精度',
      dataIndex: 'address',
    },
    {
      title: '默认值',
      dataIndex: 'address',
    },
    {
      title: '取值范围',
      dataIndex: 'address',
    },
    {
      title: '枚举范围',
      dataIndex: 'address',
    },
  ];

  const data = [...Array(100)].map((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  }));
</script>
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
