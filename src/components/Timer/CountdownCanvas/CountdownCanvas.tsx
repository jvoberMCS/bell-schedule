import germanSchoolBellSound from '@/assets/germanSchoolBell.mp3'
import {
	DrawCurrentTime,
	DrawDividerLine,
	DrawNextEndOfMod,
	DrawSchedule,
	DrawTimeLeftInDay,
} from '@/components/Timer/CountdownCanvas/DrawFunctions'
import {
	GetCurrentPeriod,
	GetNextPeriod,
	GetPreviousPeriod,
	isAfterSchool,
	isBeforeSchool,
	IsClassChange,
	MakeTimeCurrentDay,
} from '@/components/Timer/CountdownCanvas/TimeFunctions'
import { useMainStore } from '@/stores/MainStore'
import { dracBg, dracBg2, dracFg } from '@/theme/colors/colors'
import { HStack } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
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
	const audioContextRef = useRef<AudioContext | null>(null)
	const oscillatorRef = useRef<OscillatorNode | null>(null)

	const playTone = () => {
		oscillatorRef.current?.start()
	}

	const stopTone = () => {
		oscillatorRef.current?.stop()
		// Create a new oscillator node to allow for subsequent plays
		if (audioContextRef.current) {
			oscillatorRef.current = audioContextRef.current.createOscillator()
			oscillatorRef.current.type = 'sine'
			oscillatorRef.current.frequency.setValueAtTime(
				440,
				audioContextRef.current.currentTime
			)
			oscillatorRef.current.connect(audioContextRef.current.destination)
		}
	}

	const playShortTone = () => {
		playTone()
		setTimeout(stopTone, 2250)
	}

	const checkPlayTone = (now: Date, schedule: Schedule) => {
		// Check if we should play a tone
		const previousPeriodStart = MakeTimeCurrentDay(
			GetPreviousPeriod(now, schedule).start.time
		)
		const previousPeriodEnd = MakeTimeCurrentDay(
			GetPreviousPeriod(now, schedule).end.time
		)
		const currentPeriodStart = MakeTimeCurrentDay(
			GetCurrentPeriod(now, schedule).start.time
		)
		const currentPeriodEnd = MakeTimeCurrentDay(
			GetCurrentPeriod(now, schedule).end.time
		)
		const nextPeriodStart = MakeTimeCurrentDay(
			GetNextPeriod(now, schedule).start.time
		)
		const nextPeriodEnd = MakeTimeCurrentDay(
			GetNextPeriod(now, schedule).end.time
		)

		if (
			now === previousPeriodStart ||
			now === previousPeriodEnd ||
			now === currentPeriodStart ||
			now === currentPeriodEnd ||
			now === nextPeriodStart ||
			now === nextPeriodEnd
		) {
			playShortTone()
		}
	}

	const checkPlayBell = (now: Date, schedule: Schedule) => {
		// Check if we should play a bell
		const previousPeriodStart = MakeTimeCurrentDay(
			GetPreviousPeriod(now, schedule).start.time
		)
		const previousPeriodEnd = MakeTimeCurrentDay(
			GetPreviousPeriod(now, schedule).end.time
		)
		const currentPeriodStart = MakeTimeCurrentDay(
			GetCurrentPeriod(now, schedule).start.time
		)
		const currentPeriodEnd = MakeTimeCurrentDay(
			GetCurrentPeriod(now, schedule).end.time
		)
		const nextPeriodStart = MakeTimeCurrentDay(
			GetNextPeriod(now, schedule).start.time
		)
		const nextPeriodEnd = MakeTimeCurrentDay(
			GetNextPeriod(now, schedule).end.time
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

		audioContextRef.current = new window.AudioContext()
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
						: IsClassChange(now, schedule) === true
							? dracBg
							: dracBg

			ctx.fillRect(0, 0, w, h)

			// Set text color
			ctx.fillStyle =
				isBeforeSchool(now, schedule) === true
					? dracBg
					: isAfterSchool(now, schedule) === true
						? dracBg
						: IsClassChange(now, schedule) === true
							? dracBg
							: dracFg

			const bells = schedule.periods.map((period) => {
				return [period.start.time, now, period.end.time]
			})

			//drawSchedule(ctx, bells, now, schedule, w, h)
			DrawSchedule(ctx, canvas, bells, now, schedule, w * 0.015)

			DrawCurrentTime(ctx, now, schedule, w * 0.775, h * 0.25)
			DrawNextEndOfMod(ctx, now, schedule, w * 0.775, h * 0.5)
			DrawTimeLeftInDay(ctx, now, schedule, w * 0.775, h * 0.75)

			DrawDividerLine(ctx, w * 0.55, h)

			// Draw the Path
			ctx.stroke()

			checkPlayBell(now, schedule)
			checkPlayTone(now, schedule)
		}

		const intervalId = setInterval(animate, 1) // Update the canvas every x milliseconds

		return () => clearInterval(intervalId) // Cleanup
	}, [scheduleSelection])

	return (
		<Box>
			<canvas ref={canvasRef} width={width} height={height} />
			<HStack>
				<Button
					onClick={() => {
						playBellSound()
					}}
				>
					Play Bell
				</Button>
				<Button
					onClick={() => {
						playTone()
					}}
				>
					Play Tone
				</Button>
				<Button
					onClick={() => {
						stopTone()
					}}
				>
					Stop Tone
				</Button>
				<Button
					onClick={() => {
						playShortTone()
					}}
				>
					Play Short Tone
				</Button>
			</HStack>
		</Box>
	)
}
