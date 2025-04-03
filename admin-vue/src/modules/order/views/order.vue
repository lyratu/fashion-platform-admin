<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />

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
	paymentStatus: [
		{ label: t("待支付"), value: 0 },
		{ label: t("已支付"), value: 1 },
		{ label: t("已发货"), value: 2 },
		{ label: t("已完成"), value: 3 },
		{ label: t("已取消"), value: 4 },
	],
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t("订单号"),
			prop: "orderNumber",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("选择用户"),
			prop: "userId",
			component: { vm: UserSelect },
			required: true,
		},
		{
			label: t("总金额"),
			prop: "totalAmount",
			hook: "number",
			component: { name: "el-input-number", props: { min: 0 } },
			span: 12,
			required: true,
		},
		{
			label: t("支付状态"),
			prop: "paymentStatus",
			component: {
				name: "cl-select",
				props: { options: options.paymentStatus },
			},
			value: 0,
			span: 12,
			required: true,
		},
		{
			label: t("支付时间"),
			prop: "paymentTime",
			component: {
				name: "el-date-picker",
				props: { type: "datetime", valueFormat: "YYYY-MM-DD HH:mm:ss" },
			},
			span: 12,
		},
		{
			label: t("收货地址"),
			prop: "shippingAddress",
			component: {
				name: "el-input",
				props: { type: "textarea", rows: 4 },
			},
			required: true,
		},
		{
			label: t("联系方式"),
			prop: "contactNumber",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("物流单号"),
			prop: "trackingNumber",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("备注"),
			prop: "remark",
			component: {
				name: "el-input",
				props: { type: "textarea", rows: 4 },
			},
		},
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ label: t("#"), type: "index" },
		{ label: t("昵称"), prop: "nickName", minWidth: 140 },
		{ label: t("订单号"), prop: "orderNumber", minWidth: 140 },
		{
			label: t("总金额"),
			prop: "totalAmount",
			minWidth: 140,
			sortable: "custom",
		},
		{
			label: t("支付状态"),
			prop: "paymentStatus",
			minWidth: 120,
			dict: options.paymentStatus,
		},
		{
			label: t("支付时间"),
			prop: "paymentTime",
			minWidth: 170,
			sortable: "custom",
			component: { name: "cl-date-text" },
		},
		{
			label: t("收货地址"),
			prop: "shippingAddress",
			showOverflowTooltip: true,
			minWidth: 200,
		},
		{ label: t("联系方式"), prop: "contactNumber", minWidth: 140 },
		{ label: t("物流单号"), prop: "trackingNumber", minWidth: 140 },
		{
			label: t("备注"),
			prop: "remark",
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
