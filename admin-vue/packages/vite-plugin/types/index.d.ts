export declare type Type = "app" | "admin";

export declare namespace Eps {
	interface Column {
		comment: string;
		nullable: boolean;
		propertyName: string;
		source: string;
		type: string;
		dict: string[] | string;
		defaultValue: any;
		[key: string]: any;
	}

	interface Entity {
		api: {
			dts: {
				parameters?: {
					description: string;
					name: string;
					required: boolean;
					schema: {
						type: string;
					};
				}[];
			};
			name: string;
			method: string;
			path: string;
			prefix: string;
			summary: string;
			tag: string;
		}[];
		columns: Column[];
		pageColumns: Column[];
		pageQueryOp: {
			fieldEq: string[];
			fieldLike: string[];
			keyWordLikeFields: string[];
		};
		search: {
			fieldEq: Column[];
			fieldLike: Column[];
			keyWordLikeFields: Column[];
		};
		module: string;
		name: string;
		prefix: string;
		[key: string]: any;
	}
}

export declare namespace Ctx {
	type Pages = {
		path?: string;
		style?: {
			[key: string]: any;
		};
		[key: string]: any;
	}[];

	type SubPackages = {
		root?: string;
		pages?: Ctx.Pages;
		[key: string]: any;
	}[];

	interface Data {
		appid?: string;
		pages?: Ctx.Pages;
		subPackages?: Ctx.SubPackages;
		modules?: string[];
		serviceLang: "Node" | "Java" | "Go" | "Python";
		[key: string]: any;
	}
}

export declare namespace Config {
	type Type = "app" | "admin";
	interface Eps {
		enable: boolean;
		api: "app" | "admin" | (string & {});
		dist: string;
		mapping: {
			type?: string;
			test?: string[];
			custom?(data: { propertyName: string; type: string }): any;
		}[];
	}
	interface Options {
		type: Config.Type;
		proxy: any;
		eps?: Partial<Config.Eps>;
		demo?: boolean;
		nameTag?: boolean;
	}
	interface Data {
		type: Config.Type;
		reqUrl: string;
		eps: Config.Eps;
		demo: boolean;
		[key: string]: any;
	}
}
