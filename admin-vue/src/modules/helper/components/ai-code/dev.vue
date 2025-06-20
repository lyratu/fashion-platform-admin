<template>
	<iframe
		:src="`${helper.index}${path}`"
		class="iframe"
		:class="{ 'is-hide': hide }"
		ref="iframeRef"
	/>
</template>

<script setup lang="ts">
defineOptions({ name: 'ai-code-dev' });

import { onMounted, onUnmounted, ref } from 'vue';
import { module } from '/@/cool';
import { isString } from 'lodash-es';

defineProps({
	path: String,
	hide: Boolean
});

const emit = defineEmits(['message']);

const helper = module.config('helper');
const iframeRef = ref<HTMLIFrameElement | null>(null);
const event = new Map<string, (data: any) => void>();

function send(name: string, data: any, cb?: (data: any) => void) {
	if (cb) event.set(name, cb);
	iframeRef.value?.contentWindow?.postMessage({ name, data }, '*');
}

function onMessage(e: MessageEvent) {
	try {
		const { name, data } = isString(e.data) ? JSON.parse(e.data) : e.data;

		const msg = event.get(name);
		if (msg) msg(data);

		emit('message', { name, data });
	} catch (error) {
		console.error('Invalid message data', error, e.data);
	}
}

onMounted(() => {
	window.addEventListener('message', onMessage);
});

onUnmounted(() => {
	window.removeEventListener('message', onMessage);
});

defineExpose({ send });
</script>

<style lang="scss" scoped>
.cl-comm__icon {
	width: auto;
	padding: 0 10px;
	border-color: var(--el-color-primary);
	color: var(--el-color-primary);

	.cl-svg {
		color: var(--el-color-primary);
	}
}

.iframe.is-hide {
	height: 0;
	width: 0;
	opacity: 0;
	overflow: hidden;
}
</style>
