import {
	DrawCurrentTime,
	DrawDividerLine,
	DrawNextEndOfMod,
	DrawSchedule,
	DrawTimeLeftInDay,
} from '@/components/Timer/CountdownCanvas/DrawFunctions'
import {
	IsAfterSchool,
	IsBeforeSchool,
	IsClassChange,
} from '@/components/Timer/CountdownCanvas/TimeFunctions'
import { useMainStore } from '@/stores/MainStore'
import { dracBg, dracBg2, dracFg, Gray } from '@/theme/colors/colors'
import { HStack } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react/box'
import React, { useEffect, useRef } from 'react'
import * as Tone from 'tone'

type Props = { width: number; height: number }
type CountdownCanvasProps =
	Props extends Record<string, never>
		? React.FC<Record<string, never>>
		: React.FC<Props>

export const CountdownCanvas: CountdownCanvasProps = ({ width, height }) => {
	const scheduleSelection = useMainStore((state) => state.scheduleSelection)
	const schedules = useMainStore((state) => state.schedules)
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const isMuted = useMainStore((state) => state.isMuted)
	// Tone.js
	const synth = new Tone.Synth().toDestination()

	const playClassChangeTone = (synth: Tone.Synth<Tone.SynthOptions>) => {
		if (isMuted === false) {
			const now = Tone.now()
			synth.triggerAttackRelease('440', 2.25, now) // Frequency in Hz , time to play in seconds, when to play the tone (can schedule for in the future, such as:)
			/*
		synth.triggerAttackRelease('440', 2.25, now + 1)
		*/
		}
	}

	const playWarningTone = (synth: Tone.Synth<Tone.SynthOptions>) => {
		if (isMuted === false) {
			const now = Tone.now()
			// Frequency in Hz , time to play in seconds, when to play the tone (can schedule for in the future, such as:)
			/*
			synth.triggerAttackRelease('440', 2.25, now + 1)
			*/
			synth.triggerAttackRelease('640', 0.25, now)
			synth.triggerAttackRelease('540', 0.25, now + 0.25)
			synth.triggerAttackRelease('640', 0.25, now + 0.5)
			synth.triggerAttackRelease('540', 0.25, now + 1)
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

			// Get the current time
			const now = new Date()

			// Set background color
			ctx.fillStyle =
				IsBeforeSchool(now, schedule) === true
					? dracBg2
					: IsAfterSchool(now, schedule) === true
						? dracBg2
						: IsClassChange(now, schedule) === true
							? dracBg
							: dracBg

			ctx.fillRect(0, 0, w, h)

			// Set text color
			ctx.fillStyle =
				IsBeforeSchool(now, schedule) === true
					? dracBg
					: IsAfterSchool(now, schedule) === true
						? dracBg
						: IsClassChange(now, schedule) === true
							? dracBg
							: dracFg

			const bells = schedule.periods.map((period: Period) => {
				return {
					start: period.start,
					now: now,
					end: period.end,
					name: period.name,
				} as Bell
			})

			//drawSchedule(ctx, bells, now, schedule, w, h)
			DrawSchedule(ctx, canvas, bells, now, schedule, w * 0.015)

			DrawCurrentTime(ctx, now, schedule, w * 0.775, h * 0.25)
			DrawNextEndOfMod(ctx, now, schedule, w * 0.775, h * 0.5)
			DrawTimeLeftInDay(ctx, now, schedule, w * 0.775, h * 0.75)

			DrawDividerLine(ctx, w * 0.55, h, Gray[700])

			// Draw the Path
			ctx.stroke()
		}

		const intervalId = setInterval(animate, 1000) // Update the canvas every x milliseconds

		return () => clearInterval(intervalId) // Cleanup
	}, [scheduleSelection])

	return (
		<Box>
			<canvas ref={canvasRef} width={width} height={height} />
			<HStack>
				{/* <Button
					onClick={() => {
						playClassChangeTone(synth)
					}}
				>
					Play Class Change Tone
				</Button>
				<Button onClick={() => playWarningTone(synth)}>
					Play Warning Tone
				</Button> */}
			</HStack>
		</Box>
	)
}
