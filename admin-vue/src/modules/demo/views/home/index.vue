<template>
	<el-scrollbar>
		<div class="demo-home">
			<!-- 欢迎区域 -->
			<div class="welcome-section mb-4">
				<div class="welcome-content">
					<div class="welcome-text">
						<h1 class="text-2xl font-bold mb-2">欢迎回来，管理员</h1>
						<p class="text-gray-500">今天是 {{ currentDate }}</p>
					</div>
					<div class="welcome-stats">
						<div class="stat-item">
							<el-icon class="text-orange-500">
								<monitor />
							</el-icon>
							<span>登录设备：{{ deviceInfo }}</span>
						</div>
					</div>
				</div>
			</div>

			<el-row :gutter="20">
				<!-- <div class="card h-[400px]">
						<div class="card__header border-b border-gray-100">
							<h2 class="text-lg font-bold">系统公告</h2>
						</div>
						<pre class="p-4">本系统架构为：
- 客户端：React
- 管理员端：Vue + Node(Midway.js)
- 数据库：Mysql

接口层：
- 管理员端：/admin
- 客户端：/app</pre>
					</div> -->
				<el-col :xl="8" :md="12" :sm="24">
					<div class="card h-auto">
						<div class="card__header border-b border-gray-100">
							<h2 class="text-lg font-bold">首页轮播图设置</h2>
							<div>
								<el-button
									type="primary"
									@click="handleSave"
									v-show="!isEdit.status"
									>添加</el-button
								>
								<el-button
									type="warning"
									@click="handleCancel"
									v-show="isEdit.status"
									>取消</el-button
								>
								<el-button type="danger" @click="handleDel" v-show="isEdit.status"
									>删除</el-button
								>

								<el-button
									type="success"
									@click="handleChange"
									v-show="isEdit.status"
									>修改</el-button
								>
							</div>
						</div>
						<div class="p-4">
							<div class="mb-4">
								<el-alert
									title="建议图片尺寸比例为5:2，最多支持三张轮播图"
									type="info"
									:closable="false"
									show-icon
								/>
							</div>
							<cl-upload v-model="bannerForm.url" />
						</div>
						<div class="p-4 border-t border-gray-100">
							<h2 class="text-md font-bold mb-4">轮播标题&描述</h2>
							<div class="space-y-4">
								<div>
									<el-form-item label="轮播标题">
										<el-input
											v-model="bannerForm.title"
											placeholder="请输入轮播图标题"
										/>
									</el-form-item>
								</div>
								<div>
									<el-form-item label="轮播描述">
										<el-input
											v-model="bannerForm.description"
											type="textarea"
											:rows="3"
											placeholder="请输入轮播图描述"
										/>
									</el-form-item>
								</div>
							</div>
						</div>
						<div class="p-4 border-t border-gray-100">
							<h2 class="text-md font-bold mb-4">关联文章</h2>
							<el-form-item label="穿搭分享文章">
								<el-select
									v-model="bannerForm.outfitsId"
									filterable
									remote
									reserve-keyword
									placeholder="请输入标题关键字"
									remote-show-suffix
									:remote-method="remoteMethod"
									:loading="loading"
									style="width: 240px"
									value-key="label"
								>
									<el-option
										v-for="item in atticList"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									/>
								</el-select>
							</el-form-item>
						</div>
					</div>
				</el-col>
				<el-col :xl="8" :md="12" :sm="24">
					<div class="card">
						<div class="card__header border-b border-gray-100">
							<h2 class="text-lg font-bold">轮播图预览</h2>
						</div>
						<div class="p-4">
							<el-carousel
								height="100%"
								class="aspect-[5/3]"
								:autoplay="false"
								v-if="fileList.length > 0"
							>
								<el-carousel-item
									@click="editItem(item)"
									v-for="(item, index) in fileList"
									:key="index"
								>
									<img
										:src="item.url"
										class="w-full h-full aspect-[1/1] object-cover object-top cursor-pointer"
									/>
									<div class="carousel-content">
										<h3 class="text-xl font-bold cursor-pointer">
											{{ item.title }}
										</h3>
										<p class="text-sm cursor-pointer">{{ item.description }}</p>
									</div>
								</el-carousel-item>
							</el-carousel>
							<el-empty v-else description="暂无轮播图" />
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, onMounted, toRefs } from 'vue';
import { Plus as plus, Monitor as monitor } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useCool } from '/@/cool';
const { service } = useCool();

interface BannerForm {
	id: number;
	title: string;
	description: string;
	url: string;
	outfitsId: number | undefined;
}

const currentDate = ref('');
const atticList = ref<Array<any>>([]);
const loading = ref(false);
const isEdit = ref({ status: false, item: null });

// 获取设备信息
const deviceInfo = ref('');

const bannerForm = ref<BannerForm>({
	title: '',
	description: '',
	url: '',
	id: -1,
	outfitsId: undefined
});

const getDeviceInfo = () => {
	const userAgent = navigator.userAgent;
	const browser = {
		chrome: /chrome/i.test(userAgent),
		firefox: /firefox/i.test(userAgent),
		safari: /safari/i.test(userAgent),
		edge: /edge/i.test(userAgent)
	};

	let browserName = '';
	if (browser.chrome) browserName = 'Chrome';
	else if (browser.firefox) browserName = 'Firefox';
	else if (browser.safari) browserName = 'Safari';
	else if (browser.edge) browserName = 'Edge';
	else browserName = '未知浏览器';

	const os = {
		windows: /windows/i.test(userAgent),
		mac: /macintosh/i.test(userAgent),
		linux: /linux/i.test(userAgent),
		android: /android/i.test(userAgent),
		ios: /iphone|ipad|ipod/i.test(userAgent)
	};

	let osName = '';
	if (os.windows) osName = 'Windows';
	else if (os.mac) osName = 'MacOS';
	else if (os.linux) osName = 'Linux';
	else if (os.android) osName = 'Android';
	else if (os.ios) osName = 'iOS';
	else osName = '未知系统';

	deviceInfo.value = `${browserName} ${osName}`;
};

