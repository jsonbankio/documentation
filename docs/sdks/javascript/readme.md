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

### getDocumentMeta()
Get a public document `meta` details either by `id` or `path`.
Does not return the content of the document.
To get the content, use [getContent](#getcontent) method.

<CodeGroup>
  <CodeGroupItem title="Code">

```typescript
const meta = await jsb.getDocumentMeta("id_or_path");
// result is of type "JSB_Response.ContentMeta"
console.log(meta.id) // id of the document
console.log(meta.project) // project name
console.log(meta.contentSize) // size object of the document
console.log(meta.path) // path of the document
console.log(meta.updatedAt) // date of last update
console.log(meta.createdAt) // date of creation
```

  </CodeGroupItem>

  <CodeGroupItem title="Result" >

```typescript
 type ContentMeta = {
  id: string;
  project: string;
  contentSize: {
    number: number;
    string: string;
  };
  path: string;
  updatedAt: string;
  createdAt: string;
};
```

  </CodeGroupItem>
</CodeGroup>


### getContent()
Get a public document `content` either by `id` or `path`.
It returns the json parsed object.
```typescript
const content = await jsb.getContent("id_or_path");
// content is a json object
```

### getContentAsString()
Get a public document `content` either by `id` or `path` as a string.
It returns a string.
```typescript
const content = await jsb.getContentAsString("id_or_path");
// content is a string
```

### getGitHubContent()
Grab a public json file from Github. This will read from the `default` branch of the repo.
<br>
It returns the json parsed object.

**Note:** Referenced file must be a public json file.

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

### getGitHubContentAsString()
Same as [getGitHubContent](#getgithubcontent) but returns the content as a string.

**Note:** Referenced file must be a public json file.

<CodeGroup>
  <CodeGroupItem title="Code">

```typescript
await jsb.getGithubContentAsString("org/repo/file.json");

// example
await jsb.getGithubContentAsString("jsonbankio/documentation/github-test.json")
```

  </CodeGroupItem>

  <CodeGroupItem title="Result" >

```text
{"name": "github-test.json", "purpose": "This file is used to test the github json fetcher"}
```

  </CodeGroupItem>
</CodeGroup>



## Access Own Content