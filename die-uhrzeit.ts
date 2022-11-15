
type GetUhrzeit = (time: Date) => string

// function to convert 24 hour time to 12 hour time
export const get12HourTime = (hours: number): number => hours % 12 || 12

export const getUhrzeitSimple: GetUhrzeit = (time) => {
	// return informal german time string based on 'time' property
	// e.g. '3 nach 4' or 'viertel vor 5'

	const hour = get12HourTime(time.getHours())
	const nextHour = get12HourTime(hour + 1)
	const minutes = time.getMinutes()

	const hourStr = numberToGerman(hour)
	const nextHourStr = numberToGerman(nextHour)
	const minutesStr = numberToGerman(minutes)

	const min = minutes % 15

	if (minutes === 0) {
		return `${hourStr} Uhr`
	} else if (minutes === 15) {
		return `viertel nach ${hourStr}`
	} else if (minutes === 30) {
		return `halb ${nextHourStr}`
	} else if (minutes === 45) {
		return `viertel vor ${nextHourStr}`
	} else if (minutes < 30) {
		return `${minutesStr} nach ${hourStr}`
	} else {
		return `${numberToGerman(60 - minutes)} vor ${nextHourStr}`
	}
}

export const getUhrzeitMedium: GetUhrzeit = (time) => { return 'WIP' }


/*
convert numbers from 1 to 59 to german string
e.g. 1 => 'eins'
e.g. 15 => 'fünfzehn'
e.g. 59 => 'neunundfünfzig'
*/
export const numberToGerman = (number: number): string => {
	if (number >= 100) {
		console.error('Number must be less than 100')
		return number.toString()
	}

	const ones = ['eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun']
	const teens = ['zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn']
	const tens = ['zehn', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig']

	if (number < 10) {
		return ones[number - 1]
	} else if (number < 20) {
		return teens[number - 10]
	} else if (number % 10 === 0) {
		return tens[Math.floor(number / 10) - 1]
	} else if (number.toString().slice(-1) === '1') {
		return `einund${tens[Math.floor(number / 10) - 1]}`
	} else {
		return `${ones[number % 10 - 1]}und${tens[Math.floor(number / 10) - 1]}`
	}
}
