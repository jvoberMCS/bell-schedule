import {
	GetCurrentPeriod,
	GetNextPeriod,
	GetTimeDifference,
	GetTimeLeftInDay,
	GetTimeLeftInMod,
	isAfterSchool,
	isBeforeSchool,
	IsClassChange,
} from '@/components/Timer/CountdownCanvas/TimeFunctions'
import {
	dracBg,
	dracCl,
	dracFg,
	dracGray,
	dracPurple,
	massillonOrange,
} from '@/theme/colors/colors'

export const DrawCurrentTime = (
	ctx: CanvasRenderingContext2D | null,
	now: Date,
	schedule: Schedule,
	x: number,
	y: number
) => {
	if (ctx !== null) {
		ctx.font = '2em Fira Code'
		ctx.textAlign = 'center'
		ctx.fillStyle =
			isBeforeSchool(now, schedule) === true
				? dracBg
				: isAfterSchool(now, schedule) === true
					? dracBg
					: IsClassChange(now, schedule) === true
						? dracBg
						: dracFg
		const str = now.toLocaleString([], {
			hour: '2-digit',
			minute: '2-digit',
			second: 'numeric',
		})
		ctx.strokeStyle =
			isBeforeSchool(now, schedule) === true
				? dracFg
				: isAfterSchool(now, schedule) === true
					? dracFg
					: IsClassChange(now, schedule) === true
						? dracFg
						: dracBg
		ctx.lineWidth = 6
		ctx.miterLimit = 2 // Gets rid of glitches
		ctx.strokeText(str, x, y)
		ctx.fillText(str, x, y)
	}
}

export const DrawNextEndOfMod = (
	ctx: CanvasRenderingContext2D | null,
	now: Date,
	schedule: Schedule,
	x: number,
	y: number
) => {
	if (ctx !== null) {
		ctx.font = '2em Fira Code'
		ctx.textAlign = 'center'

		ctx.fillStyle =
			isBeforeSchool(now, schedule) === true
				? dracBg
				: isAfterSchool(now, schedule) === true
					? dracBg
					: IsClassChange(now, schedule) === true
						? dracBg
						: dracFg
		const endOfNextPeriod = new Date(
			GetCurrentPeriod(now, schedule).end.time
		)

		if (now.getHours() > 14 && now.getMinutes() > 5) {
			endOfNextPeriod.setDate(now.getDate() + 1)
		}

		const diff = GetTimeLeftInMod(now, schedule)

		let str = ''

		if (
			// If it is currently AFTER the end of the last mod (and before midnight), it is after school.
			//endOfNextPeriod.getTime() - now.getTime() < 0
			isAfterSchool(now, schedule) === true
		) {
			str = `After School`
		} else if (isBeforeSchool(now, schedule) === true) {
			// If it is BEFORE the beginning of the first Mod, it is before school.
			str = `Before School`
		} else if (IsClassChange(now, schedule) === true) {
			// It is between classes.  Display the time left before the bell rings to start class TODO
			const timeLeftInClassChange = GetTimeDifference(
				now,
				GetNextPeriod(now, schedule).start.time
			)
			str = `Class Change: ${timeLeftInClassChange.minutes < 10 ? '0' : null}${timeLeftInClassChange.minutes}:${timeLeftInClassChange.seconds < 10 ? '0' : null}${timeLeftInClassChange.seconds}`
		} else {
			// Normal mod time
			str = `Time left in Mod: ${diff.hours < 10 ? '0' : ''}${diff.hours}:${diff.minutes < 10 ? '0' : ''}${diff.seconds === 60 ? diff.minutes + 1 : diff.minutes === 60 ? '00' : diff.minutes}:${diff.seconds < 10 ? '0' : ''}${diff.seconds === 60 ? '00' : diff.seconds}`
		}
		// Text Color
		ctx.fillStyle =
			isBeforeSchool(now, schedule) === true
				? dracFg // Color for text when it is before school
				: isAfterSchool(now, schedule) === true
					? dracFg // Color for text when it is after school
					: IsClassChange(now, schedule) === true
						? dracFg // Color for text when it is between classes
						: dracCl // Color for text when it is during class
		// Outline Color
		ctx.strokeStyle =
			isBeforeSchool(now, schedule) === true
				? dracFg // Color for outline of text when it is before school
				: isAfterSchool(now, schedule) === true
					? dracFg // Color for outline of text when it is after school
					: IsClassChange(now, schedule) === true
						? dracFg // Color for outline of text when it is between classes
						: dracPurple // Color for outline of text when it is during class
		ctx.lineWidth = 2 // Outline width in pixels
		ctx.miterLimit = 2 // Gets rid of glitches
		ctx.strokeText(str, x, y)
		ctx.fillText(str, x, y)
	}
}

