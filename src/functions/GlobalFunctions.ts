import { dracFg, dracGray, dracGreen, dracYellow } from '@/theme/colors/colors'
/*

Put Global Functions you want to be available everywhere in this file. Make sure to export them.

*/

import { dracRed, massillonOrange } from '@/theme/colors/colors'

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
	schedule: Schedule,
	x: number,
	y: number
) => {
	if (ctx !== null) {
		ctx.font = '32pt Fira Code'
		bells.forEach((bell, i) => {
			const d = new Date(bell[0])
			d.setSeconds(0)
			const str = `${schedule.periods[i].name}: ${d.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}`
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
		ctx.font = '20pt Fira Code'
	}
}

export const getEndOfNextPeriod = (now: Date, schedule: Schedule) => {
	const pastAndPresentMods = schedule.periods.filter((period) => {
		return period.end < now.getTime()
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
		let str = ''
		if (diff.diffInMs > 3780000) {
			// 63 minutes of ms (the longest "mod" in any of the schedules)
			// A long time until next mod (probably the end of the day or weekend etc.)
			str = `Next end of mod: ${diff.hours < 10 ? '0' : ''}${diff.hours}:${diff.minutes < 10 ? '0' : ''}${diff.minutes}:${diff.seconds < 10 ? '0' : ''}${diff.seconds}`
		} else {
			// Normal mod time
			str = `Time left in Mod: ${diff.hours < 10 ? '0' : ''}${diff.hours}:${diff.minutes < 10 ? '0' : ''}${diff.minutes}:${diff.seconds < 10 ? '0' : ''}${diff.seconds}`
		}
		ctx.fillStyle = dracFg
		ctx.fillText(str, getCenteredXPos(ctx, x, str), y)
	}
}

export const getTimeLeftInDay = (now: Date, schedule: Schedule) => {
	const endOfDay = new Date(schedule.periods[schedule.periods.length - 1].end)
	return getTimeDifference(now, endOfDay)
}
export const currentTimeClock = (
	ctx: CanvasRenderingContext2D | null,
	now: Date,
	x: number,
	y: number
) => {
	if (ctx !== null) {
		ctx.fillStyle = dracYellow
		const str = now.toLocaleString([], {
			hour: '2-digit',
			minute: '2-digit',
		})
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
	now: Date,
	schedule: Schedule,
	x: number,
	y: number
) => {
	if (ctx !== null) {
		ctx.fillStyle = dracGreen
		const tl = getTimeLeftInDay(now, schedule)
		const str = `${tl.hours < 10 ? '0' : ''}${tl.hours}:${tl.minutes < 10 ? '0' : ''}${tl.minutes}:${tl.seconds < 10 ? '0' : ''}${tl.seconds} ${tl.negative === true ? 'since the end of the day' : 'until the end of the day'}`
		ctx.fillText(str, getCenteredXPos(ctx, x, str), y)
	}
}
