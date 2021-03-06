import Twit, { Twitter } from 'twit';

const BOT_NAME = process.env.BOT_NAME || '@satirify';

const twit = new Twit({
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    consumer_key: process.env.CONSUMER_KEY!,
    consumer_secret: process.env.CONSUMER_SECRET!
});

const satirify = (s: string): string => s.split('').reduce((a: string, l: string, i: number) => a += (i % 2) ? l.toUpperCase() : l.toLowerCase(), '');

// Handle new mention
twit
    .stream('statuses/filter', { track: BOT_NAME })
    .on('connect', () => console.log(`Connected, listenning to ${BOT_NAME}.`))
    .on('disconnect', () => console.log(`Disconnected.`))
    .on('tweet', async (mention: Twitter.Status) => {
        try {
            if (mention.in_reply_to_status_id_str && mention.in_reply_to_status_id_str !== '') {
                const original: Twitter.Status = <Twitter.Status>(await twit.get('statuses/show/:id', { id: mention.in_reply_to_status_id_str })).data;

                if (original.text) {
                    const response = `${satirify(original.text)}\n@${mention.user.screen_name} @${original.user.screen_name}`;

                    await twit.post('statuses/update', { status: response, in_reply_to_status_id: original.id_str });
                }
            }
        } catch (e) {
            console.error(e);
        }
    });
