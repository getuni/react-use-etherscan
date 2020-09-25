import { useEffect, useState, useCallback } from "react";
import BigNumber from "bignumber.js";
import { typeCheck } from "type-check";

import { useEtherscanStateful } from ".";

export type useBalanceArgs = {
  address: string;
};

const TYPEDEF_BALANCE = "{status:String,message:String,result:String}";

const fetchBalance = address => async ({ account }) => {
  const data = await account.balance(address);
  if (!typeCheck(TYPEDEF_BALANCE, data)) {
    throw new Error(`Expected ${TYPEDEF_BALANCE} encountered ${data}.`);
  }
  const { message, result } = data;
  if (message !== "OK") {
    throw new Error(JSON.stringify(data));
  }
  return new BigNumber(result);
};

const useBalance = ({ address }: useBalanceArgs) => {
  const { query, loading, result, error } = useEtherscanStateful();

  const refetch = useCallback(() => query(fetchBalance(address)), [query, address]);

  useEffect(() => refetch() && undefined, [query, address]);

  return { loading, result, refetch, error };
};

export default useBalance;
