import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button, ButtonSize, ButtonVariant } from './Button'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { createTemplate, TemplateCreator, TemplateProxy } from 'shared/lib/helpers/storybookCreators/createTemplate'
import { appThemeCreator } from 'shared/lib/helpers/storybookCreators/appThemeCreator'

export default {
	title: 'shared/Button',
	component: Button,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	args: {
		children: 'Button',
	},
} as ComponentMeta<typeof Button>

type ButtonTemplateCreator<T> = TemplateCreator<T, typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

const sizeCreator: ButtonTemplateCreator<ButtonSize> = (size) => (template) => {
	if (!template.args) template.args = {}
	template.args.square = false
	template.args.size = size

	return template
}

const variantCreator: ButtonTemplateCreator<ButtonVariant> = (variant) => (template) => {
	if (!template.args) template.args = {}
	template.args.variant = variant

	return template
}

const createButtonTemplate = (templateProxies: TemplateProxy<typeof Button>[]) => createTemplate<typeof Button>(templateProxies, Button)

export const ClearLight = createButtonTemplate([
	variantCreator(ButtonVariant.clear),
	appThemeCreator(Theme.LIGHT),
]);

export const ClearDark = createButtonTemplate([
	variantCreator(ButtonVariant.clear),
	appThemeCreator(Theme.DARK),
]);
export const ClearInvertedLight = createButtonTemplate([
	variantCreator(ButtonVariant.clearInverted),
	appThemeCreator(Theme.LIGHT),
]);

export const ClearInvertedDark = createButtonTemplate([
	variantCreator(ButtonVariant.clearInverted),
	appThemeCreator(Theme.DARK),
]);

export const ClearMediumLight = createButtonTemplate([
	variantCreator(ButtonVariant.clear),
	sizeCreator(ButtonSize.size_m),
	appThemeCreator(Theme.LIGHT),
]);

export const ClearLargeLight = createButtonTemplate([
	variantCreator(ButtonVariant.clear),
	sizeCreator(ButtonSize.size_l),
	appThemeCreator(Theme.LIGHT),
]);

export const ClearExtraLargeLight = createButtonTemplate([
	variantCreator(ButtonVariant.clear),
	sizeCreator(ButtonSize.size_xl),
	appThemeCreator(Theme.LIGHT),
]);

export const ClearMediumDark = createButtonTemplate([
	variantCreator(ButtonVariant.clear),
	sizeCreator(ButtonSize.size_m),
	appThemeCreator(Theme.DARK),
]);

export const ClearLargeDark = createButtonTemplate([
	variantCreator(ButtonVariant.clear),
	sizeCreator(ButtonSize.size_l),
	appThemeCreator(Theme.DARK),
]);

export const ClearExtraLargeDark = createButtonTemplate([
	variantCreator(ButtonVariant.clear),
	sizeCreator(ButtonSize.size_xl),
	appThemeCreator(Theme.DARK),
]);


export const OutlineLight = createButtonTemplate([
	variantCreator(ButtonVariant.outline),
	appThemeCreator(Theme.LIGHT),
]);

export const OutlineDark = createButtonTemplate([
	variantCreator(ButtonVariant.outline),
	appThemeCreator(Theme.DARK),
]);

export const OutlineMediumLight = createButtonTemplate([
	variantCreator(ButtonVariant.outline),
	sizeCreator(ButtonSize.size_m),
	appThemeCreator(Theme.LIGHT),
]);

export const OutlineLargeLight = createButtonTemplate([
	variantCreator(ButtonVariant.outline),
	sizeCreator(ButtonSize.size_l),
	appThemeCreator(Theme.LIGHT),
]);

export const OutlineExtraLargeLight = createButtonTemplate([
	variantCreator(ButtonVariant.outline),
	sizeCreator(ButtonSize.size_xl),
	appThemeCreator(Theme.LIGHT),
]);

export const OutlineMediumDark = createButtonTemplate([
	variantCreator(ButtonVariant.outline),
	sizeCreator(ButtonSize.size_m),
	appThemeCreator(Theme.DARK),
]);

export const OutlineLargeDark = createButtonTemplate([
	variantCreator(ButtonVariant.outline),
	sizeCreator(ButtonSize.size_l),
	appThemeCreator(Theme.DARK),
]);

