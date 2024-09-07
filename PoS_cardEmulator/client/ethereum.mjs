import { createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { getEnsAddress } from '@wagmi/core'

window.diomerda = {
    createConfig: createConfig,
    configureChains: configureChains,
    mainnet: mainnet,
    publicProvider: publicProvider,
    getEnsAddress: getEnsAddress
}