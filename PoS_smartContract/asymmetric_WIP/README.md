# Steps

1. Generate public and private keys `generate_keys.py`
2. Add balance to the smart contract `deposit` (at least two accounts)
3. Add the public key to the smart contract `registerPublicKey`
4. Generate the challenge calling `generateChallenge` on the SC
5. Use `sign.py` to sign the challenge
6. Call `verifyAndTransfer` on the SC