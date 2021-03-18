import { JsonRpcProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'

export function createProviderAndWallets(verboseRPC?: boolean): [JsonRpcProvider, Wallet, Wallet] {
  const provider = new JsonRpcProvider("http://127.0.0.1:8545")
  const wallet = new Wallet("0xe3d9be2e6430a9db8291ab1853f5ec2467822b33a1a08825a22fab1425d2bff9", provider)
  const other = new Wallet("0x5a09e9d6be2cdc7de8f6beba300e52823493cd23357b1ca14a9c36764d600f5e", provider)
  
  if (verboseRPC) {
    provider.on('debug', event => {
      if (event.action == 'request') {
        console.log(">>>", event.request)
      } else if (event.action == 'response') {
        console.log("<<<", "id=" + event.request.id, event.response)
      }
    })
  }

  return [provider, wallet, other]
}
