import {config} from 'dotenv';
config();
import Twit, { Twitter } from 'twit';

const conf = {};
const BOT_NAME = '@satirify'
const twit = new Twit({
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    consumer_key: process.env.CONSUMER_KEY || '',
    consumer_secret: process.env.CONSUMER_SECRET || ''
});

const satirify = (s: string): string => s.split('').reduce((a: string, l: string, i: number) => a += (i % 2) ? l.toUpperCase() : l.toLowerCase(), '');

twit
.stream('statuses/filter', {track: BOT_NAME})
.on('tweet', (tweet: Twitter.Status) => {
    console.log('tweeted');
    // console.log(tweet);
    
    twit.get('statuses/show/:id', {id: tweet.in_reply_to_status_id_str}, (err:any, data:any) => {
        console.log(data);
        if(data.text)
    
        twit.post('statuses/update', { status: satirify(data.text) + '\n\n @' + data.user.screen_name, in_reply_to_status_id: data.id_str }, (err:any, data:any) => console.log(err, data));
    })

    
});


/*


{
  created_at: 'Tue Nov 12 13:03:42 +0000 2019',
  id: 1194239344195838000,
  id_str: '1194239344195837952',
  text: '@satirify azer',
  source: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
  truncated: false,
  in_reply_to_status_id: null,
  in_reply_to_status_id_str: null,
  in_reply_to_user_id: null,
  in_reply_to_user_id_str: null,
  in_reply_to_screen_name: null,
  user: {
    id: 865309534516113400,
    id_str: '865309534516113408',
    name: 'Corentin',
    screen_name: 'cthmsst',
    location: 'Haute-Savoie, Rhône-Alpes',
    url: 'http://corentin-thomasset.fr/',
    description: "Tu ne rêves pas, c'est bien moi",
    translator_type: 'none',
    protected: false,
    verified: false,
    followers_count: 17,
    friends_count: 106,
    listed_count: 0,
    favourites_count: 174,
    statuses_count: 70,
    created_at: 'Thu May 18 20:54:04 +0000 2017',
    utc_offset: null,
    time_zone: null,
    geo_enabled: false,
    lang: null,
    contributors_enabled: false,
    is_translator: false,
    profile_background_color: '000000',
    profile_background_image_url: 'http://abs.twimg.com/images/themes/theme1/bg.png',
    profile_background_image_url_https: 'https://abs.twimg.com/images/themes/theme1/bg.png',
    profile_background_tile: false,
    profile_link_color: '81AE64',
    profile_sidebar_border_color: '000000',
    profile_sidebar_fill_color: '000000',
    profile_text_color: '000000',
    profile_use_background_image: false,
    profile_image_url: 'http://pbs.twimg.com/profile_images/885430612101869568/GFrr4web_normal.jpg',
    profile_image_url_https: 'https://pbs.twimg.com/profile_images/885430612101869568/GFrr4web_normal.jpg',
    profile_banner_url: 'https://pbs.twimg.com/profile_banners/865309534516113408/1496903788',
    default_profile: false,
    default_profile_image: false,
    following: null,
    follow_request_sent: null,
    notifications: null
  },
  geo: null,
  coordinates: null,
  place: null,
  contributors: null,
  is_quote_status: false,
  quote_count: 0,
  reply_count: 0,
  retweet_count: 0,
  favorite_count: 0,
  entities: { hashtags: [], urls: [], user_mentions: [], symbols: [] },
  favorited: false,
  retweeted: false,
  filter_level: 'low',
  lang: 'pt',
  timestamp_ms: '1573563822207'
}

*/






/*

{
  created_at: 'Tue Nov 12 13:05:16 +0000 2019',
  id: 1194239738414293000,
  id_str: '1194239738414292992',
  text: '@CodePen @metafizzyco @satirify bonjour',
  display_text_range: [ 22, 39 ],
  source: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
  truncated: false,
  in_reply_to_status_id: 1164916590271520800,
  in_reply_to_status_id_str: '1164916590271520768',
  in_reply_to_user_id: 865309534516113400,
  in_reply_to_user_id_str: '865309534516113408',
  in_reply_to_screen_name: 'cthmsst',
  user: {
    id: 865309534516113400,
    id_str: '865309534516113408',
    name: 'Corentin',
    screen_name: 'cthmsst',
    location: 'Haute-Savoie, Rhône-Alpes',
    url: 'http://corentin-thomasset.fr/',
    description: "Tu ne rêves pas, c'est bien moi",
    translator_type: 'none',
    protected: false,
    verified: false,
    followers_count: 17,
    friends_count: 106,
    listed_count: 0,
    favourites_count: 174,
    statuses_count: 70,
    created_at: 'Thu May 18 20:54:04 +0000 2017',
    utc_offset: null,
    time_zone: null,
    geo_enabled: false,
    lang: null,
    contributors_enabled: false,
    is_translator: false,
    profile_background_color: '000000',
    profile_background_image_url: 'http://abs.twimg.com/images/themes/theme1/bg.png',
    profile_background_image_url_https: 'https://abs.twimg.com/images/themes/theme1/bg.png',
    profile_background_tile: false,
    profile_link_color: '81AE64',
    profile_sidebar_border_color: '000000',
    profile_sidebar_fill_color: '000000',
    profile_text_color: '000000',
    profile_use_background_image: false,
    profile_image_url: 'http://pbs.twimg.com/profile_images/885430612101869568/GFrr4web_normal.jpg',
    profile_image_url_https: 'https://pbs.twimg.com/profile_images/885430612101869568/GFrr4web_normal.jpg',
    profile_banner_url: 'https://pbs.twimg.com/profile_banners/865309534516113408/1496903788',
    default_profile: false,
    default_profile_image: false,
    following: null,
    follow_request_sent: null,
    notifications: null
  },
  geo: null,
  coordinates: null,
  place: null,
  contributors: null,
  is_quote_status: false,
  quote_count: 0,
  reply_count: 0,
  retweet_count: 0,
  favorite_count: 0,
  entities: {
    hashtags: [],
    urls: [],
    user_mentions: [ [Object], [Object] ],
    symbols: []
  },
  favorited: false,
  retweeted: false,
  filter_level: 'low',
  lang: 'fr',
  timestamp_ms: '1573563916196'
}


*/