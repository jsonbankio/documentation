# Rust SDK

[github](https://github.com/jsonbankio/rust-sdk) | [crates.io](https://crates.io/crates/jsonbank) | [docs.rs](https://docs.rs/jsonbank/latest/jsonbank)

<Note>
Due to rust's awesome inbuilt documentation system, we won't be saying much here. 
Please refer to <a href="https://docs.rs/jsonbank/latest/jsonbank" target="_blank">docs.rs</a> for proper documentation</Note>

## Installation

Add the following to your Cargo.toml file

```toml
[dependencies]
jsonbank = "0.1"
```

## Initialization

The JsonBank struct can be initialized with or without api keys.
Api Keys are only required when you want to access **protected/private** documents.

### Without Api Keys

Using this [json file from jsonbank](https://api.jsonbank.io/f/jsonbank/sdk-test/index.json)

```rust
use jsonbank::{JsonBank, JsonValue};

fn main() {
    let jsb = JsonBank::new_without_config();

    // get public content
    let data: JsonValue = jsb.get_content("id_or_path").unwrap();

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
let data: JsonObject = jsb.get_content("jsonbank/sdk-test/index.json").unwrap();

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
let content: JsonArray = jsb.get_github_content("jsonbankio/documentation/github-test-array.json").unwrap();

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
let content: JsonValue = jsb.get_github_content("jsonbankio/documentation/github-test-array.json").unwrap();

println!("{:?}", content);

// check that content matches the expected type
assert_eq!(content[0], 1);
assert_eq!(content[1], "MultiType Array");
assert_eq!(content[2].as_object().unwrap()["name"], "github-test-array.json");
```

## Full Documentation

For more information, check out the [docs.rs](https://docs.rs/jsonbank/latest/jsonbank) page.
