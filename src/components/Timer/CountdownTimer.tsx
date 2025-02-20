import {
	currentTimeClock,
	getRealTimeSchedule,
	nextEndOfMod,
	timeLeftInDay,
} from '@/functions/GlobalFunctions'
import { useMainStore } from '@/stores/MainStore'
import { dracFg } from '@/theme/colors/colors'
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
				ctx.font = '20pt Fira Code'
				// Set starting text color
				ctx.fillStyle = dracFg

				// Get the current time
				const now = new Date()

				const bells = schedule.periods.map((period, mod) => {
					return [period.end, now.getTime(), mod]
				})

				getRealTimeSchedule(ctx, bells, schedule, w / 4, h * 0.1)

				currentTimeClock(ctx, now, w * (2 / 3), h * 0.15)
				nextEndOfMod(ctx, now, schedule, w * (2 / 3), h * 0.35)
				timeLeftInDay(ctx, now, schedule, w * (2 / 3), h * 0.55)

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
