import { useCallback } from "react";
import useEtherscan from "./useEtherscan";

export type useEtherscanUrlsResult = {
  getTransactionUrl: (hash: string) => string;
  getAddressUrl: (address: string) => string;
};

export default function useEtherscanUrls(): useEtherscanUrlsResult {
  const { network } = useEtherscan();

  const getTransactionUrl = useCallback(
    (hash: string) => `https://${network}.etherscan.io/tx/${hash}`,
    [network]
  );

  const getAddressUrl = useCallback(
    (address: string) => `https://${network}.etherscan.io/address/${address}`,
    [network]
  );

  return { getTransactionUrl, getAddressUrl };
}
