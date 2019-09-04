/*
 * @Description: In User Settings Edit
 * @Author: Odinge
 * @Date: 2019-05-20 08:51:25
 * @LastEditTime: 2019-09-04 09:30:58
 * @LastEditors: Please set LastEditors
 */
// 注册组件
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const requireComponent = require.context(
  ".",
  true,
  /\.vue$/
  //找到components文件夹下以.vue命名的文件
);
export default Vue => {
  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);

    const componentName = capitalizeFirstLetter(
      // fileName
      fileName.replace(/.+\//g, "").replace(/\.\w+$/, "")
      // fileName.rpelace()
      //因为得到的filename格式是: './baseButton.vue', 所以这里我们去掉头和尾，只保留真正的文件名
    );

    Vue.component(componentName, componentConfig.default || componentConfig);
  });
};
