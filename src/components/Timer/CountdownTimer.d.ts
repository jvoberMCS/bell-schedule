import React from 'react';
type Props = {
    width: number;
    height: number;
};
type CountdownTimerProps = Props extends Record<string, never> ? React.FC<Record<string, never>> : React.FC<Props>;
export declare const CountdownTimer: CountdownTimerProps;
export {};
