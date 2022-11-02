# JavaScript SDK

This package is written in <b class="text-ts">Typescript</b>.

## Installation

```shell
npm i jsonbank
# OR YARN
yarn add jsonbank
```

## Initialize

JsonBank class can be initialized with or without api keys.
<br>
Api Keys are only required when you want to access **private/secured** documents

<CodeGroup>
  <CodeGroupItem title="Without Api Keys">

```typescript
const {JsonBank} = require("jsonbank")

const jsb = new JsonBank();
```

  </CodeGroupItem>

  <CodeGroupItem title="With Api Keys" >

```typescript
const {JsonBank} = require("jsonbank")

// Initialize with Api keys.
const jsb = new JsonBank({
  keys: {
    pub: 'JSB_PUBLIC_KEY',
    prv: 'JSB_PRIVATE_KEY',
  }
});

// authenticate the api keys
await jsb.authenticate();
```

  </CodeGroupItem>
</CodeGroup>

### Public Api Key

The public api key is a **READONLY** key used to read **public** or **private** documents.

### Private Api Key

The private api key is a **WRITE-ONLY** key used to **create/update**  documents.

### Check Authentication

To check if the user is authenticated, use the `isAuthenticated` method.
<br> Make sure to have called `authenticate` method before.

```typescript 
// somewhere in your code
await jsb.authenticate();

// check if the user is authenticated
jsb.isAuthenticated() // true
```

## Public Content
Public contents do not require authentication.

### getContent()
Get a public `document` either by `id` or `path`.

```typescript
const content = await jsb.getContent("id" || "filePath");
// content is a json object
```


### getContentByPath()
Get a public `document` by `path`.

```typescript
const content = await jsb.getContentByPath("id" || "filePath");
// content is a json object
```

### getDocumentMeta()
Get a public documents `meta` details either by `id` or `path`.


<CodeGroup>
  <CodeGroupItem title="Code">

```typescript
const meta = await jsb.getContentMeta("id" || "filePath");
console.log(meta)
```

  </CodeGroupItem>

  <CodeGroupItem title="Result" >

```json
{
    "id": "string",
    "project": "string",
    "contentSize": {
      "number": "number",
      "string": "string"
    },
    "path": "string",
    "updatedAt": "dateString",
    "createdAt": "dateString"
}
```

  </CodeGroupItem>
</CodeGroup>

### getDocumentMetaByPath()
Get a public documents `meta` details by `path`.



<CodeGroup>
  <CodeGroupItem title="Code">

```typescript
const meta = await jsb.getDocumentMetaByPath("id" || "filePath");
console.log(meta)
```

  </CodeGroupItem>

  <CodeGroupItem title="Result" >

```json
{
    "id": "string",
    "project": "string",
    "contentSize": {
      "number": "number",
      "string": "string"
    },
    "path": "string",
    "updatedAt": "dateString",
    "createdAt": "dateString"
}
```

  </CodeGroupItem>
</CodeGroup>


### getGitHubContent()
Grab a public json file from Github. This will read from the `default` branch of the repo.


<CodeGroup>
  <CodeGroupItem title="Code">

```typescript
await jsb.getGithubContent("org/repo/file.json");

// example
await jsb.getGithubContent("jsonbankio/documentation/github-test.json")
```

  </CodeGroupItem>

  <CodeGroupItem title="Result" >

```json5
// This is the content of the json file.
{
  "name": "github-test.json",
  "purpose": "This file is used to test the github json fetcher"
}
```

  </CodeGroupItem>
</CodeGroup>



## Access Own Content