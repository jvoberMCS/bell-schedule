import { useMainStore } from '@/stores/MainStore'
import { Box, NativeSelectField, NativeSelectRoot } from '@chakra-ui/react'
import React from 'react'
import { v4 as uuid } from 'uuid'

type Props = {}
type ScheduleSelectProps =
	Props extends Record<string, never>
		? React.FC<Record<string, never>>
		: React.FC<Props>

export const ScheduleSelect: ScheduleSelectProps = () => {
	const schedules = useMainStore((state) => state.schedules)
	const setScheduleSelection = useMainStore(
		(state) => state.setScheduleSelection
	)

	return (
		<Box className='ScheduleSelect' color='dracFg'>
			<NativeSelectRoot>
				<NativeSelectField
					onChange={(e) =>
						setScheduleSelection(
							e.currentTarget.value as ScheduleSelection
						)
					}
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
		</Box>
	)
}
