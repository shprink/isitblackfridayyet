import * as functions from 'firebase-functions';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as Twit from 'twit';
import { isItBlackFriday, isItSoon } from './dates.utils';
import { convertToTimeZone } from 'date-fns-timezone';

exports.screenshot = functions
  .runWith({ memory: '1GB', timeoutSeconds: 60 })
  .https.onRequest(async (req, res) => {
    try {
      const [localFile, content] = await takeScreenshot();

      // res.sendFile(localFile);
      res.send(content);

      console.log('---DELETING LOCAL FILE---');
      fs.unlinkSync(localFile);
    } catch (error) {
      return res.json({
        error,
      });
    }
  });

exports.scheduledFunction = functions
  .runWith({ memory: '1GB', timeoutSeconds: 60 })
  .pubsub.topic('firebase-schedule-scheduledFunction-us-central1')
  .onPublish(async () => {
    const {
      consumer_key,
      consumer_secret,
      access_token,
      access_token_secret,
    } = functions.config().twitter;

    const T = new Twit({
      consumer_key,
      consumer_secret,
      access_token,
      access_token_secret,
      timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
      strictSSL: true, // optional - requires SSL certificates to be valid.
    });

    const [localFile] = await takeScreenshot();

    console.log('starting media/upload');

    var b64content = fs.readFileSync(localFile, { encoding: 'base64' });

    const {
      data: { media_id_string },
    }: any = await T.post('media/upload', {
      media_data: b64content,
    });

    const todayDate = new Date();
    const altText = `Is it Black Friday ${todayDate.toUTCString()}`;
    const meta_params = {
      media_id: media_id_string,
      alt_text: { text: altText },
    };

    console.log('starting media/metadata/create');

    await T.post('media/metadata/create', meta_params);

    const params = {
      status: 'Is is Black Friday yet? #blackfriday #isitblackfridayyet',
      media_ids: [media_id_string],
    };
    console.log('starting statuses/update');

    await T.post('statuses/update', params);

    console.log('---DELETING LOCAL FILE---');
    fs.unlinkSync(localFile);
  });

async function takeScreenshot(): Promise<[string, string]> {
  const localFile = path.join(os.tmpdir(), `${Date.now()}.png`);
  const localDate = new Date();
  const dateAtUTC14 = convertToTimeZone(localDate, {
    timeZone: 'Etc/GMT-14', // first to start the day
  });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1024,
    height: 512,
  });

  const content = `<!DOCTYPE html>
  <html dir="ltr" lang="en" style="height: 100%; font-size: 16px;">
    <head>
      <meta charset="utf-8" />
      <link
        href="https://fonts.googleapis.com/css?family=Alata&display=swap"
        rel="stylesheet"
      />
    </head>
    <body style="height: 100%; font-family: 'Alata', sans-serif; margin: 0; padding: 0px;">
      <div style="height: 100%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; margin: 0; padding: 0px;">
      <!-- <div style="color: black; width: 100%; padding: 5px 15px; box-sizing: border-box; font-size: 2.5rem; text-align: left; position: absolute; top: 0;">Is It Black Friday Yet ?</div> -->
        <div style="flex: 1; box-sizing: border-box; display: flex; align-items: center; padding: 20px;">
          <h1 class="title" style="font-size: 15rem; color: black; margin: 0;">
            ${isItBlackFriday(dateAtUTC14)}
            <small style="display: block; font-size: 20%; color: grey;" class="subtitle">${isItSoon(
              dateAtUTC14,
            )}</small>
          </h1>
        </div>
        <div style="color: black; width: 100%; padding: 5px 15px; box-sizing: border-box; text-align: right; position: absolute; bottom: 0; font-size: 1.5rem;">twitter.com/isitblackfriday</div>
      </div>
    </body>
  </html>
  `;

  await page.setContent(content, {
    waitUntil: 'networkidle0',
  });

  await page.screenshot({
    type: 'png',
    path: localFile,
  });

  return [localFile, content];
}
