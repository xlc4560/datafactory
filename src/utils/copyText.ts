import { message } from 'ant-design-vue';
// 方案一
// export const copyText = (copyData: string | number) => {
//   const input = document.createElement('input'); // js创建一个input输入框
//   input.value = copyData + ''; // 将需要复制的文本赋值到创建的input输入框中
//   document.body.appendChild(input); // 将输入框暂时创建到实例里面
//   input.select(); // 选中输入框中的内容
//   document.execCommand('Copy'); // 执行复制操作
//   document.body.removeChild(input); // 最后删除实例中临时创建的input输入框，完成复制操作
// };
// 方案2
export const copyText = async (copyData: string | number | null | object) => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(copyData));
    message.success('复制成功', 1);
  } catch (error) {
    try {
      const input = document.createElement('input'); // js创建一个input输入框
      input.value = JSON.stringify(copyData) + ''; // 将需要复制的文本赋值到创建的input输入框中
      document.body.appendChild(input); // 将输入框暂时创建到实例里面
      input.select(); // 选中输入框中的内容
      document.execCommand('Copy'); // 执行复制操作
      document.body.removeChild(input); // 最后删除实例中临时创建的input输入框，完成复制操作
      message.success('复制成功', 1);
    } catch (error) {
      message.error('复制失败', 1);
    }
  }
};
