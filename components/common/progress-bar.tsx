import React from 'react';

const ProgressBar = ({
  color = 'blue',
  value,
  max = 100,
  label,
  show = true,
  rightLabel,
}: {
  label: string;
  color?: 'red' | 'blue' | 'green' | 'gray';
  value: number;
  max?: number;
  show?: boolean;
  rightLabel?: string;
}) => {
  return (
    <div>
      {show && (
        <p className="-mb-1 flex w-full justify-between text-[14px] leading-[24px]">
          <span>{label}</span>{' '}
          <span>{rightLabel ? rightLabel : `${value}/${max}`}</span>
        </p>
      )}
      <progress value={value} max={max} className={color}></progress>
    </div>
  );
};

interface ProgressSegment {
  value: number;
  color: 'blue' | 'gray' | 'red' | 'green';
}

const MultiProgressBar = ({
  segments,
  max = 100,
  width,
}: {
  max: number;
  segments: ProgressSegment[];
  width?: string;
}) => {
  return (
    <div>
      <div
        className={`${
          width ? width : 'w-full'
        } relative mt-2 h-2  overflow-hidden rounded-md bg-gray-200`}>
        <div className="flex h-full">
          {segments.map((segment, index) => {
            const width = `${(segment.value / max) * 100}%`;
            return (
              <div
                key={index}
                className="h-full"
                style={{
                  width,
                  backgroundColor:
                    segment.color === 'red'
                      ? '#f54b4e'
                      : segment.color === 'green'
                      ? '#4bf5a3'
                      : segment.color === 'blue'
                      ? '#4b70f5'
                      : '#6b7280',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
export { MultiProgressBar };
