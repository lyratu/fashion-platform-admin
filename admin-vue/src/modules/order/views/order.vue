<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />

			<cl-flex1 />
			<!-- 条件搜索 -->
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table">
				<template #column-trackingNumber="{ scope }">
					<el-button
						:disabled="scope.row.payStatus < 1"
						@click="handleOrder(scope.row)"
						v-if="!scope.row.trackingNumber"
						>发货</el-button
					>
					<span v-else>{{ scope.row.trackingNumber }}</span>
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

		<!-- 发货表单 -->
		<cl-form ref="logisticsForm"></cl-form>
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'order-order'
});

import { useCrud, useTable, useUpsert, useSearch, useForm } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';
import UserSelect from '/$/user/components/user-select.vue';

const { service } = useCool();
const { t } = useI18n();

// 选项
const logisticsForm = useForm();
const options = reactive({
	payStatus: [
		{ label: t('待支付'), value: 0 },
		{ label: t('已支付'), value: 1 },
		{ label: t('已发货'), value: 2 },
		{ label: t('已完成'), value: 3 },
		{ label: t('已取消'), value: 4 }
	]
});

const handleOrder = row => {
	const { id, contactNumber, address: receivingAddress, orderNumber } = row;
	const contactPerson = contactNumber.split(':')[0];
	const contactPhone = contactNumber.split(':')[1];

	logisticsForm.value?.open({
		title: '订单发货',
		items: [
			{
				label: '物流公司',
				prop: 'logisticsCompany',
				required: true,
				component: {
					name: 'el-input'
				}
			},
			{
				label: '物流单号',
				prop: 'logisticsNumber',
				required: true,
				component: {
					name: 'el-input'
				}
			}
		],
		on: {
			async submit(data, { close, done }) {
				console.log('[ data ] >', data);
				await service.order.logistics.add({
					orderId: id,
					orderNumber,
					logisticsStatus: 0,
					...data,
					contactPerson,
					contactPhone,
					receivingAddress
				});
				await service.order.order.update({
					id,
					payStatus: 2,
					trackingNumber: data.logisticsNumber
				});
				refresh({ trackingNumber: data.logisticsNumber, payStatus: 2 });
				close();
			}
		}
	});
};

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t('订单号'),
			prop: 'orderNumber',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('选择用户'),
			prop: 'userId',
			component: { vm: UserSelect },
			required: true
		},
		{
			label: t('总金额'),
			prop: 'totalAmount',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('支付状态'),
			prop: 'payStatus',
			component: {
				name: 'cl-select',
				props: { options: options.payStatus }
			},
			value: 0,
			span: 12,
			required: true
		},
		{
			label: t('支付方式'),
			prop: 'paymentType',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('收货地址'),
			prop: 'address',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12
		},
		{
			label: t('联系方式'),
			prop: 'contactNumber',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12
		},
		{
			label: t('物流单号'),
			prop: 'trackingNumber',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ label: t('#'), type: 'index' },
		// { label: t("昵称"), prop: "nickName", minWidth: 120 },
		{ label: t('订单号'), prop: 'orderNumber', minWidth: 120 },
		{ label: t('总金额'), prop: 'totalAmount', minWidth: 120 },
		{
			label: t('支付状态'),
			prop: 'payStatus',
			minWidth: 120,
			dict: options.payStatus
		},
		{
			label: t('支付方式'),
			dict: [
				{ value: 1, label: '支付宝' },
				{ value: 2, label: '微信' }
			],
			prop: 'paymentType',
			minWidth: 120
		},
		{ label: t('收货地址'), prop: 'address', minWidth: 120 },
		{ label: t('联系方式'), prop: 'contactNumber', minWidth: 120 },
		{ label: t('物流单号'), prop: 'trackingNumber', minWidth: 120 },
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
		}
	]
});

// cl-search
const Search = useSearch();

// cl-crud
const Crud = useCrud(
	{
		service: service.order.order
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
