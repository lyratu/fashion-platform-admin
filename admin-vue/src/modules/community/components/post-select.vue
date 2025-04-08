<template>
	<cl-select-table
		v-model="value"
		:title="t('选择内容管理')"
		:service="service.community.post"
		:columns="columns"
		:multiple="multiple"
		:dict="{ img: 'images', text: 'nickname' }"
		pickerType="default"
	/>
</template>

<script setup lang="ts">
defineOptions({
	name: "community-post-select",
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
		{ label: t("启用"), value: 0, type: "danger" },
		{ label: t("禁用"), value: 1, type: "success" },
	],
});

const columns = ref([
	{ label: t("昵称"), prop: "nickName", minWidth: 140 },
	{
		label: t("内容"),
		prop: "content",
		minWidth: 120,
		component: { name: "cl-editor-preview", props: { name: "wang" } },
	},
	{
		label: t("图片"),
		prop: "images",
		minWidth: 100,
		component: { name: "cl-image", props: { size: 60 } },
	},
	{ label: t("状态"), prop: "status", minWidth: 120, dict: options.status },
]);
</script>
