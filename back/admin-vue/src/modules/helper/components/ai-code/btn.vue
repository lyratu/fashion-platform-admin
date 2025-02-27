<template>
	<div class="cl-comm__icon" @click="toCode">
		<cl-svg name="quick" class="icon" />
		<div class="t1">{{ $t('AI极速编码') }}</div>
		<div class="t2">Start</div>
	</div>
</template>

<script setup lang="ts">
import { useCool } from '/@/cool';

const { router } = useCool();

function toCode() {
	router.push('/helper/ai-code');
}
</script>

<style lang="scss" scoped>
.cl-comm__icon {
	width: auto;
	position: relative;
	overflow: hidden;
	width: 120px;

	.icon {
		position: absolute;
		left: 8px;
	}

	.t1,
	.t2 {
		display: flex;
		align-items: center;
		justify-content: center;
		transition: top 0.5s;
		letter-spacing: 1px;
		position: absolute;
		width: 100%;
		padding-left: 18px;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		background: linear-gradient(to right, #9f9f9f 0, #fff 10%, #868686 20%);
		background-position: 0;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: shine 3s infinite linear;
		animation-fill-mode: forwards;
		-webkit-text-size-adjust: none;
		font-size: 12px;
		line-height: 1;
	}

	.t2 {
		top: 150%;
	}

	&:hover {
		.icon {
			color: var(--el-color-primary);
		}

		.t1 {
			top: -100%;
		}

		.t2 {
			top: 50%;
		}
	}
}

@keyframes shine {
	0% {
		background-position: 0;
	}
	100% {
		background-position: 100px;
	}
}
</style>
