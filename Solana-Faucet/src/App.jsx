import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css'
import Airdrop from './Airdrop.jsx'
import ShowBalance from './ShowBalance.jsx'
// Airdrop
function App() {
  // create your own rpc url? Alchemy
  return (
    <ConnectionProvider endpoint={`https://solana-devnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="container">
            <header className="header">
              <h1>Solana Faucet</h1>
              <div style={{width: "100vw", display: "flex", justifyContent: "center"}} className="wallet-buttons">
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
            </header>
            <main style={{width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", gap: "2rem"}}>
              <Airdrop />
              <ShowBalance />
            </main>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
