const CamoParcel = artifacts.require("CamoParcel");
const { addShipper, GANCHE, SHIPPER_ADDR } = require('./0_utils');

module.exports = async function (callback) {
	try {
		const accounts = await web3.eth.getAccounts();
		const owner = accounts[0];
		const shipperv = GANCHE ? accounts[1] : SHIPPER_ADDR;

		const camoParcel = await CamoParcel.deployed();
		console.log("const addrParcel = " + "\"" + camoParcel.address + "\"");

		await addShipper(camoParcel, owner, shipperv);
	} catch (error) {
		console.log(error);
	}
	callback();
}