FROM rust:1.54

WORKDIR /usr/src/myapp

COPY Cargo.toml .

RUN cargo build --release

RUN rm src/*.rs

COPY . .

RUN cargo build --release

CMD ["./target/release/myapp"]