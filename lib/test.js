// 引用vue
import Vue from 'vue';
// 引用要测试的组件
import child from '../example.vue';
// 引入断言库
import {expect} from 'chai';

/**
 * 获取生成的vm
 *
 * @param {Object} Component 组件
 * @param {Object} propsData props数据
 * @return {Object} vue实例
 */
function getVM(Component, propsData) {
  const Vueor = Vue.extend(Component)
  return new Vueor({propsData}).$mount()
}

// 描述要测试的内容
describe('测试示例.vue', () => {
  // 描述要测试的最小单元
  it('测试属性message修改', () => {
    let childvm = getVM(child, {message: 'message edit'})
    // 断言组件的child组件的props是否生效
    expect(childvm.message).to.be.equal('message edit');
  });
});
