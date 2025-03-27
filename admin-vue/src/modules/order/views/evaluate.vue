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
	name: "order-evaluate",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";
import UserSelect from "/$/user/components/user-select.vue";
import OrderSelect from "/$/order/components/order-select.vue";

const { service } = useCool();
const { t } = useI18n();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{ label: t("选择用户"), prop: "userId", component: { vm: UserSelect } },
		{
			label: t("评价内容"),
			prop: "content",
			component: {
				name: "el-input",
				props: { type: "textarea", rows: 4 },
			},
			required: true,
		},
		{
			label: t("评价图片"),
			prop: "images",
			component: { name: "cl-upload", props: { multiple: true } },
		},
		{
			label: t("评价时间"),
			prop: "evaluateTime",
			component: {
				name: "el-date-picker",
				props: { type: "datetime", valueFormat: "YYYY-MM-DD HH:mm:ss" },
			},
			span: 12,
			required: true,
		},
		{
			label: t("点赞数量"),
			prop: "likeCount",
			hook: "number",
			component: { name: "el-input-number", props: { min: 0 } },
			span: 12,
			required: true,
		},
		{
			label: t("收藏数量"),
			prop: "collectCount",
			hook: "number",
			component: { name: "el-input-number", props: { min: 0 } },
			span: 12,
			required: true,
		},
		{
			label: t("选择订单"),
			prop: "orderId",
			component: { vm: OrderSelect },
			span: 12,
		},
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t("商品名称"), prop: "goodsName", minWidth: 140 },
		{ label: t("昵称"), prop: "userName", minWidth: 140 },
		{
			label: t("评价内容"),
			prop: "content",
			showOverflowTooltip: true,
			minWidth: 200,
		},
		{
			label: t("评价图片"),
			prop: "images",
			minWidth: 100,
			component: { name: "cl-image", props: { size: 60 } },
		},
		{
			label: t("评价时间"),
			prop: "evaluateTime",
			minWidth: 170,
			sortable: "custom",
			component: { name: "cl-date-text" },
		},
		{
			label: t("点赞数量"),
			prop: "likeCount",
			minWidth: 140,
			sortable: "custom",
		},
		{
			label: t("收藏数量"),
			prop: "collectCount",
			minWidth: 140,
			sortable: "custom",
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
		service: service.order.evaluate,
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
