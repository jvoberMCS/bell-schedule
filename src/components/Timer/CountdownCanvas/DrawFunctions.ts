import {
	getChunkOfDay,
	GetCurrentPeriod,
	GetTimeLeftInMod,
	GetTimeSinceEndOfDay,
	GetTimeUntilBeginningOfDay,
	GetTimeUntilEndOfDay,
} from '@/components/Timer/CountdownCanvas/TimeFunctions'
import {
	dracBg,
	dracBg2,
	dracBlack,
	dracCl,
	dracFg,
	dracOrange,
} from '@/theme/colors/colors'

export const DrawSchedule = (
	ctx: CanvasRenderingContext2D | null,
	canvas: HTMLCanvasElement | null,
	bells: Bell[],
	now: Date,
	schedule: Schedule,
	x: number
) => {
	if (ctx !== null) {
		const chunkOfDay = getChunkOfDay(now, schedule)

		// Set text settings
		ctx.font = '2em Fira Code'

		ctx.fillStyle =
			chunkOfDay === 'Before School' || chunkOfDay === 'Student Arrival'
				? dracBg
				: chunkOfDay === 'After School' ||
					  chunkOfDay === 'Student Dismissal'
					? dracBg2
					: chunkOfDay === 'Class Change'
						? dracBg
						: dracFg

		const modBells = bells.filter(
			(bell) =>
				bell.name !== 'Class Change 1' &&
				bell.name !== 'Class Change 2' &&
				bell.name !== 'Class Change 3' &&
				bell.name !== 'Class Change 4' &&
				bell.name !== 'Class Change 5' &&
				bell.name !== 'Class Change 6' &&
				bell.name !== 'Class Change 7' &&
				bell.name !== 'Class Change 8' &&
				bell.name !== 'Before School' &&
				bell.name !== 'After School' &&
				bell.name !== 'Student Arrival' &&
				bell.name !== 'Student Dismissal'
		)

		modBells.forEach((modBell, i) => {
			const startTime = new Date(modBell.start)
			const endTime = new Date(modBell.end)
			endTime.setSeconds(0)
			const str1 = `${modBell.name}:`
			const str2 = `${startTime.toLocaleString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}`
			// Color the current mod a different color
			const currentPeriod = GetCurrentPeriod(now, schedule)
			ctx.lineWidth = 4
			ctx.miterLimit = 2 // Gets rid of glitches
			ctx.fillStyle =
				modBell.end > modBell.now
					? currentPeriod.start === modBell.start &&
						currentPeriod.end === modBell.end
						? dracOrange
						: dracCl
					: dracBlack

			const fontHeight =
				ctx.measureText(str1).fontBoundingBoxAscent +
				ctx.measureText(str1).fontBoundingBoxDescent
			const lineSpacing = fontHeight * 0.1
			const lineHeight = fontHeight + lineSpacing
			const totalHeight = lineHeight * modBells.length

			const yOffset =
				canvas !== null ? (canvas.height - totalHeight) / 2 : 0
			const yLocation = yOffset + lineHeight * i

			ctx.textAlign = 'left'

			ctx.fillText(str1, x, yLocation)
			ctx.textAlign = 'right'
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

export const DrawDividerLine = (
	ctx: CanvasRenderingContext2D | null,
	w: number,
	h: number,
	color: string
) => {
	if (ctx !== null) {
		// Start a new Path
		ctx.beginPath()
		ctx.moveTo(w, h * 0.05)
		ctx.lineTo(w, h * 0.95)
		ctx.stroke()
	}
}

export const DrawCurrentTime = (
	ctx: CanvasRenderingContext2D | null,
	now: Date,
	schedule: Schedule,
	x: number,
	y: number
) => {
	if (ctx !== null) {
		const chunkOfDay = getChunkOfDay(now, schedule)
		ctx.font = '2em Fira Code'
		ctx.textAlign = 'center'
		const str = now.toLocaleString([], {
			hour: '2-digit',
			minute: '2-digit',
			second: 'numeric',
		})
		// Text Color
		ctx.fillStyle =
			chunkOfDay === 'Before School' || chunkOfDay === 'Student Arrival'
				? dracFg // Color for text when it is before school
				: chunkOfDay === 'After School' ||
					  chunkOfDay === 'Student Dismissal'
					? dracBg2 // Color for text when it is after school
					: chunkOfDay === 'Class Change'
						? dracCl // Color for text when it is between classes
						: dracOrange // Color for text when it is during class
		ctx.miterLimit = 2 // Gets rid of glitches
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
		const chunkOfDay = getChunkOfDay(now, schedule)
		ctx.font =
			chunkOfDay === 'Class Change' ? '6.5em Fira Code' : '2em Fira Code'
		ctx.textAlign = 'center'

		ctx.fillStyle =
			chunkOfDay === 'Before School' || chunkOfDay === 'Student Arrival'
				? dracBg
				: chunkOfDay === 'After School' ||
					  chunkOfDay === 'Student Dismissal'
					? dracBg2
					: chunkOfDay === 'Class Change'
						? dracBg
						: dracFg
		const endOfNextPeriod = new Date(GetCurrentPeriod(now, schedule).end)

		if (now.getHours() > 14 && now.getMinutes() > 5) {
			endOfNextPeriod.setDate(now.getDate() + 1)
		}

		const diff = GetTimeLeftInMod(now, schedule)

		let str = ''

		if (
			// If it is currently AFTER the end of the last mod (and before midnight), it is after school.
			//endOfNextPeriod.getTime() - now.getTime() < 0
			chunkOfDay === 'After School' ||
			chunkOfDay === 'Student Dismissal'
		) {
			str = `After School`
		} else if (
			chunkOfDay === 'Before School' ||
			chunkOfDay === 'Student Arrival'
		) {
			// If it is BEFORE the beginning of the first Mod, it is before school.
			str = `Before School`
		} else if (chunkOfDay === 'Class Change') {
			str = `Class Change: ${diff.hours < 10 ? '0' : ''}${diff.hours === 0 ? diff.hours : ''}:${diff.minutes < 10 ? '0' : ''}${diff.seconds === 60 ? diff.minutes + 1 : diff.minutes === 60 ? '00' : diff.minutes}:${diff.seconds < 10 ? '0' : ''}${diff.seconds === 60 ? '00' : diff.seconds}`
		} else {
			// Normal mod time
			str = `Time left in Mod: ${diff.hours < 10 ? '0' : ''}${diff.hours}:${diff.minutes < 10 ? '0' : ''}${diff.seconds === 60 ? diff.minutes + 1 : diff.minutes === 60 ? '00' : diff.minutes}:${diff.seconds < 10 ? '0' : ''}${diff.seconds === 60 ? '00' : diff.seconds}`
		}

		// Text Color
		ctx.fillStyle =
			chunkOfDay === 'Before School' || chunkOfDay === 'Student Arrival'
				? dracFg // Color for text when it is before school
				: chunkOfDay === 'After School' ||
					  chunkOfDay === 'Student Dismissal'
					? dracBg2 // Color for text when it is after school
					: chunkOfDay === 'Class Change'
						? dracCl // Color for text when it is between classes
						: dracOrange // Color for text when it is during class
		ctx.lineWidth = 0.2 // Outline width in pixels
		ctx.miterLimit = 2 // Gets rid of glitches
		ctx.fillText(str, x, y)
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
		const chunkOfDay = getChunkOfDay(now, schedule)

		ctx.font = '2em Fira Code'
		ctx.textAlign = 'center'
		ctx.fillStyle =
			chunkOfDay === 'Before School' || chunkOfDay === 'Student Arrival'
				? dracBg
				: chunkOfDay === 'After School' ||
					  chunkOfDay === 'Student Dismissal'
					? dracBg2
					: chunkOfDay === 'Class Change'
						? dracBg
						: dracFg

		const str1 = `${
			chunkOfDay === 'After School' || chunkOfDay === 'Student Dismissal'
				? 'Time Since End of Day: '
				: chunkOfDay === 'Before School' ||
					  chunkOfDay === 'Student Arrival'
					? 'Time Until School Starts: '
					: ' Time left in Day: '
		}`

		const timeLeftInDay = GetTimeUntilEndOfDay(now, schedule)
		const timeSinceEndOfDay = GetTimeSinceEndOfDay(now, schedule)
		const timeUntilBeginningOfDay = GetTimeUntilBeginningOfDay(
			now,
			schedule
		)
		const str2 = `${
			chunkOfDay === 'After School' || chunkOfDay === 'Student Dismissal'
				? `${timeSinceEndOfDay.hours < 10 ? '0' : ''}${timeSinceEndOfDay.hours}:${timeSinceEndOfDay.minutes < 10 ? '0' : ''}${timeSinceEndOfDay.minutes}:${timeSinceEndOfDay.seconds < 10 ? '0' : ''}${timeSinceEndOfDay.seconds}`
				: chunkOfDay === 'Before School' ||
					  chunkOfDay === 'Student Arrival'
					? `${timeUntilBeginningOfDay.hours < 10 ? '0' : ''}${timeUntilBeginningOfDay.hours}:${timeUntilBeginningOfDay.minutes < 10 ? '0' : ''}${timeUntilBeginningOfDay.minutes}:${timeUntilBeginningOfDay.seconds < 10 ? '0' : ''}${timeUntilBeginningOfDay.seconds}`
					: `${timeLeftInDay.hours < 10 ? '0' : ''}${timeLeftInDay.hours}:${timeLeftInDay.minutes < 10 ? '0' : ''}${timeLeftInDay.minutes}:${timeLeftInDay.seconds < 10 ? '0' : ''}${timeLeftInDay.seconds}`
		}`

		const str = str1 + str2
		// Text Color
		ctx.fillStyle =
			chunkOfDay === 'Before School' || chunkOfDay === 'Student Arrival'
				? dracFg // Color for text when it is before school
				: chunkOfDay === 'After School' ||
					  chunkOfDay === 'Student Dismissal'
					? dracBg2 // Color for text when it is after school
					: chunkOfDay === 'Class Change'
						? dracCl // Color for text when it is between classes
						: dracOrange // Color for text when it is during class
		ctx.lineWidth = 0.2 // Outline width in pixels
		ctx.miterLimit = 2 // Gets rid of glitches
		ctx.fillText(str, x, y)
	}
}
