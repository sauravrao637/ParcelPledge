const addrParcel = "0x36012A1eF720430CdEe297a4b7Ad4c189A185FCb";
const DEFAULT_USER_TYPE = "2";
const TYPE_SHIPPER = "0";
const TYPE_PARTNER = "1";
const TYPE_OWNER = "999";

const DEBUG = true;
const TESTING_USER_TYPE = DEFAULT_USER_TYPE;

const CHAIN_PARAMS = {
	chainId: "0x33",
	chainName: "XDC Apothem Network",
	nativeCurrency: { name: "TXDC", symbol: "TXDC", decimals: 18 },
	rpcUrls: ["https://erpc.apothem.network"],
	blockExplorerUrls: ["https://explorer.apothem.network/"],
};
export { addrParcel, CHAIN_PARAMS, DEFAULT_USER_TYPE, TYPE_SHIPPER, TYPE_PARTNER, TYPE_OWNER, DEBUG, TESTING_USER_TYPE }