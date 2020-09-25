import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import EtherscanProvider, { useEtherscan, useBalance, useTransactionList } from "react-use-etherscan";

function ConsumeTransactionList() {
  const {loading, result, error, refetch} = useTransactionList({
    address: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
  });
  console.warn('transaction', loading, result, error);
  return (
    <TouchableOpacity
      onPress={refetch}
      style={{
        flex: 1,
        backgroundColor: "green",
      }}
    />
  );
}

function ConsumeBalance() {
  const {loading, result, error, refetch} = useBalance({
    address: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
  });
  console.warn('balance', loading, result, error);
  return (
    <TouchableOpacity
      onPress={refetch}
      style={{
        flex: 1,
        backgroundColor: "orange",
      }}
    />
  );
}

export default function App() {
  return (
    <EtherscanProvider apiKey="">
      <View style={StyleSheet.absoluteFill}>
        <SafeAreaView />
        <ConsumeTransactionList />
        <ConsumeBalance />
        <SafeAreaView />
      </View>
    </EtherscanProvider>
  );
}
