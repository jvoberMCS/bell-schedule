import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Clock from 'react-clock'
import './AnalogClock.css'

type Props = {}
type AnalogClockProps =
	Props extends Record<string, never>
		? React.FC<Record<string, never>>
		: React.FC<Props>

export const AnalogClock: AnalogClockProps = () => {
	const [value, setValue] = useState(new Date())

	useEffect(() => {
		const interval = setInterval(() => setValue(new Date()), 1000)

		return () => {
			clearInterval(interval)
		}
	}, [])
	return (
		<Box>
			<Clock value={value} renderNumbers={true} />
		</Box>
	)
}
