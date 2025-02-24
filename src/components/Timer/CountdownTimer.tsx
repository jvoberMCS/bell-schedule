import {
	getRealTimeSchedule,
	nextEndOfMod,
	timeLeftInDay,
} from '@/functions/GlobalFunctions'
import { useMainStore } from '@/stores/MainStore'
import { dracComment, dracFg, dracYellow } from '@/theme/colors/colors'
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
	const [play] = useSound(germanSchoolBellSound)

	const currentTimeClock = (
		ctx: CanvasRenderingContext2D | null,
		now: Date,
		schedule: Schedule,
		x: number,
		y: number
	) => {
		if (ctx !== null) {
			ctx.fillStyle = dracYellow
			const str = now.toLocaleString([], {
				hour: '2-digit',
				minute: '2-digit',
			})
			ctx.fillText(str, x, y)

			// Check if we should play a bell
			schedule.periods.forEach((period) => {
				const ahora = {
					hours: now.getHours(),
					minutes: now.getMinutes(),
					seconds: now.getSeconds(),
				}
				const startTime = {
					hours: period.start.getHours(),
					minutes: period.start.getMinutes(),
					seconds: period.start.getSeconds(),
				}

				const endTime = {
					hours: period.end.getHours(),
					minutes: period.end.getMinutes(),
					seconds: period.end.getSeconds(),
				}

				// Play a bell sound if it's either the start or end of a mod
				if (ahora === startTime || ahora === endTime) {
					play()
				}
			})
		}
	}

	useEffect(() => {
		const canvas = canvasRef.current
		if (canvas) {
			const w = canvas.width
			const h = canvas.height
			const ctx = canvas.getContext('2d')

			if (!ctx) return // Check to make sure context isnt null

			let animationFrameId: number

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
					return [period.start, now, period.end]
				})

				getRealTimeSchedule(ctx, bells, schedule, w * 0.05, h * 0.1)

				ctx.font = '30pt Fira Code'
				ctx.textAlign = 'center'
				currentTimeClock(ctx, now, schedule, w * 0.75, h * 0.25)
				nextEndOfMod(ctx, now, schedule, w * 0.75, h * 0.5)
				timeLeftInDay(ctx, now, schedule, w * 0.75, h * 0.75)

				// Start a new Path
				ctx.strokeStyle = dracComment
				ctx.beginPath()
				ctx.moveTo(w * 0.55, 0)
				ctx.lineTo(w * 0.55, h)

				// Draw the Path
				ctx.stroke()

				animationFrameId = requestAnimationFrame(animate)
			}

			animate()
			return () => cancelAnimationFrame(animationFrameId) // Cleanup
		} else {
			console.error('Canvas is null')
			return
		}
	}, [scheduleSelection])
	return (
		<Box>
			<canvas ref={canvasRef} width={width} height={height} />
		</Box>
	)
}
