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

export const ScheduleList: Schedule[] = [
	{
		name: 'Regular Schedule',
		selectionID: 'REGULAR',
		periods: [
			{
				name: 'Before School',
				start: GetScheduleTime(0, 0),
				end: GetScheduleTime(6, 45),
			},
			{
				name: 'Student Arrival',
				start: GetScheduleTime(6, 45),
				end: GetScheduleTime(7, 0),
			},
			{
				name: 'Mod One',
				start: GetScheduleTime(7, 0),
				end: GetScheduleTime(7, 44),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Mod Two',
				start: GetScheduleTime(7, 47),
				end: GetScheduleTime(8, 31),
			},
			makeClassChange('2', {
				end: GetScheduleTime(8, 31),
				start: GetScheduleTime(8, 34),
			}),
			{
				name: 'Mod Three',
				start: GetScheduleTime(8, 34),
				end: GetScheduleTime(9, 18),
			},
			makeClassChange('3', {
				end: GetScheduleTime(9, 18),
				start: GetScheduleTime(9, 21),
			}),
			{
				name: 'Mod Four',
				start: GetScheduleTime(9, 21),
				end: GetScheduleTime(9, 51),
			},
			makeClassChange('4', {
				end: GetScheduleTime(9, 51),
				start: GetScheduleTime(9, 54),
			}),
			{
				name: 'Mod Five',
				start: GetScheduleTime(9, 54),
				end: GetScheduleTime(10, 38),
			},
			makeClassChange('5', {
				end: GetScheduleTime(10, 38),
				start: GetScheduleTime(10, 41),
			}),
			{
				name: 'Mod Six',
				start: GetScheduleTime(10, 41),
				end: GetScheduleTime(11, 25),
			},

			makeClassChange('6', {
				end: GetScheduleTime(11, 25),
				start: GetScheduleTime(11, 28),
			}),

			{
				name: 'Mod Seven',
				start: GetScheduleTime(11, 28),
				end: GetScheduleTime(12, 12),
			},
			makeClassChange('7', {
				end: GetScheduleTime(12, 12),
				start: GetScheduleTime(12, 15),
			}),
			{
				name: 'Mod Eight',
				start: GetScheduleTime(12, 15),
				end: GetScheduleTime(12, 59),
			},
			makeClassChange('8', {
				end: GetScheduleTime(12, 59),
				start: GetScheduleTime(13, 2),
			}),
			{
				name: 'Mod Nine',
				start: GetScheduleTime(13, 2),
				end: GetScheduleTime(13, 50),
			},
			{
				name: 'Student Dismissal',
				start: GetScheduleTime(13, 50),
				end: GetScheduleTime(14, 0),
			},
			{
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
				name: 'Before School',
				start: GetScheduleTime(0, 0),
				end: GetScheduleTime(6, 45),
			},
			{
				name: 'Student Arrival',
				start: GetScheduleTime(6, 45),
				end: GetScheduleTime(7, 0),
			},
			{
				name: 'Mod One',
				start: GetScheduleTime(7, 0),
				end: GetScheduleTime(7, 45),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 45),
				start: GetScheduleTime(7, 48),
			}),
			{
				name: 'Mod Two',
				start: GetScheduleTime(7, 48),
				end: GetScheduleTime(8, 33),
			},
			makeClassChange('2', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Mod Three',
				start: GetScheduleTime(8, 36),
				end: GetScheduleTime(9, 26),
			},
			makeClassChange('3', {
				end: GetScheduleTime(9, 26),
				start: GetScheduleTime(9, 29),
			}),
			{
				name: 'Mod Five',
				start: GetScheduleTime(9, 29),
				end: GetScheduleTime(10, 14),
			},
			makeClassChange('4', {
				end: GetScheduleTime(10, 14),
				start: GetScheduleTime(10, 17),
			}),
			{
				name: 'Mod Six',
				start: GetScheduleTime(10, 17),
				end: GetScheduleTime(11, 2),
			},
			makeClassChange('5', {
				end: GetScheduleTime(11, 2),
				start: GetScheduleTime(11, 5),
			}),
			{
				name: 'Mod Seven',
				start: GetScheduleTime(11, 5),
				end: GetScheduleTime(11, 50),
			},
			makeClassChange('6', {
				end: GetScheduleTime(11, 50),
				start: GetScheduleTime(11, 53),
			}),
			{
				name: 'Mod Eight',
				start: GetScheduleTime(11, 53),
				end: GetScheduleTime(12, 38),
			},
			makeClassChange('7', {
				end: GetScheduleTime(12, 38),
				start: GetScheduleTime(12, 41),
			}),
			{
				name: 'Mod Nine',
				start: GetScheduleTime(12, 41),
				end: GetScheduleTime(13, 26),
			},
			makeClassChange('8', {
				end: GetScheduleTime(13, 26),
				start: GetScheduleTime(13, 35),
			}),
			{
				name: 'Rally',
				start: GetScheduleTime(13, 35),
				end: GetScheduleTime(13, 50),
			},
			{
				name: 'Student Dismissal',
				start: GetScheduleTime(13, 50),
				end: GetScheduleTime(14, 0),
			},
			{
				name: 'After School',
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
				name: 'Before School',
				start: GetScheduleTime(0, 0),
				end: GetScheduleTime(7, 0),
			},
			{
				name: 'Student Arrival',
				start: GetScheduleTime(7, 0),
				end: GetScheduleTime(7, 15),
			},
			{
				name: 'Mod One',
				start: GetScheduleTime(7, 15),
				end: GetScheduleTime(7, 55),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Mod Two',
				start: GetScheduleTime(7, 58),
				end: GetScheduleTime(8, 38),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Mod Three',
				start: GetScheduleTime(8, 41),
				end: GetScheduleTime(9, 23),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Assembly',
				start: GetScheduleTime(9, 26),
				end: GetScheduleTime(10, 26),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Mod Five',
				start: GetScheduleTime(10, 29),
				end: GetScheduleTime(11, 9),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Mod Six',
				start: GetScheduleTime(11, 12),
				end: GetScheduleTime(11, 52),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Mod Seven',
				start: GetScheduleTime(11, 55),
				end: GetScheduleTime(12, 35),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Mod Eight',
				start: GetScheduleTime(12, 38),
				end: GetScheduleTime(13, 18),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Mod Nine',
				start: GetScheduleTime(13, 21),
				end: GetScheduleTime(14, 5),
			},
			{
				name: 'Student Dismissal',
				start: GetScheduleTime(14, 5),
				end: GetScheduleTime(14, 20),
			},
			{
				name: 'After School',
				start: GetScheduleTime(14, 20),
				end: GetScheduleTime(23, 59),
			},
		],
	},
	{
		name: 'Air Schedule',
		selectionID: 'AIR',
		periods: [
			{
				name: 'Before School',
				start: GetScheduleTime(0, 0),
				end: GetScheduleTime(7, 0),
			},
			{
				name: 'Student Arrival',
				start: GetScheduleTime(7, 0),
				end: GetScheduleTime(7, 15),
			},
			{
				name: 'Air Test',
				start: GetScheduleTime(7, 15),
				end: GetScheduleTime(9, 15),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Mod One',
				start: GetScheduleTime(9, 20),
				end: GetScheduleTime(9, 48),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Mod Two',
				start: GetScheduleTime(9, 51),
				end: GetScheduleTime(10, 19),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Mod Three',
				start: GetScheduleTime(10, 22),
				end: GetScheduleTime(10, 50),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Mod Five',
				start: GetScheduleTime(10, 53),
				end: GetScheduleTime(11, 33),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Mod Six',
				start: GetScheduleTime(11, 36),
				end: GetScheduleTime(12, 16),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Mod Seven',
				start: GetScheduleTime(12, 19),
				end: GetScheduleTime(12, 59),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Mod Eight',
				start: GetScheduleTime(13, 2),
				end: GetScheduleTime(13, 30),
			},
			makeClassChange('1', {
				end: GetScheduleTime(7, 44),
				start: GetScheduleTime(7, 47),
			}),
			{
				name: 'Mod Nine',
				start: GetScheduleTime(13, 33),
				end: GetScheduleTime(14, 5),
			},
			{
				name: 'Student Dismissal',
				start: GetScheduleTime(14, 5),
				end: GetScheduleTime(14, 20),
			},
			{
				name: 'After School',
				start: GetScheduleTime(14, 20),
				end: GetScheduleTime(23, 59),
			},
		],
	},
	{
		name: 'Exam Schedule - Day 1',
		selectionID: 'EXAM1',
		periods: [
			{
				name: 'Before School',
				start: GetScheduleTime(0, 0),
				end: GetScheduleTime(7, 0),
			},
			{
				name: 'Student Arrival',
				start: GetScheduleTime(7, 0),
				end: GetScheduleTime(7, 15),
			},
			{
				name: 'Mod One',
				start: GetScheduleTime(7, 15),
				end: GetScheduleTime(8, 15),
			},
			{
				name: 'Class Change 1',
				start: GetScheduleTime(8, 15),
				end: GetScheduleTime(8, 20),
			},
			{
				name: 'Mod Two',
				start: GetScheduleTime(8, 20),
				end: GetScheduleTime(9, 20),
			},
			{
				name: 'Class Change 2',
				start: GetScheduleTime(9, 20),
				end: GetScheduleTime(9, 25),
			},
			{
				name: 'Mod Five',
				start: GetScheduleTime(9, 25),
				end: GetScheduleTime(10, 25),
			},
			{
				name: 'Class Change 3',
				start: GetScheduleTime(10, 25),
				end: GetScheduleTime(10, 30),
			},
			{
				name: 'Student Lunch',
				start: GetScheduleTime(10, 30),
				end: GetScheduleTime(11, 0),
			},
			{
				name: 'Class Change 4',
				start: GetScheduleTime(11, 0),
				end: GetScheduleTime(10, 30),
			},
			{
				name: 'Staff Lunch',
				start: GetScheduleTime(10, 30),
				end: GetScheduleTime(11, 15),
			},
			{
				name: 'Make-Ups',
				start: GetScheduleTime(11, 15),
				end: GetScheduleTime(14, 5),
			},
			{
				name: 'Student Dismissal',
				start: GetScheduleTime(14, 5),
				end: GetScheduleTime(14, 20),
			},
			{
				name: 'After School',
				start: GetScheduleTime(14, 20),
				end: GetScheduleTime(23, 59),
			},
		],
	},
	{
		name: 'Exam Schedule - Day 2',
		selectionID: 'EXAM2',
		periods: [
			{
				name: 'Before School',
				start: GetScheduleTime(0, 0),
				end: GetScheduleTime(7, 0),
			},
			{
				name: 'Student Arrival',
				start: GetScheduleTime(7, 0),
				end: GetScheduleTime(7, 15),
			},
			{
				name: 'Mod Three',
				start: GetScheduleTime(7, 15),
				end: GetScheduleTime(8, 15),
			},
			{
				name: 'Class Change 1',
				start: GetScheduleTime(8, 15),
				end: GetScheduleTime(8, 20),
			},
			{
				name: 'Mod Eight',
				start: GetScheduleTime(8, 20),
				end: GetScheduleTime(9, 20),
			},
			{
				name: 'Class Change 2',
				start: GetScheduleTime(9, 20),
				end: GetScheduleTime(9, 25),
			},
			{
				name: 'Mod Six',
				start: GetScheduleTime(9, 25),
				end: GetScheduleTime(10, 25),
			},
			{
				name: 'Class Change 3',
				start: GetScheduleTime(10, 25),
				end: GetScheduleTime(10, 30),
			},
			{
				name: 'Student Lunch',
				start: GetScheduleTime(10, 30),
				end: GetScheduleTime(11, 0),
			},
			{
				name: 'Class Change 4',
				start: GetScheduleTime(11, 0),
				end: GetScheduleTime(10, 30),
			},
			{
				name: 'Staff Lunch',
				start: GetScheduleTime(10, 30),
				end: GetScheduleTime(11, 15),
			},
			{
				name: 'Make-Ups',
				start: GetScheduleTime(11, 15),
				end: GetScheduleTime(14, 5),
			},
			{
				name: 'Student Dismissal',
				start: GetScheduleTime(14, 5),
				end: GetScheduleTime(14, 20),
			},
			{
				name: 'After School',
				start: GetScheduleTime(14, 20),
				end: GetScheduleTime(23, 59),
			},
		],
	},
	{
		name: 'Exam Schedule - Day 3',
		selectionID: 'EXAM3',
		periods: [
			{
				name: 'Before School',
				start: GetScheduleTime(0, 0),
				end: GetScheduleTime(7, 0),
			},
			{
				name: 'Student Arrival',
				start: GetScheduleTime(7, 0),
				end: GetScheduleTime(7, 15),
			},
			{
				name: 'Mod Nine',
				start: GetScheduleTime(7, 15),
				end: GetScheduleTime(8, 15),
			},
			{
				name: 'Class Change 1',
				start: GetScheduleTime(8, 15),
				end: GetScheduleTime(8, 20),
			},
			{
				name: 'Mod Seven',
				start: GetScheduleTime(8, 20),
				end: GetScheduleTime(9, 20),
			},
			{
				name: 'Class Change 2',
				start: GetScheduleTime(9, 20),
				end: GetScheduleTime(9, 25),
			},
			{
				name: 'Make-Ups',
				start: GetScheduleTime(9, 25),
				end: GetScheduleTime(10, 25),
			},
			{
				name: 'Class Change 3',
				start: GetScheduleTime(10, 25),
				end: GetScheduleTime(10, 30),
			},
			{
				name: 'Student Lunch',
				start: GetScheduleTime(10, 30),
				end: GetScheduleTime(11, 0),
			},
			{
				name: 'Class Change 4',
				start: GetScheduleTime(11, 0),
				end: GetScheduleTime(10, 30),
			},
			{
				name: 'Staff Lunch',
				start: GetScheduleTime(10, 30),
				end: GetScheduleTime(11, 15),
			},
			{
				name: 'Make-Ups',
				start: GetScheduleTime(11, 15),
				end: GetScheduleTime(14, 5),
			},
			{
				name: 'Student Dismissal',
				start: GetScheduleTime(14, 5),
				end: GetScheduleTime(14, 20),
			},
			{
				name: 'After School',
				start: GetScheduleTime(14, 20),
				end: GetScheduleTime(23, 59),
			},
		],
	},
	{
		name: 'Beat McKinley Rally Schdeule',
		selectionID: 'MCKRALLY',
		periods: [
			{
				name: 'Before School',
				start: GetScheduleTime(0, 0),
				end: GetScheduleTime(7, 0),
			},
			{
				name: 'Student Arrival',
				start: GetScheduleTime(7, 0),
				end: GetScheduleTime(7, 15),
			},
			{
				name: 'Mod One',
				start: GetScheduleTime(7, 15),
				end: GetScheduleTime(8, 5),
			},
			{
				name: 'Class Change 1',
				start: GetScheduleTime(8, 5),
				end: GetScheduleTime(8, 8),
			},
			{
				name: 'Mod Two',
				start: GetScheduleTime(8, 8),
				end: GetScheduleTime(8, 44),
			},
			{
				name: 'Class Change 2',
				start: GetScheduleTime(8, 44),
				end: GetScheduleTime(8, 47),
			},
			{
				name: 'Mod Three',
				start: GetScheduleTime(8, 47),
				end: GetScheduleTime(9, 23),
			},
			{
				name: 'Class Change 3',
				start: GetScheduleTime(9, 23),
				end: GetScheduleTime(9, 26),
			},
			{
				name: 'Mod Five',
				start: GetScheduleTime(9, 26),
				end: GetScheduleTime(10, 6),
			},
			{
				name: 'Class Change 4',
				start: GetScheduleTime(10, 6),
				end: GetScheduleTime(10, 9),
			},
			{
				name: 'Mod Six',
				start: GetScheduleTime(10, 9),
				end: GetScheduleTime(10, 49),
			},
			{
				name: 'Class Change 5',
				start: GetScheduleTime(10, 49),
				end: GetScheduleTime(10, 52),
			},
			{
				name: 'Mod Seven',
				start: GetScheduleTime(10, 52),
				end: GetScheduleTime(11, 32),
			},
			{
				name: 'Class Change 6',
				start: GetScheduleTime(11, 32),
				end: GetScheduleTime(11, 35),
			},
			{
				name: 'Mod Eight',
				start: GetScheduleTime(11, 35),
				end: GetScheduleTime(12, 11),
			},
			{
				name: 'Class Change 7',
				start: GetScheduleTime(12, 11),
				end: GetScheduleTime(12, 14),
			},
			{
				name: 'Mod Nine',
				start: GetScheduleTime(12, 14),
				end: GetScheduleTime(12, 55),
			},
			{
				name: 'Class Change 8',
				start: GetScheduleTime(12, 55),
				end: GetScheduleTime(13, 15),
			},
			{
				name: 'Rally',
				start: GetScheduleTime(13, 15),
				end: GetScheduleTime(14, 0),
			},
			{
				name: 'Student Dismissal',
				start: GetScheduleTime(14, 0),
				end: GetScheduleTime(14, 20),
			},
			{
				name: 'After School',
				start: GetScheduleTime(14, 20),
				end: GetScheduleTime(23, 59),
			},
		],
	},
	{
		name: 'Miss Mass / OSB Schedule',
		selectionID: 'MMOSB',
		periods: [
			{
				name: 'Before School',
				start: GetScheduleTime(0, 0),
				end: GetScheduleTime(7, 0),
			},
			{
				name: 'Student Arrival',
				start: GetScheduleTime(7, 0),
				end: GetScheduleTime(7, 15),
			},
			{
				name: 'Mod One',
				start: GetScheduleTime(7, 15),
				end: GetScheduleTime(7, 51),
			},
			{
				name: 'Class Change 1',
				start: GetScheduleTime(7, 51),
				end: GetScheduleTime(7, 54),
			},
			{
				name: 'Mod Two',
				start: GetScheduleTime(7, 54),
				end: GetScheduleTime(8, 30),
			},
			{
				name: 'Class Change 2',
				start: GetScheduleTime(8, 30),
				end: GetScheduleTime(8, 33),
			},
			{
				name: 'Mod Three',
				start: GetScheduleTime(8, 33),
				end: GetScheduleTime(9, 13),
			},
			{
				name: 'Class Change 3',
				start: GetScheduleTime(9, 13),
				end: GetScheduleTime(9, 16),
			},
			{
				name: 'Assembly',
				start: GetScheduleTime(9, 16),
				end: GetScheduleTime(10, 26),
			},
			{
				name: 'Class Change 4',
				start: GetScheduleTime(10, 26),
				end: GetScheduleTime(10, 29),
			},
			{
				name: 'Mod Five',
				start: GetScheduleTime(10, 29),
				end: GetScheduleTime(11, 9),
			},
			{
				name: 'Class Change 5',
				start: GetScheduleTime(11, 9),
				end: GetScheduleTime(11, 12),
			},
			{
				name: 'Mod Six',
				start: GetScheduleTime(11, 12),
				end: GetScheduleTime(11, 52),
			},
			{
				name: 'Class Change 6',
				start: GetScheduleTime(11, 52),
				end: GetScheduleTime(11, 55),
			},
			{
				name: 'Mod Seven',
				start: GetScheduleTime(11, 55),
				end: GetScheduleTime(12, 35),
			},
			{
				name: 'Class Change 7',
				start: GetScheduleTime(12, 35),
				end: GetScheduleTime(12, 38),
			},
			{
				name: 'Mod Eight',
				start: GetScheduleTime(12, 38),
				end: GetScheduleTime(13, 18),
			},
			{
				name: 'Class Change 8',
				start: GetScheduleTime(13, 18),
				end: GetScheduleTime(13, 21),
			},
			{
				name: 'Mod Nine',
				start: GetScheduleTime(13, 21),
				end: GetScheduleTime(14, 5),
			},
			{
				name: 'Student Dismissal',
				start: GetScheduleTime(14, 5),
				end: GetScheduleTime(14, 20),
			},
			{
				name: 'After School',
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
				name: 'Before School',
				start: GetScheduleTime(0, 0),
				end: GetScheduleTime(7, 0),
			},
			{
				name: 'Student Arrival',
				start: GetScheduleTime(7, 0),
				end: GetScheduleTime(7, 15),
			},
			{
				name: 'Mod One',
				start: GetScheduleTime(7, 15),
				end: GetScheduleTime(8, 3),
			},
			{
				name: 'Class Change 1',
				start: GetScheduleTime(8, 3),
				end: GetScheduleTime(8, 6),
			},
			{
				name: 'Mod Two',
				start: GetScheduleTime(8, 6),
				end: GetScheduleTime(8, 54),
			},
			{
				name: 'Class Change 2',
				start: GetScheduleTime(8, 54),
				end: GetScheduleTime(8, 57),
			},
			{
				name: 'Mod Three',
				start: GetScheduleTime(8, 57),
				end: GetScheduleTime(9, 45),
			},
			{
				name: 'Class Change 3',
				start: GetScheduleTime(9, 45),
				end: GetScheduleTime(9, 48),
			},
			{
				name: 'Mod Five',
				start: GetScheduleTime(9, 48),
				end: GetScheduleTime(10, 36),
			},
			{
				name: 'Class Change 5',
				start: GetScheduleTime(10, 36),
				end: GetScheduleTime(10, 39),
			},
			{
				name: 'Mod Six',
				start: GetScheduleTime(10, 39),
				end: GetScheduleTime(11, 27),
			},
			{
				name: 'Class Change 6',
				start: GetScheduleTime(11, 27),
				end: GetScheduleTime(11, 30),
			},
			{
				name: 'Mod Seven',
				start: GetScheduleTime(11, 30),
				end: GetScheduleTime(12, 18),
			},
			{
				name: 'Class Change 7',
				start: GetScheduleTime(12, 18),
				end: GetScheduleTime(12, 21),
			},
			{
				name: 'Mod Eight',
				start: GetScheduleTime(12, 21),
				end: GetScheduleTime(13, 9),
			},
			{
				name: 'Class Change 8',
				start: GetScheduleTime(13, 9),
				end: GetScheduleTime(13, 12),
			},
			{
				name: 'Mod Nine',
				start: GetScheduleTime(13, 12),
				end: GetScheduleTime(14, 5),
			},
			{
				name: 'Student Dismissal',
				start: GetScheduleTime(14, 5),
				end: GetScheduleTime(14, 20),
			},
			{
				name: 'After School',
				start: GetScheduleTime(14, 20),
				end: GetScheduleTime(23, 59),
			},
		],
	},
]
