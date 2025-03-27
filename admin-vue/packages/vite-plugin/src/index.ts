import { base } from "./base";
import { config } from "./config";
import { demo } from "./demo";
import { getProxyTarget } from "./proxy";
import type { Config } from "../types";
import { virtual } from "./virtual";
import { merge } from "lodash";

export function cool(options: Config.Options) {
	// 应用类型，admin | app
	config.type = options.type;

	// 请求地址
	config.reqUrl = getProxyTarget(options.proxy);

	// 是否开启名称标签
	config.nameTag = options.nameTag ?? true;

	// Eps
	if (options.eps) {
		const { dist, mapping, api, enable = true } = options.eps;

		// 是否开启
		config.eps.enable = enable;

		// 类型
		if (api) {
			config.eps.api = api;
		}

		// 输出目录
		if (dist) {
			config.eps.dist = dist;
		}

		// 匹配规则
		if (mapping) {
			merge(config.eps.mapping, mapping);
		}
	}

	return [base(), virtual(), demo(options.demo)];
}
