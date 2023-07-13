const { GANCHE, PARTNER_ADDR, addPartner } = require("./0_utils");

const CamoParcel = artifacts.require("CamoParcel");

module.exports = async function (callback) {
	try {
		const accounts = await web3.eth.getAccounts();
		const owner = accounts[0];
		const partner = GANCHE ? accounts[2] : PARTNER_ADDR;

		const camoParcel = await CamoParcel.deployed();

		await addPartner(camoParcel, owner, partner);
	} catch (error) {
		console.log(error);
	}
	callback();
}