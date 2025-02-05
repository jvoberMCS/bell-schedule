import { useMainStore } from '@/stores/MainStore'
import { massillonOrange } from '@/theme/colors/colors'
import React, { useEffect, useRef } from 'react'

type Props = {}
type CountdownTimerProps =
	Props extends Record<string, never>
		? React.FC<Record<string, never>>
		: React.FC<Props>

const getCurrentTime = () => {
	const now = new Date()
	return now
}

export const CountdownTimer: CountdownTimerProps = () => {
	const scheduleSelection = useMainStore((state) => state.scheduleSelection)
	const schedules = useMainStore((state) => state.schedules)
	const canvasRef = useRef<HTMLCanvasElement | null>(null)

	const width = window.innerWidth
	const height = window.innerHeight / 2

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
		}
	}

	const getNextBell = (schedule: Schedule) => {
		const currentTime = getCurrentTime()
		let nextBell = getTimeDifference(currentTime, currentTime)
		let found = 0
		// Find the period with first non-negative time difference, since this will be the next period
		schedule.periods.forEach((period) => {
			if (
				getTimeDifference(currentTime, new Date(period.end))
					.negative === false &&
				found === 0
			) {
				nextBell = getTimeDifference(currentTime, new Date(period.end))
				found = 1
			}
		})

		return nextBell
	}

	useEffect(() => {
		const canvas = canvasRef.current
		if (canvas) {
			const ctx = canvas.getContext('2d')

			if (!ctx) return // Check to make sure context isnt null

			let animationFrameId: number

			const animate = () => {
				ctx.clearRect(0, 0, width, height) // Clear the canvas

				// Get the current time
				const currentTime = getCurrentTime()
				ctx.font = '20px Fira Code'
				ctx.fillStyle = massillonOrange
				ctx.fillText(
					currentTime.toLocaleTimeString(),
					width * 0.5,
					height * 0.5
				)

				// Get the difference in time
				const endOfDay = new Date()
				endOfDay.setHours(14)
				endOfDay.setMinutes(20)
				endOfDay.setSeconds(0)
				const timeUntilEndOfDay = getTimeDifference(
					currentTime,
					endOfDay
				)
				ctx.fillText(
					`${timeUntilEndOfDay.negative === true ? '-' : ''}${timeUntilEndOfDay.hours < 10 ? '0' : ''}${timeUntilEndOfDay.hours}:${timeUntilEndOfDay.minutes < 10 ? '0' : ''}${timeUntilEndOfDay.minutes}:${timeUntilEndOfDay.seconds < 10 ? '0' : ''}${timeUntilEndOfDay.seconds} until the end of the day`,
					width * 0.5,
					height * 0.6
				)
				const nextBell = getNextBell(
					schedules.filter(
						(schedule) => schedule.selectionID === scheduleSelection
					)[0]
				)
				ctx.fillText(
					`Next Bell: ${nextBell.hours} hours : ${nextBell.minutes} minutes : ${nextBell.seconds} seconds`,
					width * 0.5,
					height * 0.7
				)

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
