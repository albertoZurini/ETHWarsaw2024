noir-cli proof-datav2 -n 1 --input-proof ./target/proof --output-proof ./target/proof_out --output-pubs ./target/pubs
noir-cli key-to-hex --input ./target/vk --output ./target/vk_out
noir-cli verify --key ./target/vk --proof ./target/proof_out --pubs ./target/pubs