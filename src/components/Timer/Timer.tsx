import { AnalogClock } from '@/components/AnalogClock/AnalogClock'
import { ScheduleSelect } from '@/components/ScheduleSelect'
import { CountdownTimer } from '@/components/Timer/CountdownTimer'
import { Box, HStack } from '@chakra-ui/react'

type Props = {}
type TimerProps =
	Props extends Record<string, never>
		? React.FC<Record<string, never>>
		: React.FC<Props>

export const Timer: TimerProps = () => {
	return (
		<Box className='Timer' color='dracFg'>
			<ScheduleSelect />
			<HStack>
				{/*				<Schedule /> */}
				<Box width={window.innerWidth}>
					<CountdownTimer
						width={window.innerWidth}
						height={window.innerHeight}
					/>
				</Box>
			</HStack>
			<AnalogClock />
		</Box>
	)
}
