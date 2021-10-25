/** @format */

export const getDateObjToInput = (givenDate) => {
	const year = givenDate.getFullYear()
	let month = givenDate.getMonth() + 1
	if (month < 10) {
		month = `0${month}`
	}
	let date = givenDate.getDate()
	if (date < 10) {
		date = `0${date}`
	}
	return `${year}-${month}-${date}`
}

export const getDateFromString = (str) => {
	const dateArray = (str + "").split(/\D/)
	return new Date(dateArray[0], --dateArray[1], dateArray[2])
}
