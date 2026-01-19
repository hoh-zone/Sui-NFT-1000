module memorial_nft::memorial;

use std::string::{String, utf8};
use sui::display;
use sui::package;

/// One-time witness for initializing the package.
public struct MEMORIAL has drop {}

/// Shared counter for auto-incrementing NFT numbers.
public struct Counter has key, store {
    id: sui::object::UID,
    value: u64,
}

const MAX_SUPPLY: u64 = 100000;
const EMaxSupply: u64 = 0;

/// A simple memorial NFT object.
    public struct Memorial has key, store {
    id: sui::object::UID,
    name: String,
    description: String,
    image_url: String,
    date: u64,
    message: String,
    creator: address,
}

/// Event emitted when a memorial NFT is minted.
    public struct MemorialMinted has copy, drop {
    object_id: sui::object::ID,
    recipient: address,
}

/// Initialize the Display metadata for MemorialNFT.
fun init(otw: MEMORIAL, ctx: &mut sui::tx_context::TxContext) {
    let publisher = package::claim(otw, ctx);
    let keys = vector[
        utf8(b"name"),
        utf8(b"description"),
        utf8(b"image_url"),
        utf8(b"date"),
        utf8(b"message"),
        utf8(b"creator"),
    ];
    let values = vector[
        utf8(b"{name}"),
        utf8(b"{description}"),
        utf8(b"{image_url}"),
        utf8(b"{date}"),
        utf8(b"{message}"),
        utf8(b"{creator}"),
    ];
        let mut display_obj = display::new_with_fields<Memorial>(&publisher, keys, values, ctx);
    display::update_version(&mut display_obj);
    sui::transfer::public_transfer(publisher, sui::tx_context::sender(ctx));
    sui::transfer::public_transfer(display_obj, sui::tx_context::sender(ctx));

    let counter = Counter {
        id: sui::object::new(ctx),
        value: 0,
    };
    sui::transfer::share_object(counter);
}

/// Mint a memorial NFT with default metadata to the sender.
    public entry fun mint(counter: &mut Counter, ctx: &mut sui::tx_context::TxContext) {
    let creator = sui::tx_context::sender(ctx);
    assert!(counter.value < MAX_SUPPLY, EMaxSupply);
    counter.value = counter.value + 1;
    let mut name = utf8(b"Sui 1000-day #");
    std::string::append(&mut name, u64_to_string(counter.value));
    let description = utf8(b"Sui 1000-day anniversary");
        let image_url = utf8(b"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=800&q=80");
    let date = 0;
    let message = utf8(b"In loving memory.");
        let nft = Memorial {
        id: sui::object::new(ctx),
        name,
        description,
        image_url,
        date,
        message,
        creator,
    };

        sui::event::emit(MemorialMinted {
        object_id: sui::object::id(&nft),
        recipient: creator,
    });

    sui::transfer::transfer(nft, creator);
}

fun u64_to_string(value: u64): String {
    if (value == 0) return utf8(b"0");
    let mut digits = vector[];
    let mut n = value;
    while (n > 0) {
        let digit = (n % 10) as u8;
        digits.push_back(digit + 48);
        n = n / 10;
    };
    digits.reverse();
    digits.to_string()
}

