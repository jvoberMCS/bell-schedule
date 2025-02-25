import React from 'react';
type Props = {};
type ScheduleProps = Props extends Record<string, never> ? React.FC<Record<string, never>> : React.FC<Props>;
export declare const Schedule: ScheduleProps;
export {};
