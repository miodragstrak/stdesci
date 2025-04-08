import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

// Povezivanje sa test mrežom Solane
const network = clusterApiUrl('devnet');  // Možeš da koristiš 'devnet' za testiranje
const connection = new Connection(network, 'confirmed');

// Funkcija koja omogućava proveru balansa za određeni wallet (public key)
export const getBalance = async (publicKey) => {
  const balance = await connection.getBalance(new PublicKey(publicKey));
  console.log(`Balance for ${publicKey}: ${balance / 1000000000} SOL`);
  return balance;
};

// Funkcija za slanje SOL-a sa jednog na drugi wallet
export const sendTransaction = async (senderKeypair, receiverPublicKey, amount) => {
  const transaction = await connection.requestAirdrop(new PublicKey(senderKeypair.publicKey), amount);
  await connection.confirmTransaction(transaction);
  console.log(`Transaction confirmed for ${senderKeypair.publicKey}`);
};