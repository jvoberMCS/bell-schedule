type Props = {};
type TimerProps = Props extends Record<string, never> ? React.FC<Record<string, never>> : React.FC<Props>;
export declare const Timer: TimerProps;
export {};
