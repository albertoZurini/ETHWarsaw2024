# 1  apt update; apt install build-essential cmake git python doxygen graphviz 
# 2  apt update; apt install build-essential cmake git doxygen graphviz 
# 3  apt install llvm
# 4  curl https://sh.rustup.rs -sSf | sh
# 5  apt install curl; curl https://sh.rustup.rs -sSf | sh
# 6  cargo install --features bins --path . 2>&1 | tee error.txt
# 7  . ~/.cargo/env 
# 8  cargo install --features bins --path . 2>&1 | tee error.txt
# 9  cd ciao
# 10  cargo install --features bins --path . 2>&1 | tee error.txt
# 11  ls
# 12  cd PoS_cardEmulator/zkverify/ultraplonk_verifier/
# 13  cargo install --features bins --path . 2>&1 | tee error.txt
# 14  apt install libc-dev
# 15  apt upgrade -y
# 16  apt install c++-dev
# 17  apt install clang
# 18  g++ --version
# 19  cargo install --features bins --path . 2>&1 | tee error.txt
# 20  cd ..
# 21  ./noir-cli --version
# 22  ls
# 23  ./noir-cli proof-datav2 -n 1 --input-proof ./pos/target/proof --output-proof ./pos/target/proof_out --output-pubs ./pos/target/out_pubs
# 24  noir-cli key-to-hex --input ./pos/target/vk --output ./pos/target/vk_out
# 25  noir-cli verify --key ./pos/target/vk --proof ./pos/target/proof --pubs ./pos/target/out_pubs
# 26  noir-cli verify --key ./pos/target/vk --proof ./pos/target/proof_out --pubs ./pos/target/out_pubs
# 27  history
FROM ubuntu:24.04
RUN apt-get update; apt-get upgrade -y
RUN apt-get install -y build-essential cmake git doxygen graphviz curl libc-dev clang
RUN curl https://sh.rustup.rs -sSf | sh
RUN . ~/.cargo/env

CMD ["/usr/bin/bash"]
