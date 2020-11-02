import { useEffect, useState, useCallback } from "react";
import { typeCheck } from "type-check";

import { useEtherscanStateful } from ".";

export type useTokenBalanceArgs = {
  address: string;
  tokenName: string;
  contractAddress: string;
};

const TYPEDEF_TOKEN_BALANCE = "{status:String,message:String,result:String,...}";

const fetchTokenBalance = (address: string, tokenName: string, contractAddress: string) => async ({ account }) => {
  const data = await account.tokenbalance(address, tokenName, contractAddress);
  if (!typeCheck(TYPEDEF_TOKEN_BALANCE, data)) {
    throw new Error(`Expected ${TYPEDEF_TOKEN_BALANCE}, encountered ${data}.`);
  }
  const { message, result } = data;
  if (message !== "OK") {
    throw new Error(JSON.stringify(data));
  }
  return result;
};

export default function useTokenBalance({
  address,
  tokenName,
  contractAddress,
}: useTokenBalanceArgs) {
  const { query, loading, result, error } = useEtherscanStateful();

  const refetch = useCallback(() => query(fetchTokenBalance(address, tokenName, contractAddress)), [query, address, tokenName, contractAddress]);

  useEffect(() => refetch() && undefined, [refetch]);

  return { loading, result, error, refetch };
};