export const DrawSchedule = (
	ctx: CanvasRenderingContext2D | null,
	canvas: HTMLCanvasElement | null,
	bells: Date[][],
	now: Date,
	schedule: Schedule,
	x: number
) => {
	if (ctx !== null) {
		// Set text settings
		ctx.font = '2em Fira Code'

		ctx.fillStyle =
			isBeforeSchool(now, schedule) === true
				? dracBg
				: isAfterSchool(now, schedule) === true
					? dracBg
					: IsClassChange(now, schedule) === true
						? dracBg
						: dracFg

		// bell -----> [startTime, now, endTime]
		bells.forEach((bell, i) => {
			const startTime = new Date(bell[0])
			const endTime = new Date(bell[2])
			endTime.setSeconds(0)
			const str1 = `${schedule.periods[i].name}:`
			const str2 = `${startTime.toLocaleString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}`
			// Color the current mod a different color
			const currentPeriod = GetCurrentPeriod(now, schedule)
			ctx.strokeStyle =
				isBeforeSchool(now, schedule) === true
					? dracFg
					: isAfterSchool(now, schedule) === true
						? dracFg
						: IsClassChange(now, schedule) === true
							? dracFg
							: dracBg
			ctx.lineWidth = 6
			ctx.miterLimit = 2 // Gets rid of glitches
			ctx.fillStyle =
				bell[2] > bell[1]
					? currentPeriod.start.time === bell[0] &&
						currentPeriod.end.time === bell[2]
						? massillonOrange
						: '#6272A4'
					: dracGray

			const fontHeight =
				ctx.measureText(str1).fontBoundingBoxAscent +
				ctx.measureText(str1).fontBoundingBoxDescent
			const lineSpacing = fontHeight * 0.1
			const lineHeight = fontHeight + lineSpacing
			const totalHeight = lineHeight * bells.length

			const yOffset =
				canvas !== null ? (canvas.height - totalHeight) / 2 : 0
			const yLocation = yOffset + lineHeight * i

			ctx.textAlign = 'left'

			ctx.strokeText(str1, x, yLocation)
			ctx.fillText(str1, x, yLocation)
			ctx.textAlign = 'right'
			ctx.strokeText(
				str2,
				// use "Student Lunch:" because it will be the longest of the mod names
				x +
					ctx.measureText('Student Lunch:').width * 2.5 +
					(canvas !== null ? canvas.width * 0.05 : 0),
				yLocation
			)
			ctx.fillText(
				str2,
				// use "Student Lunch:" because it will be the longest of the mod names
				x +
					ctx.measureText('Student Lunch:').width * 2.5 +
					(canvas !== null ? canvas.width * 0.05 : 0),
				yLocation
			)
		})
		// Reset Text Settings
		ctx.font = '1.5em Fira Code'
		ctx.textAlign = 'center'
	}
}

export const DrawTimeLeftInDay = (
	ctx: CanvasRenderingContext2D | null,
	now: Date,
	schedule: Schedule,
	x: number,
	y: number
) => {
	if (ctx !== null) {
		ctx.font = '2em Fira Code'
		ctx.textAlign = 'center'
		ctx.fillStyle =
			isBeforeSchool(now, schedule) === true
				? dracBg
				: isAfterSchool(now, schedule) === true
					? dracBg
					: IsClassChange(now, schedule) === true
						? dracBg
						: dracFg

		const tl = GetTimeLeftInDay(now, schedule)

		// TODO: Make this more robust with "Time until school starts" and "Time Since End Of Day" etc.  Use new functions that detect if it is before / after school?? isAfterSchool() isBeforeSchool()
		const str = `${tl.isAfterSchool === true ? 'Since end of Day: ' : ' Time left in Day: '}${tl.hours}:${tl.minutes < 10 ? '0' : ''}${tl.seconds === 0 ? tl.minutes + 1 : tl.minutes === 60 ? '00' : tl.minutes}:${tl.seconds < 10 ? '0' : ''}${tl.seconds === 60 ? '00' : tl.seconds}`

		ctx.strokeStyle =
			isBeforeSchool(now, schedule) === true
				? dracFg
				: isAfterSchool(now, schedule) === true
					? dracFg
					: IsClassChange(now, schedule) === true
						? dracFg
						: dracBg
		ctx.lineWidth = 6
		ctx.miterLimit = 2 // Gets rid of glitches
		ctx.strokeText(str, x, y)
		ctx.fillText(str, x, y)
	}
}

export const DrawDividerLine = (
	ctx: CanvasRenderingContext2D | null,
	w: number,
	h: number
) => {
	if (ctx !== null) {
		// Start a new Path
		ctx.strokeStyle = dracPurple
		ctx.beginPath()
		ctx.moveTo(w, h * 0.05)
		ctx.lineTo(w, h)
	}
}
