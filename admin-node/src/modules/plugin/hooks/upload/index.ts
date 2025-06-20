import { BaseUpload, MODETYPE } from './interface';
import { BasePluginHook } from '../base';
import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';
import { v1 as uuid } from 'uuid';
import { CoolCommException } from '@cool-midway/core';
import * as _ from 'lodash';
import { pUploadPath } from '../../../../comm/path';
import CosUtil from './upload_cos';
/**
 * 文件上传
 */
export class CoolPlugin extends BasePluginHook implements BaseUpload {
  /**
   * 获得上传模式
   * @returns
   */
  async getMode() {
    return {
      mode: MODETYPE.LOCAL,
      type: MODETYPE.LOCAL,
    };
  }

  /**
   * 获得原始操作对象
   * @returns
   */
  async getMetaFileObj() {
    return;
  }

  /**
   * 下载并上传
   * @param url
   * @param fileName
   */
  async downAndUpload(url: string, fileName?: string) {
    const { domain } = this.pluginInfo.config;
    // 从url获取扩展名
    const extend = path.extname(url);
    const download = require('download');
    // 数据
    const data = url.includes('http')
      ? await download(url)
      : fs.readFileSync(url);
    // 创建文件夹
    const dirPath = path.join(pUploadPath(), `${moment().format('YYYYMMDD')}`);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const uuidStr = uuid();
    const name = `${moment().format('YYYYMMDD')}/${
      fileName ? fileName : uuidStr + extend
    }`;
    fs.writeFileSync(
      `${dirPath}/${fileName ? fileName : uuid() + extend}`,
      data
    );
    return `${domain}/upload/${name}`;
  }

  /**
   * 指定Key(路径)上传，本地文件上传到存储服务
   * @param filePath 文件路径
   * @param key 路径一致会覆盖源文件
   */
  async uploadWithKey(filePath: any, key: any) {
    const { domain } = this.pluginInfo.config;
    const data = fs.readFileSync(filePath);
    fs.writeFileSync(path.join(this.app.getBaseDir(), '..', key), data);
    return domain + key;
  }

  /**
   * 上传文件
   * @param ctx
   * @param key 文件路径
   */
  async upload(ctx: any) {
    const { domain } = this.pluginInfo.config;
    const uploadUtil = new CosUtil();
    try {
      const { key } = ctx.fields;
      if (
        key &&
        (key.includes('..') ||
          key.includes('./') ||
          key.includes('\\') ||
          key.includes('//'))
      ) {
        throw new CoolCommException('非法的key值');
      }
      if (_.isEmpty(ctx.files)) {
        throw new CoolCommException('上传文件为空');
      }
      const basePath = pUploadPath();

      const file = ctx.files[0];
      const extension = file.filename.split('.').pop();
      const name =
        moment().format('YYYYMMDD') + '/' + (key || `${uuid()}.${extension}`);
      const target = path.join(basePath, name);
      const dirPath = path.join(basePath, moment().format('YYYYMMDD'));
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
      const data = fs.readFileSync(file.data);
      fs.writeFileSync(target, data);
      // 云端上传方式
      // const cosResult = await uploadUtil.putObject({
      //   key: name,
      //   buffer: data,
      // });
      // return `https://${cosResult.Location}`;

      return domain + '/upload/' + name;
    } catch (err) {
      console.error(err);
      throw new CoolCommException('上传失败' + err.message);
    }
  }
}

// 导出插件实例， Plugin名称不可修改
export const Plugin = CoolPlugin;
