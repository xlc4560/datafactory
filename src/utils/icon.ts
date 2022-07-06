import { createVNode } from 'vue';
import * as $Icon from '@ant-design/icons-vue';
// 用于动态生成icon图标
export const Icon = (props: { icon: string }) => {
  if (typeof props.icon === 'string') {
    const { icon } = props;
    const antIcon: { [key: string]: any } = $Icon;
    return createVNode(antIcon[icon]);
  }
};
