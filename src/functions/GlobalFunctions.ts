import { dracGray } from './../theme/colors/colors'
/*

Put Global Functions you want to be available everywhere in this file. Make sure to export them.

*/

import { dracRed, massillonOrange } from '@/theme/colors/colors'

export const getCurrentTime = () => {
	const now = new Date()
	return now
}

export const getCenteredXPos = (
	ctx: CanvasRenderingContext2D | null,
	w: number,
	text: string
) => {
	if (ctx !== null) {
		return w * 0.5 - ctx.measureText(text).width / 2
	} else {
		return 0
	}
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
	bells: number[][],
	w: number,
	h: number
) => {
	if (ctx !== null) {
		bells.forEach((bell) => {
			const str = `Mod ${bell[2] + 1}: ${new Date(bell[0]).getHours() < 10 ? '0' : ''}${new Date(bell[0]).getHours()}:${new Date(bell[0]).getMinutes() < 10 ? '0' : ''}${new Date(bell[0]).getMinutes()}:${new Date(bell[0]).getSeconds() < 10 ? '0' : ''}${new Date(bell[0]).getSeconds()}`
			ctx.fillStyle = bell[0] > bell[1] ? massillonOrange : dracGray
			ctx.fillText(
				str,
				getCenteredXPos(ctx, w, str),
				(h * parseFloat(`0.${bell[2] + 1}`)) / 2
			)
		})
		ctx.fillStyle = dracRed
	}
}

export const getEndOfNextPeriod = (schedule: Schedule) => {
	const pastAndPresentMods = schedule.periods.filter((period) => {
		return period.end < getCurrentTime().getTime()
	})
	if (schedule.periods[pastAndPresentMods.length] !== undefined) {
		return schedule.periods[pastAndPresentMods.length].end
	} else {
		//const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))

		return schedule.periods[0].end
	}
}

export const getTimeLeftInDay = (schedule: Schedule) => {
	const endOfDay = new Date(schedule.periods[schedule.periods.length - 1].end)
	return getTimeDifference(getCurrentTime(), endOfDay)
}
export const currentTimeClock = (
	ctx: CanvasRenderingContext2D | null,
	currentTime: Date,
	w: number,
	h: number
) => {
	if (ctx !== null) {
		ctx.fillText(
			currentTime.toLocaleTimeString(),
			w * 0.5 -
				ctx.measureText(currentTime.toLocaleTimeString()).width / 2,
			h * 0.6
		)
	}
}

export const setFutureDate = (today: Date, numDaysInFuture: number) => {
	if (numDaysInFuture <= 0)
		throw new Error('Number of day in the future must be greater than 0')
	return new Date(today.setDate(today.getDate() + numDaysInFuture))
}
