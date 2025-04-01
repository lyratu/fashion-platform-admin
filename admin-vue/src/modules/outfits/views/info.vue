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
	name: 'outfits-article'
});

import { useCrud, useTable, useUpsert, useSearch } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { useDict } from '/$/dict';
import { reactive, ref } from 'vue';

const { dict } = useDict();

const { service } = useCool();
const { t } = useI18n();

// 选项
const options = reactive({
	type: [
		{ label: t('否'), value: 0, type: 'info' },
		{ label: t('是'), value: 1, type: 'success' }
	]
});
const auths = ref<Array<{ label: string | undefined; value: number | undefined }>>([]);

const loading = ref(false);

const remoteMethod = async (query: string) => {
	if (query) {
		loading.value = true;
		const data = await service.user.info.page({ keyWord: query });
		auths.value = data.list.map(e => {
			return { label: e.nickName, value: e.id };
		});
		loading.value = false;
		console.log('[ auths.value ] >', auths.value);
	} else {
		auths.value = [];
	}
};

// cl-upsert
const Upsert = useUpsert({
	async onInfo(data, { done, next }) {
		const newData = await next({
			...data,
			status: false
		});
		if (data.authorId) {
			const info = await service.user.info.info({ id: data.authorId });
			auths.value = [{ label: info.nickName, value: info.id }];
		}
		done(newData);
	},
	async onSubmit(data, { done, close, next }) {
		if (data.tags) {
			const delIds = data.tags.flatMap(e => {
				if (e.type === 2 && e.id != -1) return e.id;
				else return [];
			});
			const addIds = data.tags.flatMap(e => {
				if (e.type === 1 && e.id == -1) return { outfitId: data.id, name: e.name };
				else return [];
			});

			if (delIds.length > 0) service.outfits.tag.delete({ ids: delIds });
			if (addIds.length > 0) service.outfits.tag.add(addIds);
		}
		next({
			...data,
			status: false
		}).then(id => {
			console.log('%c [ id ]-103', 'font-size:13px; background:pink; color:#bf2c9f;', id);

			// const addIds = data.tags.flatMap(e => {
			// 	if (e.type === 1 && e.id == -1) return { outfitId: id, name: e.name };
			// 	else return [];
			// });
			// if (addIds.length > 0) service.outfits.tag.add(addIds);
		});

		// done 关闭加载状态
		// close 关闭弹窗
	},
	items: [
		{ label: t('封面图'), prop: 'coverImage', component: { name: 'cl-upload' } },
		{
			label: t('标题'),
			prop: 'title',
			component: { name: 'el-input', props: { clearable: true } },
			span: 24,
			required: true
		},
		{
			label: t('标签'),
			prop: 'tags',
			component: { name: 'tag' },
			span: 24
		},
		{
			label: t('描述'),
			prop: 'description',
			component: { name: 'el-input', props: { clearable: true, type: 'textarea' } },
			span: 24,
			required: true
		},
		{
			label: t('分类'),
			prop: 'category',
			component: { name: 'cl-select', props: { options: dict.get('category') } },
			span: 8,
			required: true
		},
		{
			label: t('选择作者'),
			prop: 'authorId',
			component: {
				name: 'el-select',
				options: auths,
				props: {
					filterable: true,
					remote: true,
					remoteShowSuffix: true,
					remoteMethod: remoteMethod,
					loading
				}
			},
			span: 8,
			required: true
		},
		{
			label: t('是否精选'),
			prop: 'isFeature',
			component: { name: 'el-radio-group', options: options.type },
			value: 0,
			span: 8,
			required: true
		},
		{ label: t('内容'), prop: 'content', component: { name: 'cl-editor-wang' } }
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: t('标题'), prop: 'title', minWidth: 140 },
		{
			label: t('封面图'),
			prop: 'coverImage',
			minWidth: 100,
			component: { name: 'cl-image', props: { size: 60 } }
		},
		{
			label: t('内容'),
			prop: 'content',
			minWidth: 120,
			component: { name: 'cl-editor-preview', props: { name: 'wang' } }
		},
		{
			label: t('分类'),
			prop: 'category',
			minWidth: 120,
			dict: dict.get('category')
		},
		{
			label: t('标签'),
			prop: 'tags',
			minWidth: 140,
			sortable: 'custom',
			formatter(row) {
				return row.tags + '元';
			}
		},
		{ label: t('精选'), prop: 'isFeature', minWidth: 120, dict: options.type },

		{ label: t('点赞数'), prop: 'likeCount', minWidth: 140, sortable: 'custom' },
		{ label: t('收藏数'), prop: 'collectCount', minWidth: 140, sortable: 'custom' },
		{
			label: t('作者'),
			prop: 'authorName',
			minWidth: 140,
			sortable: 'custom'
		},
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
		service: service.outfits.info,
		onDelete(selection, { next }) {
			// [ ] 这里删除逻辑 有多选删除
			const delIds = selection.map(data => {
				console.log(
					'%c [ data ]-230',
					'font-size:13px; background:pink; color:#bf2c9f;',
					data
				);
				// const list = data.tags.flatMap(e => {
				// 	if (e.type === 2 && e.id != -1) return e.id;
				// 	else return [];
				// });
				// return list;
			});
			console.log(
				'%c [ delIds ]-230',
				'font-size:13px; background:pink; color:#bf2c9f;',
				delIds
			);

			next({
				ids: selection.map(e => e.id)
			});
		}
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
