import { ModuleConfig } from '@cool-midway/core';

/**
 * 模块配置
 */
export default () => {
  return {
    // 模块名称
    name: '订单模块',
    // 模块描述
    description: '包含订单和评价功能',
  } as ModuleConfig;
};
