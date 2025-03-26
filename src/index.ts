/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		console.log('body', request.body);
		console.log('headers', request.headers);

		let uri = request.url.replace(/^https:\/\/.*?\//gi, '/');
		console.log('uri', uri);
		if (request.method === 'GET') {
			if (uri === '/users') {
				return Response.json({
					message: 'Response for GET request on /users',
				});
			}
			return Response.json({
				message: 'You sent a GET request',
			});
		} else {
			return Response.json({
				message: 'You did not send a GET request',
			});
		}
	},
} satisfies ExportedHandler<Env>;
