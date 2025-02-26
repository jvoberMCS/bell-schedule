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
	dracFg,
	dracGray,
	dracPurple,
	dracRed,
	massillonOrange,
} from '@/theme/colors/colors'
import { Box } from '@chakra-ui/react/box'
import React, { useEffect, useRef } from 'react'
import useSound from 'use-sound'
import germanSchoolBellSound from '../../assets/germanSchoolBell.mp3'

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

	const drawCurrentTime = (
		ctx: CanvasRenderingContext2D | null,
		now: Date,
		x: number,
		y: number
	) => {
		if (ctx !== null) {
			ctx.font = '30pt Fira Code'
			ctx.textAlign = 'center'
			ctx.fillStyle = dracFg
			const str = now.toLocaleString([], {
				hour: '2-digit',
				minute: '2-digit',
				second: 'numeric',
			})
			ctx.fillStyle = dracFg
			ctx.strokeStyle = 'black'
			ctx.lineWidth = 6
			ctx.miterLimit = 2 // Gets rid of glitches
			ctx.strokeText(str, x, y)
			ctx.fillText(str, x, y)
		}
	}

	const checkPlayBell = (now: Date, schedule: Schedule) => {
		// Check if we should play a bell
		schedule.periods.forEach((period) => {
			const ahora = {
				hours: now.getHours(),
				minutes: now.getMinutes(),
				seconds: now.getSeconds(),
			}
			const startTime = {
				hours: period.start.time.getHours(),
				minutes: period.start.time.getMinutes(),
				seconds: 0,
			}

			const endTime = {
				hours: period.end.time.getHours(),
				minutes: period.end.time.getMinutes(),
				seconds: 0,
			}

			// If the period start time h/m/s match, then play the bell sound.
			if (
				(ahora.hours === startTime.hours &&
					ahora.minutes === startTime.minutes &&
					ahora.seconds === startTime.seconds) ||
				(ahora.hours === endTime.hours &&
					ahora.minutes === endTime.minutes &&
					ahora.seconds === endTime.seconds)
			) {
				playBellSound()
			}
		})
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

	const getCurrentPeriod = (now: Date, schedule: Schedule) => {
		const pastAndPresentMods = schedule.periods.filter((period) => {
			return period.end.time < now
		})
		if (schedule.periods[pastAndPresentMods.length] !== undefined) {
			return schedule.periods[pastAndPresentMods.length]
		} else {
			//const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
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
			ctx.font = '30pt Fira Code'
			ctx.textAlign = 'center'
			const endOfNextPeriod = new Date(
				getCurrentPeriod(now, schedule).end.time
			)

			if (now.getHours() > 14 && now.getMinutes() > 5) {
				endOfNextPeriod.setDate(now.getDate() + 1)
			}
			const diff = getTimeLeftInMod(now, schedule)

			let str = ''
			if (
				endOfNextPeriod.getTime() - now.getTime() >
					getLongestModMs(schedule) ||
				endOfNextPeriod.getTime() - now.getTime() < 0
			) {
				str = `The day is over!`
			} else {
				// Normal mod time
				str = `Time left in Mod: ${diff.hours < 10 ? '0' : ''}${diff.hours}:${diff.minutes < 10 ? '0' : ''}${diff.minutes === 60 ? 59 : diff.minutes}:${diff.seconds < 10 ? '0' : ''}${diff.seconds === 60 ? 59 : diff.seconds}`
			}
			ctx.fillStyle = dracFg
			ctx.strokeStyle = 'black'
			ctx.lineWidth = 6
			ctx.miterLimit = 2 // Gets rid of glitches
			ctx.strokeText(str, x, y)
			ctx.fillText(str, x, y)
		}
	}

	const drawSchedule = (
		ctx: CanvasRenderingContext2D | null,
		bells: Date[][],
		now: Date,
		schedule: Schedule,
		x: number,
		y: number
	) => {
		if (ctx !== null) {
			// Set text settings
			ctx.font = '32pt Fira Code'

			// bell -----> [startTime, now, endTime]
			bells.forEach((bell, i) => {
				const startTime = new Date(bell[0])
				const endTime = new Date(bell[2])
				endTime.setSeconds(0)
				const str1 = `${schedule.periods[i].name}:`
				const str2 = `${startTime.toLocaleString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}`
				// Color the current mod a different color
				const currentPeriod = getCurrentPeriod(now, schedule)
				ctx.strokeStyle = 'black'
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

				ctx.textAlign = 'left'

				ctx.strokeText(str1, x, y + fontHeight + i * lineHeight)
				ctx.fillText(str1, x, y + fontHeight + i * lineHeight)
				ctx.textAlign = 'right'
				ctx.strokeText(
					str2,
					// use "Student Lunch:" because it will be the longest of the mod names
					x + ctx.measureText('Student Lunch:').width * 2.5,
					y + fontHeight + i * lineHeight
				)
				ctx.fillText(
					str2,
					// use "Student Lunch:" because it will be the longest of the mod names
					x + ctx.measureText('Student Lunch:').width * 2.5,
					y + fontHeight + i * lineHeight
				)
			})
			ctx.fillStyle = dracRed
			// Reset Text Settings
			ctx.font = '20pt Fira Code'
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
			ctx.font = '30pt Fira Code'
			ctx.textAlign = 'center'
			ctx.fillStyle = dracFg

			const tl = getTimeLeftInDay(now, schedule)

			const str = `${tl.isAfterSchool === true ? 'Since end of Day: ' : ' Time left in Day: '}${tl.hours < 10 ? '0' : ''}${tl.hours}:${tl.minutes < 10 ? '0' : ''}${tl.minutes}:${tl.seconds < 10 ? '0' : ''}${tl.seconds} `
			ctx.strokeStyle = 'black'
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

		const schedule = schedules.filter(
			(schedule) => schedule.selectionID === scheduleSelection
		)[0]

		const animate = () => {
			ctx.clearRect(0, 0, width, height) // Clear the canvas
			// Set starting text color
			ctx.fillStyle = dracFg

			// Get the current time
			const now = new Date()

			const bells = schedule.periods.map((period) => {
				return [period.start.time, now, period.end.time]
			})

			drawSchedule(ctx, bells, now, schedule, w * 0.05, h * 0.1)

			drawCurrentTime(ctx, now, w * 0.775, h * 0.25)
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
