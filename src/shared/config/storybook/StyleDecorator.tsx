import { Story } from '@storybook/api';
// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import '@/app/styles/index.scss';
export const StyleDecorator = (story: () => Story) => story();