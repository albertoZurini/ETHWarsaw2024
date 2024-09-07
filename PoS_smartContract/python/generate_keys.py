import ecdsa
import hashlib

def generate_key_pair():
    # Generate a private key using SECP256k1 curve
    private_key = ecdsa.SigningKey.generate(curve=ecdsa.SECP256k1)

    # Get the public key from the private key
    public_key = private_key.get_verifying_key()

    # Return both private and public keys in hexadecimal format
    private_key_hex = private_key.to_string().hex()
    public_key_hex = public_key.to_string().hex()

    return private_key_hex, public_key_hex

if __name__ == "__main__":
    private_key, public_key = generate_key_pair()
    print(f"Private Key: {private_key}")
    print(f"Public Key: {public_key}")
