import { secrets } from '../../config';
import fetch from 'node-fetch';

const host = process.env.host || 'https://api.beeeee.es';

export const initTelegramBot = async () =>
  await fetch(
    `https://api.telegram.org/${secrets.TELEGRAM_BOT_ID}/setWebhook?url=${host}/telegram`
  )
    .then((resp) => resp.json())
    .then((json) => {
      if (!json.ok) console.log(json.description);
      console.log(json.description);
    })
    .catch(console.log);
