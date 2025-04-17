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
	name: "order-logistics",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";
import { reactive } from "vue";

const { service } = useCool();
const { t } = useI18n();

// 选项
const options = reactive({
	logisticsStatus: [
		{ label: t("运输中"), value: 0 },
		{ label: t("已签收"), value: 1 },
		{ label: t("异常"), value: 2 },
	],
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t("选择订单"),
			prop: "orderId",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("物流公司"),
			prop: "logisticsCompany",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("物流单号"),
			prop: "logisticsNumber",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("物流状态"),
			prop: "logisticsStatus",
			component: {
				name: "el-radio-group",
				options: options.logisticsStatus,
			},
			value: 0,
			required: true,
		},
		{
			label: t("联系人"),
			prop: "contactPerson",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("联系电话"),
			prop: "contactPhone",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("收货地址"),
			prop: "receivingAddress",
			component: {
				name: "el-input",
				props: { type: "textarea", rows: 4 },
			},
			required: true,
		},
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t("订单ID"), prop: "orderId", minWidth: 140 },
		{ label: t("物流公司"), prop: "logisticsCompany", minWidth: 140 },
		{ label: t("物流单号"), prop: "logisticsNumber", minWidth: 140 },
		{
			label: t("物流状态"),
			prop: "logisticsStatus",
			minWidth: 120,
			dict: options.logisticsStatus,
		},
		{ label: t("联系人"), prop: "contactPerson", minWidth: 140 },
		{ label: t("联系电话"), prop: "contactPhone", minWidth: 140 },
		{
			label: t("收货地址"),
			prop: "receivingAddress",
			showOverflowTooltip: true,
			minWidth: 200,
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
		service: service.order.logistics,
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
