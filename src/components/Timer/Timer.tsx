import { ScheduleSelect } from '@/components/ScheduleSelect'
import { CountdownTimer } from '@/components/Timer/CountdownTimer'
import { Schedule } from '@/components/Timer/Schedule'
import { Box } from '@chakra-ui/react'
import React from 'react'

type Props = {}
type TimerProps =
	Props extends Record<string, never>
		? React.FC<Record<string, never>>
		: React.FC<Props>

export const Timer: TimerProps = () => {
	return (
		<Box className='Timer' color='dracFg'>
			<ScheduleSelect />
			<Schedule />
			<Box width='window.innerWidth' border='1px solid orange'>
				<CountdownTimer />
			</Box>
		</Box>
	)
}
