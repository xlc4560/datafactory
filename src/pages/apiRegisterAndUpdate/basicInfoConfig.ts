import type { Rule } from 'ant-design-vue/es/form';
export const rules: Record<string, Rule[]> = {
  apiType: [{ required: true, message: '接口分类不能为空!' }],
  apiName: [{ required: true, message: '接口名称不能为空!' }],
  apiSource: [{ required: true, message: '接口来源不能为空!' }],
  apiProtocol: [{ required: true, message: '接口协议不能为空!' }],
  apiIpPort: [
    { required: true, message: 'IP端口不能为空!' },
    {
      pattern:
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/,
      message: '请输入正确的端口号',
      trigger: 'blur',
    },
  ],
  apiPath: [
    { required: true, message: 'Path不能为空!' },
    {
      pattern: /^\//,
      message: '路径格式错误',
    },
  ],
  apiMethod: [{ required: true, message: '请求方式不能为空!' }],
  apiTimeout: [
    { required: true, message: '超时时间不能为空' },
    {
      pattern: /^[1-9]\d*$/,
      message: '请输入正整数',
    },
    { type: 'number', min: 0, max: 10, message: '超出规定范围！' },
  ],
};
