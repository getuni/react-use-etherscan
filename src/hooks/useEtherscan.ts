import { useContext } from "react";

import { EtherscanContext } from "../contexts";

const useEtherscan = () => useContext(EtherscanContext);

export default useEtherscan;
