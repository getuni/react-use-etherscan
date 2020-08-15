import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import EtherscanProvider, {
  useEtherscan,
  useBalance,
  useTransactionList,
} from "./lib";

function ConsumeEtherscan() {
  const [loading, balance, error] = useTransactionList({
    address: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
  });
  console.warn(loading, balance, error);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "green",
      }}
    />
  );
}

export default function App() {
  return (
    <EtherscanProvider apiKey="">
      <View style={StyleSheet.absoluteFill}>
        <SafeAreaView />
        <ConsumeEtherscan />
        <SafeAreaView />
      </View>
    </EtherscanProvider>
  );
}
