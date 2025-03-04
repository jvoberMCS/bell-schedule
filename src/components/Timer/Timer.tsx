import { ScheduleSelect } from '@/components/ScheduleSelect'
import { CountdownCanvas } from '@/components/Timer/CountdownCanvas/CountdownCanvas'
import { useMainStore } from '@/stores/MainStore'
import { dracGreen, dracRed } from '@/theme/colors/colors'
import { Box, HStack, VStack } from '@chakra-ui/react'
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa'

type Props = {}
type TimerProps =
	Props extends Record<string, never>
		? React.FC<Record<string, never>>
		: React.FC<Props>

export const Timer: TimerProps = () => {
	const isMuted = useMainStore((state) => state.isMuted)
	const setIsMuted = useMainStore((state) => state.setIsMuted)
	return (
		<VStack className='Timer' color='dracFg'>
			<HStack>
				<ScheduleSelect />{' '}
				<Box>
					{isMuted === true ? (
						<FaVolumeMute
							color={dracRed}
							onClick={() => {
								setIsMuted(false)
							}}
						/>
					) : (
						<FaVolumeUp
							color={dracGreen}
							onClick={() => {
								setIsMuted(true)
							}}
						/>
					)}
				</Box>
			</HStack>
			<Box width={window.innerWidth}>
				<CountdownCanvas
					width={window.innerWidth}
					height={window.innerHeight * 0.9}
				/>
			</Box>
		</VStack>
	)
}
