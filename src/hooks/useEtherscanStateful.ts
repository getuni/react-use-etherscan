import { useEffect, useState, useCallback } from "react";

import { useEtherscan } from ".";

export default function useEtherscanStateful() {
  const etherscan = useEtherscan();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = useCallback(
    fn => (async () => {
      try {
        setLoading(true);
        setResult(await fn(etherscan));
      } catch (error) {
        setResult(null);
        setError(error);
      } finally {
        setLoading(false);
      }
    })() && undefined,
    [etherscan, setResult, setLoading, setError],
  );

  return [query,  loading, result, error];
}
