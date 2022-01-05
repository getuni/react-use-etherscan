import { useEffect, useState, useCallback } from "react";
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
  if (!message.startsWith("OK")) {
    throw new Error(JSON.stringify(data));
  }
  return result;
};

export default function useTransactionList({ address }: useTransactionListArgs) {
  const { query, loading, result, error } = useEtherscanStateful();

  const refetch = useCallback(() => query(fetchTransactionList(address)), [query, address]);

  useEffect(() => refetch() && undefined, [refetch]);

  return { loading, result, error, refetch };
};
