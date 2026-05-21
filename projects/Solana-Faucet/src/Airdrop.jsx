import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import SignMessage from "./SignMessage";
import { useState } from "react";

// components in react are very similar to creating your own HTML tags
// The useWallet hook provides the wallet variable inside the Airdrop Component
// because I wrapped the Airdrop Component inside the WalletProvider
export default function Airdrop() {
    // hooks in react
    const wallet = useWallet();
    const { connection } = useConnection();
    const [isVerified, setIsVerified] = useState(false);
    // defining the function inside the component body
    async function sendAirdropToUser() {
        const publicKey = wallet.publicKey
        if (!publicKey) {
            alert("Please connect your wallet first!");
            return;
        }
        const amount = document.getElementById("publicKey").value;
        await connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
        alert("Airdropped SOL");
    }
    return (
        <div className="card">
            <div>
                <h2>Request Airdrop</h2>
                <p>Enter the amount of SOL you want to receive on Devnet.</p>
            </div>
            <div className="input-group">
                <input 
                    id="publicKey" 
                    type="text" 
                    placeholder="Amount (e.g., 1)" 
                    className="amount-input"
                />
            </div>
            <button onClick={sendAirdropToUser} className="action-button" disabled={!isVerified} style={{ 
                opacity: isVerified ? 1 : 0.6, 
                cursor: isVerified ? 'pointer' : 'not-allowed' 
            }}>
                Send Airdrop
            </button>
            {!isVerified ? (
                <SignMessage onVerificationSuccess={() => setIsVerified(true)} />
            ) : (
                <div style={{ marginTop: '1rem' }} className="verified-badge">
                    ✅ Wallet Verified
                </div>
            )}
        </div>
    )
}