import { type ModuleConfig } from '/@/cool';

export default (): ModuleConfig => {
	return {
		components: [import('./components/tag.vue')]
	};
};
