export const GetScheduleTime = (hours: number, minutes: number) => {
    const time = new Date()
    time.setHours(hours)
    time.setMinutes(minutes)
    time.setSeconds(0)
    time.setMilliseconds(0)
    return time
}

const makeClassChange = (
    classChangeNumber: string,
    times: {
        // These are actually backwards naming convention for easy copying and pasting from existing code!!
        start: Date
        end: Date
    }
) => {
    return {
        name: `Class Change ${classChangeNumber}`,
        start: times.end,
        end: times.start,
    } as Period
}

const calcClassChange = (scheduleName: string, classChangeNumber: string, modThatJustEndedId: number) => {

    const schedule = ScheduleList.filter(n => n.name === scheduleName)[0]
    return {
        name: `Class Change ${classChangeNumber}`,
        start: schedule.periods.filter(i => i.id === modThatJustEndedId)[0].end,
        end: schedule.periods.filter(i => i.id === modThatJustEndedId + 1)[0].start
    } as Period


}

// const makeClassChanges = (periods: Period[]) => {
//     let newPeriods = [] as Period[]
//
//     for (let i = 1; i < periods.length; i++) {
//         if (periods[i].name === 'Class Change') {
//             // This will be replaced with the updated times
//             newPeriods.push({
//                 name: 'Class Change',
//                 start: periods[i - 1].end,
//                 end: periods[i + 1].start,
//             })
//         } else {
//             //  This is a Mod
//             newPeriods.push(periods[i])
//         }
//     }
// }

