import { ScheduleSelect } from '@/components/ScheduleSelect'
import { CountdownTimer } from '@/components/Timer/CountdownTimer'
import { Box } from '@chakra-ui/react'

type Props = {}
type TimerProps =
	Props extends Record<string, never>
		? React.FC<Record<string, never>>
		: React.FC<Props>

export const Timer: TimerProps = () => {
	return (
		<Box className='Timer' color='dracFg'>
			<Box h={window.innerHeight * 0.1}>
				<ScheduleSelect />
			</Box>
			<Box width={window.innerWidth}>
				<CountdownTimer
					width={window.innerWidth}
					height={window.innerHeight * 0.9}
				/>
			</Box>
		</Box>
	)
}
