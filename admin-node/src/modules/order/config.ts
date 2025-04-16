import { ModuleConfig } from '@cool-midway/core';

/**
 * 模块配置
 */
export default () => {
  return {
    // 模块名称
    name: '订单模块',
    // 模块描述
    description: '提供订单相关功能',
    // 中间件，只对本模块有效
    middlewares: [],
    // 全局中间件
    globalMiddlewares: [],
    // 模块加载顺序，默认为0，值越大越优先加载
    order: 0,
  } as ModuleConfig;
};
