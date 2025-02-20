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
	x: number,
	text: string
) => {
	if (ctx !== null) {
		return x - ctx.measureText(text).width / 2
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
		ctx.font = '32pt Fira Code'
		bells.forEach((bell, i) => {
			const d = new Date(bell[0])
			d.setSeconds(0)
			const modNumber = i + 1
			const str = `Mod ${modNumber}: ${d.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}`
			ctx.fillStyle = bell[0] > bell[1] ? massillonOrange : dracGray

			const fontHeight =
				ctx.measureText(str).fontBoundingBoxAscent +
				ctx.measureText(str).fontBoundingBoxDescent
			const lineSpacing = fontHeight * 0.1
			const lineHeight = fontHeight + lineSpacing

			ctx.fillText(
				str,
				getCenteredXPos(ctx, x, str),
				y + fontHeight + i * lineHeight
			)
		})
		ctx.fillStyle = dracRed
		ctx.font = '20px Fira Code'
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
		const endOfNextPeriod = new Date(getEndOfNextPeriod(schedule))
		const currentTime = new Date()
		if (currentTime.getHours() > 14 && currentTime.getMinutes() > 5) {
			endOfNextPeriod.setDate(currentTime.getDate() + 1)
		}
		const d = getTimeDifference(currentTime, endOfNextPeriod)
		const str = `Next end of mod: ${d.hours < 10 ? '0' : ''}${d.hours}:${d.minutes < 10 ? '0' : ''}${d.minutes}:${d.seconds < 10 ? '0' : ''}${d.seconds}`
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
		const str = currentTime.toLocaleTimeString()
		ctx.fillText(str, getCenteredXPos(ctx, x, str), y)
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
		const str = `${tl.hours < 10 ? '0' : ''}${tl.hours}:${tl.minutes < 10 ? '0' : ''}${tl.minutes}:${tl.seconds < 10 ? '0' : ''}${tl.seconds} ${tl.negative === true ? 'since the end of the day' : 'until the end of the day'}`
		ctx.fillText(str, getCenteredXPos(ctx, x, str), y)
	}
}
