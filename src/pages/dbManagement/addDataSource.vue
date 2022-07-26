<template>
  <!-- <div>123</div>
  <a-button @click="closeDrawer">取消</a-button> -->

  <a-form class="form" :model="addDataSource" :label-col="{ span: 4 }" :wrapper-col="{ span: 15 }" @finish="onFinish">
    <a-form-item label="数据库类型" name="dbType" :rules="rules.dbType">
      <a-select v-model:value="addDataSource.dbType" allow-clear>
        <a-select-option v-for="i in dbtype" :key="i.id" :value="i.id">{{ i.value }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="数据源名称" name="dataSourceName" class="formitem" :rules="rules.dataSourceName">
      <a-input v-model:value="addDataSource.dataSourceName" allow-clear></a-input>
    </a-form-item>
    <a-form-item label="JDBC URL" name="jdbcURL" class="formitem" :rules="rules.jdbcURL">
      <a-input v-model:value="addDataSource.jdbcURL" allow-clear></a-input>
      <a-tooltip placement="topRight">
        <template #title>
          <div>地址：端口/数据库名,例如：</div>
          <div>242.28.22.14:3306/example</div>
        </template>
        <question-circle-outlined class="questionIcon" />
      </a-tooltip>
    </a-form-item>
    <a-form-item label="驱动类名" name="driverName" :rules="rules.driverName">
      <a-input v-model:value="addDataSource.driverName" allow-clear></a-input>
    </a-form-item>
    <a-form-item label="连接参数配置" name="connectConfig">
      <a-input v-model:value="addDataSource.connectConfig" allow-clear></a-input>
      <a-tooltip placement="topRight">
        <template #title>
          <div>「例如：</div>
          <div>autoReconnect=true&characterEncoding=utf8,多条配置间用&符号连接」</div>
        </template>
        <question-circle-outlined class="questionIcon" />
      </a-tooltip>
    </a-form-item>
    <a-form-item label="用户名" name="userName" :rules="rules.userName">
      <a-input v-model:value="addDataSource.userName" allow-clear></a-input>
    </a-form-item>
    <a-form-item label="密码" name="password">
      <a-input v-model:value="addDataSource.password" type="password" allow-clear></a-input>
    </a-form-item>
    <a-form-item label="数据源描述" name="dataSourceDescription">
      <a-textarea v-model:value="addDataSource.dataSourceDescription"></a-textarea>
    </a-form-item>

    <a-button type="primary" class="connectTest">连通测试</a-button>

    <a-divider />
    <div class="footer">
      <a-button style="margin-right: 8px" @click="closeDrawer">取消</a-button>
      <a-button type="primary" html-type="submit">确定</a-button>
    </div>
  </a-form>
</template>
<script lang="ts" setup>
  //引入图标
  import { QuestionCircleOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  //定义值
  interface addDataSource {
    dbType: number;
    dataSourceName: string;
    jdbcURL: string;
    driverName: string;
    connectConfig: string;
    userName: string;
    password: string;
    dataSourceDescription: string;
  }
  const addDataSource = ref<addDataSource>({
    dbType: 0,
    dataSourceName: 'dataSourceName',
    jdbcURL: 'jdbcURL',
    driverName: 'driverName',
    connectConfig: 'connectConfig',
    userName: 'userName',
    password: 'password',
    dataSourceDescription: 'dataSourceDescription',
  });

  //数据库类型
  const dbtype = reactive([
    { id: 0, value: 'MySQL' },
    { id: 1, value: 'MongoDB' },
    { id: 2, value: 'ElasticSearch' },
  ]);
  //验证规则
  const rules = reactive({
    dbType: [{ required: true, message: '请选择数据库类型' }],
    dataSourceName: [
      { required: true, message: '请输入数据源名称' },
      { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '支持中英文大小写、数字和下划线' },
    ],
    jdbcURL: [{ required: true, message: '请输入JDBC URL' }],
    driverName: [{ required: true, message: '请输入驱动类名' }],
    userName: [{ required: true, message: '请输入用户名' }],
  });

  // 组件传值、关闭抽屉
  const prop = defineProps({
    changevisible: {
      type: Boolean,
      default: false,
    },
    codeid: {
      type: String,
      default: '',
    },
  });
  const props = toRefs(prop);
  const codeid = ref('');
  codeid.value = props.codeid.value;
  console.log(codeid.value);

  const emit = defineEmits(['changevisible']);
  const closeDrawer = () => {
    props.changevisible.value = false;
    emit('changevisible', props.changevisible.value);
  };

  //提交
  const onFinish = (values: any) => {
    console.log('Success:', values);
    message.success('添加完成');
    closeDrawer();
  };
</script>
<style scoped>
  /* 表单 */
  .form {
    margin-top: 3%;
  }
  /* 底部按钮 */
  .footer {
    text-align: right;
  }
  /* 连通测试按钮 */
  .connectTest {
    margin-left: 17%;
  }
  /* 问号图标 */
  .questionIcon {
    position: absolute;
    top: 10px;
    right: -30px;
    color: gray;
  }
</style>
