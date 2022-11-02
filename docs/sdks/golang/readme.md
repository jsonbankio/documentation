# GoLang SDK

[github](https://github.com/jsonbankio/go-sdk) | [pkg.go.dev](https://pkg.go.dev/github.com/jsonbankio/go-sdk)

## Installation

```shell
go get github.com/jsonbankio/go-sdk
```

## Initialize

JsonBank can be initialized with or without api keys.
<br>
Api Keys are only required when you want to access **private/secured** documents

<CodeGroup>
  <CodeGroupItem title="Without Api Keys">

```go
package main

import "github.com/jsonbankio/go-sdk"

func main() {
	// Initialize the client
	jsb := jsonbank.InitWithoutKeys()
}
```

  </CodeGroupItem>

  <CodeGroupItem title="With Api Keys" >

```go
package main

import "github.com/jsonbankio/go-sdk"

func main() {
	// Initialize the client
	jsb := jsonbank.Init(jsonbank.Config{
		Keys: jsonbank.Keys{
			Public:  "your public key",
			Private: "your private key",
		},
	})
}
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

```go 
authenticated, err := jsb.Authenticate()

if err != nil {
   panic(err)
}

fmt.Println("Authenticated:", jsb.Authenticated())
fmt.Println("Authenticated as:", authenticated.Username)
```

## Public Content

Public contents do not require authentication.

### GetContent()

Get a public `document` content either by `id` or `path`.

```go
data, err := jsb.GetOwnContent("id" || "path")
// data is of any type
// so you can use it as you want
```

### GetContentByPath()

Get a public `document` by `path`.

```go
data, err := jsb.GetOwnContentByPath("id" || "path")
// data is of any type
// so you can use it as you want
```

### GetDocumentMeta()

Get a public document `meta` details either by `id` or `path`.

```go
meta, err := jsb.GetDocumentMeta("id" || "path")

// Meta returns the following struct
type DocumentMeta struct {
	Id        string `json:"id"`        // id of the document
	Project   string `json:"project"`   // project of the document
	Path      string `json:"path"`      // path of the document
	UpdatedAt string `json:"updatedAt"` // last update time of the document
	CreatedAt string `json:"createdAt"` // creation time of the document
}
```

### GetDocumentMetaByPath()

Get a public documents `meta` details by `path`.

```go
meta, err := jsb.GetDocumentMetaByPath("path")

// Meta returns the following struct
type DocumentMeta struct {
	Id        string `json:"id"`        // id of the document
	Project   string `json:"project"`   // project of the document
	Path      string `json:"path"`      // path of the document
	UpdatedAt string `json:"updatedAt"` // last update time of the document
	CreatedAt string `json:"createdAt"` // creation time of the document
}
```

### GetGitHubContent()

Grab a public json file from github. This will read from the `default` branch of the repo.

```go
data, err := jsb.GetGithubContent("org/repo/file.json");

// example
result, err := jsb.GetGithubContent("jsonbankio/documentation/github-test.json")

// result is of any type
// so you can use it as you want
```

## Access Own Content