export function getMessageTemplate(data: MessageTemplate) {
	return (
		'<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">' +
		'<div style="background-color: #2d3748; padding: 20px; text-align: center; border-radius: 4px 4px 0 0;">' +
		'<h1 style="color: #ffffff; margin: 0; font-size: 24px;">Nova sprava!</h1>' +
		'</div>' +
		'<div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 4px 4px;">' +
		'<div style="margin-bottom: 20px;">' +
		'<strong style="color: #2d3748;">From:</strong>' +
		`<span style="color: #4a5568;">${data.fullName}</span>` +
		'</div>' +
		'<div style="margin-bottom: 20px;">' +
		'<strong style="color: #2d3748;">Email:</strong>' +
		`<span style="color: #4a5568;">${data.email}</span>` +
		'</div>' +
		'<div style="background-color: #ffffff; padding: 20px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">' +
		'<strong style="color: #2d3748; display: block; margin-bottom: 10px;">Message:</strong>' +
		'<div style="color: #4a5568; line-height: 1.6;">' +
		`${data.message}` +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>'
	);
}

export function getErrorTemplate({ error }: { error: any }) {
	return `<pre>${JSON.stringify(error)}</pre>`;
}
