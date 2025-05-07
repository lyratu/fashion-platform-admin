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
	name: 'order-logistics-location'
});

import { useCrud, useTable, useUpsert, useSearch } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';

const { service } = useCool();
const { t } = useI18n();

// 选项
const options = reactive({
	status: [
		{ label: t('正常'), value: 0 },
		{ label: t('已签收'), value: 1 },
		{ label: t('异常'), value: 2 }
	]
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		// {
		// 	label: t('选择物流'),
		// 	prop: 'logisticsId',
		// 	component: { name: 'el-input', props: { clearable: true } },
		// 	span: 12,
		// 	required: true
		// },
		// {
		// 	label: t('状态'),
		// 	prop: 'status',
		// 	component: { name: 'el-radio-group', options: options.status },
		// 	required: true
		// },
		{
			label: t('详细地址'),
			prop: 'detailedAddress',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		// {
		// 	label: t('记录时间'),
		// 	prop: 'recordTime',
		// 	component: {
		// 		name: 'el-date-picker',
		// 		props: { type: 'datetime', valueFormat: 'YYYY-MM-DD HH:mm:ss' }
		// 	},
		// 	span: 12,
		// 	required: true
		// },
		{
			label: t('位置描述'),
			prop: 'locationDescription',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: t('物流单号'), prop: 'logisticsNumber', minWidth: 120 },
		{
			label: t('状态'),
			prop: 'status',
			minWidth: 120,
			dict: options.status
		},
		{ label: t('详细地址'), prop: 'detailedAddress', minWidth: 120 },
		{
			label: t('记录时间'),
			prop: 'recordTime',
			minWidth: 170,
			sortable: 'custom',
			component: { name: 'cl-date-text' }
		},
		{ label: t('位置描述'), prop: 'locationDescription', minWidth: 120 },
		{
			label: t('创建时间'),
			prop: 'createTime',
			minWidth: 170,
			sortable: 'desc',
			component: { name: 'cl-date-text' }
		},
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
		service: service.order.logisticsLocation
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
