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

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: "comment-info",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";
import { Plugins } from "/#/crud";
import { reactive } from "vue";
import UserSelect from "/$/user/components/user-select.vue";

const { service } = useCool();
const { t } = useI18n();

// 选项
const options = reactive({
	type: [
		{ label: t("社区评论"), value: 0 },
		{ label: t("文章评论"), value: 1 },
		{ label: t("商品评论"), value: 2 },
	],
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t("内容"),
			prop: "content",
			component: { name: "el-input", props: { clearable: true, type: "textarea" } },
			span: 24,
			required: true,
		},
		{
			label: t("图片"),
			prop: "images",
			component: { name: "cl-upload", props: { multiple: true } },
		},
		{
			label: t("选择用户"),
			prop: "userId",
			hook: "number",
			component: { vm: UserSelect },
			required: true,
		},
		{
			label: t("选择父评"),
			prop: "parentId",
			component: {
				name: "cl-select",
				props: {
					tree: true,
					current: true,
					labelKey: "nickname",
					valueKey: "id",
					checkStrictly: true,
				},
			},
			span: 12,
		},
		{
			label: t("选择根评"),
			prop: "rootId",
			hook: "number",
			component: { name: "el-input-number", props: { min: 0 } },
			span: 12,
		},
		{
			label: t("点赞数"),
			prop: "likeCount",
			hook: "number",
			component: { name: "el-input-number", props: { min: 0 } },
			span: 12,
			required: true,
		},
		{
			label: t("回复数"),
			prop: "replyCount",
			hook: "number",
			component: { name: "el-input-number", props: { min: 0 } },
			span: 12,
			required: true,
		},
		{
			label: t("类型"),
			prop: "type",
			component: { name: "el-radio-group", options: options.type },
			value: 0,
			required: true,
		},
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
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
		{ label: t("对象ID"), prop: "objectId", minWidth: 140 },
		{
			label: t("根评ID"),
			prop: "rootId",
			minWidth: 140,
			sortable: "custom",
		},
		{
			label: t("点赞数"),
			prop: "likeCount",
			minWidth: 140,
			sortable: "custom",
		},
		{
			label: t("回复数"),
			prop: "replyCount",
			minWidth: 140,
			sortable: "custom",
		},
		{ label: t("类型"), prop: "type", minWidth: 120, dict: options.type },
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
		{
			type: "op",
			width: 250,
			buttons: [
				{
					label: t("新增"),
					hidden: !service.comment.info._permission?.add,
					type: "success",
					onClick: ({ scope }) => {
						Crud.value?.rowAppend({ parentId: scope.row.id });
					},
				},
				"edit",
				"delete",
			],
		},
	],
	plugins: [Plugins.Table.toTree()],
});

// cl-search
const Search = useSearch();

// cl-crud
const Crud = useCrud(
	{
		service: service.comment.info,
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
