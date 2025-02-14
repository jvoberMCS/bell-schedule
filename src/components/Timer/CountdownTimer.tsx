import { useMainStore } from '@/stores/MainStore'
import { dracRed, massillonOrange } from '@/vars/GlobalVars'
import React, { useEffect, useRef } from 'react'

type Props = { width: number; height: number }
type CountdownTimerProps =
	Props extends Record<string, never>
		? React.FC<Record<string, never>>
		: React.FC<Props>

const getCurrentTime = () => {
	const now = new Date()
	return now
}

export const CountdownTimer: CountdownTimerProps = ({ width, height }) => {
	const scheduleSelection = useMainStore((state) => state.scheduleSelection)
	const schedules = useMainStore((state) => state.schedules)
	const canvasRef = useRef<HTMLCanvasElement | null>(null)

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

	const setFutureDate = (today: Date, numDaysInFuture: number) => {
		if (numDaysInFuture <= 0)
			throw new Error(
				'Number of day in the future must be greater than 0'
			)
		return new Date(today.setDate(today.getDate() + numDaysInFuture))
	}

	useEffect(() => {
		const canvas = canvasRef.current
		if (canvas) {
			const w = canvas.width
			const h = canvas.height
			const ctx = canvas.getContext('2d')

			if (!ctx) return // Check to make sure context isnt null

			let animationFrameId: number

			const getCenteredXPos = (text: string) => {
				return w * 0.5 - ctx.measureText(text).width / 2
			}

			const schedule = schedules.filter(
				(schedule) => schedule.selectionID === scheduleSelection
			)[0]

			const realTimeSchedule = (bells: number[][]) => {
				bells.forEach((bell) => {
					ctx.fillStyle = bell[0] > bell[1] ? massillonOrange : 'gray'
					ctx.fillText(
						`Mod ${bell[2] + 1}: ${new Date(bell[0]).getHours()}:${new Date(bell[0]).getMinutes()}:${new Date(bell[0]).getSeconds()}`,
						getCenteredXPos(
							`Mod ${bell[2] + 1}: ${new Date(bell[0]).getHours()}:${new Date(bell[0]).getMinutes()}:${new Date(bell[0]).getSeconds()}`
						),
						(h * parseFloat(`0.${bell[2] + 1}`)) / 2
					)
				})
				ctx.fillStyle = dracRed
			}

			const getTimeUntilEndOfDay = (currentTime: Date) => {
				// Get the difference in time
				const endOfDay = new Date()
				endOfDay.setHours(14)
				endOfDay.setMinutes(20)
				endOfDay.setSeconds(0)
				return getTimeDifference(currentTime, endOfDay)
			}

			const timeLeftInDay = (currentTime: Date) => {
				ctx.fillText(
					`${
						getTimeUntilEndOfDay(currentTime).negative === true
							? '-'
							: ''
					}${getTimeUntilEndOfDay(currentTime).hours < 10 ? '0' : ''}${getTimeUntilEndOfDay(currentTime).hours}:${getTimeUntilEndOfDay(currentTime).minutes < 10 ? '0' : ''}${getTimeUntilEndOfDay(currentTime).minutes}:${getTimeUntilEndOfDay(currentTime).seconds < 10 ? '0' : ''}${getTimeUntilEndOfDay(currentTime).seconds} until the end of the day`,
					getCenteredXPos(
						`${getTimeUntilEndOfDay(currentTime).negative === true ? '-' : ''}${getTimeUntilEndOfDay(currentTime).hours < 10 ? '0' : ''}${getTimeUntilEndOfDay(currentTime).hours}:${getTimeUntilEndOfDay(currentTime).minutes < 10 ? '0' : ''}${getTimeUntilEndOfDay(currentTime).minutes}:${getTimeUntilEndOfDay(currentTime).seconds < 10 ? '0' : ''}${getTimeUntilEndOfDay(currentTime).seconds} until the end of the day`
					),
					h * 0.8
				)
			}

			const getEndOfNextPeriod = () => {
				const pastAndPresentMods = schedule.periods.filter((period) => {
					return period.end < getCurrentTime().getTime()
				})
				console.log(schedule.periods[pastAndPresentMods.length])
				if (schedule.periods[pastAndPresentMods.length] !== undefined) {
					return schedule.periods[pastAndPresentMods.length].end
				} else {
					const tomorrow = new Date(
						new Date().setDate(new Date().getDate() + 1)
					)

					return schedule.periods[0].end
				}
			}

			const currentTimeClock = (currentTime: Date) => {
				ctx.fillText(
					currentTime.toLocaleTimeString(),
					w * 0.5 -
						ctx.measureText(currentTime.toLocaleTimeString())
							.width /
							2,
					h * 0.6
				)
			}

			const nextEndOfMod = () => {
				ctx.fillText(
					`Next end of mod: ${new Date(getEndOfNextPeriod()).toLocaleString()}`,
					getCenteredXPos(
						`Next end of mod: ${new Date(getEndOfNextPeriod()).toLocaleString()}`
					),
					h * 0.5
				)
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

				realTimeSchedule(bells)
				timeLeftInDay(currentTime)
				currentTimeClock(currentTime)
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
