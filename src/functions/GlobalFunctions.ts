import { dracFg, dracGray, dracGreen, dracYellow } from '@/theme/colors/colors'
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
	x: number,
	y: number
) => {
	if (ctx !== null) {
		bells.forEach((bell) => {
			const d = new Date(bell[0])
			d.setSeconds(0)
			const str = `Mod ${bell[2] + 1}: ${d.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}`
			ctx.fillStyle = bell[0] > bell[1] ? massillonOrange : dracGray
			ctx.fillText(
				str,
				getCenteredXPos(ctx, x, str),
				//(y * parseFloat(`0.${bell[2] + 1}`)) / 2
				y +
					parseFloat(`${bell[2] + 1}`) *
						(ctx.measureText(str).fontBoundingBoxAscent +
							ctx.measureText(str).fontBoundingBoxDescent)
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

export const nextEndOfMod = (
	ctx: CanvasRenderingContext2D | null,
	schedule: Schedule,
	x: number,
	y: number
) => {
	if (ctx !== null) {
		const endOfNextPeriod = getEndOfNextPeriod(schedule)
		const d = new Date(endOfNextPeriod)
		d.setSeconds(0)
		const str = `Next end of mod: ${d.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}`
		ctx.fillStyle = dracFg
		ctx.fillText(str, getCenteredXPos(ctx, x, str), y)
	}
}

export const getTimeLeftInDay = (schedule: Schedule) => {
	const endOfDay = new Date(schedule.periods[schedule.periods.length - 1].end)
	return getTimeDifference(getCurrentTime(), endOfDay)
}
export const currentTimeClock = (
	ctx: CanvasRenderingContext2D | null,
	currentTime: Date,
	x: number,
	y: number
) => {
	if (ctx !== null) {
		ctx.fillStyle = dracYellow
		ctx.fillText(
			currentTime.toLocaleTimeString(),
			x * 0.5 -
				ctx.measureText(currentTime.toLocaleTimeString()).width / 2,
			y
		)
	}
}

export const setFutureDate = (today: Date, numDaysInFuture: number) => {
	if (numDaysInFuture <= 0)
		throw new Error('Number of day in the future must be greater than 0')
	return new Date(today.setDate(today.getDate() + numDaysInFuture))
}

export const timeLeftInDay = (
	ctx: CanvasRenderingContext2D | null,
	schedule: Schedule,
	x: number,
	y: number
) => {
	if (ctx !== null) {
		ctx.fillStyle = dracGreen
		const tl = getTimeLeftInDay(schedule)
		const str = `${
			tl.negative === true ? '-' : ''
		}${tl.hours < 10 ? '0' : ''}${tl.hours}:${tl.minutes < 10 ? '0' : ''}${tl.minutes}:${tl.seconds < 10 ? '0' : ''}${tl.seconds} until the end of the day`
		ctx.fillText(str, getCenteredXPos(ctx, x, str), y)
	}
}
