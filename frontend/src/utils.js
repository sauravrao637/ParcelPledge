const addrParcel = "0x2A0D1C191a59AA99041de69d2a9D4B3F6b88D768"
const DEFAULT_USER_TYPE = "2";
const TYPE_SHIPPER = "0";
const TYPE_PARTNER = "1";
const TYPE_OWNER = "999";

const DEBUG = false;
const TESTING_USER_TYPE = TYPE_SHIPPER;

const CHAIN_PARAMS = {
	chainId: "0x33",
	chainName: "XDC Apothem Network",
	nativeCurrency: { name: "TXDC", symbol: "TXDC", decimals: 18 },
	rpcUrls: ["https://erpc.apothem.network"],
	blockExplorerUrls: ["https://explorer.apothem.network/"],
};


const QRCode = require('qrcode');

const generateQRCode = async (text) => {
	try {
		const dataUrl = await QRCode.toDataURL(text);
		return dataUrl;
	} catch (error) {
		console.error(error);
	}
};

export { addrParcel, CHAIN_PARAMS, DEFAULT_USER_TYPE, TYPE_SHIPPER, TYPE_PARTNER, TYPE_OWNER, DEBUG, TESTING_USER_TYPE, generateQRCode }