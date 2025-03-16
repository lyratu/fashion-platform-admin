<template>
	<el-scrollbar>
		<div class="demo-home">

			<el-row :gutter="10">
				<el-col :lg="10" :sm="24">
					<div class="card h-[400px]">
						<div class="card__header border-b border-gray-100">
							<h2 class="text-lg font-bold">系统公告</h2>
						</div>
						<pre class=" p-4">本系统架构为：
- 客户端：React
- 管理员端：Vue + Node(Midway.js)
- 数据库：Mysql

接口层：
- 管理员端：/admin
- 客户端：/app
						</pre>
					</div>
				</el-col>
				<el-col :lg="14" :sm="24">
					<div class="card h-[400px]">
						<div class="card__header border-b border-gray-100">
							<h2 class="text-lg font-bold">首页轮播图设置</h2>
						</div>
						<div class="p-4">
							<cl-upload v-model="bannerList" multiple :limit="3" list-type="picture-card"></cl-upload>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const bannerList = ref(['https://img.alicdn.com/imgextra/i4/1019175552/O1CN01Avxvsb1qsrq6XvJVC_!!1019175552.jpg_.webp', 'https://img.alicdn.com/imgextra/i4/1019175552/O1CN01Avxvsb1qsrq6XvJVC_!!1019175552.jpg_.webp', 'https://img.alicdn.com/imgextra/i4/1019175552/O1CN01Avxvsb1qsrq6XvJVC_!!1019175552.jpg_.webp'])
defineOptions({
	name: 'home'
});
</script>

<style lang="scss">
.demo-home {
	overflow-x: hidden;

	.card {
		border-radius: 10px;
		margin-bottom: 10px;
		border: 1px solid var(--el-border-color-extra-light);
		background-color: var(--el-bg-color);
		color: var(--el-text-color-primary);
		user-select: none;

		&__header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px 20px;
			min-height: 50px;

			.label {
				font-size: 15px;
			}

			.icon {
				font-size: 30px;
				background-color: var(--el-fill-color-light);
				padding: 5px;
				border-radius: 6px;
			}
		}

		&__container {
			padding: 0 20px;
			min-height: 50px;

			.num {
				font-size: 32px;
			}
		}

		&__footer {
			display: flex;
			align-items: center;
			height: 50px;
			margin: 0 5px;
			padding: 0 15px;
			box-sizing: border-box;
			font-size: 12px;

			.label {
				margin-right: 10px;
			}
		}
	}
}
</style>
