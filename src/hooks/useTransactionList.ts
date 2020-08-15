import { useState, useEffect } from "react";
import { typeCheck } from "type-check";

import { useEtherscanStateful } from ".";

export type useTransactionListArgs = {
  address: string;
};

const TYPEDEF_TRANSACTION_LIST = "{status:String,message:String,result:[{blockNumber:String,...}]}";

const fetchTransactionList = address => async ({ account }) => {
  const data = await account.txlist(address);
  if (!typeCheck(TYPEDEF_TRANSACTION_LIST, data)) {
    throw new Error(`Expected ${TYPEDEF_TRANSACTION_LIST}, encountered ${data}.`);
  }
  const { message, result } = data;
  if (message !== "OK") {
    throw new Error(JSON.stringify(data));
  }
  return result;
};

export default function useTransactionList({ address }: useTransactionListArgs) {
  const [query, loading, result, error] = useEtherscanStateful();
  useEffect(
    () => query(fetchTransactionList(address)) && undefined,
    [query, address],
  );
  return [loading, result, error];
};
