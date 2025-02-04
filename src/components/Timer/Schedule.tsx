import { useMainStore } from '@/stores/MainStore'
import { Box } from '@chakra-ui/react'
import React from 'react'

type Props = {}
type ScheduleProps =
	Props extends Record<string, never>
		? React.FC<Record<string, never>>
		: React.FC<Props>

export const Schedule: ScheduleProps = () => {
	const schedules = useMainStore((state) => state.schedules)
	const scheduleSelection = useMainStore((state) => state.scheduleSelection)

	const msToTime = (ms: number) => {
		return new Date(ms)
	}
	return (
		<Box className='Schedule'>
			{schedules.map((schedule) => {
				return schedule.selectionID === scheduleSelection ? (
					<Box>
						{schedule.periods.map((period) => {
							return (
								<Box>
									{'Mod '} {period.name} {' ==> '}{' '}
									{msToTime(period.start).toLocaleTimeString(
										[],
										{ hour: '2-digit', minute: '2-digit' }
									)}{' '}
									-{' '}
									{msToTime(period.end).toLocaleTimeString(
										[],
										{ hour: '2-digit', minute: '2-digit' }
									)}
								</Box>
							)
						})}
					</Box>
				) : null
			})}
		</Box>
	)
}
