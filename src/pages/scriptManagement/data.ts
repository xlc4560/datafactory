import { columnsType } from '@/pages/apiRegisterAndUpdate/dataType';
export const tableColumns: columnsType[] = [
  {
    title: '脚本名称',
    dataIndex: 'scriptName',
  },
  {
    title: '脚本类型',
    dataIndex: 'scriptCategory',
  },
  {
    title: '脚本状态',
    dataIndex: 'scriptState',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];
export const scriptStateOption: { value: number; lable: string }[] = [
  { value: 0, lable: '未发布' },
  { value: 1, lable: '已发布' },
  { value: 2, lable: '已停用' },
];
export const scriptType: { value: number; lable: string }[] = [
  { value: 0, lable: 'Python脚本' },
  { value: 1, lable: 'SQL脚本' },
];
