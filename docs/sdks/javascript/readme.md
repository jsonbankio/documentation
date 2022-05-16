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

```javascript
const {JsonBank} = require("jsonbank")

const jsb = new JsonBank();
```

  </CodeGroupItem>

  <CodeGroupItem title="With Api Keys" >

```javascript
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

```javascript 
// somewhere in your code
await jsb.authenticate();

// check if the user is authenticated
jsb.isAuthenticated() // true
```