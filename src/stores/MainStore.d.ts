type State = {
    scheduleSelection: ScheduleSelection;
    schedules: Schedule[];
    timeUntilNextMod: {
        hours: number;
        minutes: number;
        seconds: number;
    };
    timeUntilEndOfDay: {
        hours: number;
        minutes: number;
        seconds: number;
    };
};
type Action = {
    setScheduleSelection: (newScheduleSelection: ScheduleSelection) => void;
    setTimeUntilNextMod: (timeUntilNextMod: {
        hours: number;
        minutes: number;
        seconds: number;
    }) => void;
    setTimeUntilEndOfDay: (timeUntilEndOfDay: {
        hours: number;
        minutes: number;
        seconds: number;
    }) => void;
};
export declare const useMainStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<State & Action>, "setState"> & {
    setState(nextStateOrUpdater: (State & Action) | Partial<State & Action> | ((state: import("immer").WritableDraft<State & Action>) => void), shouldReplace?: boolean | undefined): void;
}>;
export {};
