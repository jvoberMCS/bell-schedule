import { ScheduleSelect } from '@/components/ScheduleSelect'
import { CountdownCanvas } from '@/components/Timer/CountdownCanvas/CountdownCanvas'
import { Box, HStack, VStack, Text } from '@chakra-ui/react'

type Props = {}
type TimerProps =
    Props extends Record<string, never>
    ? React.FC<Record<string, never>>
    : React.FC<Props>

export const Timer: TimerProps = () => {
    if (window.innerWidth > window.innerHeight) {
        // LANDSCAPE MODE
        return (
            <VStack className='Timer landscape' color='dracFg'>
                <HStack>
                    <ScheduleSelect />{' '}
                    <Text color='red' fontSize='1rem'>LANDSCAPE</Text>
                </HStack>
                <Box width={window.innerWidth * 0.9} >
                    <CountdownCanvas
                        width={window.innerWidth * 0.9}
                        height={window.innerHeight * 0.9}
                    />
                </Box>
            </VStack>
        )
    } else {
        // PORTRAIT MODE
        return (
            <VStack className='Timer portrait' color='dracFg'>
                <HStack>
                    <ScheduleSelect />{' '}
                    <Text color='red' fontSize='1rem'>PORTRAIT</Text>
                </HStack>
                <Box width={window.innerWidth * 0.9}>
                    <CountdownCanvas
                        width={window.innerWidth * 0.9}
                        height={window.innerHeight * 0.9}
                    />
                </Box>
            </VStack>
        )
    }
}
