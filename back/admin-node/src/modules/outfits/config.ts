import { ModuleConfig } from '@cool-midway/core';

/**
 * 模块配置
 */
export default () => {
  return {
    // 模块名称
    name: '穿搭分享模块',
    // 模块描述
    description: '穿搭分享信息管理',
    // 中间件，只对本模块有效
    middlewares: [],
    // 全局中间件
    globalMiddlewares: [],
  } as ModuleConfig;
};
