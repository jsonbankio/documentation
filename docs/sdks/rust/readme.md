# Rust SDK

[github](https://github.com/jsonbankio/rust-sdk) | [crates.io](https://crates.io/crates/jsonbank) | [docs.rs](https://docs.rs/jsonbank/latest/jsonbank)

## Installation

Add the following to your Cargo.toml file

```toml
[dependencies]
jsonbank = "0.1"
```

## Initialization

The JsonBank struct can be initialized with or without api keys.
Api Keys are only required when you want to access **protected/private** documents.

### Public Api Key

The public api key is a **READONLY** key used to read **public** or **private** documents.

### Private Api Key

The private api key is a **WRITE-ONLY** key used to **create/update** documents.

### Without Api Keys

Using this [json file from jsonbank](https://api.jsonbank.io/f/jsonbank/sdk-test/index.json)

```rust
use jsonbank::{JsonBank, JsonValue};

fn main() {
    let jsb = JsonBank::new_without_config();

    // get public content
    let data: JsonValue = match jsb.get_content("id_or_path") {
        Ok(data) => data,
        Err(err) => panic!("{:?}", err)
    };

    println!("{:?}", data);
}
```

### With Api Keys

```rust
use jsonbank::{JsonBank, InitConfig, Keys};

fn main() {
    let jsb = JsonBank::new(InitConfig {
        host: None, // use default host
        keys: Some(Keys {
            public: Some("Your public key".to_string()),
            private: Some("Your private key".to_string()),
        }),
    });

    // authenticate the api keys (optional)
    match jsb.authenticate() {
        Ok(_) => println!("authenticated"),
        Err(err) => panic!("{:?}", err)
    };
}
```

## Content Types

3 return types are available for `content` methods.

- `JsonObject`
- `JsonArray`
- `JsonValue`

They can be imported from the `jsonbank` crate.

```rust
use jsonbank::{JsonBank, JsonObject, JsonArray, JsonValue};
```

### JsonObject

if the root of your json document is an object, you should use `JsonObject` type.

Using this [json object file from jsonbank](https://api.jsonbank.io/f/jsonbank/sdk-test/index.json)

```rust
// get content as a JsonObject
let data: JsonObject = match jsb.get_content("jsonbank/sdk-test/index.json") {
    Ok(data) => data,
    Err(err) => panic!("{:?}", err)
};

println!("{:?}", data);

// Assuming the content of the document has a JsonObject with a key "author"
// we can access it like this

println!("{:?}", data["author"]);
```

The endpoint used in the example above is sure to return a `JsonObject`.
If it doesn't, your code will panic.

### JsonArray

if the root of your json document is an array, you should use `JsonArray` type.

Using this [json array file from github](https://api.jsonbank.io/gh/jsonbankio/documentation/github-test-array.json)

```rust
// get content as a JsonArray
let content: JsonArray = match jsb.get_github_content("jsonbankio/documentation/github-test-array.json") {
    Ok(content) => content,
    Err(err) => panic!("{:?}", err),
};

println!("{:?}", content);

// check that content matches the expected type
assert_eq!(content[0], 1);
assert_eq!(content[1], "MultiType Array");
assert_eq!(content[2].as_object().unwrap()["name"], "github-test-array.json");
```

The endpoint used in the example above is sure to return a `JsonArray`.
If it doesn't, your code will panic.

### JsonValue

if you don't know the type of the root of your json document, you should use `JsonValue` type.
This type is a wrapper around `serde_json::Value` type which can be
either `Object`, `Array`, `String`, `Number`, `Boolean` or `Null`.

Using the same example as above, we can use `JsonValue` type to get the array content.

```rust
// get content as a JsonValue
let content: JsonValue = match jsb.get_github_content("jsonbankio/documentation/github-test-array.json") {
    Ok(content) => content,
    Err(err) => panic!("{:?}", err),
};

println!("{:?}", content);

// check that content matches the expected type
assert_eq!(content[0], 1);
assert_eq!(content[1], "MultiType Array");
assert_eq!(content[2].as_object().unwrap()["name"], "github-test-array.json");
```

## Helper Methods

### set_host()

Set the host to use for the api calls. By default it is set to `https://api.jsonbank.io`

```rust
jsb.set_host("https://api.jsonbank.io");
```

## Public Content Methods

Public contents/resources do not require authentication.

### get_document_meta()

Get a public document `meta` details either by `id` or `path`.
Doesn't return the content of the document.
To get the content, use [get_content](#getcontent) method.

**Returns: [DocumentMeta](https://docs.rs/jsonbank/latest/jsonbank/structs/struct.DocumentMeta.html)**

```rust
let meta = match jsb.get_document_meta("id_or_path") {
    Ok(meta) => meta,
    Err(err) => panic!("{:?}", err)
};

println!("{:?}", meta);
```

### get_content()

Get a public document `content` either by `id` or `path`.
You have to specify [Content Type](#content-types) you are expecting.

```rust
// get content as a JsonObject
let data: JsonValue = match jsb.get_content("id_or_path") {
    Ok(data) => data,
    Err(err) => panic!("{:?}", err)
};

println!("{:?}", data);
```

### get_content_as_string()

Same as [get_content](#getcontent) but returns the content as a `String` type.

```rust
// get content as a String
let data: String = match jsb.get_content_as_string("id_or_path") {
    Ok(data) => data,
    Err(err) => panic!("{:?}", err)
};

println!("{:?}", data); // => content of the document as a String
```

### get_github_content()

Grab a public json file from Github.
This will read from the `default` branch of the repo.
<br>
Just like [get_content](#getcontent), you have to specify [Content Type](#content-types) you are expecting.

**Note:** Referenced file must be a public json file.

Using this [json object file from github](https://api.jsonbank.io/gh/jsonbankio/documentation/github-test.json)

```rust
// get content as a JsonObject
let data: JsonObject = match jsb.get_github_content("jsonbankio/documentation/github-test.json") {
    Ok(data) => data,
    Err(err) => panic!("{:?}", err)
};

println!("{:?}", data);
println!("{:?}", data["name"]); // => "github-test.json"
```

### get_github_content_as_string()

Same as [get_gitHub_content](#getgithubcontent) but returns the content as a `String` type.

Using this [json object file from github](https://api.jsonbank.io/gh/jsonbankio/documentation/github-test.json)

```rust
// get content as a String
let data: String = match jsb.get_github_content_as_string("jsonbankio/documentation/github-test.json") {
    Ok(data) => data,
    Err(err) => panic!("{:?}", err)
};

println!("{:?}", data); // => content of the document as a String
```

## Authentication Methods

### authenticate()

This method is used to authenticate a user. you can use it to test if your credentials are valid.
If the authentication is successful, it will return an [AuthenticatedData](https://docs.rs/jsonbank/latest/jsonbank/structs/struct.AuthenticatedData.html) struct.

```rust
let auth = match jsb.authenticate() {
    Ok(auth) => auth,
    Err(err) => panic!("{:?}", err),
};

assert_eq!(auth.authenticated, true);
```

### is_authenticated()

Check if the user is authenticated.

**Note:** you must call [authenticate](#authenticate) method before calling this method.
Data returned by [authenticate](#authenticate) method is stored in the `JsonBank` struct
and is used by this method to check if the user is authenticated.

```rust
let _ = match jsb.authenticate() {
    Ok(auth) => auth,
    Err(err) => panic!("{:?}", err),
};

assert_eq!(jsb.is_authenticated(), true);
```

### get_username()

Get the username of the authenticated user.

**Note:** you must call [authenticate](#authenticate) method before calling this method.

```rust
let _ = match jsb.authenticate() {
    Ok(auth) => auth,
    Err(err) => panic!("{:?}", err),
};

println!("{:?}", jsb.get_username()); // => "your_username"
```

## Authorized Content Methods

The following methods require authentication. Either `public` or `private` key is required.

When using `path` to identify a document, the `username` is not required because we already know who the user is.

### get_own_content_meta()

Get information about a document without the content.
To get the content, use [get_own_content](#getowncontent) method.

**Returns: [DocumentMeta](https://docs.rs/jsonbank/latest/jsonbank/structs/struct.DocumentMeta.html)**

```rust
let meta = match jsb.get_own_content_meta("sdk-test/index.json") {
    Ok(meta) => meta,
    Err(err) => panic!("{:?}", err)
};

println!("{:?}", meta);
println!("{:?}", meta.path); // => file path
```

### get_own_content()

Get a document `content` either by `id` or `path`.
You have to specify [Content Type](#content-types) you are expecting.

```rust
use jsonbank::{JsonObject, JsonArray, JsonValue};

// get content as a JsonObject
let data: JsonObject = match jsb.get_own_content("id_or_path") {
    Ok(data) => data,
    Err(err) => panic!("{:?}", err)
};

println!("Object: {:?}", data);

// get content as a JsonArray
let data: JsonArray = match jsb.get_own_content("id_or_path") {
    Ok(data) => data,
    Err(err) => panic!("{:?}", err)
};

println!("Array: {:?}", data);


// get content as a JsonValue
let data: JsonValue = match jsb.get_own_content("id_or_path") {
    Ok(data) => data,
    Err(err) => panic!("{:?}", err)
};

println!("Value: {:?}", data);
```

### get_own_content_as_string()

Same as [get_own_content](#getowncontent) but returns the content as a `String` type.

```rust
// get content as a String
let data: String = match jsb.get_own_content_as_string("id_or_path") {
    Ok(data) => data,
    Err(err) => panic!("{:?}", err)
};
```

### has_own_document()

Check if a document exists using `id` or `path`.

**Returns: `bool`**

```rust
let has_doc = match jsb.has_own_document("id_or_path") {
    Ok(has_doc) => has_doc,
    Err(err) => panic!("{:?}", err)
};

println!("{:?}", has_doc); // => true or false
```

### create_document()

This method is used to create a new document.

**Returns: [NewDocument](https://docs.rs/jsonbank/latest/jsonbank/structs/struct.NewDocument.html)**

```rust
let new_doc_body = CreateDocumentBody {
    name: "new_doc.json".to_string(),
    project: "your_project".to_string(),
    content: "[1, 2, 3]".to_string(),
    folder: None, // or Some("path/to/folder".to_string())
};

let new_doc = match jsb.create_document(new_doc_body) {
    Ok(new_doc) => new_doc,
    Err(err) => panic!("{:?}", err)
};

println!("{:?}", new_doc);
```

### create_document_if_not_exists()

This method creates a new document if it doesn't exist by first creating a new document then check error to see if the document already exists.
Before fetching the document.

It returns same struct as [create_document](#createdocument) method but with the `exists` field set to `true` if the document already exists.

**Returns: [NewDocument](https://docs.rs/jsonbank/latest/jsonbank/structs/struct.NewDocument.html)**

```rust
let new_doc_body = CreateDocumentBody {
    name: "new_doc.json".to_string(),
    project: "your_project".to_string(),
    content: "[1, 2, 3]".to_string(),
    folder: None, // or Some("path/to/folder".to_string())
};

let new_doc = match jsb.create_document_if_not_exists(new_doc_body) {
    Ok(new_doc) => new_doc,
    Err(err) => panic!("{:?}", err)
};

println!("{:?}", new_doc);

// check if the document already exists
if new_doc.exists {
    println!("Document already exists");
}
```

### upload_document()

Upload a new document. Behind the scenes, it reads the content from a file and uses the [create_document](#createdocument) method to create the document.

**Returns: [NewDocument](https://docs.rs/jsonbank/latest/jsonbank/structs/struct.NewDocument.html)**

```rust
// import
use jsonbank::structs::UploadDocumentBody;

// code
let new_doc = match jsb.upload_document(UploadDocumentBody {
    file_path: "path/to/file.json".to_string(),
    project: "your_project".to_string(),
    name: None, // or Some("new_doc.json".to_string())
    folder: None, // or Some("path/to/folder".to_string())
}) {
    Ok(doc) => doc,
    Err(err) => panic!("{:?}", err),
};

println!("{:?}", new_doc);
```

### update_own_document()

Update a document owned by the authenticated user by `id` or `path`.

**Returns: [UpdatedDocument](https://docs.rs/jsonbank/latest/jsonbank/structs/struct.UpdatedDocument.html)**

```rust
let new_content = r#"{
    "name": "John Doe",
    "age": 30,
    "city": "New York"
}"#;

let res = match jsb.update_own_document("id_or_path", newContent.to_string()) {
    Ok(updated_doc) => updated_doc,
    Err(err) => panic!("{:?}", err)
};

println!("{:?}", res);


// check if the document was updated
if !res.changed {
    println!("Document was not updated");
}
```

### create_folder()

Create a new folder.

**Returns: [NewFolder](https://docs.rs/jsonbank/latest/jsonbank/structs/struct.NewFolder.html)**

```rust
let res = match jsb.create_folder(CreateFolderBody {
    name: "folder".to_string(),
    project: data.project.clone(),
    folder: None,
}) {
    Ok(res) => res,
    Err(err) => panic!("{:?}", err),
};

println!("{:?}", res);
```