export const OutlineExtraLargeDark = createButtonTemplate([
	variantCreator(ButtonVariant.outline),
	sizeCreator(ButtonSize.size_xl),
	appThemeCreator(Theme.DARK),
]);


export const BackgroundLight = createButtonTemplate([
	variantCreator(ButtonVariant.background),
	appThemeCreator(Theme.LIGHT),
]);

export const BackgroundDark = createButtonTemplate([
	variantCreator(ButtonVariant.background),
	appThemeCreator(Theme.DARK),
]);

export const BackgroundMediumLight = createButtonTemplate([
	variantCreator(ButtonVariant.background),
	sizeCreator(ButtonSize.size_m),
	appThemeCreator(Theme.LIGHT),
]);

export const BackgroundLargeLight = createButtonTemplate([
	variantCreator(ButtonVariant.background),
	sizeCreator(ButtonSize.size_l),
	appThemeCreator(Theme.LIGHT),
]);

export const BackgroundExtraLargeLight = createButtonTemplate([
	variantCreator(ButtonVariant.background),
	sizeCreator(ButtonSize.size_xl),
	appThemeCreator(Theme.LIGHT),
]);

export const BackgroundMediumDark = createButtonTemplate([
	variantCreator(ButtonVariant.background),
	sizeCreator(ButtonSize.size_m),
	appThemeCreator(Theme.DARK),
]);

export const BackgroundLargeDark = createButtonTemplate([
	variantCreator(ButtonVariant.background),
	sizeCreator(ButtonSize.size_l),
	appThemeCreator(Theme.DARK),
]);

export const BackgroundExtraLargeDark = createButtonTemplate([
	variantCreator(ButtonVariant.background),
	sizeCreator(ButtonSize.size_xl),
	appThemeCreator(Theme.DARK),
]);



export const BackgroundInvertedLight = createButtonTemplate([
	variantCreator(ButtonVariant.backgroundInverted),
	appThemeCreator(Theme.LIGHT),
]);

export const BackgroundInvertedDark = createButtonTemplate([
	variantCreator(ButtonVariant.backgroundInverted),
	appThemeCreator(Theme.DARK),
]);

export const BackgroundInvertedMediumLight = createButtonTemplate([
	variantCreator(ButtonVariant.backgroundInverted),
	sizeCreator(ButtonSize.size_m),
	appThemeCreator(Theme.LIGHT),
]);

export const BackgroundInvertedLargeLight = createButtonTemplate([
	variantCreator(ButtonVariant.backgroundInverted),
	sizeCreator(ButtonSize.size_l),
	appThemeCreator(Theme.LIGHT),
]);

export const BackgroundInvertedExtraLargeLight = createButtonTemplate([
	variantCreator(ButtonVariant.backgroundInverted),
	sizeCreator(ButtonSize.size_xl),
	appThemeCreator(Theme.LIGHT),
]);

export const BackgroundInvertedMediumDark = createButtonTemplate([
	variantCreator(ButtonVariant.backgroundInverted),
	sizeCreator(ButtonSize.size_m),
	appThemeCreator(Theme.DARK),
]);

export const BackgroundInvertedLargeDark = createButtonTemplate([
	variantCreator(ButtonVariant.backgroundInverted),
	sizeCreator(ButtonSize.size_l),
	appThemeCreator(Theme.DARK),
]);

export const BackgroundInvertedExtraLargeDark = createButtonTemplate([
	variantCreator(ButtonVariant.backgroundInverted),
	sizeCreator(ButtonSize.size_xl),
	appThemeCreator(Theme.DARK),
]);

// export const Primary = Template.bind({})
// Primary.args = {
// 	children: 'Text',
// }

// export const Clear = Template.bind({})
// Clear.args = {
// 	children: 'Text',
// 	variant: ButtonVariant.clear,
// }

// export const Outline = Template.bind({})
// Outline.args = {
// 	children: 'Text',
// 	variant: ButtonVariant.background,
// }
// export const OutlineDark = Template.bind({})
// OutlineDark.args = {
// 	children: 'Text',
// 	variant: ButtonVariant.outline,
// }
// OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]
// export const OutlineDarkV2 = createTemplate([
// 	appThemeCreator(ThemeDecorator(variant.DARK))
// ])
