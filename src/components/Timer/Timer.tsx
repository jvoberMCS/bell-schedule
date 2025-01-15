import { Box, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {}
type TimerProps = Props extends Record<string, never> ? React.FC<Record<string, never>> : React.FC<Props>

export const Timer: TimerProps = () => {
	return (
		<Box className='Timer'>
			<Text>Timer Component</Text>
		</Box>
	)
}
