export const getScheduleTime = (hours: number, minutes: number) => {
	const time = new Date()
	time.setHours(hours)
	time.setMinutes(minutes)
	return time
}

const getNow = () => {
	const now = new Date()
	now.setHours(now.getMinutes() === 59 ? now.getHours() + 1 : now.getHours())
	now.setMinutes(
		now.getSeconds() === 59 ? now.getMinutes() + 1 : now.getMinutes()
	)
	return now
}

const getNowPlusMin = (minutesToAdd: number) => {
	const now = new Date()
	now.setHours(now.getMinutes() === 59 ? now.getHours() + 1 : now.getHours())
	now.setMinutes(
		now.getSeconds() === 59
			? now.getMinutes() + minutesToAdd + 1
			: now.getMinutes() + minutesToAdd
	)
	return now
}

export const ScheduleList = [
	,
	{
		name: 'Regular Schedule',
		selectionID: 'REGULAR',
		periods: [
			{
				name: 'Mod One',
				start: {
					time: getScheduleTime(7, 15),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(7, 59),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Two',
				start: {
					time: getScheduleTime(8, 2),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(8, 46),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Three',
				start: {
					time: getScheduleTime(8, 49),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(9, 33),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Four',
				start: {
					time: getScheduleTime(9, 36),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(10, 6),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Five',
				start: {
					time: getScheduleTime(10, 9),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(10, 53),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Six',
				start: {
					time: getScheduleTime(10, 56),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(11, 40),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Seven',
				start: {
					time: getScheduleTime(11, 43),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(12, 27),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Eight',
				start: {
					time: getScheduleTime(12, 30),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(13, 14),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Nine',
				start: {
					time: getScheduleTime(13, 17),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(14, 5),
					bellPlayed: false,
				},
			},
		],
	},
	{
		name: 'Rally Schedule',
		selectionID: 'RALLY',
		periods: [
			{
				name: 'Mod One',
				start: {
					time: getScheduleTime(7, 15),
					bellPlayed: false,
				},
				end: { time: getScheduleTime(8, 0), bellPlayed: false },
			},
			{
				name: 'Mod Two',
				start: {
					time: getScheduleTime(8, 3),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(8, 48),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Three',
				start: {
					time: getScheduleTime(8, 51),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(9, 41),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Five',
				start: {
					time: getScheduleTime(9, 44),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(10, 29),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Six',
				start: {
					time: getScheduleTime(10, 32),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(11, 17),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Seven',
				start: {
					time: getScheduleTime(11, 20),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(12, 5),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Eight',
				start: {
					time: getScheduleTime(12, 8),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(12, 53),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Nine',
				start: {
					time: getScheduleTime(12, 56),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(13, 41),
					bellPlayed: false,
				},
			},
			{
				name: 'Rally',
				start: {
					time: getScheduleTime(13, 50),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(14, 5),
					bellPlayed: false,
				},
			},
		],
	},
	{
		name: 'Assembly Schedule',
		selectionID: 'ASSEMBLY',
		periods: [
			// {
			// 	name: 'Mod One',
			// 	start: {time: getScheduleTime(7, 15), bellPlayed: false},
			// 	end: {time: getScheduleTime(7, 55), bellPlayed: false},
			// },
			{
				name: 'Mod One',
				start: {
					time: getScheduleTime(7, 15),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(7, 55),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Two',
				start: {
					time: getScheduleTime(7, 58),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(8, 38),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Three',
				start: {
					time: getScheduleTime(8, 41),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(9, 23),
					bellPlayed: false,
				},
			},
			{
				name: 'Assembly',
				start: {
					time: getScheduleTime(9, 26),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(10, 26),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Five',
				start: {
					time: getScheduleTime(10, 29),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(11, 9),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Six',
				start: {
					time: getScheduleTime(11, 12),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(11, 52),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Seven',
				start: {
					time: getScheduleTime(11, 55),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(12, 35),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Eight',
				start: {
					time: getScheduleTime(12, 38),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(13, 18),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Nine',
				start: {
					time: getScheduleTime(13, 21),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(14, 5),
					bellPlayed: false,
				},
			},
		],
	},
	{
		name: 'Air Schedule',
		selectionID: 'AIR',
		periods: [
			{
				name: 'Air Test',
				start: {
					time: getScheduleTime(7, 15),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(9, 15),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod One',
				start: {
					time: getScheduleTime(9, 20),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(9, 48),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Two',
				start: {
					time: getScheduleTime(9, 51),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(10, 19),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Three',
				start: {
					time: getScheduleTime(10, 22),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(10, 50),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Five',
				start: {
					time: getScheduleTime(10, 53),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(11, 33),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Six',
				start: {
					time: getScheduleTime(11, 36),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(12, 16),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Seven',
				start: {
					time: getScheduleTime(12, 19),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(12, 59),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Eight',
				start: {
					time: getScheduleTime(13, 2),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(13, 30),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Nine',
				start: {
					time: getScheduleTime(13, 33),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(14, 5),
					bellPlayed: false,
				},
			},
		],
	},
	{
		name: 'Exam Schedule - Day 1',
		selectionID: 'EXAM1',
		periods: [
			{
				name: 'Mod One',
				start: {
					time: getScheduleTime(7, 15),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(8, 15),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Two',
				start: {
					time: getScheduleTime(8, 20),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(9, 20),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Five',
				start: {
					time: getScheduleTime(9, 25),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(10, 25),
					bellPlayed: false,
				},
			},
			{
				name: 'Student Lunch',
				start: {
					time: getScheduleTime(10, 30),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(11, 0),
					bellPlayed: false,
				},
			},
			{
				name: 'Staff Lunch',
				start: {
					time: getScheduleTime(10, 30),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(11, 15),
					bellPlayed: false,
				},
			},
			{
				name: 'Make-Ups',
				start: {
					time: getScheduleTime(11, 15),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(14, 5),
					bellPlayed: false,
				},
			},
		],
	},
	{
		name: 'Exam Schedule - Day 2',
		selectionID: 'EXAM2',
		periods: [
			{
				name: 'Mod Three',
				start: {
					time: getScheduleTime(7, 15),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(8, 15),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Eight',
				start: {
					time: getScheduleTime(8, 20),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(9, 20),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Six',
				start: {
					time: getScheduleTime(9, 25),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(10, 25),
					bellPlayed: false,
				},
			},
			{
				name: 'Student Lunch',
				start: {
					time: getScheduleTime(10, 30),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(11, 0),
					bellPlayed: false,
				},
			},
			{
				name: 'Staff Lunch',
				start: {
					time: getScheduleTime(10, 30),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(11, 15),
					bellPlayed: false,
				},
			},
			{
				name: 'Make-Ups',
				start: {
					time: getScheduleTime(11, 15),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(14, 5),
					bellPlayed: false,
				},
			},
		],
	},
	{
		name: 'Exam Schedule - Day 3',
		selectionID: 'EXAM3',
		periods: [
			{
				name: 'Mod Nine',
				start: {
					time: getScheduleTime(7, 15),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(8, 15),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Seven',
				start: {
					time: getScheduleTime(8, 20),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(9, 20),
					bellPlayed: false,
				},
			},
			{
				name: 'Make-Ups',
				start: {
					time: getScheduleTime(9, 25),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(10, 25),
					bellPlayed: false,
				},
			},
			{
				name: 'Student Lunch',
				start: {
					time: getScheduleTime(10, 30),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(11, 0),
					bellPlayed: false,
				},
			},
			{
				name: 'Staff Lunch',
				start: {
					time: getScheduleTime(10, 30),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(11, 15),
					bellPlayed: false,
				},
			},
			{
				name: 'Make-Ups',
				start: {
					time: getScheduleTime(11, 15),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(14, 5),
					bellPlayed: false,
				},
			},
		],
	},
	{
		name: 'Beat McKinley Rally Schdeule',
		selectionID: 'MCKRALLY',
		periods: [
			{
				name: 'Mod One',
				start: {
					time: getScheduleTime(7, 15),
					bellPlayed: false,
				},
				end: { time: getScheduleTime(8, 5), bellPlayed: false },
			},
			{
				name: 'Mod Two',
				start: {
					time: getScheduleTime(8, 8),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(8, 44),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Three',
				start: {
					time: getScheduleTime(8, 47),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(9, 23),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Five',
				start: {
					time: getScheduleTime(9, 26),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(10, 6),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Six',
				start: {
					time: getScheduleTime(10, 9),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(10, 49),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Seven',
				start: {
					time: getScheduleTime(10, 52),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(11, 32),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Eight',
				start: {
					time: getScheduleTime(11, 35),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(12, 11),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Nine',
				start: {
					time: getScheduleTime(12, 14),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(12, 55),
					bellPlayed: false,
				},
			},
			{
				name: 'Rally',
				start: {
					time: getScheduleTime(13, 15),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(12, 0),
					bellPlayed: false,
				},
			},
		],
	},
	{
		name: 'Miss Mass / OSB Schedule',
		selectionID: 'MMOSB',
		periods: [
			{
				name: 'Mod One',
				start: {
					time: getScheduleTime(7, 15),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(7, 51),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Two',
				start: {
					time: getScheduleTime(7, 54),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(8, 30),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Three',
				start: {
					time: getScheduleTime(8, 33),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(9, 13),
					bellPlayed: false,
				},
			},
			{
				name: 'Assembly',
				start: {
					time: getScheduleTime(9, 16),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(10, 26),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Five',
				start: {
					time: getScheduleTime(10, 29),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(11, 9),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Six',
				start: {
					time: getScheduleTime(11, 12),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(11, 52),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Seven',
				start: {
					time: getScheduleTime(11, 55),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(12, 35),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Eight',
				start: {
					time: getScheduleTime(12, 38),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(13, 18),
					bellPlayed: false,
				},
			},
			{
				name: 'Mod Nine',
				start: {
					time: getScheduleTime(13, 21),
					bellPlayed: false,
				},
				end: {
					time: getScheduleTime(14, 5),
					bellPlayed: false,
				},
			},
		],
	},
	/* {
		name: 'Test Schedule',
		selectionID: 'TEST',
		periods: [
			{
				name: 'Test Mod 1',
				start: {
					time: getNow(),
					bellPlayed: false,
				},
				end: {
					time: getNowPlusMin(1),
					bellPlayed: false,
				},
			},
			{
				name: 'Test Mod 2',
				start: {
					time: getNowPlusMin(2),
					bellPlayed: false,
				},
				end: {
					time: getNowPlusMin(3),
					bellPlayed: false,
				},
			},
			{
				name: 'Test Mod 3',
				start: {
					time: getNowPlusMin(4),
					bellPlayed: false,
				},
				end: {
					time: getNowPlusMin(5),
					bellPlayed: false,
				},
			},
			{
				name: 'Test Mod 4',
				start: {
					time: getNowPlusMin(6),
					bellPlayed: false,
				},
				end: {
					time: getNowPlusMin(7),
					bellPlayed: false,
				},
			},
			{
				name: 'Test Mod 5',
				start: {
					time: getNowPlusMin(8),
					bellPlayed: false,
				},
				end: {
					time: getNowPlusMin(9),
					bellPlayed: false,
				},
			},
			{
				name: 'Test Mod 6',
				start: {
					time: getNowPlusMin(10),
					bellPlayed: false,
				},
				end: {
					time: getNowPlusMin(11),
					bellPlayed: false,
				},
			},
			{
				name: 'Test Mod 7',
				start: {
					time: getNowPlusMin(12),
					bellPlayed: false,
				},
				end: {
					time: getNowPlusMin(13),
					bellPlayed: false,
				},
			},
			{
				name: 'Test Mod 8',
				start: {
					time: getNowPlusMin(14),
					bellPlayed: false,
				},
				end: {
					time: getNowPlusMin(15),
					bellPlayed: false,
				},
			},
			{
				name: 'Test Mod 9',
				start: {
					time: getNowPlusMin(16),
					bellPlayed: false,
				},
				end: {
					time: getNowPlusMin(17),
					bellPlayed: false,
				},
			},
		],
	} */
	,
]
