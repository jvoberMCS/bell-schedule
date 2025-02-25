export declare const getScheduleTime: (hours: number, minutes: number) => Date;
export declare const ScheduleList: ({
    name: string;
    selectionID: string;
    periods: {
        name: string;
        start: {
            time: Date;
            bellPlayed: boolean;
        };
        end: {
            time: Date;
            bellPlayed: boolean;
        };
    }[];
} | undefined)[];
