import React from 'react';

export type BadgeProps = {
  value: JSX.Element,
  backgroundColor: string,
}

export default function Badge({ value, backgroundColor }: BadgeProps) {
  return (
    <span
      className="font-weight-400 d-inline-block color-grey-800 border-radius-sm text-transform-capitalize"
      style={{
        backgroundColor: backgroundColor,
        padding: '2px 6px',
      }}
    >
      {value}
    </span>
  );
}
