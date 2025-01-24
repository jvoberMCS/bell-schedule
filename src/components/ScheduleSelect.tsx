import { useMainStore } from '@/stores/MainStore'
import { Box, NativeSelectField, NativeSelectRoot } from '@chakra-ui/react'
import React from 'react'

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

	const getScheduleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
		switch (e.currentTarget.value) {
			case 'Normal Schedule':
				return 'NORMAL'
			case 'Rally Schedule':
				return 'RALLY'
			default:
				return 'NORMAL'
		}
	}

	return (
		<Box className='ScheduleSelect' color='dracFg'>
			<NativeSelectRoot>
				<NativeSelectField
					onChange={(e) =>
						setScheduleSelection(getScheduleSelection(e))
					}
				>
					{schedules.map((schedule) => {
						return (
							<option value={schedule.name}>
								{schedule.name}
							</option>
						)
					})}
				</NativeSelectField>
			</NativeSelectRoot>
		</Box>
	)
}
