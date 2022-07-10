# Webhooks

Webhooks allow you to set up a notification system that can be used to receive updates on certain events that occurred in your project. For example when a file is **updated** or **deleted**.

## Webhook Url

Your webhook url is an endpoint in your server that:

- Must be `HTTPS`
- Receives a `POST` request from jsonbank with data `{jsb_code: "6 digit code"}` in the body.
- Returns a json response with `200` status code and the received `jsb_code`.

Below is an abstract example of how your endpoint should look using Nodejs for the `file.updated` event.

```js
function endpoint(req, res) {
  // get jsb_code
  const { jsb_code, event, fileId } = req.body;

  if (event === "file.updated") {
    // do something with `fileId`
  }

  // return jsb_code
  return res.json({ jsb_code });
}
```

### Timeout

Jsonbank webhooks have a timeout of **10 seconds**, this means your endpoint must respond within 10 seconds or the request is marked as failed and will be scheduled for a retry.

<Note > Make sure you don't run <b>Heavy Tasks</b> on your endpoint so it can meet to time.</Note>

### Error/Retires

If for some reason your endpoint does not return the expected response i.e `200` status, missing `jsb_code`, **OR** Timeout your endpoint will be retried **3 times** with a space of **1 minute** before it will be marked as **broken**.

## Available Events

<Note>
For now only <b>File</b> events are supported.
</Note>

#### File Events

- [file.updated](#fileupdated) - occurs when a file is updated.
- [file.deleted](#filedeleted) - occurs when a file is deleted.

### file.updated

```ts
{
    jsb_code: string, // Random 6 digits code.
    event: "file.updated"
    fileId: string // updated file's Id.
}
```

### file.deleted

```ts
{
    jsb_code: string, // Random 6 digits code.
    event: "file.deleted"
    fileId: string // updated file's Id.
}
```
