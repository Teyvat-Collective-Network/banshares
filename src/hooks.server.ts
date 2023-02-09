import { TESTING, TEST_DISCRIMINATOR, TEST_ID, TEST_USERNAME, TOKEN } from "$env/static/private";
import { PUBLIC_DIS_API, PUBLIC_TCN_API } from "$env/static/public";
import type { Handle } from "@sveltejs/kit";

import "./bot.js";

export const handle: Handle = async ({ event, resolve }) => {
    console.log(`[${event.request.method}] ${event.url.href.substring(event.url.origin.length)}`);

    if (TESTING) {
        (event.locals as any).user = {
            username: TEST_USERNAME,
            discriminator: TEST_DISCRIMINATOR,
            id: TEST_ID,
        };
    } else {
        const api_user =
            event.cookies.get("token") &&
            (await fetch(`${PUBLIC_TCN_API}/auth/user`, {
                headers: { Authorization: event.cookies.get("token")! },
            }).then((res) => res.ok && res.json()));

        if (api_user) {
            (event.locals as any).user = await fetch(`${PUBLIC_DIS_API}/users/${api_user.id}`, {
                headers: { Authorization: `Bot ${TOKEN}` },
            }).then((res) => res.ok && res.json());
        }
    }

    return await resolve(event);
};
