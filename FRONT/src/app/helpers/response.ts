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