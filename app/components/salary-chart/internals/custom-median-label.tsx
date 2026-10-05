import type { SalaryData } from '../salary-chart';
import type { ReactElement } from 'react';
import type { LabelProps } from 'recharts';

export type CustomMedianLabel = (
  props: LabelProps & { data: SalaryData[] },
) => ReactElement | null;

export const CustomMedianLabel: CustomMedianLabel = ({
  x, y, value, index, data,
}) => {
  if (typeof x !== 'number' || typeof y !== 'number' || value === undefined || index === undefined) return null;

  const item = data[index];
  if (!item) return null;
  const offset = item.median > item.average ? -22 : 22;

  return (
    <text x={x} y={y + offset} fill="var(--chart-secondary-label)" fontSize={11} fontWeight={600} textAnchor="middle">
      {value}
    </text>
  );
};
