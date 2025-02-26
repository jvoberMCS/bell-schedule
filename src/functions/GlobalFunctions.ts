export const msToSeconds = (ms: number) => {
	return ms / 1000
}

export const secondsToMinutes = (seconds: number) => {
	return seconds / 60
}

export const minutesToHours = (minutes: number) => {
	return minutes / 60
}

export const hoursToDays = (hours: number) => {
	return hours / 24
}

export const msToMinutes = (ms: number) => {
	return secondsToMinutes(msToSeconds(ms))
}

export const msToHours = (ms: number) => {
	return minutesToHours(msToMinutes(ms))
}

export const msToDays = (ms: number) => {
	return hoursToDays(msToHours(ms))
}

export const hoursToMinutes = (hours: number) => {
	return hours * 60
}

export const minutesToSeconds = (minutes: number) => {
	return minutes * 60
}

export const secondsToMilliseconds = (seconds: number) => {
	return seconds * 1000
}

export const daysToHours = (days: number) => {
	return days * 24
}

export const daysToMinutes = (days: number) => {
	return hoursToMinutes(daysToHours(days))
}
