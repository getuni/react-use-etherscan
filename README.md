# react-use-etherscan
🌊 🏄 ⚛️ React hooks for interacting with Etherscan. Supports Android/iOS/Web/Expo. This is a [**lifecycle-aware**](https://reactjs.org/docs/state-and-lifecycle.html) wrapper around [**etherscan-api**](https://github.com/sebs/etherscan-api).

### Migration Notes
  - When migrating from versions < `0.1.0-alpha.0`, using arrays to return information has been replaced with hooks, i.e.
    - `[loading, data, error]` becomes `{ loading, data, error, refetch }`.

## 🚀 Getting Started

Using [`yarn`](https://yarnpkg.com):

```
yarn add react-use-etherscan
```

## 🌱 Example

```javascript
import React, { useState, useEffect } from 'react';
import EtherscanProvider, { useEtherscan, useBalance, useTransactionList } from "react-use-etherscan";

function TransactionList({ address }) {
  const { loading, result, error } = useTransactionList({ address });
  console.warn(loading, result, error);
  return null;
}

function BalanceOf({ address }) {
  const { loading, result, error } = useBalance({ address });
  console.warn(loading, result, error);
  return null;
}

function EthPrice() {
  const { api: { stats } } = useEtherscan();
  useEffect(
    () => (async () => {
      const {result} = await stats.ethprice();
      console.warn('stats', result);
    })() && undefined,
    [stats],
  );
  return null;
}


export default function App() {
  const [address] = useState("0x2b58Af5592Ad3a14A6851a19b0b37012d5d497cF");
  return (
    <EtherscanProvider
      apiKey="your-api-key"
      network="rinkeby"
    >
      <BalanceOf address={address} />
      <EthPrice />
      <TransactionList address={address} />
    </EtherscanProvider>
  );
}
```

## ✌️ License

[**MIT**](./LICENSE)
