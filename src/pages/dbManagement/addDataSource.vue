<template>
  <!-- <div>123</div>
  <a-button @click="closeDrawer">取消</a-button> -->

  <a-form class="form" :model="addDataSource" :label-col="{ span: 4 }" :wrapper-col="{ span: 15 }" @finish="onFinish">
    <a-form-item label="数据库类型" name="dataSourceType" :rules="rules.dataSourceType">
      <a-select v-model:value="addDataSource.dataSourceType" allow-clear>
        <a-select-option v-for="i in dataSourceType" :key="i.id" :value="i.value">{{ i.value }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="数据源名称" name="dataSourceName" class="formitem" :rules="rules.dataSourceName">
      <a-input v-model:value="addDataSource.dataSourceName" allow-clear></a-input>
    </a-form-item>
    <a-form-item label="JDBC URL" name="dataSourceUrl" class="formitem" :rules="rules.dataSourceUrl">
      <a-input v-model:value="addDataSource.dataSourceUrl" allow-clear></a-input>
      <a-tooltip placement="topRight">
        <template #title>
          <div>地址：端口/数据库名,例如：</div>
          <div>242.28.22.14:3306/example</div>
        </template>
        <question-circle-outlined class="questionIcon" />
      </a-tooltip>
    </a-form-item>
    <a-form-item label="驱动类名" name="dataSourceDriverClassName" :rules="rules.dataSourceDriverClassName">
      <a-input v-model:value="addDataSource.dataSourceDriverClassName" allow-clear></a-input>
    </a-form-item>
    <a-form-item label="连接参数配置" name="dataSourceConnectParameter">
      <a-input v-model:value="addDataSource.dataSourceConnectParameter" allow-clear></a-input>
      <a-tooltip placement="topRight">
        <template #title>
          <div>「例如：</div>
          <div>autoReconnect=true&characterEncoding=utf8,多条配置间用&符号连接」</div>
        </template>
        <question-circle-outlined class="questionIcon" />
      </a-tooltip>
    </a-form-item>
    <a-form-item label="用户名" name="dataSourceUsername" :rules="rules.dataSourceUsername">
      <a-input v-model:value="addDataSource.dataSourceUsername" allow-clear></a-input>
    </a-form-item>
    <a-form-item label="密码" name="dataSourcePassword">
      <a-input v-model:value="addDataSource.dataSourcePassword" type="password" allow-clear></a-input>
    </a-form-item>
    <a-form-item label="数据源描述" name="dataSourceDescription">
      <a-textarea v-model:value="addDataSource.dataSourceDescription"></a-textarea>
    </a-form-item>

    <a-button type="primary" class="connectTest" @click="connecttest">连通测试</a-button>

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
  import { AddDataSource, EditDataSource, DetailDataSource, ConnectTest } from '@/api/dbManagement/index';
  //数据库类型
  const dataSourceType = reactive([
    { id: 0, value: 'MySQL' },
    { id: 1, value: 'MongoDB' },
    { id: 2, value: 'ElasticSearch' },
  ]);
  //验证规则
  const rules = reactive({
    dataSourceType: [{ required: true, message: '请选择数据库类型' }],
    dataSourceName: [
      { required: true, message: '请输入数据源名称' },
      { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '支持中英文大小写、数字和下划线' },
    ],
    dataSourceUrl: [{ required: true, message: '请输入JDBC URL' }],
    dataSourceDriverClassName: [{ required: true, message: '请输入驱动类名' }],
    dataSourceUsername: [{ required: true, message: '请输入用户名' }],
  });

  //定义值
  interface addDataSource {
    id?: number;
    dataSourceType: string; //数据库类型
    dataSourceName: string; //数据源名称
    dataSourceUrl: string; //连接地址
    dataSourceDriverClassName: string; //驱动类名
    dataSourceConnectParameter: string; //连接参数
    dataSourceUsername: string; //用户名
    dataSourcePassword: string; //密码
    dataSourceDescription: string; //数据源描述
  }
  interface connectTest {
    dataSourceDriverClassName: string; //驱动类名
    dataSourcePassword: string; //密码
    dataSourceUrl: string; //URL
    dataSourceUsername: string; //用户名
  }
  const addDataSource = ref<addDataSource>({
    dataSourceType: 'MySQL',
    dataSourceName: 'dataSourceName',
    dataSourceUrl: 'jdbc:mysql://localhost:3306/data_factory',
    dataSourceDriverClassName: 'com.mysql.cj.jdbc.Driver',
    dataSourceConnectParameter: 'dataSourceConnectParameter',
    dataSourceUsername: 'root',
    dataSourcePassword: 'doge2218',
    dataSourceDescription: 'dataSourceDescription',
  });
  //数据源连接测试数据定义
  const connectTest = ref<connectTest>({
    dataSourceDriverClassName: '',
    dataSourceUrl: '',
    dataSourceUsername: '',
    dataSourcePassword: '',
  });

  //数据源连接测试
  const connecttest = () => {
    connectTest.value.dataSourceDriverClassName = addDataSource.value.dataSourceDriverClassName;
    connectTest.value.dataSourceUrl = addDataSource.value.dataSourceUrl;
    connectTest.value.dataSourceUsername = addDataSource.value.dataSourceUsername;
    connectTest.value.dataSourcePassword = addDataSource.value.dataSourcePassword;

    console.log(toRaw(connectTest.value));
    ConnectTest(connectTest.value).then(res => {
      console.log(res);
    });
  };

  // 组件传值、关闭抽屉
  const prop = defineProps({
    changevisible: {
      type: Boolean,
      default: false,
    },
    dbid: {
      type: String,
      default: '',
    },
  });
  const props = toRefs(prop);
  const dbid = ref<string>('');
  dbid.value = props.dbid.value;
  const changevisible = ref<boolean>();
  changevisible.value = props.changevisible.value;

  const emit = defineEmits(['changevisible', 'reset']);
  const closeDrawer = () => {
    changevisible.value = false;
    emit('changevisible', changevisible.value);
  };

  function showlist() {
    emit('reset');
  }

  if (dbid.value != 'new') {
    DetailDataSource(Number(dbid.value)).then(res => {
      console.log(res);
      addDataSource.value.id = res.id;
      addDataSource.value.dataSourceName = res.dataSourceName;
      addDataSource.value.dataSourceDescription = res.dataSourceDescription;
      addDataSource.value.dataSourceUrl = res.dataSourceUrl;
      addDataSource.value.dataSourceDriverClassName = res.dataSourceDriverClassName;
      addDataSource.value.dataSourcePassword = res.dataSourcePassword;
      addDataSource.value.dataSourceUsername = res.dataSourceUsername;
      addDataSource.value.dataSourceType = res.dataSourceType;
      addDataSource.value.dataSourceConnectParameter = res.dataSourceConnectParameter;
    });
  }

  //提交
  const onFinish = () => {
    if (dbid.value != 'new') {
      //编辑数据源
      EditDataSource(toRaw(addDataSource.value)).then(res => {
        // console.log(res);
        if (res === 1) {
          // message.success('编辑完成');
          closeDrawer();
          showlist();
        }
      });
    } else {
      //新增数据源
      AddDataSource(toRaw(addDataSource.value)).then(res => {
        // console.log(res);
        if (res === 1) {
          // console.log('新增数据源', toRaw(addDataSource.value));
          // message.success('添加完成');
          closeDrawer();
          showlist();
        }
      });
    }
  };
</script>
<style scoped>
  /* 表单 */
  .form {
    margin-top: 3%;
  }
  /* 底部按钮 */
  .footer {
    margin-right: 5%;
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
