import { useEffect, useState, useCallback } from "react";

import { useEtherscan } from ".";

export default function useEtherscanStateful() {
  const etherscan = useEtherscan();
  const [state, setState] = useState({ result: null, loading: true, error: null });

  const query = useCallback(
    fn => (async () => {
      try {
        setState(s => ({ ...s, loading: true, error: null }));
        const result = await fn(etherscan);
        setState({ result, loading: false });
      } catch (error) {
        setState({ loading: false, result: null, error });
      }
    })() && undefined,
    [etherscan, setState],
  );

  return { ...state, query };
}
