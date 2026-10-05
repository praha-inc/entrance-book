import type { SalaryData } from '../salary-chart';
import type { ReactElement } from 'react';
import type { LabelProps } from 'recharts';

export type CustomAverageLabel = (
  props: LabelProps & { data: SalaryData[] },
) => ReactElement | null;

export const CustomAverageLabel: CustomAverageLabel = ({
  x, y, value, index, data,
}) => {
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
