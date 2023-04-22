# Rust SDK

[github](https://github.com/jsonbankio/rust-sdk) | [crates.io](https://crates.io/crates/jsonbank)



## Installation

Add the following to your Cargo.toml file

```toml
[dependencies]
jsonbank = "0.1"
```

## Initialization
The JsonBank struct can be initialized with or without api keys.
Api Keys are only required when you want to access **private/secured** documents

### Without Api Keys
```rust
use jsonbank::{JsonBank, JsonObject};

fn main() {
    let jsb = JsonBank::new_without_config();
   
    // get public content
    let data: JsonObject = match jsb.get_content("jsonbank/sdk-test/index.json") {
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

### Public Api Key

The public api key is a **READONLY** key used to read **public** or **private** documents.

### Private Api Key

The private api key is a **WRITE-ONLY** key used to **create/update** documents.


## Public Content

Public contents/resources do not require authentication.

### get_document_meta()
Get a public document `meta` details either by `id` or `path`.
Doesn't return the content of the document.
To get the content, use [get_content](#getcontent) method.

```rust
let meta = match jsb.get_document_meta("jsonbank/sdk-test/index.json") {
    Ok(meta) => meta,
    Err(err) => panic!("{:?}", err)
};

println!("{:?}", meta);

// Output

pub struct ContentSize {
    pub number: u64,
    pub string: String,
}

pub struct DocumentMeta {
    pub id: String,
    pub project: String,
    pub path: String,
    pub content_size: ContentSize,
    pub updated_at: String,
    pub created_at: String,
}
```


### get_content()
Get a public document `content` either by `id` or `path`.

You have to specify the type of the content you want to get. either `JsonObject` or `JsonArray`.

```rust
let data: JsonObject = match jsb.get_content("jsonbank/sdk-test/index.json") {
    Ok(data) => data,
    Err(err) => panic!("{:?}", err)
};

println!("{:?}", data);

// Assuming the content of the document has a JsonObject with a key "author"
// we can access it like this

println!("{:?}", data["author"]);
```

The endpoint used in the example above is a [public document](https://api.jsonbank.io/f/jsonbank/sdk-test/index.json) and its sure to return a `JsonObject`.
If it doesn't, your code will panic.