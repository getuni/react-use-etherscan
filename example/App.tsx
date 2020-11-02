import React, { useState, useEffect } from 'react';
import { Text, ActivityIndicator } from "react-native";

import EtherscanProvider, { useTokenBalance } from "react-use-etherscan";

function SimplePrint({
  prefix,
  result,
  loading,
  error,
}: {
  prefix: string,
  result: unknown,
  loading: boolean,
  error: Error | null
}) {
  if (loading) {
    return <ActivityIndicator />
  } else if (error) {
    return <Text style={{ color: 'red' }} children={error.message} />
  }
  return <Text children={`${prefix} ${JSON.stringify(result)}`}/>;
}

function NazBalance() {
  const tokenBalance = useTokenBalance({
    address: "0x312e71162Df834A87a2684d30562b94816b0f072",
    tokenName: "",
    contractAddress: "0x4BBBD966ea913545aD556045b7aF18f52A0aE91c",
  });
  return <SimplePrint prefix="@cawfree's balance in $NAZ: " {...tokenBalance} />
}

export default function App(): JSX.Element {
  return (
    <EtherscanProvider apiKey="your-api-key" network="mainnet">
      <NazBalance />
    </EtherscanProvider>
  );
}
