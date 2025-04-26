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
	name: 'clothes-item'
});

import { useCrud, useTable, useUpsert, useSearch } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';

const { service } = useCool();
const { t } = useI18n();

// 选项
const options = reactive({
	category: [
		{ label: t('上衣'), value: 0 },
		{ label: t('下装'), value: 1 },
		{ label: t('鞋子'), value: 2 },
		{ label: t('包包'), value: 3 },
		{ label: t('帽子'), value: 4 }
	],
	color: [
		{ label: t('红'), value: 0 },
		{ label: t('橙'), value: 1 },
		{ label: t('黄'), value: 2 },
		{ label: t('绿'), value: 3 },
		{ label: t('蓝'), value: 4 }
	],
	status: [
		{ label: t('正常'), value: 0 },
		{ label: t('闲置'), value: 1 },
		{ label: t('种草'), value: 2 }
	],
	season: [
		{ label: t('春'), value: 0 },
		{ label: t('夏'), value: 1 },
		{ label: t('秋'), value: 2 },
		{ label: t('冬'), value: 3 }
	]
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t('类别'),
			prop: 'category',
			component: {
				name: 'cl-select',
				props: { options: options.category }
			},
			value: 0,
			span: 12,
			required: true
		},
		{
			label: t('图片'),
			prop: 'picture',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		}
		// {
		// 	label: t("备注"),
		// 	prop: "remark",
		// 	component: { name: "el-input", props: { clearable: true } },
		// 	span: 12,
		// },
		// {
		// 	label: t("颜色"),
		// 	prop: "color",
		// 	component: { name: "cl-select", props: { options: options.color } },
		// 	span: 12,
		// },
		// {
		// 	label: t("状态"),
		// 	prop: "status",
		// 	component: { name: "el-radio-group", options: options.status },
		// 	value: 0,
		// 	required: true,
		// },
		// {
		// 	label: t("季节"),
		// 	prop: "season",
		// 	component: { name: "el-checkbox-group", options: options.season },
		// },
		// {
		// 	label: t("选择创建用户"),
		// 	prop: "createUserId",
		// 	component: { name: "el-input", props: { clearable: true } },
		// 	span: 12,
		// 	required: true,
		// },
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: t('用户'), prop: 'createUserName', minWidth: 120 },
		{
			label: t('类别'),
			prop: 'category',
			minWidth: 120,
			dict: options.category
		},
		{
			label: t('图片'),
			prop: 'picture',
			minWidth: 100,
			component: {
				name: 'cl-image',
				props: { size: 60 }
			}
		},
		// { label: t("备注"), prop: "remark", minWidth: 120 },
		// { label: t("颜色"), prop: "color", minWidth: 120, dict: options.color },
		// {
		// 	label: t('状态'),
		// 	prop: 'status',
		// 	minWidth: 120,
		// 	dict: options.status
		// },
		// {
		// 	label: t("季节"),
		// 	prop: "season",
		// 	minWidth: 120,
		// 	dict: options.season,
		// },
		{ label: t('创建用户'), prop: 'createUserId', minWidth: 120 },
		// {
		// 	label: t("创建时间"),
		// 	prop: "createTime",
		// 	minWidth: 170,
		// 	sortable: "desc",
		// 	component: { name: "cl-date-text" },
		// },
		{
			label: t('更新时间'),
			prop: 'updateTime',
			minWidth: 170,
			sortable: 'custom',
			component: { name: 'cl-date-text' }
		},
		{ type: 'op', buttons: ['edit', 'delete'] }
	]
});

// cl-search
const Search = useSearch();

// cl-crud
const Crud = useCrud(
	{
		service: service.clothes.item
	},
	app => {
		app.refresh();
	}
);

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
