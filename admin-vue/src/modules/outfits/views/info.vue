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
	name: "outfits-article"
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";
import { useDict } from "/$/dict";
import { reactive } from "vue";

const { dict } = useDict();

const { service } = useCool();
const { t } = useI18n();

// 选项
const options = reactive({
	type: [
		{ label: t("否"), value: 0, type: "info" },
		{ label: t("是"), value: 1, type: "success" },
	],
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t('标题'),
			prop: "title",
			component: { name: "el-input", props: { clearable: true } },
			span: 24,
			required: true
		},
		{
			label: t('描述'),
			prop: "description",
			component: { name: "el-input", props: { clearable: true, type: "textarea" } },
			span: 24,
			required: true
		}, { label: t('封面图'), prop: "coverImage", component: { name: "cl-upload" } },
		{ label: t('内容'), prop: "content", component: { name: "cl-editor-wang" } },
		{
			label: t('分类'),
			prop: "category",
			component: { name: "cl-select", props: { options: dict.get('category') } },
			value: 0,
			span: 12,
			required: true
		},
		{
			label: t("是否精选"),
			prop: "isFeature",
			component: { name: "el-radio-group", options: options.type },
			value: 0,
			required: true,
		},
		{
			label: t('选择作者'),
			prop: "authorId",
			hook: "number",
			component: { name: "el-input-number", props: { min: 0 } },
			span: 12,
			required: true
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t('标题'), prop: "title", minWidth: 140 },
		{
			label: t('封面图'),
			prop: "coverImage",
			minWidth: 100,
			component: { name: "cl-image", props: { size: 60 } }
		},
		{
			label: t('内容'),
			prop: "content",
			minWidth: 120,
			component: { name: "cl-editor-preview", props: { name: "wang" } }
		},
		{
			label: t('分类'),
			prop: "category",
			minWidth: 120,
			dict: dict.get('category')
		},
		{ label: t("精选"), prop: "isFeature", minWidth: 120, dict: options.type },

		{ label: t('点赞数'), prop: "likeCount", minWidth: 140, sortable: "custom" },
		{ label: t('收藏数'), prop: "collectCount", minWidth: 140, sortable: "custom" },
		{ label: t('作者ID'), prop: "authorId", minWidth: 140, sortable: "custom" },
		{
			label: t('创建时间'),
			prop: "createTime",
			minWidth: 170,
			sortable: "desc",
			component: { name: "cl-date-text" }
		},
		{
			label: t('更新时间'),
			prop: "updateTime",
			minWidth: 170,
			sortable: "custom",
			component: { name: "cl-date-text" }
		},
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-search
const Search = useSearch();

// cl-crud
const Crud = useCrud(
	{
		service: service.outfits.info
	},
	(app) => {
		app.refresh();
	}
);

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
