import Twit, { Twitter } from 'twit';
import {createServer} from 'http';

const BOT_NAME = process.env.BOT_NAME || '@satirify';
const twit = new Twit({
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    consumer_key: process.env.CONSUMER_KEY!,
    consumer_secret: process.env.CONSUMER_SECRET!
});

const satirify = (s: string): string => s.split('').reduce((a: string, l: string, i: number) => a += (i % 2) ? l.toUpperCase() : l.toLowerCase(), '');

twit.stream('statuses/filter', {track: BOT_NAME})
    .on('connect', () => console.log(`Connected, listenning to ${BOT_NAME}.`))
    .on('disconnect', () => console.log(`Disconnected.`))
    .on('tweet', async (mention: Twitter.Status) => {
        try{
            if(mention.in_reply_to_status_id_str){
                const original:Twitter.Status = <Twitter.Status>(await twit.get('statuses/show/:id', {id: mention.in_reply_to_status_id_str})).data;
    
                if (original.text){
                    const response = `${satirify(original.text)}\n@${mention.user.screen_name} @${original.user.screen_name}`;
                    console.log(response);
                    
                    await twit.post('statuses/update', { status: response, in_reply_to_status_id: original.id_str });
                }
            }
        }catch(e){
            console.error(e);
        }     
    });

// To check if server is alive
createServer((req, res) => res.writeHead(200, {'Content-Type': 'text/plain'}).end('ok')).listen(process.env.PORT || 3000);