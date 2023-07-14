const addrParcel = "0xc2Ae7c483088874e92BB8Cc30678e505745d396a";
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