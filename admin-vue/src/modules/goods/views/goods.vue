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
	name: 'demo-goods'
});

import { useCrud, useTable, useUpsert, useSearch } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';

import { useDict } from '/$/dict';

const { dict } = useDict();

const { service } = useCool();
const { t } = useI18n();

// 选项
const options = reactive({
	status: [
		{ label: t('禁用'), value: 0, type: 'danger' },
		{ label: t('启用'), value: 1, type: 'success' }
	]
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t('标题'),
			prop: 'title',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('价格'),
			prop: 'price',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('描述'),
			prop: 'description',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12
		},
		{
			label: t('详情'),
			prop: 'detail',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12
		},
		{
			prop: 'mainImage',
			label: t('主图'),
			component: {
				name: 'cl-upload',
				props: {
					text: t('选择图片')
				}
			},
			required: true
		},
		{
			label: t('副图'),
			prop: 'subPics',
			component: { name: 'cl-upload', props: { multiple: true } }
		},
		{
			label: t('分类'),
			prop: 'type',
			component: {
				name: 'cl-select',
				props: { options: dict.get('goodsType') }
			},
			span: 12,
			required: true
		},
		{
			label: t('状态'),
			prop: 'status',
			component: { name: 'el-radio-group', options: options.status },
			value: 1,
			required: true
		},
		{
			label: t('颜色'),
			prop: 'color',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('尺码'),
			prop: 'size',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('库存'),
			prop: 'stock',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('销量'),
			prop: 'sales',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: t('标题'), prop: 'title', minWidth: 120 },
		{ label: t('价格'), prop: 'price', minWidth: 120 },
		{ label: t('描述'), prop: 'description', minWidth: 120 },
		{ label: t('详情'), prop: 'detail', minWidth: 120 },
		{
			prop: 'mainImage',
			label: t('主图'),
			component: {
				name: 'cl-avatar',
				props: {
					size: 32
				}
			}
		},
		{
			label: t('分类'),
			prop: 'type',
			minWidth: 120,
			dict: dict.get('goodsType')
		},
		{
			label: t('状态'),
			prop: 'status',
			minWidth: 120,
			dict: options.status
		},
		{ label: t('库存'), prop: 'stock', minWidth: 120 },
		{ label: t('销量'), prop: 'sales', minWidth: 120 },
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
		service: service.goods.goods
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