const updateDateTime = () => {
	const now = new Date();
	currentDate.value = now.toLocaleDateString('zh-CN', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'long'
	});
};

const getInfo = async () => {
	const data = await service.home.info.list();
	const list: any = data.map(item => {
		return {
			url: item.CarouselImg,
			description: item.description,
			title: item.title,
			id: item.id,
			outfitsId: item.outfitsId
		};
	});
	console.log('list', list);
	fileList.value = list;
};
const editItem = async item => {
	if (item.outfitsId) {
		const info = await service.outfits.info.info({ id: item.outfitsId });
		if (info) atticList.value.push({ label: info.title, value: info.id?.toString() });
		else delete item.outfitsId;
	}
	console.log(atticList.value, item);
	bannerForm.value = { ...item };
	isEdit.value = { status: true, item };
};

const remoteMethod = async (query: string) => {
	loading.value = true;
	const data = await service.outfits.info.page({ keyWord: query });
	loading.value = false;
	atticList.value = data.list.map(e => {
		return { label: e.title, value: e.id };
	});
};

onMounted(() => {
	getInfo();
	updateDateTime();
	getDeviceInfo();
	remoteMethod();
});

const fileList = ref<BannerForm[]>([]);
const handleCancel = () => {
	isEdit.value = { status: false, item: null };
	bannerForm.value = { id: -1, title: '', description: '', url: '', outfitsId: undefined };
};
const handleDel = async () => {
	const { id } = bannerForm.value;
	try {
		await service.home.info.delete({ ids: [id] });
		ElMessage.success('删除成功～');
		fileList.value = fileList.value.filter(e => e.id !== bannerForm.value.id);
		handleCancel();
	} catch (err: any) {
		ElMessage.error(err);
	}
};
const handleChange = async () => {
	try {
		const { url, id, title, description, outfitsId } = bannerForm.value;
		if (!url) return ElMessage({ message: '图片不能为空', type: 'warning' });
		const data = await service.home.info.update({
			title,
			CarouselImg: url,
			description,
			id,
			outfitsId
		});
		console.log('[ data update] >', data);
		ElMessage.success('修改成功～');
		fileList.value = fileList.value.map(e => {
			if (e.id === bannerForm.value.id) e = { ...bannerForm.value };
			return e;
		});
		handleCancel();
	} catch (err: any) {
		ElMessage.error(err);
	}
};
const handleSave = async () => {
	// TODO: 实现保存逻辑
	// 1. 上传图片
	// 2. 保存轮播图信息
	// 3. 更新轮播图配置
	try {
		const { url, title, description, outfitsId } = bannerForm.value;
		if (!url) return ElMessage({ message: '图片不能为空', type: 'warning' });
		const { id } = await service.home.info.add({
			title,
			CarouselImg: url,
			description,
			outfitsId
		});
		ElMessage.success('添加成功');
		fileList.value.unshift({
			title,
			url,
			description,
			id,
			outfitsId
		});
	} catch (err: any) {
		ElMessage.error(err);
	}
	bannerForm.value = { url: '', title: '', description: '', outfitsId: undefined, id: -1 };
};

defineOptions({
	name: 'home'
});
</script>

<style lang="scss">
.demo-home {
	overflow-x: hidden;

	.welcome-section {
		background: linear-gradient(135deg, #1890ff 0%, #36cfc9 100%);
		border-radius: 12px;
		padding: 24px;
		color: white;
		box-shadow: 0 4px 12px rgba(24, 144, 255, 0.2);

		.welcome-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			gap: 20px;

			.welcome-text {
				h1 {
					color: white;
					margin-bottom: 8px;
				}

				p {
					color: rgba(255, 255, 255, 0.8);
					font-size: 14px;
				}
			}

			.welcome-stats {
				display: flex;
				gap: 24px;
				flex-wrap: wrap;

				.stat-item {
					display: flex;
					align-items: center;
					gap: 8px;
					background: rgba(255, 255, 255, 0.1);
					padding: 8px 16px;
					border-radius: 6px;
					backdrop-filter: blur(4px);

					.el-icon {
						font-size: 18px;
					}

					span {
						font-size: 14px;
						color: rgba(255, 255, 255, 0.9);
					}
				}
			}
		}
	}

	.card {
		border-radius: 10px;
		margin-bottom: 20px;
		border: 1px solid var(--el-border-color-extra-light);
		background-color: var(--el-bg-color);
		color: var(--el-text-color-primary);
		transition: all 0.3s ease;

		&:hover {
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		}

		&__header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 16px 20px;
			min-height: 50px;

			h2 {
				margin: 0;
			}
		}
	}

	.banner-uploader {
		:deep(.el-upload--picture-card) {
			width: 200px;
			height: 100px;
			line-height: 100px;
		}

		:deep(.el-upload-list--picture-card .el-upload-list__item) {
			width: 200px;
			height: 100px;
		}
	}

	.el-carousel__item {
		border-radius: 6px;
		overflow: hidden;

		.carousel-content {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 20px;
			background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
			color: white;

			h3 {
				margin: 0 0 8px 0;
			}

			p {
				margin: 0;
				opacity: 0.9;
			}
		}
	}
}
</style>
