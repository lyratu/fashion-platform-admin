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
	name: "order-order",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";
import { reactive } from "vue";
import UserSelect from "/$/user/components/user-select.vue";

const { service } = useCool();
const { t } = useI18n();

// 选项
const options = reactive({
	status: [
		{ label: t("已下单"), value: 0 },
		{ label: t("等待发货"), value: 1 },
		{ label: t("运输中"), value: 2 },
		{ label: t("已签收"), value: 3 },
	],
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t("商品名称"),
			prop: "goodsName",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("价格"),
			prop: "price",
			hook: "number",
			component: { name: "el-input-number", props: { min: 0 } },
			span: 12,
			required: true,
		},
		{
			label: t("数量"),
			prop: "quantity",
			hook: "number",
			component: { name: "el-input-number", props: { min: 0 } },
			span: 12,
			required: true,
		},
		{
			label: t("状态"),
			prop: "status",
			component: { name: "el-radio-group", options: options.status },
			value: 0,
			required: true,
		},
		{
			label: t("商品详情"),
			prop: "goodsDetail",
			component: { name: "cl-editor-wang" },
		},
		{
			label: t("下单日期"),
			prop: "orderDate",
			component: {
				name: "el-date-picker",
				props: { type: "date", valueFormat: "YYYY-MM-DD" },
			},
			span: 12,
			required: true,
		},
		{ label: t("选择用户"), prop: "userId", component: { vm: UserSelect } },
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t("昵称"), prop: "userName", minWidth: 140 },
		{ label: t("商品名称"), prop: "goodsName", minWidth: 140 },
		{ label: t("价格"), prop: "price", minWidth: 140, sortable: "custom" },
		{
			label: t("数量"),
			prop: "quantity",
			minWidth: 140,
			sortable: "custom",
		},
		{
			label: t("状态"),
			prop: "status",
			minWidth: 120,
			dict: options.status,
		},
		{
			label: t("商品详情"),
			prop: "goodsDetail",
			minWidth: 120,
			component: { name: "cl-editor-preview", props: { name: "wang" } },
		},
		{
			label: t("下单日期"),
			prop: "orderDate",
			minWidth: 140,
			sortable: "custom",
			component: {
				name: "cl-date-text",
				props: { format: "YYYY-MM-DD" },
			},
		},
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
		service: service.order.order,
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
