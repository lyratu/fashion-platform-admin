<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 条件搜索 -->
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: "clothes-suit",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";
import UserSelect from "/$/user/components/user-select.vue";

const { service } = useCool();
const { t } = useI18n();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t("穿搭照"),
			prop: "photo",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("适穿温度"),
			prop: "temperature",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("季节"),
			prop: "season",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("适合场景"),
			prop: "scene",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("风格"),
			prop: "style",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("搭配标签"),
			prop: "tags",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("备注"),
			prop: "remark",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("配置"),
			prop: "config",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("选择关联用户"),
			prop: "userId",
			component: { vm: UserSelect },
			required: true,
		},
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t("穿搭照"), prop: "photo", minWidth: 120 },
		{ label: t("适穿温度"), prop: "temperature", minWidth: 120 },
		{ label: t("季节"), prop: "season", minWidth: 120 },
		{ label: t("适合场景"), prop: "scene", minWidth: 120 },
		{ label: t("风格"), prop: "style", minWidth: 120 },
		{ label: t("搭配标签"), prop: "tags", minWidth: 120 },
		{ label: t("备注"), prop: "remark", minWidth: 120 },
		{ label: t("配置"), prop: "config", minWidth: 120 },
		{
			label: t("创建时间"),
			prop: "createTime",
			minWidth: 170,
			sortable: "desc",
			component: { name: "cl-date-text" },
		},
		{
			label: t("更新时间"),
			prop: "updateTime",
			minWidth: 170,
			sortable: "custom",
			component: { name: "cl-date-text" },
		},
		{ type: "op", buttons: ["edit", "delete"] },
	],
});

// cl-search
const Search = useSearch();

// cl-crud
const Crud = useCrud(
	{
		service: service.clothes.suit,
	},
	(app) => {
		app.refresh();
	},
);

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
