import {
	daysToHours,
	daysToMinutes,
	hoursToMinutes,
	minutesToSeconds,
	msToDays,
	msToHours,
	msToMinutes,
	msToSeconds,
} from '@/functions/GlobalFunctions'

export const MakeTimeCurrentDay = (date: Date) => {
	const newDate = new Date()
	newDate.setHours(date.getHours())
	newDate.setMinutes(date.getMinutes())
	newDate.setSeconds(0)
	newDate.setMilliseconds(0)
	return newDate
}

export const GetTimeDifference = (
	t1: Date,
	t2: Date
): {
	days: number
	hours: number
	minutes: number
	seconds: number
	milliseconds: number
	deltaMs: number
} => {
	const deltaMs = t2.getTime() - t1.getTime()
	const rawSeconds = msToSeconds(deltaMs)
	const rawMinutes = msToMinutes(deltaMs)
	const rawHours = msToHours(deltaMs)
	const rawDays = msToDays(deltaMs)

	const days = Math.floor(rawDays)
	const hours = Math.floor(rawHours) - daysToHours(days)
	const minutes =
		Math.floor(rawMinutes) - hoursToMinutes(hours) - daysToMinutes(days)
	const seconds =
		Math.floor(rawSeconds) -
		minutesToSeconds(minutes) -
		minutesToSeconds(hoursToMinutes(hours)) +
		1
	const milliseconds = Math.floor(deltaMs)

	// const isAfterSchool =
	// 	endOfDay.getTime() - t1.getTime() > 0 ? false : true

	return {
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: seconds,
		milliseconds: milliseconds,
		deltaMs: deltaMs,
	}
}

export const GetPreviousPeriod = (now: Date, schedule: Schedule) => {
	const pastAndPresentMods = schedule.periods.filter((period) => {
		return period.end < now
	})
	if (schedule.periods[pastAndPresentMods.length] !== undefined) {
		return schedule.periods[pastAndPresentMods.length - 1]
	} else {
		return schedule.periods[0]
	}
}

export const GetCurrentPeriod = (now: Date, schedule: Schedule) => {
	const pastAndPresentMods = schedule.periods.filter((period) => {
		return period.end < now
	})
	if (schedule.periods[pastAndPresentMods.length] !== undefined) {
		return schedule.periods[pastAndPresentMods.length]
	} else {
		return schedule.periods[0]
	}
}

export const GetNextPeriod = (now: Date, schedule: Schedule) => {
	const pastAndPresentMods = schedule.periods.filter((period) => {
		return period.end < now
	})
	if (schedule.periods[pastAndPresentMods.length] !== undefined) {
		return schedule.periods[pastAndPresentMods.length + 1]
	} else {
		return schedule.periods[0]
	}
}

export const GetLongestModMs = (schedule: Schedule) => {
	let longestModMs = 0
	schedule.periods.forEach((period) => {
		const diff = period.end.getTime() - period.start.getTime()
		diff > longestModMs ? (longestModMs = diff) : null
	})
	return longestModMs
}

// export const GetTimeLeftInDay = (
// 	now: Date,
// 	schedule: Schedule
// ): {
// 	days: number
// 	hours: number
// 	minutes: number
// 	seconds: number
// 	milliseconds: number
// 	diffInMs: number
// } => {
// 	const endOfDay = new Date(
// 		schedule.periods.filter(
// 			(period) => period.name === 'Student Dismissal'
// 		)[0].start
// 	)

// 	const chunkOfDay = getChunkOfDay(now, schedule)

// 	const timeDifference =
// 		chunkOfDay === 'After School' || chunkOfDay === 'Student Dismissal'
// 			? GetTimeDifference(endOfDay, now)
// 			: GetTimeDifference(now, endOfDay)

// 	return {
// 		days: timeDifference.days,
// 		hours:
// 			IsAfterSchool(now, schedule) === false
// 				? timeDifference.hours === 24
// 					? timeDifference.hours + 1
// 					: timeDifference.hours
// 				: timeDifference.hours - 1 === 24
// 					? 0
// 					: timeDifference.hours,
// 		minutes:
// 			IsAfterSchool(now, schedule) === false
// 				? timeDifference.minutes === 60
// 					? 0
// 					: timeDifference.minutes
// 				: timeDifference.minutes - 1 === 60
// 					? 0
// 					: timeDifference.minutes,
// 		seconds:
// 			IsAfterSchool(now, schedule) === false
// 				? timeDifference.seconds === 60
// 					? 0
// 					: timeDifference.seconds
// 				: timeDifference.seconds - 1 === 60
// 					? 0
// 					: timeDifference.seconds - 1,

// 		milliseconds: timeDifference.milliseconds,
// 		diffInMs: timeDifference.deltaMs,
// 	}
// }

export const GetTimeUntilEndOfDay = (now: Date, schedule: Schedule) => {
	const endOfDay = GetEndOfDay(schedule)
	return GetTimeDifference(now, endOfDay)
}

export const GetTimeLeftInMod = (now: Date, schedule: Schedule) => {
	const endOfNextPeriod = new Date(GetCurrentPeriod(now, schedule).end)
	const diff = GetTimeDifference(now, endOfNextPeriod)

	return diff
}

export const IsClassChange = (now: Date, schedule: Schedule) => {
	const currentPeriod = GetCurrentPeriod(now, schedule)
	const prevPeriod =
		GetPreviousPeriod(now, schedule) !== undefined
			? GetPreviousPeriod(now, schedule)
			: schedule.periods[0] // if undefined, it means it didn't find a previous period.  Should be beginning of the day, so make it the first in the array.

	if (prevPeriod.end < now && now < currentPeriod.start) {
		return true
	}
	return false
}

export const IsBeforeSchool = (now: Date, schedule: Schedule) => {
	if (now < schedule.periods[0].start) {
		return true
	}
	return false
}

export const IsAfterSchool = (now: Date, schedule: Schedule) => {
	const numPeriods = schedule.periods.length
	if (now > schedule.periods[numPeriods - 1].end) {
		return true
	}
	return false
}

export const getChunkOfDay = (now: Date, schedule: Schedule) => {
	const currentPeriod = GetCurrentPeriod(now, schedule)

	let val: ChunkOfDay
	switch (currentPeriod.name) {
		case 'Before School':
		case 'Student Arrival':
		case 'Student Dismissal':
		case 'After School':
			val = currentPeriod.name
			break
		case 'Class Change 1':
		case 'Class Change 2':
		case 'Class Change 3':
		case 'Class Change 4':
		case 'Class Change 5':
		case 'Class Change 6':
		case 'Class Change 7':
		case 'Class Change 8':
			val = 'Class Change'
			break
		default:
			val = 'Class Period'
			break
	}

	return val
}

export const GetEndOfDay = (schedule: Schedule) => {
	return schedule.periods.filter(
		(period) => period.name === 'Student Dismissal'
	)[0].start
}

export const GetTimeSinceEndOfDay = (now: Date, schedule: Schedule) => {
	return GetTimeDifference(GetEndOfDay(schedule), now)
}

export const GetBeginningOfDay = (schedule: Schedule) => {
	return schedule.periods.filter(
		(period) => period.name === 'Student Arrival'
	)[0].end
}

export const GetTimeUntilBeginningOfDay = (now: Date, schedule: Schedule) => {
	return GetTimeDifference(now, GetBeginningOfDay(schedule))
}
