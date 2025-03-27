<template>
	<cl-select-table
		v-model="value"
		:title="t('选择订单信息')"
		:service="service.order.order"
		:columns="columns"
		:multiple="multiple"
		:dict="{ text: 'goodsname' }"
		pickerType="text"
	/>
</template>

<script setup lang="ts">
defineOptions({
	name: "order-order-select",
});

import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";
import { CrudProps } from "/#/crud";
import { reactive, ref, useModel } from "vue";

const props = defineProps({
	...CrudProps,
	modelValue: null,
	multiple: Boolean,
});

const { service } = useCool();
const { t } = useI18n();

const value = useModel(props, "modelValue");

// 选项
const options = reactive({
	status: [
		{ label: t("已下单"), value: 0 },
		{ label: t("等待发货"), value: 1 },
		{ label: t("运输中"), value: 2 },
		{ label: t("已签收"), value: 3 },
	],
});

const columns = ref([
	{ label: t("昵称"), prop: "userName", minWidth: 140 },
	{ label: t("商品名称"), prop: "goodsName", minWidth: 140 },
	{ label: t("价格"), prop: "price", minWidth: 140, sortable: "custom" },
	{ label: t("数量"), prop: "quantity", minWidth: 140, sortable: "custom" },
	{ label: t("状态"), prop: "status", minWidth: 120, dict: options.status },
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
		component: { name: "cl-date-text", props: { format: "YYYY-MM-DD" } },
	},
]);
</script>
