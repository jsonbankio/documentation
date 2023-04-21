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

### GetDocumentMeta()

Get a public document `meta` details either by `id` or `path`.
Does not return the content of the document.
To get the content, use [GetContent](#getcontent) method.

```go
meta, err := jsb.GetDocumentMeta("id_or_path")

// Meta returns the following struct
type DocumentMeta struct {
	Id        string `json:"id"`        // id of the document
	Project   string `json:"project"`   // project of the document
	Path      string `json:"path"`      // path of the document
	UpdatedAt string `json:"updatedAt"` // last update time of the document
	CreatedAt string `json:"createdAt"` // creation time of the document
}
```

### GetContent()

Get a public `document` content either by `id` or `path`.

```go
data, err := jsb.GetOwnContent("id_or_path")
if err != nil {
    panic(err)
}

// data is of any type
// so you can use it as you want

// as a map
formattedContent := content.(map[string]interface{})

// or as an array
formattedContent := content.([]interface{})
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

### GetGitHubContentAsString()
Same as [GetGitHubContent](#getgithubcontent) but returns the content as a string.

```go
data, err := jsb.GetGithubContentAsString("org/repo/file.json");

// example
result, err := jsb.GetGithubContentAsString("jsonbankio/documentation/github-test.json")    
```


## Access Own Content