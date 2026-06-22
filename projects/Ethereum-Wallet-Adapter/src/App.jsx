import { createConfig, http, injected, useAccount, useBalance, useConnect, useSendTransaction, WagmiProvider } from 'wagmi'
import './App.css'
import { mainnet } from 'viem/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { parseEther } from 'viem';
import { useState } from 'react';

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected()
  ], transports: {
    [mainnet.id]: http('https://eth.drpc.org')
  }
});
const queryClient = new QueryClient();
function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector />
        <EthSend />
        <MyAddress />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
function MyAddress() {
  const { address } = useAccount();
  // BigInt
  const { data, isPending, isError, error } = useBalance({ address });
  console.log(data);
  if (error) console.error("Balance Fetch Error:", error.message);
  if (!address) return <div>Please connect your wallet.</div>;
  
  if (isPending) return <div>Loading balance...</div>;
  
  if (isError) return <div>Error fetching balance.</div>;
  return <div>
    {address}<br/>
    {data?.value.toString()} ETH
  </div>
}
function WalletConnector() {
  const {connectors, connect} = useConnect();
  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}
function EthSend() {
  const {data: hash, sendTransaction} = useSendTransaction();
  const [amount, setAmount] = useState('');
  function sendEth() {
    sendTransaction({
      to: document.getElementById("address").value,
      value: parseEther(amount)
    })
  }
  return <div>
    <input id="address" type='text' placeholder='Address...'></input>
    <input onChange={(e) => setAmount(e.target.value)} type='text' placeholder='Amount'></input>
    <button onClick={sendEth}>Send ETH</button>
    {hash}
  </div>
}

export default App
