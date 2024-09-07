nargo check
nargo execute pos
bb prove -b ./target/pos.json -w ./target/pos.gz -o ./target/proof
bb write_vk -b ./target/pos.json -o ./target/vk
bb verify -k ./target/vk -p ./target/proof