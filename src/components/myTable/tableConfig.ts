import { inputParameterDataType } from '@/pages/apiRegisterAndUpdate/dataType';

// 遍历树形结构 处理isEdit数据
export const changeIsEdit = (data_: inputParameterDataType[], edit: boolean) => {
  data_.forEach((i: inputParameterDataType) => {
    i.isEdit = !edit;
    if (i.children) {
      changeIsEdit(i.children, edit);
    }
  });
};
// 码值定义弹窗中table的配置
export const codeValueModalTableColumns = [
  {
    title: '码值取值',
    dataIndex: 'codeValue',
  },
  {
    title: '码值名称',
    dataIndex: 'codeName',
  },
  {
    title: '码值含义',
    dataIndex: 'codeDescription',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '200px',
  },
];
// 模拟数据
export const SimulationData = [];

// 新增码表码值与码表引用弹窗表格配置
export const codeModalTableColumns = [
  {
    title: '码值取值',
    dataIndex: 'codeValue',
  },
  {
    title: '码值名称',
    dataIndex: 'codeName',
  },
  {
    title: '码值含义',
    dataIndex: 'codeDescription',
  },
];
