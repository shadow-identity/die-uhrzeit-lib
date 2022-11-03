
type GetUhrzeit = (time: Date) => string

// function to convert 24 hour time to 12 hour time
export const get12HourTime = (hours: number): number => hours % 12 || 12

export const getUhrzeitSimple: GetUhrzeit = (time) => {
	// return informal german time string based on "time" property
	// e.g. "3 nach 4" or "viertel vor 5"

	const hour = get12HourTime(time.getHours())
	const nextHour = get12HourTime(hour + 1)
	const minutes = time.getMinutes()

	const min = minutes % 15

	if (minutes === 0) {
		return `${hour} Uhr`
	} else if (minutes === 15) {
		return `viertel nach ${hour}`
	} else if (minutes === 30) {
		return `halb ${nextHour}`
	} else if (minutes === 45) {
		return `viertel vor ${get12HourTime(nextHour)}`
	} else if (minutes < 30) {
		return `${minutes} nach ${hour}`
	} else {
		return `${60 - minutes} vor ${get12HourTime(nextHour)}`
	}
}

// 	} else if (minutes <= 20) {
// return `${minutes} nach ${hour}`
// 	} else if (minutes <= 30) {
// 	return `${minutes} vor halb ${hour + 1}`
// } else if (minutes <= 40) {
// 	return `${minutes} nach halb ${hour + 1}`
