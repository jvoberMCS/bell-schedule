import {
	dracFg,
	dracGray,
	dracGreen,
	dracYellow,
	massillonOrange,
} from '@/theme/colors/colors'
/*

Put Global Functions you want to be available everywhere in this file. Make sure to export them.

*/

import { dracRed } from '@/theme/colors/colors'

export const playBell = (pathToMp3: string) => {
	const sound = new Audio(pathToMp3)
	sound.play()
}

export const getTimeDifference = (t1: Date, t2: Date) => {
	// Get the difference in milliseconds
	const diffInMilliseconds = t2.getTime() - t1.getTime()

	// Calculate the difference in hours, minutes, and seconds
	const diffInSeconds = Math.abs(Math.round(diffInMilliseconds / 1000))
	const hours = Math.floor(diffInSeconds / 3600)
	const minutes = Math.floor((diffInSeconds % 3600) / 60)
	const seconds = diffInSeconds % 60
	return {
		hours: hours,
		minutes: minutes,
		seconds: seconds,
		negative: diffInMilliseconds < 0 ? true : false,
		diffInMs: diffInMilliseconds,
	}
}

export const getRealTimeSchedule = (
	ctx: CanvasRenderingContext2D | null,
	bells: Date[][],
	schedule: Schedule,
	x: number,
	y: number
) => {
	if (ctx !== null) {
		// Set text settings
		ctx.font = '32pt Fira Code'

		bells.forEach((bell, i) => {
			const startTime = new Date(bell[0])
			const endTime = new Date(bell[2])
			endTime.setSeconds(0)
			const str1 = `${schedule.periods[i].name}:`
			const str2 = `${startTime.toLocaleString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}`
			ctx.fillStyle = bell[2] > bell[1] ? massillonOrange : dracGray

			const fontHeight =
				ctx.measureText(str1).fontBoundingBoxAscent +
				ctx.measureText(str1).fontBoundingBoxDescent
			const lineSpacing = fontHeight * 0.1
			const lineHeight = fontHeight + lineSpacing

			ctx.textAlign = 'left'
			ctx.fillText(str1, x, y + fontHeight + i * lineHeight)
			ctx.textAlign = 'right'
			ctx.fillText(
				str2,
				// use "Mod fifteen" because it will be longer than any of the mod names
				x + ctx.measureText('Mod fifteen:').width * 2.5,
				y + fontHeight + i * lineHeight
			)
		})
		ctx.fillStyle = dracRed
		// Reset Text Settings
		ctx.font = '20pt Fira Code'
		ctx.textAlign = 'center'
	}
}

export const getEndOfNextPeriod = (now: Date, schedule: Schedule) => {
	const pastAndPresentMods = schedule.periods.filter((period) => {
		return period.end < now
	})
	if (schedule.periods[pastAndPresentMods.length] !== undefined) {
		return schedule.periods[pastAndPresentMods.length].end
	} else {
		//const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))

		return schedule.periods[0].end
	}
}

export const getLongestModMs = (schedule: Schedule) => {
	let longestModMs = 0
	schedule.periods.forEach((period) => {
		const diff = period.end.getTime() - period.start.getTime()
		diff > longestModMs ? (longestModMs = diff) : null
	})
	return longestModMs
}

export const nextEndOfMod = (
	ctx: CanvasRenderingContext2D | null,
	now: Date,
	schedule: Schedule,
	x: number,
	y: number
) => {
	if (ctx !== null) {
		const endOfNextPeriod = new Date(getEndOfNextPeriod(now, schedule))
		if (now.getHours() > 14 && now.getMinutes() > 5) {
			endOfNextPeriod.setDate(now.getDate() + 1)
		}
		const diff = getTimeDifference(now, endOfNextPeriod)
		diff.seconds = 59 - now.getSeconds()

		const hours = diff.hours
		const minutes = diff.minutes
		const seconds = diff.seconds

		let str = ''
		if (diff.diffInMs > getLongestModMs(schedule)) {
			// A long time until next mod (probably the end of the day or weekend etc.)
			str = `Next end of mod: ${diff.hours < 10 ? '0' : ''}${diff.hours}:${diff.minutes < 10 ? '0' : ''}${diff.minutes}:${diff.seconds < 10 ? '0' : ''}${diff.seconds}`
		} else {
			// Normal mod time
			str = `Time left in Mod: ${diff.hours < 10 ? '0' : ''}${diff.hours}:${diff.minutes < 10 ? '0' : ''}${diff.minutes}:${diff.seconds < 10 ? '0' : ''}${diff.seconds}`
		}
		ctx.fillStyle = dracFg
		ctx.fillText(str, x, y)
	}
}
export const getTimeLeftInDay = (
	now: Date,
	schedule: Schedule
): {
	hours: number
	minutes: number
	seconds: number
	negative: boolean
	diffInMs: number
} => {
	const endOfDay = new Date(schedule.periods[schedule.periods.length - 1].end)

	// Just kinda works? Not sure why to be honest.
	const hours = endOfDay.getHours() - now.getHours() - 1
	const minutes = 59 + endOfDay.getMinutes() - now.getMinutes()
	const seconds = 59 - now.getSeconds()

	return {
		hours: hours,
		minutes: minutes,
		seconds: seconds,
		negative: false,
		diffInMs: 1,
	}
}
export const currentTimeClock = (
	ctx: CanvasRenderingContext2D | null,
	now: Date,
	schedule: Schedule,
	x: number,
	y: number
) => {
	if (ctx !== null) {
		ctx.fillStyle = dracYellow
		const str = now.toLocaleString([], {
			hour: '2-digit',
			minute: '2-digit',
		})
		ctx.fillText(str, x, y)

		// Check if we should play a bell
		schedule.periods.forEach((period) => {
			const ahora = {
				hours: now.getHours(),
				minutes: now.getMinutes(),
				seconds: now.getSeconds(),
			}
			const startTime = {
				hours: period.start.getHours(),
				minutes: period.start.getMinutes(),
				seconds: period.start.getSeconds(),
			}

			const endTime = {
				hours: period.end.getHours(),
				minutes: period.end.getMinutes(),
				seconds: period.end.getSeconds(),
			}

			// Play a bell sound if it's either the start or end of a mod
			if (ahora === startTime || ahora === endTime) {
				playBell('@/assets/germanSchoolBell.mp3')
			}
		})
	}
}

export const setFutureDate = (today: Date, numDaysInFuture: number) => {
	if (numDaysInFuture <= 0)
		throw new Error('Number of day in the future must be greater than 0')
	return new Date(today.setDate(today.getDate() + numDaysInFuture))
}

export const timeLeftInDay = (
	ctx: CanvasRenderingContext2D | null,
	now: Date,
	schedule: Schedule,
	x: number,
	y: number
) => {
	if (ctx !== null) {
		ctx.fillStyle = dracGreen
		const tl = getTimeLeftInDay(now, schedule)
		const str = `${tl.negative === true ? 'Since end of Day: ' : ' Time left in Day: '}${tl.hours < 10 ? '0' : ''}${tl.hours}:${tl.minutes < 10 ? '0' : ''}${tl.minutes}:${tl.seconds < 10 ? '0' : ''}${tl.seconds} `
		ctx.fillText(str, x, y)
	}
}
