import { Resend } from 'resend';
import { getErrorTemplate, getMessageTemplate } from './emailTemplates';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const allowedOrigins: string[] = [env.API_HOST];
		const origin = request.headers.get('Origin');

		const headers = new Headers();
		if (env.NODE_ENV === 'production' && origin && allowedOrigins.includes(origin)) {
			headers.set('Access-Control-Allow-Origin', origin);
			headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
			headers.set('Access-Control-Allow-Headers', 'Content-Type');
		} else if (env.NODE_ENV === 'development') {
			headers.set('Access-Control-Allow-Origin', '*');
			headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
			headers.set('Access-Control-Allow-Headers', 'Content-Type');
		} else {
			return new Response(null, { status: 403 });
		}

		if (request.method !== 'POST') {
			return new Response('Method Not Allowed', { status: 405 });
		}

		if ((!origin || !allowedOrigins.includes(origin)) && env.NODE_ENV === 'production') {
			console.warn(`Attempted POST request from disallowed or missing origin: ${origin}`);
			return new Response('Forbidden: Access Denied', { status: 403 });
		}

		let formData;

		try {
			formData = await request.formData();
		} catch (error) {
			return new Response('No data sent.', { status: 400 });
		}

		const fullName = formData?.get('fullName') as string;
		const email = formData?.get('email') as string;
		const message = formData?.get('message') as string;
		const deltaSeconds = Number(formData?.get('deltaSeconds'));

		if (!fullName || !email || !message || !deltaSeconds) {
			return new Response('Missing required fields.', { status: 400 });
		}

		if (deltaSeconds < 5) {
			return new Response('Please wait a bit longer before sending your request.', { status: 400 });
		}

		let resend = null;

		try {
			resend = new Resend(env?.NODE_ENV === 'development' ? env?.RESEND_API_DEV_KEY : env.RESEND_API_KEY);

			const { data, error } = await resend.emails.send({
				from: env.EMAIL_SENDER,
				to: [env.EMAIL_RECIPIENT],
				subject: `${env.EMAIL_SUBJECT} - ${fullName}`,
				html: getMessageTemplate({ fullName, email, message }),
			});

			if (error) {
				await resend.emails.send({
					from: env.ERROR_EMAIL_SENDER,
					to: env.ERROR_EMAIL_RECIPIENT,
					subject: `${env.ERROR_EMAIL_SUBJECT} - ${fullName}`,
					html: getErrorTemplate({ error }),
				});

				return Response.json(error.message, {
					status: 400,
				});
			}

			return Response.json(data, {
				status: 200,
				headers: headers,
			});
		} catch (error) {
			if (resend) {
				await resend.emails.send({
					from: env.ERROR_EMAIL_SENDER,
					to: env.ERROR_EMAIL_RECIPIENT,
					subject: `${env.ERROR_EMAIL_SUBJECT} - ${fullName}`,
					html: `<pre>${error}</pre>`,
				});

				return new Response(JSON.stringify({ message: (error as Error).message }), { status: 400 });
			}
		}

		return new Response('Error occurred.', { status: 400 });
	},
} satisfies ExportedHandler<Env>;
