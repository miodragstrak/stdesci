import React, { useState } from 'react';
import { getBalance } from './solana';  // Importuj funkciju iz solana.js

const SolanaBalance = () => {
  const [publicKey, setPublicKey] = useState('');
  const [balance, setBalance] = useState(null);

  const handleCheckBalance = async () => {
    const balance = await getBalance(publicKey);
    setBalance(balance / 1000000000); // Konvertuj iz lamport-a u SOL
  };

  return (
    <div>
      <h2>Check Solana Balance</h2>
      <input
        type="text"
        placeholder="Enter wallet address"
        value={publicKey}
        onChange={(e) => setPublicKey(e.target.value)}
      />
      <button onClick={handleCheckBalance}>Check Balance</button>

      {balance !== null && (
        <div>
          <h3>Balance: {balance} SOL</h3>
        </div>
      )}
    </div>
  );
};

export default SolanaBalance;