export const ScheduleList: Schedule[] = [
    {
        name: 'Regular Schedule',
        selectionID: 'REGULAR',
        periods: [
            {
                id: 0,
                name: 'Before School',
                start: GetScheduleTime(0, 0),
                end: GetScheduleTime(6, 45),
            },
            {
                id: 1,
                name: 'Student Arrival',
                start: GetScheduleTime(6, 45),
                end: GetScheduleTime(7, 0),
            },
            {
                id: 2,
                name: 'Mod One',
                start: GetScheduleTime(7, 0),
                end: GetScheduleTime(7, 44),
            },
            makeClassChange('1', {
                end: GetScheduleTime(7, 44),
                start: GetScheduleTime(7, 47),
            }),
            {
                id: 3,
                name: 'Mod Two',
                start: GetScheduleTime(7, 47),
                end: GetScheduleTime(8, 31),
            },
            makeClassChange('2', {
                end: GetScheduleTime(8, 31),
                start: GetScheduleTime(8, 34),
            }),
            {
                id: 4,
                name: 'Mod Three',
                start: GetScheduleTime(8, 34),
                end: GetScheduleTime(9, 18),
            },
            makeClassChange('3', {
                end: GetScheduleTime(9, 18),
                start: GetScheduleTime(9, 21),
            }),
            {
                id: 5,
                name: 'Mod Four',
                start: GetScheduleTime(9, 21),
                end: GetScheduleTime(9, 51),
            },
            makeClassChange('4', {
                end: GetScheduleTime(9, 51),
                start: GetScheduleTime(9, 54),
            }),
            {
                id: 6,
                name: 'Mod Five',
                start: GetScheduleTime(9, 54),
                end: GetScheduleTime(10, 38),
            },
            makeClassChange('5', {
                end: GetScheduleTime(10, 38),
                start: GetScheduleTime(10, 41),
            }),
            {
                id: 7,
                name: 'Mod Six',
                start: GetScheduleTime(10, 41),
                end: GetScheduleTime(11, 25),
            },

            makeClassChange('6', {
                end: GetScheduleTime(11, 25),
                start: GetScheduleTime(11, 28),
            }),

            {
                id: 8,
                name: 'Mod Seven',
                start: GetScheduleTime(11, 28),
                end: GetScheduleTime(12, 12),
            },
            makeClassChange('7', {
                end: GetScheduleTime(12, 12),
                start: GetScheduleTime(12, 15),
            }),
            {
                id: 9,
                name: 'Mod Eight',
                start: GetScheduleTime(12, 15),
                end: GetScheduleTime(12, 59),
            },
            makeClassChange('8', {
                end: GetScheduleTime(12, 59),
                start: GetScheduleTime(13, 2),
            }),
            {
                id: 10,
                name: 'Mod Nine',
                start: GetScheduleTime(13, 2),
                end: GetScheduleTime(13, 50),
            },
            {
                id: 11,
                name: 'Student Dismissal',
                start: GetScheduleTime(13, 50),
                end: GetScheduleTime(14, 0),
            },
            {
                id: 12,
                name: 'After School',
                start: GetScheduleTime(14, 0),
                end: GetScheduleTime(23, 59),
            },
        ],
    },
    {
        name: 'Rally Schedule',
        selectionID: 'RALLY',
        periods: [
            {
                id: 0,
                name: 'Before School',
                start: GetScheduleTime(0, 0),
                end: GetScheduleTime(6, 45),
            },
            {
                id: 0,
                name: 'Student Arrival',
                start: GetScheduleTime(6, 45),
                end: GetScheduleTime(7, 0),
            },
            {
                id: 0,
                name: 'Mod One',
                start: GetScheduleTime(7, 0),
                end: GetScheduleTime(7, 45),
            },
            makeClassChange('1', {
                end: GetScheduleTime(7, 45),
                start: GetScheduleTime(7, 48),
            }),
            {
                id: 0,
                name: 'Mod Two',
                start: GetScheduleTime(7, 48),
                end: GetScheduleTime(8, 33),
            },
            makeClassChange('2', {
                end: GetScheduleTime(7, 44),
                start: GetScheduleTime(7, 47),
            }),
            {
                id: 0,
                name: 'Mod Three',
                start: GetScheduleTime(8, 36),
                end: GetScheduleTime(9, 26),
            },
            makeClassChange('3', {
                end: GetScheduleTime(9, 26),
                start: GetScheduleTime(9, 29),
            }),
            {
                id: 0,
                name: 'Mod Five',
                start: GetScheduleTime(9, 29),
                end: GetScheduleTime(10, 14),
            },
            makeClassChange('4', {
                end: GetScheduleTime(10, 14),
                start: GetScheduleTime(10, 17),
            }),
            {
                id: 0,
                name: 'Mod Six',
                start: GetScheduleTime(10, 17),
                end: GetScheduleTime(11, 2),
            },
            makeClassChange('5', {
                end: GetScheduleTime(11, 2),
                start: GetScheduleTime(11, 5),
            }),
            {
                id: 0,
                name: 'Mod Seven',
                start: GetScheduleTime(11, 5),
                end: GetScheduleTime(11, 50),
            },
            makeClassChange('6', {
                end: GetScheduleTime(11, 50),
                start: GetScheduleTime(11, 53),
            }),
            {
                id: 0, name: 'Mod Eight',
                start: GetScheduleTime(11, 53),
                end: GetScheduleTime(12, 38),
            },
            makeClassChange('7', {
                end: GetScheduleTime(12, 38),
                start: GetScheduleTime(12, 41),
            }),
            {
                id: 0, name: 'Mod Nine',
                start: GetScheduleTime(12, 41),
                end: GetScheduleTime(13, 26),
            },
            makeClassChange('8', {
                end: GetScheduleTime(13, 26),
                start: GetScheduleTime(13, 35),
            }),
            {
                id: 0, name: 'Rally',
                start: GetScheduleTime(13, 35),
                end: GetScheduleTime(13, 50),
            },
            {
                id: 0, name: 'Student Dismissal',
                start: GetScheduleTime(13, 50),
                end: GetScheduleTime(14, 0),
            },
            {
                id: 0, name: 'After School',
                start: GetScheduleTime(14, 0),
                end: GetScheduleTime(23, 59),
            },
        ],
    },
    {
        name: 'Assembly Schedule',
        selectionID: 'ASSEMBLY',
        periods: [
            {
                id: 0, name: 'Before School',
                start: GetScheduleTime(0, 0),
                end: GetScheduleTime(6, 45),
            },
            {
                id: 0, name: 'Student Arrival',
                start: GetScheduleTime(6, 45),
                end: GetScheduleTime(7, 0),
            },
            {
                id: 0, name: 'Mod One',
                start: GetScheduleTime(7, 0),
                end: GetScheduleTime(7, 40),
            },
            makeClassChange('1', {
                end: GetScheduleTime(7, 40),
                start: GetScheduleTime(7, 43),
            }),
            {
                id: 0, name: 'Mod Two',
                start: GetScheduleTime(7, 43),
                end: GetScheduleTime(8, 23),
            },
            makeClassChange('2', {
                end: GetScheduleTime(8, 23),
                start: GetScheduleTime(8, 26),
            }),
            {
                id: 0, name: 'Mod Three',
                start: GetScheduleTime(8, 26),
                end: GetScheduleTime(9, 8),
            },
            makeClassChange('3', {
                end: GetScheduleTime(9, 8),
                start: GetScheduleTime(9, 11),
            }),
            {
                id: 0, name: 'Assembly',
                start: GetScheduleTime(9, 11),
                end: GetScheduleTime(10, 11),
            },
            makeClassChange('4', {
                end: GetScheduleTime(10, 11),
                start: GetScheduleTime(10, 14),
            }),
            {
                id: 0, name: 'Mod Five',
                start: GetScheduleTime(10, 14),
                end: GetScheduleTime(10, 54),
            },
            makeClassChange('5', {
                end: GetScheduleTime(10, 54),
                start: GetScheduleTime(10, 57),
            }),
            {
                id: 0, name: 'Mod Six',
                start: GetScheduleTime(10, 57),
                end: GetScheduleTime(11, 37),
            },
            makeClassChange('6', {
                end: GetScheduleTime(11, 37),
                start: GetScheduleTime(11, 40),
            }),
            {
                id: 0, name: 'Mod Seven',
                start: GetScheduleTime(11, 40),
                end: GetScheduleTime(12, 20),
            },
            makeClassChange('7', {
                end: GetScheduleTime(12, 20),
                start: GetScheduleTime(12, 23),
            }),
            {
                id: 0, name: 'Mod Eight',
                start: GetScheduleTime(12, 23),
                end: GetScheduleTime(13, 3),
            },
            makeClassChange('8', {
                end: GetScheduleTime(13, 3),
                start: GetScheduleTime(13, 6),
            }),
            {
                id: 0, name: 'Mod Nine',
                start: GetScheduleTime(13, 6),
                end: GetScheduleTime(13, 50),
            },
            {
                id: 0, name: 'Student Dismissal',
                start: GetScheduleTime(13, 50),
                end: GetScheduleTime(14, 5),
            },
            {
                id: 0, name: 'After School',
                start: GetScheduleTime(14, 5),
                end: GetScheduleTime(23, 59),
            },
        ],
    },
    {
        name: 'Air Schedule',
        selectionID: 'AIR',
        periods: [
            {
                id: 0, name: 'Before School',
                start: GetScheduleTime(0, 0),
                end: GetScheduleTime(6, 45),
            },
            {
                id: 0, name: 'Student Arrival',
                start: GetScheduleTime(6, 45),
                end: GetScheduleTime(7, 0),
            },
            {
                id: 0, name: 'Air Test',
                start: GetScheduleTime(7, 0),
                end: GetScheduleTime(9, 0),
            },
            makeClassChange('1', {
                end: GetScheduleTime(7, 29),
                start: GetScheduleTime(7, 32),
            }),
            {
                id: 0, name: 'Mod One',
                start: GetScheduleTime(9, 5),
                end: GetScheduleTime(9, 33),
            },
            makeClassChange('1', {
                end: GetScheduleTime(7, 29),
                start: GetScheduleTime(7, 32),
            }),
            {
                id: 0, name: 'Mod Two',
                start: GetScheduleTime(9, 36),
                end: GetScheduleTime(10, 4),
            },
            makeClassChange('1', {
                end: GetScheduleTime(7, 29),
                start: GetScheduleTime(7, 32),
            }),
            {
                id: 0, name: 'Mod Three',
                start: GetScheduleTime(10, 7),
                end: GetScheduleTime(10, 35),
            },
            makeClassChange('1', {
                end: GetScheduleTime(7, 29),
                start: GetScheduleTime(7, 32),
            }),
            {
                id: 0, name: 'Mod Five',
                start: GetScheduleTime(10, 38),
                end: GetScheduleTime(11, 18),
            },
            makeClassChange('1', {
                end: GetScheduleTime(7, 29),
                start: GetScheduleTime(7, 32),
            }),
            {
                id: 0, name: 'Mod Six',
                start: GetScheduleTime(11, 21),
                end: GetScheduleTime(12, 1),
            },
            makeClassChange('1', {
                end: GetScheduleTime(7, 29),
                start: GetScheduleTime(7, 32),
            }),
            {
                id: 0, name: 'Mod Seven',
                start: GetScheduleTime(12, 4),
                end: GetScheduleTime(12, 44),
            },
            makeClassChange('1', {
                end: GetScheduleTime(7, 29),
                start: GetScheduleTime(7, 32),
            }),
            {
                id: 0, name: 'Mod Eight',
                start: GetScheduleTime(13, 47),
                end: GetScheduleTime(13, 15),
            },
            makeClassChange('1', {
                end: GetScheduleTime(7, 29),
                start: GetScheduleTime(7, 32),
            }),
            {
                id: 0, name: 'Mod Nine',
                start: GetScheduleTime(13, 18),
                end: GetScheduleTime(14, 50),
            },
            {
                id: 0, name: 'Student Dismissal',
                start: GetScheduleTime(14, 50),
                end: GetScheduleTime(14, 5),
            },
            {
                id: 0, name: 'After School',
                start: GetScheduleTime(14, 5),
                end: GetScheduleTime(23, 59),
            },
        ],
    },
    {
        name: 'Exam Schedule - Day 1',
        selectionID: 'EXAM1',
        periods: [
            {
                id: 0, name: 'Before School',
                start: GetScheduleTime(0, 0),
                end: GetScheduleTime(6, 45),
            },
            {
                id: 0, name: 'Student Arrival',
                start: GetScheduleTime(6, 45),
                end: GetScheduleTime(7, 0),
            },
            {
                id: 0, name: 'Mod One',
                start: GetScheduleTime(7, 0),
                end: GetScheduleTime(8, 0),
            },
            {
                id: 0, name: 'Class Change 1',
                start: GetScheduleTime(8, 0),
                end: GetScheduleTime(8, 5),
            },
            {
                id: 0, name: 'Mod Two',
                start: GetScheduleTime(8, 5),
                end: GetScheduleTime(9, 5),
            },
            {
                id: 0, name: 'Class Change 2',
                start: GetScheduleTime(9, 5),
                end: GetScheduleTime(9, 10),
            },
            {
                id: 0, name: 'Mod Five',
                start: GetScheduleTime(9, 10),
                end: GetScheduleTime(10, 10),
            },
            {
                id: 0, name: 'Class Change 3',
                start: GetScheduleTime(10, 10),
                end: GetScheduleTime(10, 15),
            },
            {
                id: 0, name: 'Student Lunch',
                start: GetScheduleTime(10, 15),
                end: GetScheduleTime(11, 0),
            },
            {
                id: 0, name: 'Make-Ups',
                start: GetScheduleTime(11, 0),
                end: GetScheduleTime(13, 50),
            },
            {
                id: 0, name: 'After School',
                start: GetScheduleTime(13, 50),
                end: GetScheduleTime(23, 59),
            },
        ],
    },
    {
        name: 'Exam Schedule - Day 2',
        selectionID: 'EXAM2',
        periods: [
            {
                id: 0, name: 'Before School',
                start: GetScheduleTime(0, 0),
                end: GetScheduleTime(6, 45),
            },
            {
                id: 0, name: 'Student Arrival',
                start: GetScheduleTime(6, 45),
                end: GetScheduleTime(7, 0),
            },
            {
                id: 0, name: 'Mod Three',
                start: GetScheduleTime(7, 0),
                end: GetScheduleTime(8, 0),
            },
            {
                id: 0, name: 'Class Change 1',
                start: GetScheduleTime(8, 0),
                end: GetScheduleTime(8, 5),
            },
            {
                id: 0, name: 'Mod Eight',
                start: GetScheduleTime(8, 5),
                end: GetScheduleTime(9, 5),
            },
            {
                id: 0, name: 'Class Change 2',
                start: GetScheduleTime(9, 5),
                end: GetScheduleTime(9, 10),
            },
            {
                id: 0, name: 'Mod Six',
                start: GetScheduleTime(9, 10),
                end: GetScheduleTime(10, 10),
            },
            {
                id: 0, name: 'Class Change 3',
                start: GetScheduleTime(10, 10),
                end: GetScheduleTime(10, 15),
            },
            {
                id: 0, name: 'Student Lunch',
                start: GetScheduleTime(10, 15),
                end: GetScheduleTime(11, 0),
            },
            {
                id: 0, name: 'Make-Ups',
                start: GetScheduleTime(11, 0),
                end: GetScheduleTime(13, 50),
            },
            {
                id: 0, name: 'After School',
                start: GetScheduleTime(13, 50),
                end: GetScheduleTime(23, 59),
            },
        ],
    },
    {
        name: 'Exam Schedule - Day 3',
        selectionID: 'EXAM3',
        periods: [
            {
                id: 0, name: 'Before School',
                start: GetScheduleTime(0, 0),
                end: GetScheduleTime(6, 45),
            },
            {
                id: 0, name: 'Student Arrival',
                start: GetScheduleTime(6, 45),
                end: GetScheduleTime(7, 0),
            },
            {
                id: 0, name: 'Mod Nine',
                start: GetScheduleTime(7, 0),
                end: GetScheduleTime(8, 0),
            },
            {
                id: 0, name: 'Class Change 1',
                start: GetScheduleTime(8, 0),
                end: GetScheduleTime(8, 5),
            },
            {
                id: 0, name: 'Mod Seven',
                start: GetScheduleTime(8, 5),
                end: GetScheduleTime(9, 5),
            },
            {
                id: 0, name: 'Class Change 2',
                start: GetScheduleTime(9, 5),
                end: GetScheduleTime(9, 10),
            },
            {
                id: 0, name: 'Make-Ups',
                start: GetScheduleTime(9, 10),
                end: GetScheduleTime(10, 10),
            },
            {
                id: 0, name: 'Class Change 3',
                start: GetScheduleTime(10, 10),
                end: GetScheduleTime(10, 15),
            },
            {
                id: 0, name: 'Student Lunch',
                start: GetScheduleTime(10, 15),
                end: GetScheduleTime(11, 0),
            },
            {
                id: 0, name: 'Make-Ups',
                start: GetScheduleTime(11, 0),
                end: GetScheduleTime(13, 50),
            },
            {
                id: 0, name: 'After School',
                start: GetScheduleTime(13, 50),
                end: GetScheduleTime(23, 59),
            },
        ],
    },
    {
        name: 'Beat McKinley Rally Schdeule',
        selectionID: 'MCKRALLY',
        periods: [
            {
                id: 0, name: 'Before School',
                start: GetScheduleTime(0, 0),
                end: GetScheduleTime(6, 45),
            },
            {
                id: 0, name: 'Student Arrival',
                start: GetScheduleTime(6, 45),
                end: GetScheduleTime(7, 0),
            },
            {
                id: 0, name: 'Mod One',
                start: GetScheduleTime(7, 0),
                end: GetScheduleTime(7, 40),
            },
            {
                id: 0, name: 'Class Change 1',
                start: GetScheduleTime(7, 40),
                end: GetScheduleTime(7, 43),
            },
            {
                id: 0, name: 'Mod Two',
                start: GetScheduleTime(7, 43),
                end: GetScheduleTime(8, 23),
            },
            {
                id: 0, name: 'Class Change 2',
                start: GetScheduleTime(8, 26),
                end: GetScheduleTime(8, 29),
            },
            {
                id: 0, name: 'Mod Three',
                start: GetScheduleTime(9, 9),
                end: GetScheduleTime(9, 49),
            },
            {
                id: 0, name: 'Class Change 3',
                start: GetScheduleTime(9, 49),
                end: GetScheduleTime(9, 52),
            },
            {
                id: 0, name: 'Mod Five',
                start: GetScheduleTime(9, 9),
                end: GetScheduleTime(9, 49),
            },
            {
                id: 0, name: 'Class Change 4',
                start: GetScheduleTime(9, 49),
                end: GetScheduleTime(9, 52),
            },
            {
                id: 0, name: 'Mod Six',
                start: GetScheduleTime(9, 52),
                end: GetScheduleTime(10, 32),
            },
            {
                id: 0, name: 'Class Change 5',
                start: GetScheduleTime(10, 32),
                end: GetScheduleTime(10, 35),
            },
            {
                id: 0, name: 'Mod Seven',
                start: GetScheduleTime(10, 35),
                end: GetScheduleTime(11, 15),
            },
            {
                id: 0, name: 'Class Change 6',
                start: GetScheduleTime(11, 15),
                end: GetScheduleTime(11, 18),
            },
            {
                id: 0, name: 'Mod Eight',
                start: GetScheduleTime(11, 18),
                end: GetScheduleTime(11, 58),
            },
            {
                id: 0, name: 'Class Change 7',
                start: GetScheduleTime(11, 58),
                end: GetScheduleTime(12, 15),
            },
            {
                id: 0, name: 'Mod Nine',
                start: GetScheduleTime(12, 1),
                end: GetScheduleTime(12, 41),
            },
            {
                id: 0, name: 'Class Change 8',
                start: GetScheduleTime(12, 41),
                end: GetScheduleTime(12, 44),
            },
            {
                id: 0, name: 'Rally',
                start: GetScheduleTime(13, 0),
                end: GetScheduleTime(13, 45),
            },
            {
                id: 0, name: 'Student Dismissal',
                start: GetScheduleTime(13, 50),
                end: GetScheduleTime(14, 5),
            },
            {
                id: 0, name: 'After School',
                start: GetScheduleTime(14, 5),
                end: GetScheduleTime(23, 59),
            },
        ],
    },
    {
        name: 'Miss Mass / OSB Schedule',
        selectionID: 'MMOSB',
        periods: [
            {
                id: 0, name: 'Before School',
                start: GetScheduleTime(0, 0),
                end: GetScheduleTime(6, 45),
            },
            {
                id: 0, name: 'Student Arrival',
                start: GetScheduleTime(6, 45),
                end: GetScheduleTime(7, 0),
            },
            {
                id: 0, name: 'Mod One',
                start: GetScheduleTime(7, 15),
                end: GetScheduleTime(7, 51),
            },
            {
                id: 0, name: 'Class Change 1',
                start: GetScheduleTime(7, 51),
                end: GetScheduleTime(7, 54),
            },
            {
                id: 0, name: 'Mod Two',
                start: GetScheduleTime(7, 54),
                end: GetScheduleTime(8, 30),
            },
            {
                id: 0, name: 'Class Change 2',
                start: GetScheduleTime(8, 30),
                end: GetScheduleTime(8, 33),
            },
            {
                id: 0, name: 'Mod Three',
                start: GetScheduleTime(8, 33),
                end: GetScheduleTime(9, 13),
            },
            {
                id: 0, name: 'Class Change 3',
                start: GetScheduleTime(9, 13),
                end: GetScheduleTime(9, 16),
            },
            {
                id: 0, name: 'Assembly',
                start: GetScheduleTime(9, 16),
                end: GetScheduleTime(10, 26),
            },
            {
                id: 0, name: 'Class Change 4',
                start: GetScheduleTime(10, 26),
                end: GetScheduleTime(10, 29),
            },
            {
                id: 0, name: 'Mod Five',
                start: GetScheduleTime(10, 29),
                end: GetScheduleTime(11, 9),
            },
            {
                id: 0, name: 'Class Change 5',
                start: GetScheduleTime(11, 9),
                end: GetScheduleTime(11, 12),
            },
            {
                id: 0, name: 'Mod Six',
                start: GetScheduleTime(11, 12),
                end: GetScheduleTime(11, 52),
            },
            {
                id: 0, name: 'Class Change 6',
                start: GetScheduleTime(11, 52),
                end: GetScheduleTime(11, 55),
            },
            {
                id: 0, name: 'Mod Seven',
                start: GetScheduleTime(11, 55),
                end: GetScheduleTime(12, 35),
            },
            {
                id: 0, name: 'Class Change 7',
                start: GetScheduleTime(12, 35),
                end: GetScheduleTime(12, 38),
            },
            {
                id: 0, name: 'Mod Eight',
                start: GetScheduleTime(12, 38),
                end: GetScheduleTime(13, 18),
            },
            {
                id: 0, name: 'Class Change 8',
                start: GetScheduleTime(13, 18),
                end: GetScheduleTime(13, 21),
            },
            {
                id: 0, name: 'Mod Nine',
                start: GetScheduleTime(13, 21),
                end: GetScheduleTime(14, 5),
            },
            {
                id: 0, name: 'Student Dismissal',
                start: GetScheduleTime(14, 5),
                end: GetScheduleTime(14, 20),
            },
            {
                id: 0, name: 'After School',
                start: GetScheduleTime(14, 20),
                end: GetScheduleTime(23, 59),
            },
        ],
    },
    {
        name: 'Senior Exam Schedule',
        selectionID: 'SENIOREXAM',
        periods: [
            {
                id: 0, name: 'Before School',
                start: GetScheduleTime(0, 0),
                end: GetScheduleTime(6, 45),
            },
            {
                id: 0, name: 'Student Arrival',
                start: GetScheduleTime(6, 45),
                end: GetScheduleTime(7, 0),
            },
            {
                id: 0, name: 'Mod One',
                start: GetScheduleTime(7, 15),
                end: GetScheduleTime(8, 3),
            },
            {
                id: 0, name: 'Class Change 1',
                start: GetScheduleTime(8, 3),
                end: GetScheduleTime(8, 6),
            },
            {
                id: 0, name: 'Mod Two',
                start: GetScheduleTime(8, 6),
                end: GetScheduleTime(8, 54),
            },
            {
                id: 0, name: 'Class Change 2',
                start: GetScheduleTime(8, 54),
                end: GetScheduleTime(8, 57),
            },
            {
                id: 0, name: 'Mod Three',
                start: GetScheduleTime(8, 57),
                end: GetScheduleTime(9, 45),
            },
            {
                id: 0, name: 'Class Change 3',
                start: GetScheduleTime(9, 45),
                end: GetScheduleTime(9, 48),
            },
            {
                id: 0, name: 'Mod Five',
                start: GetScheduleTime(9, 48),
                end: GetScheduleTime(10, 36),
            },
            {
                id: 0, name: 'Class Change 5',
                start: GetScheduleTime(10, 36),
                end: GetScheduleTime(10, 39),
            },
            {
                id: 0, name: 'Mod Six',
                start: GetScheduleTime(10, 39),
                end: GetScheduleTime(11, 27),
            },
            {
                id: 0, name: 'Class Change 6',
                start: GetScheduleTime(11, 27),
                end: GetScheduleTime(11, 30),
            },
            {
                id: 0, name: 'Mod Seven',
                start: GetScheduleTime(11, 30),
                end: GetScheduleTime(12, 18),
            },
            {
                id: 0, name: 'Class Change 7',
                start: GetScheduleTime(12, 18),
                end: GetScheduleTime(12, 21),
            },
            {
                id: 0, name: 'Mod Eight',
                start: GetScheduleTime(12, 21),
                end: GetScheduleTime(13, 9),
            },
            {
                id: 0, name: 'Class Change 8',
                start: GetScheduleTime(13, 9),
                end: GetScheduleTime(13, 12),
            },
            {
                id: 0, name: 'Mod Nine',
                start: GetScheduleTime(13, 12),
                end: GetScheduleTime(14, 5),
            },
            {
                id: 0, name: 'Student Dismissal',
                start: GetScheduleTime(14, 5),
                end: GetScheduleTime(14, 20),
            },
            {
                id: 0, name: 'After School',
                start: GetScheduleTime(14, 20),
                end: GetScheduleTime(23, 59),
            },
        ],
    },
    {
        name: 'OST Testing Schedule',
        selectionID: 'OST',
        periods: [
            {
                id: 0, name: 'Before School',
                start: GetScheduleTime(0, 0),
                end: GetScheduleTime(6, 45),
            },
            {
                id: 0, name: 'Student Arrival',
                start: GetScheduleTime(6, 45),
                end: GetScheduleTime(7, 0),
            },
            {
                id: 0, name: 'Mod One',
                start: GetScheduleTime(7, 0),
                end: GetScheduleTime(7, 51),
            },
            makeClassChange('1', {
                end: GetScheduleTime(7, 51),
                start: GetScheduleTime(7, 54),
            }),
            {
                id: 0, name: 'Mod Two',
                start: GetScheduleTime(7, 54),
                end: GetScheduleTime(8, 45),
            },
            makeClassChange('2', {
                end: GetScheduleTime(8, 45),
                start: GetScheduleTime(8, 48),
            }),
            {
                id: 0, name: 'Mod Three',
                start: GetScheduleTime(8, 48),
                end: GetScheduleTime(9, 39),
            },
            makeClassChange('3', {
                end: GetScheduleTime(9, 39),
                start: GetScheduleTime(9, 42),
            }),
            {
                id: 0, name: 'Mod Five',
                start: GetScheduleTime(9, 42),
                end: GetScheduleTime(10, 26),
            },
            makeClassChange('4', {
                end: GetScheduleTime(10, 26),
                start: GetScheduleTime(10, 29),
            }),
            {
                id: 0, name: 'Mod Six',
                start: GetScheduleTime(10, 29),
                end: GetScheduleTime(11, 13),
            },
            makeClassChange('5', {
                end: GetScheduleTime(11, 13),
                start: GetScheduleTime(11, 16),
            }),
            {
                id: 0, name: 'Mod Seven',
                start: GetScheduleTime(11, 16),
                end: GetScheduleTime(12, 0),
            },
            makeClassChange('6', {
                end: GetScheduleTime(12, 0),
                start: GetScheduleTime(12, 3),
            }),
            {
                id: 0, name: 'Mod Eight',
                start: GetScheduleTime(12, 3),
                end: GetScheduleTime(12, 53),
            },
            makeClassChange('7', {
                end: GetScheduleTime(12, 53),
                start: GetScheduleTime(12, 56),
            }),
            {
                id: 0, name: 'Mod Nine',
                start: GetScheduleTime(12, 56),
                end: GetScheduleTime(13, 50),
            },
            {
                id: 0, name: 'Student Dismissal',
                start: GetScheduleTime(13, 50),
                end: GetScheduleTime(14, 0),
            },
            {
                id: 0, name: 'After School',
                start: GetScheduleTime(14, 0),
                end: GetScheduleTime(23, 59),
            },
        ],
    },
]
