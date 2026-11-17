import styles from './work-hours-band.module.css';

export type WorkHours = {
  start: string;
  end: string;
};

type Props = {
  data: WorkHours[];
};

const TITLE = '時間帯ごとの働いている人の多さ';

const START = 7 * 60;
const END = 21 * 60;
const STEP = 15;

// 少人数なので割合をそのまま濃さにせず4段階にまとめ、1人ぶんの差が見えないようにする
const OPACITIES = [0.04, 0.14, 0.36, 0.62, 1];
const LEVEL_LABELS = ['ほとんどいない', '少ない', 'やや少ない', 'やや多い', '多い'];

const VIEW_WIDTH = 640;
const VIEW_HEIGHT = 78;
const PADDING_X = 16;
const BAR_Y = 8;
const BAR_HEIGHT = 34;
const TICK_HOURS = [7, 9, 11, 13, 15, 17, 19, 21];

const toMinutes = (time: string) => {
  const [hour = 0, minute = 0] = time.split(':').map(Number);
  return hour * 60 + minute;
};

const formatMinutes = (minutes: number) => `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;

const toLevel = (share: number) => {
  if (share >= 0.9) return 4;
  if (share >= 0.6) return 3;
  if (share >= 0.25) return 2;
  if (share > 0) return 1;
  return 0;
};

const toX = (minutes: number) => PADDING_X + (minutes - START) / (END - START) * (VIEW_WIDTH - PADDING_X * 2);

export const WorkHoursBand = ({ data }: Props) => {
  const spans = data.map(({ start, end }) => ({ start: toMinutes(start), end: toMinutes(end) }));
  const slots = Array.from({ length: (END - START) / STEP }, (_, index) => START + index * STEP);
  const levelAt = (minutes: number) => {
    const working = spans.filter(({ start, end }) => start <= minutes && minutes < end).length;
    return toLevel(spans.length === 0 ? 0 : working / spans.length);
  };

  return (
    <div className={styles['band']}>
      <div className={styles['header']}>
        <span className={styles['title']}>{TITLE}</span>
        <div className={styles['legend']} aria-hidden="true">
          <span>少ない</span>
          {OPACITIES.slice(1).map((opacity) => (
            <span key={opacity} className={styles['swatch']} style={{ opacity }} />
          ))}
          <span>多い</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}>
        <title>{TITLE}</title>
        {slots.map((minutes) => {
          const level = levelAt(minutes);
          return (
            <rect
              key={minutes}
              x={toX(minutes)}
              y={BAR_Y}
              width={toX(minutes + STEP) - toX(minutes)}
              height={BAR_HEIGHT}
              fill="var(--band-color)"
              fillOpacity={OPACITIES[level]}
              shapeRendering="crispEdges"
            >
              <title>{`${formatMinutes(minutes)}〜${formatMinutes(minutes + STEP)} ${LEVEL_LABELS[level]}`}</title>
            </rect>
          );
        })}
        <rect
          x={PADDING_X}
          y={BAR_Y}
          width={VIEW_WIDTH - PADDING_X * 2}
          height={BAR_HEIGHT}
          rx={4}
          fill="none"
          stroke="var(--band-border)"
        />
        {TICK_HOURS.map((hour) => (
          <g key={hour}>
            <line
              x1={toX(hour * 60)}
              x2={toX(hour * 60)}
              y1={BAR_Y + BAR_HEIGHT}
              y2={BAR_Y + BAR_HEIGHT + 5}
              stroke="var(--band-border)"
            />
            <text
              x={toX(hour * 60)}
              y={BAR_Y + BAR_HEIGHT + 20}
              textAnchor="middle"
              fill="var(--band-text)"
              fontSize={12}
            >
              {`${hour}時`}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
