import React from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

const App = () => {
  const network = "devnet";
  const endpoint = clusterApiUrl(network);
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div style={styles.container}>
            <div style={styles.header}>
              <WalletMultiButton />
            </div>
            <div style={styles.main}>
              <h1 style={styles.title}>DeSci DAO Platform</h1>
              <p style={styles.subtitle}>Decentralized Science for a Transparent, Open, and Borderless Future</p>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const neonColor = "#00ffe0";

const styles = {
  container: {
    backgroundColor: "#000",
    color: neonColor,
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "Orbitron, sans-serif",
    position: "relative",
  },
  header: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    textShadow: "0 0 10px ${neonColor}, 0 0 20px ${neonColor}",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.5rem",
    maxWidth: "600px",
    textShadow: `0 0 5px ${neonColor}`,
  },
};

export default App;