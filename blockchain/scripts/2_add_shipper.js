const CamoParcel = artifacts.require("CamoParcel");
const { addShipper, GANCHE, SHIPPERS_ADDR } = require('./0_utils');

module.exports = async function (callback) {
	try {
		const accounts = await web3.eth.getAccounts();
		const owner = accounts[0];
		const shippers = GANCHE ? [accounts[1]] : SHIPPERS_ADDR;

		const camoParcel = await CamoParcel.deployed();
		console.log("const addrParcel = " + "\"" + camoParcel.address + "\"");
		for (let i = 0; i < shippers.length; i++) {
			await addShipper(camoParcel, owner, shippers[i]);
		}
	} catch (error) {
		console.log(error);
	}
	callback();
}