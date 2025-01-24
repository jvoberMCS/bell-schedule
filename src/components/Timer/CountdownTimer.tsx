import { Schedule } from '@/components/Timer/Schedule'
import { useMainStore } from '@/stores/MainStore'
import { Box } from '@chakra-ui/react'
import React from 'react'

type Props = {}
type CountdownTimerProps =
	Props extends Record<string, never>
		? React.FC<Record<string, never>>
		: React.FC<Props>

export const CountdownTimer: CountdownTimerProps = () => {
	const scheduleSelection = useMainStore((state) => state.scheduleSelection)
	return (
		<Box className='CountdownTimer'>
			<Schedule scheduleSelection={scheduleSelection} />
		</Box>
	)
}
