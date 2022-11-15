import { get12HourTime, getUhrzeitSimple, numberToGerman } from './die-uhrzeit'

describe('getUhrzeitSimple', () => {
	test.each([
		[new Date(2020, 0, 1, 0, 0), 'zwölf Uhr'],
		[new Date(2020, 0, 1, 0, 1), 'eins nach zwölf'],
		[new Date(2020, 0, 1, 0, 15), 'viertel nach zwölf'],
		[new Date(2020, 0, 1, 0, 18), 'achtzehn nach zwölf'],
		[new Date(2020, 0, 1, 0, 30), 'halb eins'],
		[new Date(2020, 0, 1, 0, 35), 'fünfundzwanzig vor eins'],
		[new Date(2020, 0, 1, 0, 45), 'viertel vor eins'],
		[new Date(2020, 0, 1, 0, 59), 'eins vor eins'],
	])('converts %p', (time, expected) => expect(getUhrzeitSimple(time)).toEqual(expected))
})

describe('get12HourTime', () => {
	test.each([
		[0, 12],
		[1, 1],
		[12, 12],
		[13, 1],
		[23, 11],
		[24, 12],
		[25, 1],
	])('converts %i H', (raw, expected) => { expect(get12HourTime(raw)).toEqual(expected) })
})

describe('numberToGerman', () => {
	test.each([
		[1, 'eins'],
		[9, 'neun'],
		[10, 'zehn'],
		[11, 'elf'],
		[20, 'zwanzig'],
		[21, 'einundzwanzig'],
		[22, 'zweiundzwanzig'],
		[29, 'neunundzwanzig'],
		[30, 'dreißig'],
	])('converts %i', (raw, expected) => { expect(numberToGerman(raw)).toEqual(expected) })

	it('should return string with the same number and add a console error for 100', () => {
		const spy = jest.spyOn(console, 'error')
		expect(numberToGerman(100)).toEqual('100')
		expect(spy).toHaveBeenCalledWith('Number must be less than 100')
	})
})
