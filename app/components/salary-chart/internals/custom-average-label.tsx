import type { SalaryData } from '../salary-chart';

export const CustomAverageLabel = (
  props: { x?: string | number | undefined; y?: string | number | undefined; value?: string | number | undefined; index?: number | undefined },
  data: SalaryData[],
) => {
  const { x, y, value, index } = props;
  if (typeof x !== 'number' || typeof y !== 'number' || value === undefined || index === undefined) return null;

  const item = data[index];
  if (!item) return null;
  const offset = item.average >= item.median ? -22 : 22;

  return (
    <text x={x} y={y + offset} fill="var(--chart-primary-label)" fontSize={11} fontWeight={600} textAnchor="middle">
      {value}
    </text>
  );
};
