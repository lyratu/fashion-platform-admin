import { ModuleConfig } from '@cool-midway/core';

/**
 * 模块配置
 */
export default () => {
  return {
    // 必须，模块名称
    name: '衣服模块',
    // 必须，模块描述
    description: '衣服相关功能',
    // 可选，中间件，只对本模块有效
    middlewares: [],
    // 可选，全局中间件
    globalMiddlewares: [],
    // 可选，模块加载顺序，默认为0，值越大越优先加载
    order: 0,
  } as ModuleConfig;
};
