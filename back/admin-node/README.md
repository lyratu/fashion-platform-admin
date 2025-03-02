# 智能时尚穿搭后台管理系统
## 代码目录
 ├── .vscode
 ├── public(静态资源文件，如js、css或者上传的文件)
 ├── src
 │   └── comm(通用库)
 │   └── modules(项目模块)
 │   └── config
 │   │    └── config.default.ts(默认配置，不区分环境，都生效)
 │   │    └── config.local.ts(本地开发配置，对应npm run dev)
 │   │    └── config.prod.ts(生产环境配置，对应npm run start)
 │   │    └── plugin.ts(插件配置)
 │   └── configuration.ts(midway的配置文件)
 │   └── welcome.ts(环境的controller)
 │   └── interface.ts(类型声明)
 ├── test
 ├── package.json(依赖管理，项目信息)
 ├── bootstrap.js(生产环境启动入口文件，可借助pm2等工具多进程启动)
 └── tsconfig.json

## 模块目录
 ├── modules
 │   └── base(基础的权限管理系统)
 │   │    └── controller(api接口)
 │   │    └── dto(参数校验)
 │   │    └── entity(实体类)
 │   │    └── middleware(中间件)
 │   │    └── schedule(定时任务)
 │   │    └── service(服务，写业务逻辑)
 │   │    └── config.ts(模块的配置)
 │   │    └── db.json(初始化该模块的数据)
 │   │    └── menu.json(初始化该模块的菜单)
