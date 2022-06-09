export const stringToDate = (value: string) => new Date(value)

export const displayDateHoursAndMinutes = (value: string) => {
	const date = stringToDate(value)
	const hours = date.getHours().toString().padStart(2, '0')
	const minutes = date.getMinutes().toString().padStart(2, '0')
	return `${hours}:${minutes}`
}

export const displayTimeSpanHoursAndMinutes = (value: string) => {
	const hours = value.substring(0,2)
	const minutes = value.substring(3,5)
	return `${hours}:${minutes}`
}