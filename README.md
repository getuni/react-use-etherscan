# react-use-etherscan
🌊 🏄 ⚛️ React hooks for interacting with Etherscan. Supports Android/iOS/Web/Expo. This is a [**lifecycle-aware**](https://reactjs.org/docs/state-and-lifecycle.html) wrapper around [**etherscan-api**](https://github.com/sebs/etherscan-api).

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
  const [loading, balance, error] = useTransactionList({ address });
  console.warn(loading, balance, error);
  return null;
}

function BalanceOf({ address }) {
  const [loading, balance, error] = useBalance({ address });
  console.warn(loading, balance, error);
  return null;
}

function EthPrice() {
  const { stats } = useEtherscan();
  useEffect(
    () => (async () => {
      const {result} = await stats.ethprice();
      console.warn(result);
    })() && undefined,
    [stats],
  );
  return null;
}

export default function App() {
  const [address] = useState("0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae");
  return (
    <EtherscanProvider apiKey="your-api-key">
      <TransactionList address={address} />
      <BalanceOf address={address} />
      <EthPrice />
    </EtherscanProvider>
  );
}
```

## ✌️ License
[**MIT**](./LICENSE)
