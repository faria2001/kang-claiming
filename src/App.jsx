import './App.css'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'c8b096efc3137c5e2fec8cc5520f190e'

// 2. Create wagmiConfig
const metadata = {
  name: 'Everlodge',
  description: 'Everlodge',
  url: 'https://everlodge.io/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet]
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  themeVariables: {
    '--w3m-accent': '#feb74d',
    '--w3m-border-radius-master': '0px'
  }

})


function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Hero />
        <Footer />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
