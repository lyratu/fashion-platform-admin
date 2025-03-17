<template>
	<el-scrollbar>
		<div class="demo-home">
			<!-- 欢迎区域 -->
			<div class="welcome-section mb-4">
				<div class="welcome-content">
					<div class="welcome-text">
						<h1 class="text-2xl font-bold mb-2">欢迎回来，管理员</h1>
						<p class="text-gray-500">今天是 {{ currentDate }}，{{ currentTime }}</p>
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
				<el-col :lg="12" :sm="24">
					<div class="card h-auto">
						<div class="card__header border-b border-gray-100">
							<h2 class="text-lg font-bold">首页轮播图设置</h2>
							<el-button type="primary" @click="handleSave">添加</el-button>
						</div>
						<div class="p-4">
							<div class="mb-4">
								<el-alert title="建议图片尺寸比例为2:1，最多支持三张轮播图" type="info" :closable="false" show-icon />
							</div>
							<cl-upload v-model="bannerForm.url" />
						</div>
						<div class="p-4 border-t border-gray-100">
							<h2 class="text-md font-bold mb-4">轮播标题&描述</h2>
							<div class="space-y-4">
								<div>
									<el-form-item label="轮播标题">
										<el-input v-model="bannerForm.title" placeholder="请输入轮播图标题" />
									</el-form-item>
								</div>
								<div>
									<el-form-item label="轮播描述">
										<el-input v-model="bannerForm.description" type="textarea" :rows="3"
											placeholder="请输入轮播图描述" />
									</el-form-item>
								</div>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :lg="12" :sm="24">
					<div class="card">
						<div class="card__header border-b border-gray-100">
							<h2 class="text-lg font-bold">轮播图预览</h2>
						</div>
						<div class="p-4">
							<el-carousel  height="260px" :interval="4000" v-if="fileList.length > 0">
								<el-carousel-item v-for="(item, index) in fileList" :key="index">
									<img :src="item.url" class="w-full aspect-[2/1] object-cover" />
									<div class="carousel-content">
										<h3 class="text-xl font-bold">{{ bannerForm.title }}</h3>
										<p class="text-sm">{{ bannerForm.description }}</p>
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
import { ref, onMounted } from 'vue'
import { Plus as plus, Monitor as monitor } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useCool } from "/@/cool";
const { service } = useCool();

interface UploadFile {
	name: string
	url: string
	status?: string
}

interface BannerForm {
	title: string
	description: string
	url: string
}

const currentDate = ref('')
const currentTime = ref('')

// 获取设备信息
const deviceInfo = ref('')

const bannerForm = ref<BannerForm>({
	title: '',
	description: '',
	url: ''
})

const getDeviceInfo = () => {
	const userAgent = navigator.userAgent
	const browser = {
		chrome: /chrome/i.test(userAgent),
		firefox: /firefox/i.test(userAgent),
		safari: /safari/i.test(userAgent),
		edge: /edge/i.test(userAgent)
	}

	let browserName = ''
	if (browser.chrome) browserName = 'Chrome'
	else if (browser.firefox) browserName = 'Firefox'
	else if (browser.safari) browserName = 'Safari'
	else if (browser.edge) browserName = 'Edge'
	else browserName = '未知浏览器'

	const os = {
		windows: /windows/i.test(userAgent),
		mac: /macintosh/i.test(userAgent),
		linux: /linux/i.test(userAgent),
		android: /android/i.test(userAgent),
		ios: /iphone|ipad|ipod/i.test(userAgent)
	}

	let osName = ''
	if (os.windows) osName = 'Windows'
	else if (os.mac) osName = 'MacOS'
	else if (os.linux) osName = 'Linux'
	else if (os.android) osName = 'Android'
	else if (os.ios) osName = 'iOS'
	else osName = '未知系统'

	deviceInfo.value = `${browserName} ${osName}`
}

const updateDateTime = () => {
	const now = new Date()
	currentDate.value = now.toLocaleDateString('zh-CN', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'long'
	})
	currentTime.value = now.toLocaleTimeString('zh-CN', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	})
}

onMounted(() => {
	updateDateTime()
	getDeviceInfo()
})

const fileList = ref<BannerForm[]>([])

const handleSave = async () => {
	try {
		// TODO: 实现保存逻辑
		// 1. 上传图片
		// 2. 保存轮播图信息
		// 3. 更新轮播图配置
		console.log(bannerForm.value)
		const { url, title, description } = bannerForm.value
		if (!url) return ElMessage({ message: '图片不能为空', type: 'warning' })
		service.home.info.add({ title, CarouselImg: url, description })
		ElMessage.success('添加成功')
		fileList.value.push({
			title, url, description
		})
		console.log(fileList.value)
		bannerForm.value.url = ''
	} catch (error) {
		ElMessage.error('添加失败')
	}
}

defineOptions({
	name: 'home'
})
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
