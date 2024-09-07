# Commands to execute

## Inside pos folder
1. [https://noir-lang.org/docs/getting_started/hello_noir/](https://noir-lang.org/docs/getting_started/hello_noir/)

`nargo check`

`nargo execute pos`

`bb prove -b ./target/pos.json -w ./target/pos.gz -o ./target/proof`

`bb write_vk -b ./target/pos.json -o ./target/vk`

`bb verify -k ./target/vk -p ./target/proof`



2. [https://docs.zkverify.io/tutorials/submit-proofs/noir-ultraplonk-example](https://docs.zkverify.io/tutorials/submit-proofs/noir-ultraplonk-example)


`noir-cli proof-datav2 -n 1 --input-proof ./target/proof --output-proof ./target/proof_out --output-pubs ./target/pubs`

`noir-cli key-to-hex --input ./target/vk --output ./target/vk_out`

`noir-cli verify --key ./target/vk --proof ./target/proof_out --pubs ./target/pubs`

## Inside submit_to_zkv folder

3. At this point we should run `index.js`