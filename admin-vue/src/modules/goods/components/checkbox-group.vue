<template v-slot:slot-name="{ scope }">
	<el-checkbox-group v-model="value" @change="change">
		<template v-for="(item, index) in options" :key="index">
			<el-checkbox :label="item.label" :value="item" />
		</template>
	</el-checkbox-group>
</template>

<script setup lang="ts">
import { useModel } from 'vue';
import { CrudProps } from '/#/crud';
defineOptions({
	name: 'checkbox-group'
});
const emits = defineEmits(['update:modelValue']);
const props = defineProps({
	...CrudProps,
	modelValue: {
		type: Array<any>,
		default: () => []
	},
	options: {
		type: Array<any>,
		default: () => []
	}
});
const options = useModel(props, 'options');
const value = useModel(props, 'modelValue');

const change = (value: Array<any>) => {
	emits('update:modelValue', value);
};
</script>

<style lang="scss" scoped></style>
