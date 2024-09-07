// Docs: https://noir-lang.org/docs/getting_started/hello_noir/
// https://docs.zkverify.io/tutorials/submit-proofs/noir-ultraplonk-example

fn main(x: Field, y: pub Field) {
    assert(x != y);
}

#[test]
fn test_main() {
    main(1, 2);

    // Uncomment to make test fail
    // main(1, 1);
}
