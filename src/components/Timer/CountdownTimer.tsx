import {
	currentTimeClock,
	getCurrentTime,
	getRealTimeSchedule,
	nextEndOfMod,
	timeLeftInDay,
} from '@/functions/GlobalFunctions'
import { useMainStore } from '@/stores/MainStore'
import { dracFg } from '@/theme/colors/colors'
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
				ctx.font = '20px Fira Code'
				// Set starting text color
				ctx.fillStyle = dracFg

				// Get the current time
				const currentTime = getCurrentTime()

				const bells = schedule.periods.map((period, mod) => {
					return [period.end, getCurrentTime().getTime(), mod]
				})

				getRealTimeSchedule(ctx, bells, w, h * 0.1)
				timeLeftInDay(ctx, schedule, w, h)
				currentTimeClock(ctx, currentTime, w, h)
				nextEndOfMod(ctx, schedule, w, h)

				animationFrameId = requestAnimationFrame(animate)
			}

			animate()
			return () => cancelAnimationFrame(animationFrameId) // Cleanup
		} else {
			console.error('Canvas is null')
			return
		}
	}, [scheduleSelection])
	return <canvas ref={canvasRef} width={width} height={height} />
}
