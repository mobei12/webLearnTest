import type {
	BarSeriesOption,
	LineSeriesOption,
	PieSeriesOption,
} from 'echarts/charts';
import type {
	TitleComponentOption,
	TooltipComponentOption,
	GridComponentOption,
	DatasetComponentOption,
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';

type CommonOptions = TitleComponentOption
	| TooltipComponentOption
	| GridComponentOption
	| DatasetComponentOption;

export type BarLineOption = ComposeOption<
	BarSeriesOption
	| LineSeriesOption
	| CommonOptions
>;

export type PieOption = ComposeOption<
	PieSeriesOption
	| CommonOptions
>;
