import germanSchoolBellSound from '@/assets/germanSchoolBell.mp3'
import { useMainStore } from '@/stores/MainStore'
import {
	Box,
	Button,
	NativeSelectField,
	NativeSelectRoot,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import useSound from 'use-sound'
import { v4 as uuid } from 'uuid'

type Props = {}
type ScheduleSelectProps =
	Props extends Record<string, never>
		? React.FC<Record<string, never>>
		: React.FC<Props>

export const ScheduleSelect: ScheduleSelectProps = () => {
	const [playBellSound] = useSound(germanSchoolBellSound)
	const schedules = useMainStore((state) => state.schedules)
	const setScheduleSelection = useMainStore(
		(state) => state.setScheduleSelection
	)
	const scheduleSelection = useMainStore((state) => state.scheduleSelection)
	const [value, setValue] = useState(
		schedules.filter((schedule) => {
			return schedule.selectionID === scheduleSelection
		})[0].name
	)

	return (
		<Box className='ScheduleSelect' color='dracFg'>
			<NativeSelectRoot>
				<NativeSelectField
					onChange={(e) => {
						setScheduleSelection(
							e.currentTarget.value as ScheduleSelection
						)
						setValue(e.currentTarget.value as ScheduleSelection)
					}}
					value={value}
				>
					{schedules.map((schedule) => {
						return (
							<option value={schedule.selectionID} key={uuid()}>
								{schedule.name}
							</option>
						)
					})}
				</NativeSelectField>
			</NativeSelectRoot>
			<Button
				w='5vw'
				h='5vh'
				onClick={() => {
					playBellSound()
				}}
			>
				Play Bell
			</Button>
		</Box>
	)
}
