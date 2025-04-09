import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const WalletInfo = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        const lamports = await connection.getBalance(publicKey);
        setBalance(lamports / LAMPORTS_PER_SOL);
      }
    };
    fetchBalance();
  }, [publicKey, connection]);

  const handleCopy = () => {
    navigator.clipboard.writeText(publicKey.toBase58());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!publicKey) return null;

  const shortAddress = `${publicKey.toBase58().slice(0, 4)}...${publicKey
    .toBase58()
    .slice(-4)}`;

  return (
    <div style={styles.walletBox}>
      <div onClick={handleCopy} style={styles.walletAddress}>
        Connected: <span>{shortAddress}</span>
      </div>
      {copied && <div style={styles.copiedText}>Address copied!</div>}
      {balance !== null && (
        <div style={styles.balanceText}>Balance: {balance.toFixed(2)} SOL</div>
      )}
    </div>
  );
};

const styles = {
  walletBox: {
    marginTop: "0.5rem",
    textAlign: "right",
  },
  walletAddress: {
    cursor: "pointer",
    fontSize: "0.9rem",
    textShadow: "0 0 5px #00ffe0",
  },
  copiedText: {
    fontSize: "0.8rem",
    color: "#00ff99",
    marginTop: "0.3rem",
    textShadow: "0 0 3px #00ff99",
  },
  balanceText: {
    fontSize: "0.9rem",
    marginTop: "0.3rem",
    textShadow: "0 0 5px #00ffe0",
  },
};

export default WalletInfo;
