import { useMainStore } from '@/stores/MainStore'
import {
	dracCyan,
	dracFg,
	dracGray,
	dracGreen,
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
			ctx.fillStyle = dracCyan
			const str = now.toLocaleString([], {
				hour: '2-digit',
				minute: '2-digit',
				second: 'numeric',
			})
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

	const getTimeDifference = (t1: Date, t2: Date) => {
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
		hours: number
		minutes: number
		seconds: number
		negative: boolean
		diffInMs: number
	} => {
		const endOfDay = new Date(
			schedule.periods[schedule.periods.length - 1].end.time
		)

		// Just kinda works? Not sure why to be honest.
		// const hours = endOfDay.getHours() - now.getHours()- 1
		// const minutes = 59 + endOfDay.getMinutes() - now.getMinutes()
		// const seconds = 59 - now.getSeconds()
		const neg = endOfDay.getTime() - now.getTime()
		const hours =
			endOfDay.getHours() - now.getHours() < 0
				? now.getHours() - endOfDay.getHours()
				: endOfDay.getHours() - now.getHours()
		const minutes =
			endOfDay.getMinutes() - now.getMinutes() < 0
				? now.getMinutes() - endOfDay.getMinutes()
				: endOfDay.getMinutes() - now.getMinutes()
		const seconds = neg < 0 ? now.getSeconds() : 60 - now.getSeconds()

		return {
			hours: hours,
			minutes: minutes,
			seconds: seconds,
			negative: neg < 0 ? true : false,
			diffInMs: 1,
		}
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
			const diff = getTimeDifference(now, endOfNextPeriod)
			diff.seconds = 59 - now.getSeconds()

			let str = ''
			if (
				endOfNextPeriod.getTime() - now.getTime() >
					getLongestModMs(schedule) ||
				endOfNextPeriod.getTime() - now.getTime() < 0
			) {
				str = `The day is over!`
			} else {
				// Normal mod time
				str = `Time left in Mod: ${diff.hours < 10 ? '0' : ''}${diff.hours}:${diff.minutes < 10 ? '0' : ''}${diff.minutes}:${diff.seconds < 10 ? '0' : ''}${diff.seconds}`
			}
			ctx.fillStyle = dracFg
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

				ctx.fillText(str1, x, y + fontHeight + i * lineHeight)
				ctx.textAlign = 'right'
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
			ctx.fillStyle = dracGreen
			const tl = getTimeLeftInDay(now, schedule)
			const str = `${tl.negative === true ? 'Since end of Day: ' : ' Time left in Day: '}${tl.hours < 10 ? '0' : ''}${tl.hours}:${tl.minutes < 10 ? '0' : ''}${tl.minutes}:${tl.seconds < 10 ? '0' : ''}${tl.seconds} `
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
			ctx.moveTo(w * 0.55, 0)
			ctx.lineTo(w * 0.55, h)
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

			drawCurrentTime(ctx, now, w * 0.75, h * 0.25)
			drawNextEndOfMod(ctx, now, schedule, w * 0.75, h * 0.5)
			drawTimeLeftInDay(ctx, now, schedule, w * 0.75, h * 0.75)

			drawDividerLine(ctx, w, h)

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
