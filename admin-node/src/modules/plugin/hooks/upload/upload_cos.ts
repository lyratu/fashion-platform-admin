const COS: any = require('cos-nodejs-sdk-v5');
import fs = require('fs');

// 定义配置接口
interface CosConfig {
  Bucket?: string;
  Region?: string;
  Prefix?: string;
}

// 定义上传参数接口
interface PutObjectParam {
  key: string;
  buffer: fs.ReadStream | Buffer;
}

class CosUtil {
  private cos;
  private Bucket: string;
  private Region: string;
  private Prefix: string;

  // 构造函数，初始化配置
  constructor(config?: CosConfig) {
    this.Bucket = config?.Bucket || 'lyratu-1314718580'; // 存储桶名称
    this.Region = config?.Region || 'ap-guangzhou'; // 存储桶区域
    this.Prefix = config?.Prefix || ''; // 路径前缀

    // 初始化 COS 实例
    this.cos = new COS({
      SecretId: 'AKIDPnDW63zsZGuOiqlYGmEf5OetzrWyDIFy', // 密钥id
      SecretKey: 'Zu1tXw7CAwUp4MTP7bsumQs66sQmuqZ7', // 密钥key
    });
  }

  // 上传文件方法
  public putObject(param: PutObjectParam): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cos.putObject(
        {
          Bucket: this.Bucket, // 必须
          Region: this.Region, // 必须
          Key: param.key, // 必须
          Body: param.buffer, // 必须
        },
        (err: Error, data: any) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        }
      );
    });
  }
  public getName(imageUrl: string): string {
    // 解析 URL
    const parsedUrl = new URL(imageUrl);

    // 获取路径部分
    const pathname = parsedUrl.pathname;

    // 提取文件名
    const imageName = pathname.split('/').pop() || '';

    return imageName;
  }
}

export default CosUtil;
