export const getScheduleTime = (hours: number, minutes: number) => {
	const time = new Date()
	time.setHours(hours)
	time.setMinutes(minutes)
	time.setSeconds(0)
	time.setMilliseconds(0)
	return time
}

// const getNow = () => {
// 	const now = new Date()
// 	now.setHours(now.getMinutes() === 59 ? now.getHours() + 1 : now.getHours())
// 	now.setMinutes(
// 		now.getSeconds() === 59 ? now.getMinutes() + 1 : now.getMinutes()
// 	)
// 	return now
// }

// const getNowPlusMin = (minutesToAdd: number) => {
// 	const now = new Date()
// 	now.setHours(now.getMinutes() === 59 ? now.getHours() + 1 : now.getHours())
// 	now.setMinutes(
// 		now.getSeconds() === 59
// 			? now.getMinutes() + minutesToAdd + 1
// 			: now.getMinutes() + minutesToAdd
// 	)
// 	return now
// }

export const ScheduleList = [
	{
		name: 'Regular Schedule',
		selectionID: 'REGULAR',
		periods: [
			{
				name: 'Mod One',
				start: getScheduleTime(7, 15),
				end: getScheduleTime(7, 59),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(7, 59),
				end: getScheduleTime(8, 2),
			},
			{
				name: 'Mod Two',
				start: getScheduleTime(8, 2),
				end: getScheduleTime(8, 46),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(8, 46),
				end: getScheduleTime(8, 49),
			},
			{
				name: 'Mod Three',
				start: getScheduleTime(8, 49),
				end: getScheduleTime(9, 33),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(9, 33),
				end: getScheduleTime(9, 36),
			},
			{
				name: 'Mod Four',
				start: getScheduleTime(9, 36),
				end: getScheduleTime(10, 6),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(10, 6),
				end: getScheduleTime(10, 9),
			},
			{
				name: 'Mod Five',
				start: getScheduleTime(10, 9),
				end: getScheduleTime(10, 53),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(10, 53),
				end: getScheduleTime(10, 56),
			},
			{
				name: 'Mod Six',
				start: getScheduleTime(10, 56),
				end: getScheduleTime(11, 40),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(11, 40),
				end: getScheduleTime(11, 43),
			},
			{
				name: 'Mod Seven',
				start: getScheduleTime(11, 43),
				end: getScheduleTime(12, 27),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(12, 27),
				end: getScheduleTime(12, 30),
			},
			{
				name: 'Mod Eight',
				start: getScheduleTime(12, 30),
				end: getScheduleTime(13, 14),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(13, 14),
				end: getScheduleTime(13, 17),
			},
			{
				name: 'Mod Nine',
				start: getScheduleTime(13, 17),
				end: getScheduleTime(14, 5),
			},
		],
	},
	{
		name: 'Rally Schedule',
		selectionID: 'RALLY',
		periods: [
			{
				name: 'Mod One',
				start: getScheduleTime(7, 15),
				end: getScheduleTime(8, 0),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(8, 0),
				end: getScheduleTime(8, 3),
			},
			{
				name: 'Mod Two',
				start: getScheduleTime(8, 3),
				end: getScheduleTime(8, 48),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(8, 48),
				end: getScheduleTime(8, 51),
			},
			{
				name: 'Mod Three',
				start: getScheduleTime(8, 51),
				end: getScheduleTime(9, 41),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(9, 41),
				end: getScheduleTime(9, 44),
			},
			{
				name: 'Mod Five',
				start: getScheduleTime(9, 44),
				end: getScheduleTime(10, 29),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(10, 29),
				end: getScheduleTime(10, 32),
			},
			{
				name: 'Mod Six',
				start: getScheduleTime(10, 32),
				end: getScheduleTime(11, 17),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(11, 17),
				end: getScheduleTime(11, 20),
			},
			{
				name: 'Mod Seven',
				start: getScheduleTime(11, 20),
				end: getScheduleTime(12, 5),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(12, 5),
				end: getScheduleTime(12, 8),
			},
			{
				name: 'Mod Eight',
				start: getScheduleTime(12, 8),
				end: getScheduleTime(12, 53),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(12, 53),
				end: getScheduleTime(12, 56),
			},
			{
				name: 'Mod Nine',
				start: getScheduleTime(12, 56),
				end: getScheduleTime(13, 41),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(13, 41),
				end: getScheduleTime(13, 50),
			},
			{
				name: 'Rally',
				start: getScheduleTime(13, 50),
				end: getScheduleTime(14, 5),
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
				start: getScheduleTime(7, 15),
				end: getScheduleTime(7, 55),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(7, 55),
				end: getScheduleTime(7, 58),
			},
			{
				name: 'Mod Two',
				start: getScheduleTime(7, 58),
				end: getScheduleTime(8, 38),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(8, 38),
				end: getScheduleTime(8, 41),
			},
			{
				name: 'Mod Three',
				start: getScheduleTime(8, 41),
				end: getScheduleTime(9, 23),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(9, 23),
				end: getScheduleTime(9, 26),
			},
			{
				name: 'Assembly',
				start: getScheduleTime(9, 26),
				end: getScheduleTime(10, 26),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(10, 26),
				end: getScheduleTime(10, 29),
			},
			{
				name: 'Mod Five',
				start: getScheduleTime(10, 29),
				end: getScheduleTime(11, 9),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(11, 9),
				end: getScheduleTime(11, 12),
			},
			{
				name: 'Mod Six',
				start: getScheduleTime(11, 12),
				end: getScheduleTime(11, 52),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(11, 52),
				end: getScheduleTime(11, 55),
			},
			{
				name: 'Mod Seven',
				start: getScheduleTime(11, 55),
				end: getScheduleTime(12, 35),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(12, 35),
				end: getScheduleTime(12, 38),
			},
			{
				name: 'Mod Eight',
				start: getScheduleTime(12, 38),
				end: getScheduleTime(13, 18),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(13, 18),
				end: getScheduleTime(13, 21),
			},
			{
				name: 'Mod Nine',
				start: getScheduleTime(13, 21),
				end: getScheduleTime(14, 5),
			},
		],
	},
	{
		name: 'Air Schedule',
		selectionID: 'AIR',
		periods: [
			{
				name: 'Air Test',
				start: getScheduleTime(7, 15),
				end: getScheduleTime(9, 15),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(9, 15),
				end: getScheduleTime(9, 20),
			},
			{
				name: 'Mod One',
				start: getScheduleTime(9, 20),
				end: getScheduleTime(9, 48),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(9, 48),
				end: getScheduleTime(9, 51),
			},
			{
				name: 'Mod Two',
				start: getScheduleTime(9, 51),
				end: getScheduleTime(10, 19),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(10, 19),
				end: getScheduleTime(10, 22),
			},
			{
				name: 'Mod Three',
				start: getScheduleTime(10, 22),
				end: getScheduleTime(10, 50),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(10, 50),
				end: getScheduleTime(10, 53),
			},
			{
				name: 'Mod Five',
				start: getScheduleTime(10, 53),
				end: getScheduleTime(11, 33),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(11, 33),
				end: getScheduleTime(11, 36),
			},
			{
				name: 'Mod Six',
				start: getScheduleTime(11, 36),
				end: getScheduleTime(12, 16),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(12, 16),
				end: getScheduleTime(12, 19),
			},
			{
				name: 'Mod Seven',
				start: getScheduleTime(12, 19),
				end: getScheduleTime(12, 59),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(12, 59),
				end: getScheduleTime(13, 2),
			},
			{
				name: 'Mod Eight',
				start: getScheduleTime(13, 2),
				end: getScheduleTime(13, 30),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(13, 30),
				end: getScheduleTime(13, 33),
			},
			{
				name: 'Mod Nine',
				start: getScheduleTime(13, 33),
				end: getScheduleTime(14, 5),
			},
		],
	},
	{
		name: 'Exam Schedule - Day 1',
		selectionID: 'EXAM1',
		periods: [
			{
				name: 'Mod One',
				start: getScheduleTime(7, 15),
				end: getScheduleTime(8, 15),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(8, 15),
				end: getScheduleTime(8, 20),
			},
			{
				name: 'Mod Two',
				start: getScheduleTime(8, 20),
				end: getScheduleTime(9, 20),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(9, 20),
				end: getScheduleTime(9, 25),
			},
			{
				name: 'Mod Five',
				start: getScheduleTime(9, 25),
				end: getScheduleTime(10, 25),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(10, 25),
				end: getScheduleTime(10, 30),
			},
			{
				name: 'Student Lunch',
				start: getScheduleTime(10, 30),
				end: getScheduleTime(11, 0),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(11, 0),
				end: getScheduleTime(10, 30),
			},
			{
				name: 'Staff Lunch',
				start: getScheduleTime(10, 30),
				end: getScheduleTime(11, 15),
			},
			{
				name: 'Make-Ups',
				start: getScheduleTime(11, 15),
				end: getScheduleTime(14, 5),
			},
		],
	},
	{
		name: 'Exam Schedule - Day 2',
		selectionID: 'EXAM2',
		periods: [
			{
				name: 'Mod Three',
				start: getScheduleTime(7, 15),
				end: getScheduleTime(8, 15),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(8, 15),
				end: getScheduleTime(8, 20),
			},
			{
				name: 'Mod Eight',
				start: getScheduleTime(8, 20),
				end: getScheduleTime(9, 20),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(9, 20),
				end: getScheduleTime(9, 25),
			},
			{
				name: 'Mod Six',
				start: getScheduleTime(9, 25),
				end: getScheduleTime(10, 25),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(10, 25),
				end: getScheduleTime(10, 30),
			},
			{
				name: 'Student Lunch',
				start: getScheduleTime(10, 30),
				end: getScheduleTime(11, 0),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(11, 0),
				end: getScheduleTime(10, 30),
			},
			{
				name: 'Staff Lunch',
				start: getScheduleTime(10, 30),
				end: getScheduleTime(11, 15),
			},
			{
				name: 'Make-Ups',
				start: getScheduleTime(11, 15),
				end: getScheduleTime(14, 5),
			},
		],
	},
	{
		name: 'Exam Schedule - Day 3',
		selectionID: 'EXAM3',
		periods: [
			{
				name: 'Mod Nine',
				start: getScheduleTime(7, 15),
				end: getScheduleTime(8, 15),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(8, 15),
				end: getScheduleTime(8, 20),
			},
			{
				name: 'Mod Seven',
				start: getScheduleTime(8, 20),
				end: getScheduleTime(9, 20),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(9, 20),
				end: getScheduleTime(9, 25),
			},
			{
				name: 'Make-Ups',
				start: getScheduleTime(9, 25),
				end: getScheduleTime(10, 25),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(10, 25),
				end: getScheduleTime(10, 30),
			},
			{
				name: 'Student Lunch',
				start: getScheduleTime(10, 30),
				end: getScheduleTime(11, 0),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(11, 0),
				end: getScheduleTime(10, 30),
			},
			{
				name: 'Staff Lunch',
				start: getScheduleTime(10, 30),
				end: getScheduleTime(11, 15),
			},
			{
				name: 'Make-Ups',
				start: getScheduleTime(11, 15),
				end: getScheduleTime(14, 5),
			},
		],
	},
	{
		name: 'Beat McKinley Rally Schdeule',
		selectionID: 'MCKRALLY',
		periods: [
			{
				name: 'Mod One',
				start: getScheduleTime(7, 15),
				end: getScheduleTime(8, 5),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(8, 5),
				end: getScheduleTime(8, 8),
			},
			{
				name: 'Mod Two',
				start: getScheduleTime(8, 8),
				end: getScheduleTime(8, 44),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(8, 44),
				end: getScheduleTime(8, 47),
			},
			{
				name: 'Mod Three',
				start: getScheduleTime(8, 47),
				end: getScheduleTime(9, 23),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(9, 23),
				end: getScheduleTime(9, 26),
			},
			{
				name: 'Mod Five',
				start: getScheduleTime(9, 26),
				end: getScheduleTime(10, 6),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(10, 6),
				end: getScheduleTime(10, 9),
			},
			{
				name: 'Mod Six',
				start: getScheduleTime(10, 9),
				end: getScheduleTime(10, 49),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(10, 49),
				end: getScheduleTime(10, 52),
			},
			{
				name: 'Mod Seven',
				start: getScheduleTime(10, 52),
				end: getScheduleTime(11, 32),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(11, 32),
				end: getScheduleTime(11, 35),
			},
			{
				name: 'Mod Eight',
				start: getScheduleTime(11, 35),
				end: getScheduleTime(12, 11),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(12, 11),
				end: getScheduleTime(12, 14),
			},
			{
				name: 'Mod Nine',
				start: getScheduleTime(12, 14),
				end: getScheduleTime(12, 55),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(12, 55),
				end: getScheduleTime(13, 15),
			},
			{
				name: 'Rally',
				start: getScheduleTime(13, 15),
				end: getScheduleTime(12, 0),
			},
		],
	},
	{
		name: 'Miss Mass / OSB Schedule',
		selectionID: 'MMOSB',
		periods: [
			{
				name: 'Mod One',
				start: getScheduleTime(7, 15),
				end: getScheduleTime(7, 51),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(7, 51),
				end: getScheduleTime(7, 54),
			},
			{
				name: 'Mod Two',
				start: getScheduleTime(7, 54),
				end: getScheduleTime(8, 30),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(8, 30),
				end: getScheduleTime(8, 33),
			},
			{
				name: 'Mod Three',
				start: getScheduleTime(8, 33),
				end: getScheduleTime(9, 13),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(9, 13),
				end: getScheduleTime(9, 16),
			},
			{
				name: 'Assembly',
				start: getScheduleTime(9, 16),
				end: getScheduleTime(10, 26),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(10, 26),
				end: getScheduleTime(10, 29),
			},
			{
				name: 'Mod Five',
				start: getScheduleTime(10, 29),
				end: getScheduleTime(11, 9),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(11, 9),
				end: getScheduleTime(11, 12),
			},
			{
				name: 'Mod Six',
				start: getScheduleTime(11, 12),
				end: getScheduleTime(11, 52),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(11, 52),
				end: getScheduleTime(11, 55),
			},
			{
				name: 'Mod Seven',
				start: getScheduleTime(11, 55),
				end: getScheduleTime(12, 35),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(12, 35),
				end: getScheduleTime(12, 38),
			},
			{
				name: 'Mod Eight',
				start: getScheduleTime(12, 38),
				end: getScheduleTime(13, 18),
			},
			{
				name: 'Class Change',
				start: getScheduleTime(13, 18),
				end: getScheduleTime(13, 21),
			},
			{
				name: 'Mod Nine',
				start: getScheduleTime(13, 21),
				end: getScheduleTime(14, 5),
			},
		],
	},
]
