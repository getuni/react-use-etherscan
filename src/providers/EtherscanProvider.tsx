import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { init } from "etherscan-api";

import { EtherscanContext } from "../contexts";

export type EtherscanProviderProps = {
  apiKey: string;
  network: string;
  timeout: number;
};

function createClient(
  apiKey: string,
  network: string,
  timeout: number
): object {
  if (typeof apiKey !== "string" || apiKey.length <= 0) {
    throw new Error(`Expected String apiKey, encountered ${apiKey}.`);
  } else if (typeof network !== "string" || network.length <= 0) {
    throw new Error(`Expected String network, encountered ${network}.`);
  }
  if (network === "mainnet") {
    return init(apiKey);
  }
  return init(apiKey, network, timeout);
}

function EtherscanProvider({
  apiKey,
  network,
  timeout,
  ...extras
}: EtherscanProviderProps): JSX.Element {
  const [api, setApi] = useState(() => createClient(apiKey, network, timeout));
  useEffect(() => setApi(createClient(apiKey, network, timeout)), [
    apiKey,
    network,
    timeout,
    setApi,
  ]);
  return (
    <EtherscanContext.Provider
      value={{
        api,
        network,
      }}
      {...extras}
    />
  );
}

EtherscanProvider.propTypes = {
  apiKey: PropTypes.string.isRequired,
  network: PropTypes.string,
  timeout: PropTypes.number,
};

EtherscanProvider.defaultProps = {
  network: "ropsten",
  timeout: 3000,
};

export default EtherscanProvider;
