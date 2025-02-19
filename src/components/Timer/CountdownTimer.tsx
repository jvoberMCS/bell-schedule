import {
	currentTimeClock,
	getCenteredXPos,
	getCurrentTime,
	getEndOfNextPeriod,
	getRealTimeSchedule,
	getTimeLeftInDay,
} from '@/functions/GlobalFunctions'
import { useMainStore } from '@/stores/MainStore'
import { massillonOrange } from '@/vars/GlobalVars'
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

			const nextEndOfMod = () => {
				const str = `Next end of mod: ${new Date(getEndOfNextPeriod(schedule)).toLocaleString()}`
				ctx.fillText(str, getCenteredXPos(ctx, w, str), h * 0.5)
			}

			const timeLeftInDay = () => {
				const tl = getTimeLeftInDay(schedule)
				const str = `${
					tl.negative === true ? '-' : ''
				}${tl.hours < 10 ? '0' : ''}${tl.hours}:${tl.minutes < 10 ? '0' : ''}${tl.minutes}:${tl.seconds < 10 ? '0' : ''}${tl.seconds} until the end of the day`
				ctx.fillText(str, getCenteredXPos(ctx, w, str), h * 0.8)
			}
			const animate = () => {
				ctx.clearRect(0, 0, width, height) // Clear the canvas
				ctx.font = '20px Fira Code'
				ctx.fillStyle = massillonOrange

				// Get the current time
				const currentTime = getCurrentTime()

				const bells = schedule.periods.map((period, mod) => {
					return [period.end, getCurrentTime().getTime(), mod]
				})

				getRealTimeSchedule(ctx, bells, w, h)
				timeLeftInDay()
				currentTimeClock(ctx, currentTime, w, h)
				nextEndOfMod()

				animationFrameId = requestAnimationFrame(animate)
			}

			animate()
			return () => cancelAnimationFrame(animationFrameId) // Cleanup
		} else {
			console.error('Canvas is null')
			return
		}
	}, [])
	return <canvas ref={canvasRef} width={width} height={height} />
}
