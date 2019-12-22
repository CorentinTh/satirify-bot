# Satirify

Satirify is a twitter bot that you can use to mock tweets in the spongebob meme fashion. 

## Test it now

To mock a tweet, simply respond to it mentionning [`@satirify`](https://twitter.com/satirify). It will automatically respond to the tweet by mocking it.

## Make your own
### With docker

```shell
docker build https://github.com/CorentinTh/satirify-bot.git -t corentinth/satirify-bot

docker run -d corentinth/satirify-bot
```

### Without docker

First create a twitter develloper account and 
```shell
git clone https://github.com/CorentinTh/satirify-bot.git

cd satirify-bot

npm build

npm start
```


## Contribute
**Pull requests are welcome !** Feel free to contribute.

## Credits
Coded with ❤️ by [Corentin Thomasset](//corentin-thomasset.fr).

## License
This project is under the [MIT license](./LICENSE).