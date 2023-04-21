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