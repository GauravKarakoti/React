import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect } from "react";

export default function showBalance() {
    const { connection } = useConnection();
    const wallet = useWallet();
    async function getMeUserBalance() {
        const balance = await connection.getBalance(wallet.publicKey);
        document.getElementById("balance").innerHTML = balance / LAMPORTS_PER_SOL;
    }
    useEffect(() => {
        getMeUserBalance();
    }, [wallet, connection]);
    return (
        <div className="card">
            <h2>Wallet Balance</h2>
            <div className="balance-value">
                <span id="balance">0</span> <span>SOL</span>
            </div>
        </div>
    );
}