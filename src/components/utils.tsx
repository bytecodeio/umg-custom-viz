import {
	ITimeInterval,
	TimeUnit
} from "@amcharts/amcharts5/.internal/core/util/Time";
import formatDistanceStrict from "date-fns/formatDistanceStrict";


interface MetricData {
	x: number;
	y: number;
}
export const getBaseInterval = (metricData: MetricData[]): ITimeInterval => {
	if (metricData[0] && metricData[1]) {
		const [count, duration] = formatDistanceStrict(
			new Date(metricData[0].x),
			new Date(metricData[1].x)
		).split(" ");
		const timeUnit = duration.endsWith("s") ? duration.slice(0, -1) : duration;
		return { timeUnit: timeUnit as TimeUnit, count: Number(count) };
	}
	return { timeUnit: "minute", count: 1 };
};
