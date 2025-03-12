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
	name: "outfits-goods"
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";
import { reactive } from "vue";

const { service } = useCool();
const { t } = useI18n();

// 选项
const options = reactive({
	status: [
		{ label: t('下架'), value: 0 },
		{ label: t('上架'), value: 1 },
		{ label: t('待审核'), value: 2 }
	]
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		{ label: t('封面'), prop: "coverImage", component: { name: "cl-upload" } },
		{
			label: t('标题'),
			prop: "title",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('描述'),
			prop: "description",
			component: { name: "el-input", props: { type: "textarea", rows: 4 } }
		},
		{ label: t('正文'), prop: "content", component: { name: "cl-editor-wang" } },

		{
			label: t('状态'),
			prop: "status",
			component: { name: "el-radio-group", options: options.status },
			value: 2,
			required: true
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{
			label: t('封面'),
			prop: "coverImage",
			minWidth: 100,
			component: { name: "cl-image", props: { size: 60 } }
		},
		{ label: t('标题'), prop: "title", minWidth: 140 },
		{
			label: t('描述'),
			prop: "description",
			showOverflowTooltip: true,
			minWidth: 200
		},
		{
			label: t('正文'),
			prop: "content",
			minWidth: 120,
			component: { name: "cl-editor-preview", props: { name: "wang" } }
		},

		{ label: t('浏览数'), prop: "views", minWidth: 140, sortable: "custom" },
		{ label: t('状态'), prop: "status", minWidth: 120, dict: options.status },
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
