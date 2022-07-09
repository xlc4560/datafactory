<!-- <template>
  <div v-for="item in 50" :key="item">
    <h1>this is h1</h1>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style> -->

<template>
  <div>
    <!-- 步骤条 -->
    <div class="regStep">
      <div style="margin: 0 auto; width: 50%">
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
      </div>
    </div>
    <!-- 步骤内容 -->
    <!--1. 基本信息 -->
    <div v-if="steps[current].content == 'basicmsg'" class="steps-content">
      <!-- 表单 -->
      <a-form :label-col="{ span: 3, offset: 5 }" :wrapper-col="{ span: 9, offset: 0 }">
        <!-- 基本信息 -->
        <a-form-item label="基本信息" :colon="false" class="basicmsg"> </a-form-item>

        <a-form-item label="接口名称" v-bind="validateInfos.api_name">
          <a-input v-model:value="api_basic.api_name" :disabled="api_basic.api_state === 0" @blur="validate('name', { trigger: 'blur' }).catch(() => {})" />
        </a-form-item>

        <a-form-item v-bind="validateInfos.api_source" label="接口来源">
          <a-select v-model:value="api_basic.api_source" :disabled="api_basic.api_state === 0" style="text-align: left">
            <a-select-option value="数据服务">数据服务</a-select-option>
            <a-select-option value="指标管理">指标管理</a-select-option>
            <a-select-option value="决策引擎">决策引擎</a-select-option>
            <a-select-option value="数据工厂">数据工厂</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="接口描述" v-bind="validateInfos.api_description">
          <a-textarea v-model:value="api_basic.api_description" :auto-size="{ minRows: 2, maxRows: 5 }" />
        </a-form-item>
        <!-- api参数 -->
        <a-form-item label="API参数" :colon="false" class="basicmsg"> </a-form-item>

        <a-form-item label="协议" v-bind="validateInfos.api_protocol">
          <a-select v-model:value="api_basic.api_protocol" :disabled="api_basic.api_state === 0 || api_basic.api_state === 2" style="text-align: left">
            <a-select-option value="HTTP">HTTP</a-select-option>
            <a-select-option value="HTTPS">HTTPS</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="IP端口" v-bind="validateInfos.api_ip_port">
          <a-input v-model:value="api_basic.api_ip_port" @blur="validate('name', { trigger: 'blur' }).catch(() => {})" />
        </a-form-item>

        <a-form-item label="Path" v-bind="validateInfos.api_path">
          <a-input v-model:value="api_basic.api_path" :disabled="api_basic.api_state === 0 || api_basic.api_state === 2" @blur="validate('name', { trigger: 'blur' }).catch(() => {})" />
        </a-form-item>

        <a-form-item label="请求方式" v-bind="validateInfos.api_method">
          <a-select v-model:value="api_basic.api_method" :disabled="api_basic.api_state === 0 || api_basic.api_state === 2" style="text-align: left">
            <a-select-option value="POST">POST</a-select-option>
            <a-select-option value="GET">GET</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="超时时间" v-bind="validateInfos.api_timeout">
          <a-input v-model:value="api_basic.api_timeout" @blur="validate('name', { trigger: 'blur' }).catch(() => {})" />
        </a-form-item>

        <!-- 重置按钮 -->
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button style="margin-left: 10px" @click="resetFields">重置</a-button>
        </a-form-item>
      </a-form>
    </div>

    <!--2. 参数配置 -->
    <!-- 输入参数 -->
    <div v-if="steps[current].content == 'paraconfig'" class="steps-content">
      <!-- 输入参数标题 -->
      <a-page-header class="demo-page-header" title="输入参数">
        <template #extra>
          <a-button key="1" type="primary">新增参数</a-button>
        </template>
      </a-page-header>
      <!-- 输入参数表格 -->
      <a-table :data-source="dataSourceInput" :columns="columnsInput" empty-text="暂无数据"> </a-table>
    </div>

    <!-- 请求body -->
    <div v-if="steps[current].content == 'paraconfig' && api_basic.api_method == 'POST'" class="steps-content">
      <!-- 输入参数标题 -->
      <a-page-header class="demo-page-header" title="请求Body">
        <template #extra>
          <a-button key="1" type="primary">新增参数</a-button>
        </template>
      </a-page-header>
      <!-- 输入参数表格 -->
      <a-table :data-source="dataSourceBody" :columns="columnsBody"> </a-table>
    </div>

    <!-- 返回参数 -->
    <div v-if="steps[current].content == 'paraconfig'" class="steps-content">
      <!-- 标题 -->
      <a-page-header class="demo-page-header" title="返回参数">
        <template #extra>
          <a-button key="1" type="primary">新增参数</a-button>
        </template>
      </a-page-header>
      <!-- 表格 -->
      <a-table :data-source="dataSourceReturn" :columns="columnsReturn"> </a-table>
    </div>

    <!-- 测试抽屉 -->
    <a-drawer v-model:visible="visible" width="70%" class="custom-class" title="接口测试" placement="right" @after-visible-change="afterVisibleChange">
      <div style="display: flex">
        <!-- 测试左侧信息 -->
        <div class="test_apimsg">
          <div>
            <span class="test_title">接口名称　:</span><span>{{ api_basic.api_name }}</span>
          </div>

          <div>
            <span class="test_title">Request URL　:</span><span>{{ api_basic.api_protocol.toLowerCase() + '://' + api_basic.api_ip_port + api_basic.api_path }}</span>
          </div>

          <div>
            <span class="test_title">请求方式　:</span><span>{{ api_basic.api_method }}</span>
          </div>

          <div>
            <p style="margin-top: 20px; font-size: 18px">输入参数</p>
            <a-table :data-source="test_dataSource" :columns="test_columns" />
          </div>
        </div>
        <!-- 测试右侧返回 -->
        <div class="test_return">
          <p style="font-size: 18px">返回结果(JSON)</p>
          <div style="height: 70vh; background: black">
            <pre style="margin-left: -10%; padding-top: 5%; max-height: 70vh; color: white">
              {
                "msg": "返回成功",
                "code": 100200,
                "data": 1111
              }
            </pre>
          </div>
        </div>
      </div>
      <!-- 测试按钮组 -->
      <div style="display: flex; justify-content: center; margin-top: 2%">
        <a-button type="primary" style="margin-right: 1%">接口测试</a-button>
        <a-button @click="close_test">关闭</a-button>
      </div>
    </a-drawer>

    <!-- 按钮组 -->
    <div class="steps-action">
      <!-- 测试 -->
      <a-button v-if="steps[current].content == 'paraconfig'" style="margin-right: 10px" @click="testApi">测试</a-button>
      <!-- 取消 -->
      <a-popconfirm placement="top" ok-text="是" cancel-text="否" :style="{ marginRight: `${buttonWidth}px`, whiteSpace: 'nowrap' }" @confirm="confirm">
        <template #title>
          <p>{{ text }}</p>
        </template>
        <a-button style="margin-right: 10px">取消</a-button>
      </a-popconfirm>
      <!-- 保存草稿并退出 -->
      <a-button v-if="current < steps.length - 1" style="margin-right: 10px">保存并退出</a-button>
      <!-- 下一步 -->
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">下一步</a-button>
      <!-- 完成并退出 -->
      <a-button v-if="current == steps.length - 1" type="primary" @click="message.success('Processing complete!')"> 保存并退出 </a-button>
      <!-- 上一步 -->
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">上一步</a-button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRaw, UnwrapRef } from 'vue';
  import { message, Form } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  const useForm = Form.useForm;

  export default defineComponent({
    components: {},
    setup() {
      // api基本信息和参数
      const api_basic = reactive({
        api_state: 1, //api状态  0停用 1草稿 2未发布 3已发布
        api_name: '123',
        api_source: '数据服务',
        api_description: '123',
        api_protocol: 'HTTP',
        api_ip_port: '192.168.1.1:1',
        api_path: '/1',
        api_method: 'GET',
        api_timeout: 30,
      });
      // 验证
      const rulesRef = reactive({
        api_name: [
          {
            required: true,
            message: '请输入接口名称',
          },
          {
            pattern: /^[^\s]*$/,
            message: '不能输入空格',
          },
          {
            max: 30,
            message: '接口名称在30个字符以内',
          },
        ],
        api_source: [
          {
            required: true,
            message: '请选择接口来源',
          },
        ],
        api_protocol: [
          {
            required: true,
            message: '请选协议',
          },
        ],
        api_description: [
          {
            max: 1000,
            message: '限制1000个字符',
          },
        ],
        api_ip_port: [
          {
            required: true,
            message: '请输入IP端口',
          },
          {
            pattern: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)+:\d{1,5}\/?$/,
            message: '请输入正确的端口号',
          },
        ],
        api_path: [
          {
            required: true,
            message: '请输入路径',
          },
          {
            pattern: /^\//,
            message: '请输入正确的路径',
          },
        ],
        api_method: [
          {
            required: true,
            message: '请选择请求方式',
          },
        ],
        api_timeout: [
          {
            required: true,
            message: '请输入超时时间',
          },
          {
            pattern: /^[1-9]\d*$/,
            message: '请输入正整数',
          },
          {
            pattern: /^[0-9]$|^[0-9][0-9]$|^[0-9][0-9][0-9]$|^1[0-7][0-9][0-9]$|^1800$/,
            message: '超时时间在1800s以内',
          },
        ],
      });

      // 上下页并验证
      const { resetFields, validate, validateInfos } = useForm(api_basic, rulesRef);
      const current = ref<number>(0);
      const next = () => {
        validate()
          .then(() => {
            console.log(toRaw(api_basic));
            current.value++;
          })
          .catch(err => {
            console.log('error', err);
          });
      };
      const prev = () => {
        current.value--;
      };

      // 取消按钮
      const router = useRouter();
      const buttonWidth = 70;
      const text = '请确认是否取消此次接口编辑?';
      const confirm = () => {
        router.push({
          path: '/Home/DataSourceManagement/ApiManagement',
        });
      };

      const dataSourceInput = [];
      const columnsInput = [
        {
          title: '参数名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '参数位置',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '数据类型',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '是否必填',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '默认值',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '参数描述',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '操作',
          dataIndex: 'address',
          key: 'address',
        },
      ];

      const dataSourceBody = [];
      const columnsBody = [
        {
          title: '参数名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '参数位置',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '数据类型',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '是否必填',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '默认值',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '参数描述',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '操作',
          dataIndex: 'address',
          key: 'address',
        },
      ];

      const dataSourceReturn = [];
      const columnsReturn = [
        {
          title: '参数名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '数据类型',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '参数描述',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '操作',
          dataIndex: 'address',
          key: 'address',
        },
      ];
      // 测试数据
      const test_dataSource = [];
      const test_columns = [
        {
          title: '参数名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '参数位置',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '数据类型',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '是否必填',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '测试值',
          dataIndex: 'address',
          key: 'address',
        },
      ];
      // 测试抽屉
      const visible = ref<boolean>(false);

      const afterVisibleChange = (bool: boolean) => {
        console.log('visible', bool);
      };

      const testApi = () => {
        visible.value = true;
      };
      const close_test = () => {
        visible.value = false;
      };

      return {
        validate,
        validateInfos,
        resetFields,
        api_basic,
        message,
        current,

        buttonWidth,
        text,
        confirm,
        steps: [
          {
            title: '基本信息',
            content: 'basicmsg',
          },
          {
            title: '参数配置',
            content: 'paraconfig',
          },
        ],
        next,
        prev,

        dataSourceInput,
        columnsInput,

        dataSourceBody,
        columnsBody,

        dataSourceReturn,
        columnsReturn,

        test_dataSource,
        test_columns,

        visible,
        afterVisibleChange,
        testApi,
        close_test,
      };
    },
  });
</script>
<style scoped>
  .regStep {
    padding: 10px;
    background: #fff;
  }

  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    padding-top: 30px;
    min-height: 200px;
    text-align: center;
    background-color: #fafafa;
  }

  .steps-action {
    margin-top: 24px;
    text-align: right;
  }

  [data-theme='dark'] .steps-content {
    border: 1px dashed #404040;
    background-color: #2f2f2f;
  }

  .basicmsg ::after {
    position: absolute;
    top: 4px;
    left: -27%;
    width: 4px;
    height: 20px;
    background: #0079fe;
  }

  .test_apimsg {
    width: 50%;
  }

  .test_title {
    display: inline-block;
    margin: 2% 0;
    width: 20%;
    text-align: right;
  }

  .test_return {
    width: 50%;
  }
</style>
