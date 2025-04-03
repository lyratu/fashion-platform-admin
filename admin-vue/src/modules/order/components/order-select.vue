<template>
	<cl-select-table
		v-model="value"
		:title="t('选择订单信息')"
		:service="service.order.order"
		:columns="columns"
		:multiple="multiple"
		:dict="{ text: 'nickname' }"
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
	paymentStatus: [
		{ label: t("待支付"), value: 0 },
		{ label: t("已支付"), value: 1 },
		{ label: t("已发货"), value: 2 },
		{ label: t("已完成"), value: 3 },
		{ label: t("已取消"), value: 4 },
	],
});

const columns = ref([
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
]);
</script>
