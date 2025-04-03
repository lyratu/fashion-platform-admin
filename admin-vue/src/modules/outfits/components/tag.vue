<template>
	<div class="flex gap-2">
		<template v-for="(tag, index) in value">
			<el-tag
				:key="index"
				v-if="!tag.type || tag.type == 1"
				closable
				:disable-transitions="false"
				@close="handleClose(index)"
			>
				{{ tag.name }}
			</el-tag>
		</template>
		<el-input
			v-if="inputVisible"
			ref="InputRef"
			v-model="inputValue"
			class="w-20"
			size="small"
			@keyup.enter="handleInputConfirm"
			@blur="handleInputConfirm"
		/>
		<el-button v-else class="button-new-tag" size="small" @click="showInput">
			+ 新增
		</el-button>
	</div>
</template>

<script lang="ts" setup>
import { nextTick, ref, useModel, defineEmits } from 'vue';
import type { InputInstance } from 'element-plus';
import { CrudProps } from '/#/crud';
const inputValue = ref('');
const inputVisible = ref(false);
const InputRef = ref<InputInstance>();

const emits = defineEmits(['update:modelValue']);

defineOptions({
	name: 'tag'
});

const props = defineProps({
	...CrudProps,
	modelValue: {
		type: Array<any>,
		default: () => []
	}
});

const value = useModel(props, 'modelValue');

const handleClose = (index: number) => {
	value.value[index].type = 2;
	emits('update:modelValue', value.value);
};

const showInput = () => {
	inputVisible.value = true;
	nextTick(() => {
		InputRef.value!.input!.focus();
	});
};

const handleInputConfirm = () => {
	if (inputValue.value) {
		value.value.push({ name: inputValue.value, type: 1 });
	}
	inputVisible.value = false;
	inputValue.value = '';
	emits('update:modelValue', value.value);
};
</script>

<style lang="scss" scoped></style>
