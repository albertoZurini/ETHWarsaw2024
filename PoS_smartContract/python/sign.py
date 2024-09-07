import ecdsa
import hashlib

# Load or generate your private key (ensure it is securely stored!)
private_key_hex = "94df1a345dabd3cce720eab1d26c95cb8ab684fde6e9657b68d2c7a784df1f97"
private_key = ecdsa.SigningKey.from_string(bytes.fromhex(private_key_hex), curve=ecdsa.SECP256k1)

def sign_challenge(challenge: int) -> str:
    # Hash the challenge before signing
    challenge_bytes = challenge.to_bytes((challenge.bit_length() + 7) // 8, byteorder='big')
    challenge_hash = hashlib.sha256(challenge_bytes).digest()

    # Sign the hashed challenge
    signature = private_key.sign(challenge_hash)

    # Return the signature in hex format
    return signature.hex()

# Example usage
if __name__ == "__main__":
    challenge = 102281445771304100778160806342485058701544682045743144401942649865940258671065  # Replace with the actual challenge from the smart contract
    signed_challenge = sign_challenge(challenge)
    print(f"Signed challenge: {signed_challenge}")
