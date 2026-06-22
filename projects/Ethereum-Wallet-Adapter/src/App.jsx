import { createConfig, http, injected, useAccount, useBalance, useDisconnect, useConnect, useSendTransaction, WagmiProvider } from 'wagmi';
import { mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { parseEther } from 'viem';
import { useState } from 'react';
import './App.css';

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected()
  ], 
  transports: {
    [mainnet.id]: http('https://eth.drpc.org')
  }
});

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="app-container">
          <header className="app-header">
            <h1 className="logo-text">Web3 Portal</h1>
            <WalletConnector />
          </header>
          <main className="dashboard">
            <MyAddress />
            <EthSend />
          </main>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function MyAddress() {
  const { address } = useAccount();
  const { data, isPending, isError, error } = useBalance({ address });

  if (error) console.error("Balance Fetch Error:", error.message);
  
  if (!address) {
    return (
      <div className="glass-panel text-center">
        <h2>Welcome</h2>
        <p className="text-muted">Please connect your wallet to view your identity and send transactions.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel">
      <h2>Wallet Identity</h2>
      <div className="info-group">
        <span className="label">Address</span>
        <span className="value address-text">{address}</span>
      </div>
      <div className="info-group">
        <span className="label">Balance</span>
        {isPending && <span className="value">Loading balance...</span>}
        {isError && <span className="value error">Error fetching balance.</span>}
        {data && <span className="value highlight">{(data?.value / BigInt(1000000000000000000)).toString()} ETH</span>}
      </div>
    </div>
  );
}

function WalletConnector() {
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();

  if (isConnected) {
    return (
      <div className="connector-group">
        <button className="btn-connect" onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    );
  }
  
  return (
    <div className="connector-group">
      {connectors.map((connector) => (
        <button className="btn-connect" key={connector.uid} onClick={() => connect({ connector })}>
          Connect {connector.name}
        </button>
      ))}
    </div>
  );
}

function EthSend() {
  const { data: hash, sendTransaction } = useSendTransaction();
  const { address } = useAccount();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');

  function sendEth() {
    if (!toAddress || !amount) return;
    sendTransaction({
      to: toAddress,
      value: parseEther(amount)
    });
  }

  if (!address) return null;

  return (
    <div className="glass-panel">
      <h2>Transfer ETH</h2>
      <div className="input-group">
        <label className="label">Recipient Address</label>
        <input 
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)} 
          type="text" 
          placeholder="0x..."
        />
      </div>
      <div className="input-group">
        <label className="label">Amount (ETH)</label>
        <input 
          value={amount}
          onChange={(e) => setAmount(e.target.value)} 
          type="number" 
          step="0.0001"
          placeholder="0.00"
        />
      </div>
      <button className="btn-submit" onClick={sendEth}>Send Transaction</button>
      
      {hash && (
        <div className="transaction-hash">
          <span className="label">Tx Hash:</span>
          <span className="value address-text">{hash}</span>
        </div>
      )}
    </div>
  );
}

export default App;