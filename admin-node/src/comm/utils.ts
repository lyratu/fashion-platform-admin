import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import * as moment from 'moment';
import * as path from 'path';

/**
 * 帮助类
 */
@Provide()
@Scope(ScopeEnum.Singleton)
export class Utils {
  @Inject()
  baseDir;

  /**
   * 获得dist路径
   */
  getDistPath() {
    const runPath = __dirname;
    const distIndex =
      runPath.lastIndexOf('/dist/') !== -1
        ? runPath.lastIndexOf('/dist/')
        : runPath.lastIndexOf('\\dist\\');
    if (distIndex !== -1) {
      return path.join(runPath.substring(0, distIndex), 'dist');
    }
    return path.join(runPath, 'dist');
  }

  /**
   * 获得请求IP
   */
  async getReqIP(ctx: Context) {
    const req = ctx.req;
    return (
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress?.replace('::ffff:', '') ||
      ''
    );
  }

  /**
   * 去除对象的空值属性
   * @param obj
   */
  async removeEmptyP(obj) {
    Object.keys(obj).forEach(key => {
      if (obj[key] === null || obj[key] === '' || obj[key] === 'undefined') {
        delete obj[key];
      }
    });
  }

  /**
   * 线程阻塞毫秒数
   * @param ms
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 获得最近几天的日期集合
   * @param recently
   */
  getRecentlyDates(recently, format = 'YYYY-MM-DD') {
    moment.locale('zh-cn');
    const dates = [];
    for (let i = 0; i < recently; i++) {
      dates.push(moment().subtract(i, 'days').format(format));
    }
    return dates.reverse();
  }
  /**
   * 获得最近几个月的月数
   * @param recently
   */
  getRecentlyMonths(recently, format = 'YYYY-MM') {
    moment.locale('zh-cn');
    const dates = [];
    const date = moment(Date.now()).format('YYYY-MM');
    for (let i = 0; i < recently; i++) {
      dates.push(moment(date).subtract(i, 'months').format(format));
    }
    return dates.reverse();
  }

  /**
   * 根据开始和结束时间，获得时间段内的日期集合
   * @param start
   * @param end
   */
  getBetweenDays(start, end, format = 'YYYY-MM-DD') {
    moment.locale('zh-cn');
    const dates = [];
    const startTime = moment(start).format(format);
    const endTime = moment(end).format(format);
    const days = moment(endTime).diff(moment(startTime), 'days');
    for (let i = 0; i <= days; i++) {
      dates.push(moment(startTime).add(i, 'days').format(format));
    }
    return dates;
  }

  /**
   * 根据开始和结束时间，获得时间段内的月份集合
   * @param start
   * @param end
   */
  getBetweenMonths(start, end, format = 'YYYY-MM') {
    moment.locale('zh-cn');
    const dates = [];
    const startTime = moment(start).format(format);
    const endTime = moment(end).format(format);
    const months = moment(endTime).diff(moment(startTime), 'months');
    for (let i = 0; i <= months; i++) {
      dates.push(moment(startTime).add(i, 'months').format(format));
    }
    return dates;
  }

  /**
   * 根据开始和结束时间，获得时间段内的小时集合
   * @param start
   * @param end
   */
  getBetweenHours(start, end, format = 'YYYY-MM-DD HH') {
    moment.locale('zh-cn');
    const dates = [];
    const startTime = moment(start).format(format);
    const endTime = moment(end).format(format);
    const hours = moment(endTime).diff(moment(startTime), 'hours');
    for (let i = 0; i <= hours; i++) {
      dates.push(moment(startTime).add(i, 'hours').format(format));
    }
    return dates;
  }

  /**
   * 字段转驼峰法
   * @param obj
   * @returns
   */
  toCamelCase(obj) {
    const camelCaseObject = {};
    for (const i in obj) {
      const camelCase = i.replace(/([-_][a-z])/gi, $1 => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
      });
      camelCaseObject[camelCase] = obj[i];
    }
    return camelCaseObject;
  }

  /**
   * 匹配URL
   * @param pattern
   * @param url
   * @returns
   */
  matchUrl(pattern, url) {
    // 将 pattern 和 url 按 `/` 分割
    const patternParts = pattern.split('/').filter(Boolean);
    const urlParts = url.split('/').filter(Boolean);
    // 如果长度不匹配且 pattern 不包含 **，直接返回 false
    if (patternParts.length !== urlParts.length && !pattern.includes('**')) {
      return false;
    }
    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i];
      const urlPart = urlParts[i];
      // 如果 patternPart 是 **，匹配剩余的所有部分
      if (patternPart === '**') {
        return true;
      }
      // 如果 patternPart 以 : 开头，说明是参数，直接匹配任意非空值
      if (patternPart.startsWith(':')) {
        if (!urlPart) {
          return false;
        }
        continue;
      }
      // 如果 patternPart 是 *，匹配任意非空部分
      if (patternPart === '*') {
        if (!urlPart) {
          return false;
        }
      } else if (patternPart !== urlPart) {
        return false;
      }
    }
    // 如果 pattern 和 url 的部分数量一致，则匹配成功
    return patternParts.length === urlParts.length;
  }
}
