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

        <a-form-item label="接口名称" v-bind="validateInfos.apiName">
          <a-input v-model:value="api_basic.apiName" :disabled="api_basic.apiState === 4" />
        </a-form-item>

        <a-form-item v-bind="validateInfos.apiSource" label="接口来源">
          <a-select v-model:value="api_basic.apiSource" :disabled="api_basic.apiState === 4" style="text-align: left">
            <a-select-option value="数据服务">数据服务</a-select-option>
            <a-select-option value="指标管理">指标管理</a-select-option>
            <a-select-option value="决策引擎">决策引擎</a-select-option>
            <a-select-option value="数据工厂">数据工厂</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="接口描述" v-bind="validateInfos.apiDescription">
          <a-textarea v-model:value="api_basic.apiDescription" :auto-size="{ minRows: 2, maxRows: 5 }" />
        </a-form-item>
        <!-- api参数 -->
        <a-form-item label="API参数" :colon="false" class="basicmsg"> </a-form-item>

        <a-form-item label="协议" v-bind="validateInfos.apiProtocol">
          <a-select v-model:value="api_basic.apiProtocol" :disabled="api_basic.apiState === 4 || api_basic.apiState === 2" style="text-align: left">
            <a-select-option v-for="i in apiprotocol" :key="i.value" :value="i.value">{{ i.msg }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="IP端口" v-bind="validateInfos.apiIpPort">
          <a-input v-model:value="api_basic.apiIpPort" />
        </a-form-item>

        <a-form-item label="Path" v-bind="validateInfos.apiPath">
          <a-input v-model:value="api_basic.apiPath" :disabled="api_basic.apiState === 4 || api_basic.apiState === 2" />
        </a-form-item>

        <a-form-item label="请求方式" v-bind="validateInfos.apiMethod">
          <a-select v-model:value="api_basic.apiMethod" :disabled="api_basic.apiState === 4 || api_basic.apiState === 2" style="text-align: left">
            <a-select-option v-for="i in apimethod" :key="i.value" :value="i.value">{{ i.msg }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="超时时间" v-bind="validateInfos.apiTimeout">
          <a-input v-model:value="api_basic.apiTimeout" />
        </a-form-item>

        <!-- 重置按钮 -->
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }" class="resetbtn">
          <a-button @click="resetFields">重置</a-button>
        </a-form-item>
      </a-form>
    </div>

    <!--2. 参数配置 -->

    <!-- 输入参数 -->
    <div v-if="steps[current].content == 'paraconfig'" class="steps-content">
      <!-- 输入参数标题 -->
      <a-page-header class="demo-page-header" title="输入参数">
        <template #extra>
          <a-button key="1" type="primary" @click="addApi">新增参数</a-button>
        </template>
      </a-page-header>
      <!-- 输入参数表格 -->
      <div class="inputparahead">
        <p class="inputparaheadtitle">参数名称</p>
        <p class="inputparaheadtitle">参数位置</p>
        <p class="inputparaheadtitle">数据类型</p>
        <p class="inputparaheadtitle">是否必填</p>
        <p>默认值</p>
        <p>参数描述</p>
        <p>操作</p>
      </div>
      <a-form :model="api_basic" @finish="onFinish">
        <a-space v-for="(apipara, index) in api_basic.apiParameter" :key="apipara.parameterApiId" class="apiparaform" align="baseline">
          <a-form-item :name="['apiParameter', index, 'parameterName']" :rules="[{ required: true, message: '此为必填项' }]">
            <a-input v-model:value="apipara.parameterName" :disabled="apipara.inputstate" class="apiparainput" placeholder="请输入" />
          </a-form-item>

          <a-form-item :name="['apiParameter', index, 'parameterPosition']" :rules="[{ required: true, message: '此为必填项' }]">
            <a-select v-model:value="apipara.parameterPosition" :disabled="apipara.inputstate" class="apiparainput" placeholder="请选择">
              <a-select-option v-for="i in parameterposition" :key="i.value" :value="i.value">{{ i.msg }}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item :name="['apiParameter', index, 'parameterType']" :rules="[{ required: true, message: '此为必填项' }]">
            <a-select v-model:value="apipara.parameterType" :disabled="apipara.inputstate" class="apiparainput" placeholder="请选择">
              <a-select-option v-for="i in parametertype" :key="i.value" :value="i.value">{{ i.msg }}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item :name="['apiParameter', index, 'parameterRequire']" :rules="[{ required: true, message: '此为必填项' }]">
            <a-select v-model:value="apipara.parameterRequire" :disabled="apipara.inputstate" class="apiparainput" placeholder="请选择">
              <a-select-option v-for="i in parameterrequire" :key="i.value" :value="i.value">{{ i.msg }}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item>
            <a-input v-model:value="apipara.parameterDefault" :disabled="apipara.inputstate" class="apiparainput" placeholder="请输入" />
          </a-form-item>

          <a-form-item>
            <a-input v-model:value="apipara.parameterDescription" :disabled="apipara.inputstate" class="apiparainput" placeholder="请输入" />
          </a-form-item>

          <a v-if="apipara.inputstate === true" @click="statechange(index, false)">编辑</a>
          <a v-if="apipara.inputstate === false || !apipara.inputstate" @click="statechange(index, true)">保存</a>
          <!-- 删除 -->
          <a-popconfirm title="Are you sure？" ok-text="Yes" cancel-text="No" @confirm="removeApi(index)">
            <a>删除</a>
          </a-popconfirm>
        </a-space>
        <!-- 按钮提交 -->
        <!-- <a-form-item v-if="api_basic.apiParameter?.length !== 0" style="margin-right: 2%; text-align: right">
          <a-button type="primary" html-type="submit">保存</a-button>
        </a-form-item> -->
      </a-form>
    </div>

    <!-- 请求body -->
    <div v-if="steps[current].content == 'paraconfig' && api_basic.apiMethod === 1" class="steps-content">
      <!-- 输入参数标题 -->
      <a-page-header class="demo-page-header" title="请求Body"> </a-page-header>
      <div class="bodyleft">
        <a-textarea v-model:value="api_basic.apiRequestBody" style="height: 300px"></a-textarea>
      </div>
    </div>

    <!-- 返回参数 -->
    <div v-if="steps[current].content == 'paraconfig'" class="steps-content">
      <!-- 标题 -->
      <a-page-header class="demo-page-header" title="返回示例"> </a-page-header>
      <div class="return">
        <a-textarea v-model:value="api_basic.apiResponse" style="border: 1px solid; width: 50%; height: 300px"></a-textarea>

        <div class="returnright">{{ api_basic.apiResponse }}</div>
      </div>
    </div>

    <!-- 按钮组 -->
    <div class="steps-action">
      <!-- 测试 -->
      <a-button v-if="steps[current].content == 'paraconfig'" style="margin-right: 10px" @click="showDrawer(true, '10')">测试</a-button>
      <!-- 取消 -->
      <a-popconfirm placement="top" ok-text="是" cancel-text="否" :style="{ marginRight: `${buttonWidth}px`, whiteSpace: 'nowrap' }" @confirm="confirm">
        <template #title>
          <p>{{ text }}</p>
        </template>
        <a-button style="margin-right: 10px">取消</a-button>
      </a-popconfirm>
      <!-- 保存草稿并退出 -->
      <a-button style="margin-right: 10px" @click="completelAdd(1)">保存草稿</a-button>
      <!-- 下一步 -->
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">下一步</a-button>
      <!-- 完成并退出 -->
      <a-button v-if="current == steps.length - 1" type="primary" @click="completelAdd(2)"> 保存并退出 </a-button>
      <!-- 上一步 -->
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">上一步</a-button>
    </div>

    <!-- 接口测试抽屉 -->
    <api-test :drawer-visible="drawerVisible" :api-basic="api_basic" @on-close="visible => showDrawer(visible, '10')" />
  </div>
</template>
<script lang="ts">
  import ApiTest from './apiTest.vue';
  import { defineComponent, ref, reactive, onMounted } from 'vue';
  import { message, Form } from 'ant-design-vue';
  import { useRouter, useRoute } from 'vue-router';
  import * as request from '@/api/apiManagement';
  const useForm = Form.useForm;

  interface apiparas {
    id: number | null;
    apiName: string;
    apiSource: string;
    apiType: string;
    apiProtocol: number | null; // 接口协议(0:http 1:https)
    apiMethod: number | null; // 请求方式请求方式(0:get 1:post)
    apiIpPort: string;
    apiPath: string;
    apiState: number | null;
    apiResponse: string;
    apiTimeout: number | null;
    apiRequestBody?: string;
    apiDescription?: string;
    apiParameter?: {
      parameterApiId: number | null;
      parameterName: string;
      parameterType: number | null;
      parameterRequire: number | null; //是否必须 (0:非必填 1:必填)
      parameterPosition: number | null; //参数位置(0:query 1:header 3:body)
      parameterDescription?: string;
      parameterDefault: string;
      inputstate?: boolean;
    }[];
  }
  export default defineComponent({
    components: {
      ApiTest,
    },
    setup() {
      const apimethod = reactive([
        { value: 0, msg: 'GET' },
        { value: 1, msg: 'POST' },
      ]);
      const apiprotocol = reactive([
        { value: 0, msg: 'HTTP' },
        { value: 1, msg: 'HTTPS' },
      ]);
      const parametertype = reactive([
        { value: 0, msg: 'String' },
        { value: 1, msg: 'Interger' },
        { value: 2, msg: 'number' },
      ]);
      const parameterrequire = reactive([
        { value: 0, msg: '否' },
        { value: 1, msg: '是' },
      ]);
      const parameterposition = reactive([
        { value: 0, msg: 'query' },
        { value: 1, msg: 'header' },
      ]);
      // const base = ref<any>({});
      const route = useRoute();
      // api基本信息和参数
      const api_basic = ref<apiparas>({
        id: null,
        apiType: '',
        apiState: 1, //api状态  1草稿  2未发布  3已发布  4已停用
        apiName: '',
        apiSource: '',
        apiDescription: '',
        apiProtocol: null, //0:http  1:https
        apiIpPort: '192.168.1.1:1',
        apiPath: '/1',
        apiMethod: null, //0:get 1:post
        apiTimeout: 30,
        apiRequestBody: '请求body',
        apiResponse: '返回示例',
        apiParameter: [],
      });
      // 新增参数
      const addApi = () => {
        api_basic.value.apiParameter?.push({
          parameterApiId: null,
          parameterName: '',
          parameterType: null,
          parameterRequire: null,
          parameterDefault: '',
          parameterPosition: null,
          parameterDescription: '',
          inputstate: false,
        });
      };

      onMounted(async () => {
        const res = await request.GetApiDetails(route.params.id as string);
        console.log(res);

        api_basic.value = res;

        // api_basic.value.inputState =
      });

      // 验证规则
      const rulesRef = reactive({
        apiName: [
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
        apiSource: [
          {
            required: true,
            message: '请选择接口来源',
          },
        ],
        apiProtocol: [
          {
            required: true,
            message: '请选协议',
          },
        ],
        apiDescription: [
          {
            max: 1000,
            message: '限制1000个字符',
          },
        ],
        apiIpPort: [
          {
            required: true,
            message: '请输入IP端口',
          },
          {
            pattern: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)+:\d{1,5}\/?$/,
            message: '请输入正确的端口号',
          },
        ],
        apiPath: [
          {
            required: true,
            message: '请输入路径',
          },
          {
            pattern: /^\//,
            message: '请输入正确的路径',
          },
        ],
        apiMethod: [
          {
            required: true,
            message: '请选择请求方式',
          },
        ],
        apiTimeout: [
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
        parameterRule: [
          {
            required: true,
            message: '此为必填项',
          },
        ],
      });

      // 上下页并验证
      const { resetFields, validate, validateInfos } = useForm(api_basic, rulesRef);

      const current = ref<number>(0);
      const next = async () => {
        const code: { code: any } = {
          code: 100200,
        };
        if (route.params.id) {
          code.code = await request.ApiCheck({
            checkOperation: 1,
            ...api_basic.value,
          });
        } else {
          code.code = await request.ApiCheck({
            checkOperation: 0,
            ...api_basic.value,
          });
        }
        if (typeof code.code !== 'number') {
          validate()
            .then(() => {
              current.value++;
            })
            .catch(err => {
              console.log('error', err);
            });
        }
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
      // 删除输入参数
      const removeApi = (item: number) => {
        if (api_basic.value.apiParameter !== undefined) api_basic.value.apiParameter.splice(item, 1);
      };

      // 保存按钮
      const onFinish = () => {
        console.log(api_basic);
        message.success({
          content: '已保存',
          duration: 1,
        });
      };
      //完成并退出  保存草稿
      const completelAdd = async (state: 1 | 2) => {
        let code;
        // 后端验证数据
        if (route.params.id) {
          code = await request.ApiCheck({
            checkOperation: 1,
            ...api_basic.value,
          });
        } else {
          code = await request.ApiCheck({
            checkOperation: 0,
            ...api_basic.value,
          });
        }
        // 验证是否通过
        if (typeof code !== 'number') {
          api_basic.value.apiState = state;
          let code;
          if (route.params.id) {
            // 修改
            code = await request.UpdateApi(api_basic.value, state);
          } else {
            // 注册
            code = await request.RegisterApi({ checkOperation: 0, ...api_basic.value });
          }
          if (typeof code !== 'number') {
            router.push({
              path: '/Home/DataSourceManagement/ApiManagement',
            });
          }
        }
      };
      // 切换保存编辑状态
      const statechange = (item: number, inputstate: boolean) => {
        if (api_basic.value.apiParameter !== undefined) {
          api_basic.value.apiParameter[item].inputstate = inputstate;
        }
      };

      // 测试api数据
      const test_columns = [
        {
          title: '参数名称',
          dataIndex: 'parameterName',
          key: 'parameterName',
        },
        {
          title: '参数位置',
          dataIndex: 'parameterPosition',
          key: 'parameterPosition',
        },
        {
          title: '数据类型',
          dataIndex: 'parameterType',
          key: 'parameterType',
        },
        {
          title: '是否必填',
          dataIndex: 'parameterRequire',
          key: 'parameterRequire',
        },
        {
          title: '测试值',
          dataIndex: 'address',
          key: 'address',
        },
      ];
      // 测试抽屉
      const drawerVisible = ref<boolean>(false);
      const showDrawer = (visible: boolean, id: string) => {
        // apiId.value = id;
        drawerVisible.value = visible;
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
        completelAdd,
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

        test_columns,

        drawerVisible,
        showDrawer,
        onFinish,
        removeApi,
        addApi,

        statechange,

        apimethod,
        apiprotocol,
        parametertype,
        parameterrequire,
        parameterposition,
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
    padding-top: 0px;
    padding-bottom: 30px;
    min-height: 200px;
    text-align: left;
    background-color: #fafafa;
  }

  .steps-action {
    margin-top: 24px;
    text-align: right;
  }

  .resetbtn {
    text-align: center;
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

  .bodyleft {
    margin: 0 auto;
    width: 90%;
  }

  .return {
    display: flex;
  }

  .returnright {
    overflow: auto;
    border: 1px solid;
    width: 50%;
    max-height: 300px;
  }

  .test_return {
    width: 50%;
  }

  .inputparahead {
    display: flex;
    justify-content: space-around;
    background: #fafafa;
  }

  .inputparahead p {
    margin-right: 6.5%;
  }

  .inputparahead :nth-child(1) {
    margin-left: 2%;
  }

  .apiparainput {
    margin-right: 40px;
    width: 100px;
  }

  .apiparaform {
    display: flex;
    justify-content: space-around;
  }

  .inputparaheadtitle::before {
    content: '*';
    color: red;
  }
</style>
