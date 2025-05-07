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
			<cl-table ref="Table">
				<template #column-detail="{ scope }">
					<el-button @click="handleDetail(scope)">查看详情</el-button>
				</template>
				<template #slot-btn="{ scope }">
					<el-button
						text
						bg
						:disabled="scope.row.logisticsStatus === 1"
						@click="handleLocation(scope)"
						>录入信息</el-button
					>
				</template>
			</cl-table>
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />

		<!-- 物流信息表单 -->
		<cl-form ref="locationForm"></cl-form>

		<!-- 物流详细信息 -->
		<cl-dialog title="运输信息" v-model="detailOpen">
			<div class="flex justify-center">
				<el-timeline style="max-width: 600px">
					<el-timeline-item
						:color="colorStatus[activity.status as number]"
						v-for="(activity, index) in activities"
						:key="index"
						:timestamp="activity.recordTime?.toString()"
					>
						<div>{{ activity.detailedAddress }}</div>
						<div :style="activity.status == 2 ? 'color:#F56C6C' : ''">
							{{ activity.locationDescription }}
						</div>
					</el-timeline-item>
				</el-timeline>
			</div>
		</cl-dialog>
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'order-logistics'
});

import { useCrud, useTable, useUpsert, useSearch, useForm } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { reactive, ref } from 'vue';

const { service } = useCool();
const { t } = useI18n();

// 选项
const detailOpen = ref(false);
const colorStatus = ['#409EFF', '#67C23A', '#F56C6C'];
let activities = reactive<Eps.OrderLogisticsLocationEntity[]>([]);
const locationForm = useForm();
const options = reactive({
	logisticsStatus: [
		{ label: t('运输中'), value: 0 },
		{ label: t('已签收'), value: 1 },
		{ label: t('异常'), value: 2 }
	]
});
const handleDetail = async scope => {
	const { id: logisticsId } = scope.row;
	const { list } = await service.order.logisticsLocation.page({
		order: 'createTime',
		page: 1,
		size: 120,
		sort: 'desc',
		logisticsId
	});
	activities = list;
	detailOpen.value = true;
};
const handleLocation = async scope => {
	locationForm.value?.open({
		title: '录入物流信息',
		items: [
			{
				label: '当前地址',
				prop: 'detailedAddress',
				required: true,
				component: {
					name: 'el-input'
				}
			},
			{
				label: '位置描述',
				prop: 'locationDescription',
				required: true,
				component: {
					name: 'el-input'
				}
			},
			{
				label: t('状态'),
				prop: 'status',
				component: { name: 'el-radio-group', options: options.logisticsStatus },
				value: 0,
				required: true
			}
		],
		on: {
			async submit(data, { close, done }) {
				const { id } = scope.row;
				await service.order.logisticsLocation.add({
					logisticsId: id,
					...data,
					recordTime: new Date()
				});
				await service.order.logistics.update({
					id,
					logisticsStatus: data.status
				});

				close();
			}
		}
	});
};

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t('选择订单'),
			prop: 'orderId',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('物流公司'),
			prop: 'logisticsCompany',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('物流单号'),
			prop: 'logisticsNumber',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('物流状态'),
			prop: 'logisticsStatus',
			component: {
				name: 'el-radio-group',
				options: options.logisticsStatus
			},
			value: 0,
			required: true
		},
		{
			label: t('联系人'),
			prop: 'contactPerson',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('联系电话'),
			prop: 'contactPhone',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('收货地址'),
			prop: 'receivingAddress',
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 4 }
			},
			required: true
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: t('订单号'), prop: 'orderNumber', minWidth: 140 },
		{ label: t('运输信息'), prop: 'detail', minWidth: 140 },
		{ label: t('物流公司'), prop: 'logisticsCompany', minWidth: 140 },
		{ label: t('物流单号'), prop: 'logisticsNumber', minWidth: 140 },
		{
			label: t('物流状态'),
			prop: 'logisticsStatus',
			minWidth: 120,
			dict: options.logisticsStatus
		},
		{ label: t('联系人'), prop: 'contactPerson', minWidth: 140 },
		{ label: t('联系电话'), prop: 'contactPhone', minWidth: 140 },
		{
			label: t('收货地址'),
			prop: 'receivingAddress',
			showOverflowTooltip: true,
			minWidth: 200
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
		{
			type: 'op',
			buttons: ['slot-btn']
		}
	]
});

// cl-search
const Search = useSearch();

// cl-crud
const Crud = useCrud(
	{
		service: service.order.logistics
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
