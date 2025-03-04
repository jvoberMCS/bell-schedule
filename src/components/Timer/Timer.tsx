import { ScheduleSelect } from '@/components/ScheduleSelect'
import { CountdownTimer } from '@/components/Timer/CountdownCanvas/CountdownCanvas'
import { Box, VStack } from '@chakra-ui/react'

type Props = {}
type TimerProps =
	Props extends Record<string, never>
		? React.FC<Record<string, never>>
		: React.FC<Props>

export const Timer: TimerProps = () => {
	return (
		<VStack className='Timer' color='dracFg'>
			<ScheduleSelect />
			<Box width={window.innerWidth}>
				<CountdownTimer
					width={window.innerWidth}
					height={window.innerHeight * 0.9}
				/>
			</Box>
		</VStack>
	)
}
