import { get12HourTime, getUhrzeitSimple } from "./die-uhrzeit"

// jest test cases
describe("getUhrzeitSimple", () => {
	test.each([
		[new Date(2020, 0, 1, 0, 0), "12 Uhr"],
		[new Date(2020, 0, 1, 0, 1), "1 nach 12"],
		[new Date(2020, 0, 1, 0, 15), "viertel nach 12"],
		[new Date(2020, 0, 1, 0, 30), "halb 1"],
		[new Date(2020, 0, 1, 0, 45), "viertel vor 1"],
		[new Date(2020, 0, 1, 0, 59), "1 vor 1"],
	])('converts %p', (time, expected) => expect(getUhrzeitSimple(time)).toEqual(expected))
})

describe("get12HourTime", () => {
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
