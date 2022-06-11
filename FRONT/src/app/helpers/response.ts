import saveAs from "file-saver"

export const saveFileFromResponse = (response: any) => {
	const filename = response.headers['content-disposition']
		.split(';')
		.find((n: any) => n.includes('filename='))
		.replace('filename=', '')
		.trim()

	const url = window.URL.createObjectURL(
		new Blob([response.data], { type: 'application/octet-stream' })
	)
	saveAs(url, filename)
}


export const extractErrorMessage = (err: any) => {
	const data = err?.response?.data
	if(data && data.status && data.title)
		return `${data.status} - ${data.title} ${typeof data === 'string' ? data : ''}`
	
	const response = err?.response
	if(response && response.statusText)
		return `${response.status} - ${response.statusText} ${typeof response.data === 'string' ? response.data : ''}`

	if(response && typeof response.data === 'string')
		return `${response.status} - ${response.data}`

	return String(err)
}