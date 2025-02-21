import {
	currentTimeClock,
	getRealTimeSchedule,
	nextEndOfMod,
	timeLeftInDay,
} from '@/functions/GlobalFunctions'
import { useMainStore } from '@/stores/MainStore'
import { dracComment, dracFg } from '@/theme/colors/colors'
import { Box } from '@chakra-ui/react/box'
import React, { useEffect, useRef } from 'react'

type Props = { width: number; height: number }
type CountdownTimerProps =
	Props extends Record<string, never>
		? React.FC<Record<string, never>>
		: React.FC<Props>

export const CountdownTimer: CountdownTimerProps = ({ width, height }) => {
	const scheduleSelection = useMainStore((state) => state.scheduleSelection)
	const schedules = useMainStore((state) => state.schedules)
	const canvasRef = useRef<HTMLCanvasElement | null>(null)

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
				ctx.moveTo(w * 0.5, 0)
				ctx.lineTo(w * 0.5, h)

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
