'use client';

import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  LabelList,
} from 'recharts';

import styles from './salary-chart.module.css';

type SalaryData = {
  period: string;
  average: number;
  median: number;
};

type Props = {
  data: SalaryData[];
};

const CustomAverageLabel = (
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

const CustomMedianLabel = (
  props: { x?: string | number | undefined; y?: string | number | undefined; value?: string | number | undefined; index?: number | undefined },
  data: SalaryData[],
) => {
  const { x, y, value, index } = props;
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

export const SalaryChart = ({ data }: Props) => (
  <div className={styles['chart']}>
    <div className={styles['legend']}>
      <div className={styles['legendItem']}>
        <div className={styles['legendLine']}>
          <div className={styles['legendLineInner']} style={{ background: 'var(--chart-primary)' }} />
          <div className={styles['legendDot']} style={{ borderColor: 'var(--chart-primary)' }} />
        </div>
        <span style={{ color: 'var(--chart-primary)' }}>平均年収</span>
      </div>
      <div className={styles['legendItem']}>
        <div className={styles['legendLine']}>
          <div className={styles['legendLineInner']} style={{ background: 'var(--chart-secondary)' }} />
          <div className={styles['legendDot']} style={{ borderColor: 'var(--chart-secondary)' }} />
        </div>
        <span style={{ color: 'var(--chart-secondary)' }}>中央年収</span>
      </div>
    </div>
    <ResponsiveContainer>
      <LineChart data={data} margin={{ top: 35, right: 30, left: 50, bottom: 20 }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
        <XAxis
          dataKey="period"
          tick={{ fill: 'var(--chart-text)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--chart-axis)' }}
          tickLine={{ stroke: 'var(--chart-axis)' }}
          padding={{ left: 35, right: 35 }}
          label={{ value: '年度', position: 'insideBottom', offset: -10, fill: 'var(--chart-text)', fontSize: 12, fontWeight: 600 }}
        />
        <YAxis
          domain={[650, 900]}
          tickFormatter={(value: number) => `${value}`}
          tick={{ fill: 'var(--chart-text)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--chart-axis)' }}
          tickLine={{ stroke: 'var(--chart-axis)' }}
          label={{ value: '年収（万円）', angle: -90, position: 'insideLeft', fill: 'var(--chart-text)', fontSize: 12, fontWeight: 600 }}
        />
        <Line
          type="monotone"
          dataKey="average"
          name="平均年収"
          stroke="var(--chart-primary)"
          strokeWidth={3}
          dot={{ r: 5, fill: 'var(--chart-dot-fill)', stroke: 'var(--chart-primary)', strokeWidth: 2 }}
          activeDot={{ r: 8, fill: 'var(--chart-primary)', stroke: 'var(--chart-dot-fill)', strokeWidth: 3, filter: 'url(#glow)' }}
        >
          <LabelList dataKey="average" content={(props) => CustomAverageLabel(props as { x?: string | number | undefined; y?: string | number | undefined; value?: string | number | undefined; index?: number | undefined }, data)} />
        </Line>
        <Line
          type="monotone"
          dataKey="median"
          name="中央年収"
          stroke="var(--chart-secondary)"
          strokeWidth={3}
          dot={{ r: 5, fill: 'var(--chart-dot-fill)', stroke: 'var(--chart-secondary)', strokeWidth: 2 }}
          activeDot={{ r: 8, fill: 'var(--chart-secondary)', stroke: 'var(--chart-dot-fill)', strokeWidth: 3, filter: 'url(#glow)' }}
        >
          <LabelList dataKey="median" content={(props) => CustomMedianLabel(props as { x?: string | number | undefined; y?: string | number | undefined; value?: string | number | undefined; index?: number | undefined }, data)} />
        </Line>
      </LineChart>
    </ResponsiveContainer>
  </div>
);
