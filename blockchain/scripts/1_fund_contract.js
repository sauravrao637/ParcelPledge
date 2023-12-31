const { sendFunds } = require('./0_utils')
const CamoParcel = artifacts.require("CamoParcel");

module.exports = async function (callback) {
	try {
		const accounts = await web3.eth.getAccounts();
		const sender = accounts[0];

		console.log("connected accounts: ", accounts);

		const camoParcel = await CamoParcel.deployed();
		console.log("const addrParcel = " + "\"" + camoParcel.address + "\"");

		try {
			await sendFunds(camoParcel, sender);
		} catch (error) {
			console.error(error);
		}

	} catch (error) {
		console.error(error);
	}
	callback();
}