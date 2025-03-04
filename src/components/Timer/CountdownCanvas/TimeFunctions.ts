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
		return period.end.time < now
	})
	if (schedule.periods[pastAndPresentMods.length] !== undefined) {
		return schedule.periods[pastAndPresentMods.length - 1]
	} else {
		return schedule.periods[0]
	}
}

export const GetCurrentPeriod = (now: Date, schedule: Schedule) => {
	const pastAndPresentMods = schedule.periods.filter((period) => {
		return period.end.time < now
	})
	if (schedule.periods[pastAndPresentMods.length] !== undefined) {
		return schedule.periods[pastAndPresentMods.length]
	} else {
		return schedule.periods[0]
	}
}

export const GetNextPeriod = (now: Date, schedule: Schedule) => {
	const pastAndPresentMods = schedule.periods.filter((period) => {
		return period.end.time < now
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
		const diff = period.end.time.getTime() - period.start.time.getTime()
		diff > longestModMs ? (longestModMs = diff) : null
	})
	return longestModMs
}

export const GetTimeLeftInDay = (
	now: Date,
	schedule: Schedule
): {
	days: number
	hours: number
	minutes: number
	seconds: number
	milliseconds: number
	isAfterSchool: boolean
	diffInMs: number
} => {
	const endOfDay = new Date(
		schedule.periods[schedule.periods.length - 1].end.time
	)

	const isAfterSchool = endOfDay.getTime() - now.getTime() > 0 ? false : true

	const timeDifference =
		isAfterSchool === true
			? GetTimeDifference(endOfDay, now)
			: GetTimeDifference(now, endOfDay)

	return {
		days: timeDifference.days,
		hours:
			isAfterSchool === false
				? timeDifference.hours === 24
					? timeDifference.hours + 1
					: timeDifference.hours
				: timeDifference.hours - 1 === 24
					? 0
					: timeDifference.hours,
		minutes:
			isAfterSchool === false
				? timeDifference.minutes === 60
					? 0
					: timeDifference.minutes
				: timeDifference.minutes - 1 === 60
					? 0
					: timeDifference.minutes,
		seconds:
			isAfterSchool === false
				? timeDifference.seconds === 60
					? 0
					: timeDifference.seconds
				: timeDifference.seconds - 1 === 60
					? 0
					: timeDifference.seconds - 1,

		milliseconds: timeDifference.milliseconds,
		isAfterSchool: isAfterSchool,
		diffInMs: timeDifference.deltaMs,
	}
}

export const GetTimeLeftInMod = (now: Date, schedule: Schedule) => {
	const endOfNextPeriod = new Date(GetCurrentPeriod(now, schedule).end.time)
	const diff = GetTimeDifference(now, endOfNextPeriod)

	return diff
}

export const IsClassChange = (now: Date, schedule: Schedule) => {
	const currentPeriod = GetCurrentPeriod(now, schedule)
	const prevPeriod =
		GetPreviousPeriod(now, schedule) !== undefined
			? GetPreviousPeriod(now, schedule)
			: schedule.periods[0] // if undefined, it means it didn't find a previous period.  Should be beginning of the day, so make it the first in the array.

	if (prevPeriod.end.time < now && now < currentPeriod.start.time) {
		return true
	}
	return false
}

export const isBeforeSchool = (now: Date, schedule: Schedule) => {
	if (now < schedule.periods[0].start.time) {
		return true
	}
	return false
}

export const isAfterSchool = (now: Date, schedule: Schedule) => {
	const numPeriods = schedule.periods.length
	if (now > schedule.periods[numPeriods - 1].end.time) {
		return true
	}
	return false
}
