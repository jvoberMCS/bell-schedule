import germanSchoolBellSound from '@/assets/germanSchoolBell.mp3'
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
import { useMainStore } from '@/stores/MainStore'
import {
	dracBg,
	dracBg2,
	dracFg,
	dracGray,
	dracPurple,
	dracRed,
	massillonOrange,
} from '@/theme/colors/colors'
import { Box } from '@chakra-ui/react/box'
import React, { useEffect, useRef } from 'react'
import useSound from 'use-sound'

type Props = { width: number; height: number }
type CountdownTimerProps =
	Props extends Record<string, never>
		? React.FC<Record<string, never>>
		: React.FC<Props>

export const CountdownTimer: CountdownTimerProps = ({ width, height }) => {
	const scheduleSelection = useMainStore((state) => state.scheduleSelection)
	const schedules = useMainStore((state) => state.schedules)
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [playBellSound] = useSound(germanSchoolBellSound)
	const audioContextRef = useRef(null)
	const oscillatorRef = useRef(null)

	const drawCurrentTime = (
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
						: isClassChange(now, schedule) === true
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
						: isClassChange(now, schedule) === true
							? dracFg
							: dracBg
			ctx.lineWidth = 6
			ctx.miterLimit = 2 // Gets rid of glitches
			ctx.strokeText(str, x, y)
			ctx.fillText(str, x, y)
		}
	}

	const makeTimeCurrentDay = (date: Date) => {
		const newDate = new Date()
		newDate.setHours(date.getHours())
		newDate.setMinutes(date.getMinutes())
		newDate.setSeconds(0)
		newDate.setMilliseconds(0)
		return newDate
	}

	const playTone = () => {}

	const checkPlayTone = (now: Date, schedule: Schedule) => {}

	const checkPlayBell = (now: Date, schedule: Schedule) => {
		// Check if we should play a bell
		const previousPeriodStart = makeTimeCurrentDay(
			getPreviousPeriod(now, schedule).start.time
		)
		const previousPeriodEnd = makeTimeCurrentDay(
			getPreviousPeriod(now, schedule).end.time
		)
		const currentPeriodStart = makeTimeCurrentDay(
			getCurrentPeriod(now, schedule).start.time
		)
		const currentPeriodEnd = makeTimeCurrentDay(
			getCurrentPeriod(now, schedule).end.time
		)
		const nextPeriodStart = makeTimeCurrentDay(
			getNextPeriod(now, schedule).start.time
		)
		const nextPeriodEnd = makeTimeCurrentDay(
			getNextPeriod(now, schedule).end.time
		)

		if (
			now === previousPeriodStart ||
			now === previousPeriodEnd ||
			now === currentPeriodStart ||
			now === currentPeriodEnd ||
			now === nextPeriodStart ||
			now === nextPeriodEnd
		) {
			playBellSound()
		}
	}

	const getTimeDifference = (
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

	const getPreviousPeriod = (now: Date, schedule: Schedule) => {
		const pastAndPresentMods = schedule.periods.filter((period) => {
			return period.end.time < now
		})
		if (schedule.periods[pastAndPresentMods.length] !== undefined) {
			return schedule.periods[pastAndPresentMods.length - 1]
		} else {
			return schedule.periods[0]
		}
	}

	const getCurrentPeriod = (now: Date, schedule: Schedule) => {
		const pastAndPresentMods = schedule.periods.filter((period) => {
			return period.end.time < now
		})
		if (schedule.periods[pastAndPresentMods.length] !== undefined) {
			return schedule.periods[pastAndPresentMods.length]
		} else {
			return schedule.periods[0]
		}
	}

	const getNextPeriod = (now: Date, schedule: Schedule) => {
		const pastAndPresentMods = schedule.periods.filter((period) => {
			return period.end.time < now
		})
		if (schedule.periods[pastAndPresentMods.length] !== undefined) {
			return schedule.periods[pastAndPresentMods.length + 1]
		} else {
			return schedule.periods[0]
		}
	}

	const getLongestModMs = (schedule: Schedule) => {
		let longestModMs = 0
		schedule.periods.forEach((period) => {
			const diff = period.end.time.getTime() - period.start.time.getTime()
			diff > longestModMs ? (longestModMs = diff) : null
		})
		return longestModMs
	}

	const getTimeLeftInDay = (
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

		const isAfterSchool =
			endOfDay.getTime() - now.getTime() > 0 ? false : true

		const timeDifference =
			isAfterSchool === true
				? getTimeDifference(endOfDay, now)
				: getTimeDifference(now, endOfDay)

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

	const getTimeLeftInMod = (now: Date, schedule: Schedule) => {
		const endOfNextPeriod = new Date(
			getCurrentPeriod(now, schedule).end.time
		)
		const diff = getTimeDifference(now, endOfNextPeriod)

		return diff
	}

	const drawNextEndOfMod = (
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
						: isClassChange(now, schedule) === true
							? dracBg
							: dracFg
			const endOfNextPeriod = new Date(
				getCurrentPeriod(now, schedule).end.time
			)

			if (now.getHours() > 14 && now.getMinutes() > 5) {
				endOfNextPeriod.setDate(now.getDate() + 1)
			}

			const diff = getTimeLeftInMod(now, schedule)

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
			} else if (isClassChange(now, schedule) === true) {
				// It is between classes.  Display the time left before the bell rings to start class TODO
				const timeLeftInClassChange = getTimeDifference(
					now,
					getNextPeriod(now, schedule).start.time
				)
				str = `Class Change: ${timeLeftInClassChange.minutes < 10 ? '0' : null}${timeLeftInClassChange.minutes}:${timeLeftInClassChange.seconds < 10 ? '0' : null}${timeLeftInClassChange.seconds}`
			} else {
				// Normal mod time
				str = `Time left in Mod: ${diff.hours < 10 ? '0' : ''}${diff.hours}:${diff.minutes < 10 ? '0' : ''}${diff.seconds === 60 ? diff.minutes + 1 : diff.minutes === 60 ? '00' : diff.minutes}:${diff.seconds < 10 ? '0' : ''}${diff.seconds === 60 ? '00' : diff.seconds}`
			}
			ctx.strokeStyle =
				isBeforeSchool(now, schedule) === true
					? dracFg
					: isAfterSchool(now, schedule) === true
						? dracFg
						: isClassChange(now, schedule) === true
							? dracFg
							: dracBg
			ctx.lineWidth = 6
			ctx.miterLimit = 2 // Gets rid of glitches
			ctx.strokeText(str, x, y)
			ctx.fillStyle = dracRed
			ctx.fillText(str, x, y)
		}
	}

	const isClassChange = (now: Date, schedule: Schedule) => {
		const currentPeriod = getCurrentPeriod(now, schedule)
		const prevPeriod =
			getPreviousPeriod(now, schedule) !== undefined
				? getPreviousPeriod(now, schedule)
				: schedule.periods[0]

		if (prevPeriod.end.time < now && now < currentPeriod.start.time) {
			return true
		}
		return false
	}

	const isBeforeSchool = (now: Date, schedule: Schedule) => {
		if (now < schedule.periods[0].start.time) {
			return true
		}
		return false
	}

	const isAfterSchool = (now: Date, schedule: Schedule) => {
		const numPeriods = schedule.periods.length
		if (now > schedule.periods[numPeriods - 1].end.time) {
			return true
		}
		return false
	}

	const drawSchedule = (
		ctx: CanvasRenderingContext2D | null,
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
						: isClassChange(now, schedule) === true
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
				const currentPeriod = getCurrentPeriod(now, schedule)
				ctx.strokeStyle =
					isBeforeSchool(now, schedule) === true
						? dracFg
						: isAfterSchool(now, schedule) === true
							? dracFg
							: isClassChange(now, schedule) === true
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
					canvasRef.current !== null
						? (canvasRef.current.height - totalHeight) / 2
						: 0
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
						(canvasRef.current !== null
							? canvasRef.current.width * 0.05
							: 0),
					yLocation
				)
				ctx.fillText(
					str2,
					// use "Student Lunch:" because it will be the longest of the mod names
					x +
						ctx.measureText('Student Lunch:').width * 2.5 +
						(canvasRef.current !== null
							? canvasRef.current.width * 0.05
							: 0),
					yLocation
				)
			})
			// Reset Text Settings
			ctx.font = '1.5em Fira Code'
			ctx.textAlign = 'center'
		}
	}

	const drawTimeLeftInDay = (
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
						: isClassChange(now, schedule) === true
							? dracBg
							: dracFg

			const tl = getTimeLeftInDay(now, schedule)

			// TODO: Make this more robust with "Time until school starts" and "Time Since End Of Day" etc.  Use new functions that detect if it is before / after school?? isAfterSchool() isBeforeSchool()
			const str = `${tl.isAfterSchool === true ? 'Since end of Day: ' : ' Time left in Day: '}${tl.hours}:${tl.minutes < 10 ? '0' : ''}${tl.seconds === 0 ? tl.minutes + 1 : tl.minutes === 60 ? '00' : tl.minutes}:${tl.seconds < 10 ? '0' : ''}${tl.seconds === 60 ? '00' : tl.seconds}`

			ctx.strokeStyle =
				isBeforeSchool(now, schedule) === true
					? dracFg
					: isAfterSchool(now, schedule) === true
						? dracFg
						: isClassChange(now, schedule) === true
							? dracFg
							: dracBg
			ctx.lineWidth = 6
			ctx.miterLimit = 2 // Gets rid of glitches
			ctx.strokeText(str, x, y)
			ctx.fillText(str, x, y)
		}
	}

	const drawDividerLine = (
		ctx: CanvasRenderingContext2D | null,
		w: number,
		h: number
	) => {
		if (ctx !== null) {
			// Start a new Path
			ctx.strokeStyle = dracPurple
			ctx.beginPath()
			ctx.moveTo(w, 0)
			ctx.lineTo(w, h)
		}
	}

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) {
			console.error('Canvas is null')
			return
		}

		// Proceed
		const w = canvas.width
		const h = canvas.height
		const ctx = canvas.getContext('2d')

		if (!ctx) return // Check to make sure context isn't null

		audioContextRef.current = new (window.AudioContext ||
			window.webkitAudioContext)()
		oscillatorRef.current = audioContextRef.current.createOscillator()
		oscillatorRef.current.type = 'sine'
		oscillatorRef.current.frequency.setValueAtTime(
			440,
			audioContextRef.current.currentTime
		) // Set frequency to 440 Hz (A4 note)
		oscillatorRef.current.connect(audioContextRef.current.destination)

		const schedule = schedules.filter(
			(schedule) => schedule.selectionID === scheduleSelection
		)[0]

		const animate = () => {
			ctx.clearRect(0, 0, width, height) // Clear the canvas

			// Get the current time
			const now = new Date()

			// Set background color
			ctx.fillStyle =
				isBeforeSchool(now, schedule) === true
					? dracBg2
					: isAfterSchool(now, schedule) === true
						? dracBg2
						: isClassChange(now, schedule) === true
							? dracBg
							: dracBg

			ctx.fillRect(0, 0, w, h)

			// Set text color
			ctx.fillStyle =
				isBeforeSchool(now, schedule) === true
					? dracBg
					: isAfterSchool(now, schedule) === true
						? dracBg
						: isClassChange(now, schedule) === true
							? dracBg
							: dracFg

			const bells = schedule.periods.map((period) => {
				return [period.start.time, now, period.end.time]
			})

			//drawSchedule(ctx, bells, now, schedule, w, h)
			drawSchedule(ctx, bells, now, schedule, w * 0.015)

			drawCurrentTime(ctx, now, schedule, w * 0.775, h * 0.25)
			drawNextEndOfMod(ctx, now, schedule, w * 0.775, h * 0.5)
			drawTimeLeftInDay(ctx, now, schedule, w * 0.775, h * 0.75)

			drawDividerLine(ctx, w * 0.55, h)

			// Draw the Path
			ctx.stroke()

			checkPlayBell(now, schedule)
		}

		const intervalId = setInterval(animate, 1) // Update the canvas every x milliseconds

		return () => clearInterval(intervalId) // Cleanup
	}, [scheduleSelection])

	return (
		<Box>
			<canvas ref={canvasRef} width={width} height={height} />
		</Box>
	)
}
