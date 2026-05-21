import { ed25519 } from '@noble/curves/ed25519.js';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
export default function SignMessage({ onVerificationSuccess }) {
    const { publicKey, signMessage } = useWallet();
    async function onClick() {
        if (!publicKey) {
            throw new Error('Wallet not connected');
        }
        if (!signMessage) {
            throw new Error('Walet does not support message signing!');
        }
        const message = "Verify that you own this wallet";
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);
        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
            throw new Error('Message signature invalid');
        }
        console.log(`Message signature: ${bs58.encode(signature)}`);
        if (onVerificationSuccess) {
            onVerificationSuccess();
        }
    }
    return (
        <div className="sign-message-container">
            <button onClick={onClick} className="action-button" style={{background: 'transparent', border: '1px solid var(--primary-color)', color: 'var(--primary-color)'}}>
                Verify Wallet Ownership
            </button>
        </div>
    )
}