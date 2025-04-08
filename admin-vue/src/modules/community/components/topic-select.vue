<template>
	<cl-select-table
		v-model="value"
		:title="t('选择话题管理')"
		:service="service.community.topic"
		:columns="columns"
		:multiple="multiple"
		:dict="{ text: 'name' }"
		pickerType="text"
	/>
</template>

<script setup lang="ts">
defineOptions({
	name: "community-topic-select",
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
		{ label: t("显示"), value: 0, type: "danger" },
		{ label: t("隐藏"), value: 1, type: "success" },
	],
});

const columns = ref([
	{ label: t("名称"), prop: "name", minWidth: 140 },
	{
		label: t("图标"),
		prop: "icon",
		minWidth: 100,
		component: { name: "cl-image", props: { size: 60 } },
	},
	{ label: t("状态"), prop: "status", minWidth: 120, dict: options.status },
]);
</script>
