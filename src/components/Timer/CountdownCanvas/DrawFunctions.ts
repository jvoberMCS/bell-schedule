import {
	GetCurrentPeriod,
	GetTimeLeftInDay,
	GetTimeLeftInMod,
	IsAfterSchool,
	IsBeforeSchool,
	IsClassChange,
} from '@/components/Timer/CountdownCanvas/TimeFunctions'
import {
	dracBg,
	dracBg2,
	dracBlack,
	dracCl,
	dracFg,
	dracOrange,
	dracPurple,
} from '@/theme/colors/colors'

export const DrawCurrentTime = (
	ctx: CanvasRenderingContext2D | null,
	now: Date,
	schedule: Schedule,
	x: number,
	y: number
) => {
	if (ctx !== null) {
		const beforeSchool = IsBeforeSchool(now, schedule)
		const afterSchool = IsAfterSchool(now, schedule)
		const classChange = IsClassChange(now, schedule)
		ctx.font = '2em Fira Code'
		ctx.textAlign = 'center'
		const str = now.toLocaleString([], {
			hour: '2-digit',
			minute: '2-digit',
			second: 'numeric',
		})
		// Text Color
		ctx.fillStyle =
			beforeSchool === true
				? dracFg // Color for text when it is before school
				: afterSchool === true
					? dracBg2 // Color for text when it is after school
					: classChange === true
						? dracCl // Color for text when it is between classes
						: dracBlack // Color for text when it is during class
		// Outline Color
		ctx.strokeStyle =
			beforeSchool === true
				? dracFg // Color for outline of text when it is before school
				: afterSchool === true
					? dracFg // Color for outline of text when it is after school
					: classChange === true
						? dracPurple // Color for outline of text when it is between classes
						: dracOrange // Color for outline of text when it is during class
		ctx.lineWidth = 2 // Outline width in pixels
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
		const beforeSchool = IsBeforeSchool(now, schedule)
		const afterSchool = IsAfterSchool(now, schedule)
		const classChange = IsClassChange(now, schedule)
		ctx.font = '2em Fira Code'
		ctx.textAlign = 'center'

		ctx.fillStyle =
			beforeSchool === true
				? dracBg
				: afterSchool === true
					? dracBg2
					: classChange === true
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
			afterSchool === true
		) {
			str = `After School`
		} else if (beforeSchool === true) {
			// If it is BEFORE the beginning of the first Mod, it is before school.
			str = `Before School`
		} else if (IsClassChange(now, schedule) === true) {
			str = `Class Change: ${diff.hours < 10 ? '0' : ''}${diff.hours === 0 ? diff.hours : ''}:${diff.minutes < 10 ? '0' : ''}${diff.seconds === 60 ? diff.minutes + 1 : diff.minutes === 60 ? '00' : diff.minutes}:${diff.seconds < 10 ? '0' : ''}${diff.seconds === 60 ? '00' : diff.seconds}`
		} else {
			// Normal mod time
			str = `Time left in Mod: ${diff.hours < 10 ? '0' : ''}${diff.hours}:${diff.minutes < 10 ? '0' : ''}${diff.seconds === 60 ? diff.minutes + 1 : diff.minutes === 60 ? '00' : diff.minutes}:${diff.seconds < 10 ? '0' : ''}${diff.seconds === 60 ? '00' : diff.seconds}`
		}
		// Text Color
		ctx.fillStyle =
			beforeSchool === true
				? dracFg // Color for text when it is before school
				: afterSchool === true
					? dracBg2 // Color for text when it is after school
					: IsClassChange(now, schedule) === true
						? dracCl // Color for text when it is between classes
						: dracBlack // Color for text when it is during class
		// Outline Color
		ctx.strokeStyle =
			beforeSchool === true
				? dracFg // Color for outline of text when it is before school
				: afterSchool === true
					? dracFg // Color for outline of text when it is after school
					: classChange === true
						? dracPurple // Color for outline of text when it is between classes
						: dracOrange // Color for outline of text when it is during class
		ctx.lineWidth = 2 // Outline width in pixels
		ctx.miterLimit = 2 // Gets rid of glitches
		ctx.strokeText(str, x, y)
		ctx.fillText(str, x, y)
	}
}

export const DrawSchedule = (
	ctx: CanvasRenderingContext2D | null,
	canvas: HTMLCanvasElement | null,
	bells: Bell[],
	now: Date,
	schedule: Schedule,
	x: number
) => {
	if (ctx !== null) {
		const beforeSchool = IsBeforeSchool(now, schedule)
		const afterSchool = IsAfterSchool(now, schedule)
		const classChange = IsClassChange(now, schedule)

		// Set text settings
		ctx.font = '2em Fira Code'

		ctx.fillStyle =
			beforeSchool === true
				? dracBg
				: afterSchool === true
					? dracBg2
					: classChange === true
						? dracBg
						: dracFg

		const modBells = bells.filter((bell) => bell.name !== 'Class Change')

		modBells.forEach((modBell, i) => {
			const startTime = new Date(modBell.start)
			const endTime = new Date(modBell.end)
			endTime.setSeconds(0)
			const str1 = `${modBell.name}:`
			const str2 = `${startTime.toLocaleString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}`
			// Color the current mod a different color
			const currentPeriod = GetCurrentPeriod(now, schedule)
			ctx.strokeStyle =
				beforeSchool === true
					? dracFg
					: afterSchool === true
						? dracFg
						: classChange === true
							? dracFg
							: dracBg
			ctx.lineWidth = 2
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
		const beforeSchool = IsBeforeSchool(now, schedule)
		const afterSchool = IsAfterSchool(now, schedule)
		const classChange = IsClassChange(now, schedule)

		ctx.font = '2em Fira Code'
		ctx.textAlign = 'center'
		ctx.fillStyle =
			beforeSchool === true
				? dracBg
				: afterSchool === true
					? dracBg2
					: classChange === true
						? dracBg
						: dracFg

		const tl = GetTimeLeftInDay(now, schedule)

		// TODO: Make this more robust with "Time until school starts" and "Time Since End Of Day" etc.  Use new functions that detect if it is before / after school?? isAfterSchool() isBeforeSchool()
		const str = `${afterSchool === true ? 'Time Since End of Day: ' : beforeSchool === true ? 'Time Until School Starts: ' : ' Time left in Day: '}${tl.hours < 10 ? '0' : ''}${tl.hours}:${tl.minutes < 10 ? '0' : ''}${tl.seconds === 0 ? tl.minutes + 1 : tl.minutes === 60 ? '00' : tl.minutes}:${tl.seconds < 10 ? '0' : ''}${tl.seconds === 60 ? '00' : tl.seconds}`

		// Text Color
		ctx.fillStyle =
			beforeSchool === true
				? dracFg // Color for text when it is before school
				: afterSchool === true
					? dracBg2 // Color for text when it is after school
					: classChange === true
						? dracCl // Color for text when it is between classes
						: dracBlack // Color for text when it is during class
		// Outline Color
		ctx.strokeStyle =
			beforeSchool === true
				? dracFg // Color for outline of text when it is before school
				: afterSchool === true
					? dracFg // Color for outline of text when it is after school
					: classChange === true
						? dracPurple // Color for outline of text when it is between classes
						: dracOrange // Color for outline of text when it is during class
		ctx.lineWidth = 2 // Outline width in pixels
		ctx.miterLimit = 2 // Gets rid of glitches
		ctx.strokeText(str, x, y)
		ctx.fillText(str, x, y)
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
		ctx.strokeStyle = color
		ctx.beginPath()
		ctx.moveTo(w, h * 0.05)
		ctx.lineTo(w, h)
	}
}
