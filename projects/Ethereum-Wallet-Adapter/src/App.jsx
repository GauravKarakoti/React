import { createConfig, http, injected, useAccount, useBalance, useConnect, useSendTransaction, WagmiProvider } from 'wagmi'
import './App.css'
import { mainnet } from 'viem/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected()
  ], transports: {
    [mainnet.id]: http()
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
  const balance = useBalance({ address });
  console.log(balance);
  return <div>
    {address}<br/>
    {balance?.data?.formatted} ETH
  </div>
}
function WalletConnector() {
  const {connectors, connect} = useConnect();
  return connectors.map((connector) => {
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  })
}
function EthSend() {
  const {data: hash, sendTransaction} = useSendTransaction();
  function sendEth() {
    sendTransaction({
      to: document.getElementById("address").value,
      value: document.getElementById("amount").value * 1000000000000000000     // 18 0s = 1 ETH
    })
  }
  return <div>
    <input id="address" type='text' placeholder='Address...'></input>
    <input id="amount" type='text' placeholder='Amount'></input>
    <button onClick={sendEth}>Send ETH</button>
    {hash}
  </div>
}

export default App
