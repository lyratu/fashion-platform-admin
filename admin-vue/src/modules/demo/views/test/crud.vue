<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-flex1 />
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'user-info'
});

import { useCrud, useTable, useUpsert, useSearch } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useDict } from '/$/dict';
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';

const { service } = useCool();
const { t } = useI18n();
const { dict } = useDict();

const options = reactive({
	gender: [
		{ label: t('未知'), value: 0, type: 'default' },
		{ label: t('男'), value: 1, type: 'success' },
		{ label: t('女'), value: 2, type: 'danger' }
	],
	status: [
		{ label: t('禁用'), value: 0, type: 'danger' },
		{ label: t('正常'), value: 1, type: 'success' },
		{ label: t('已注销'), value: 2, type: 'warning' }
	],
	loginType: [
		{ label: t('小程序'), value: 0, type: 'default' },
		{ label: t('公众号'), value: 1, type: 'success' },
		{ label: t('H5'), value: 2, type: 'info' }
	]
});

const Upsert = useUpsert({
	items: [
		{
			label: t('登录唯一ID'),
			prop: 'unionid',
			component: { name: 'el-input' },
			required: false,
			span: 12
		},
		{
			label: t('头像'),
			prop: 'avatarUrl',
			component: { name: 'cl-upload', props: { size: 120 } },
			required: false,
			span: 12
		},
		{
			label: t('昵称'),
			prop: 'nickName',
			component: { name: 'el-input' },
			required: true,
			span: 12
		},
		{
			label: t('手机号'),
			prop: 'phone',
			component: { name: 'el-input' },
			required: false,
			span: 12
		},
		{
			label: t('性别'),
			prop: 'gender',
			component: { name: 'cl-select', props: { options: options.gender } },
			required: true,
			value: 0,
			span: 12
		},
		{
			label: t('状态'),
			prop: 'status',
			component: { name: 'cl-select', props: { options: options.status } },
			required: true,
			value: 1,
			span: 12
		},
		{
			label: t('登录方式'),
			prop: 'loginType',
			component: { name: 'cl-select', props: { options: options.loginType } },
			required: true,
			value: 0,
			span: 12
		},
		{
			label: t('来源'),
			prop: 'source',
			component: { name: 'cl-select', props: { dict: dict.get('sourceType') } },
			required: true,
			value: 0,
			span: 12
		},
		{
			label: t('密码'),
			prop: 'password',
			component: { name: 'el-input' },
			required: false,
			span: 12
		},
		{
			label: t('介绍'),
			prop: 'description',
			component: { name: 'el-input', props: { type: 'textarea' } },
			required: false,
			span: 24
		},
		{
			label: t('余额'),
			prop: 'balance',
			component: { name: 'el-input-number', props: { precision: 2 } },
			required: true,
			value: 0,
			span: 12
		},
		{
			label: t('标题'),
			prop: 'goodsName',
			component: { name: 'el-input' },
			required: true,
			span: 12
		}
	]
});

const Table = useTable({
	columns: [
		{ label: t('ID'), prop: 'id', minWidth: 120 },
		{ label: t('登录唯一ID'), prop: 'unionid', minWidth: 120, showOverflowTooltip: true },
		{
			label: t('头像'),
			prop: 'avatarUrl',
			minWidth: 120,
			component: { name: 'cl-image', props: { size: ['50px', '50px'] } }
		},
		{ label: t('昵称'), prop: 'nickName', minWidth: 120, showOverflowTooltip: true },
		{ label: t('手机号'), prop: 'phone', minWidth: 120, showOverflowTooltip: true },
		{ label: t('性别'), prop: 'gender', minWidth: 120, dict: options.gender },
		{ label: t('状态'), prop: 'status', minWidth: 120, dict: options.status },
		{ label: t('登录方式'), prop: 'loginType', minWidth: 120, dict: options.loginType },
		{ label: t('来源'), prop: 'source', minWidth: 120, dict: dict.get('sourceType') },
		{ label: t('标题'), prop: 'goodsName', minWidth: 120, showOverflowTooltip: true },
		{ label: t('创建时间'), prop: 'createTime', minWidth: 170, sortable: 'desc' },
		{ label: t('更新时间'), prop: 'updateTime', minWidth: 170, sortable: 'custom' }
	]
});

const Crud = useCrud(
	{
		service: service.user.info
	},
	app => {
		app.refresh();
	}
);

const Search = useSearch({
	items: [
		{
			label: t('性别'),
			prop: 'gender',
			component: { name: 'cl-select', props: { options: options.gender } }
		},
		{
			label: t('状态'),
			prop: 'status',
			component: { name: 'cl-select', props: { options: options.status } }
		},
		{
			prop: 'keyWord',
			component: {
				name: 'el-input',
				props: {
					placeholder: t('搜索手机号、昵称'),
					clearable: true
				}
			}
		}
	]
});
</script>
