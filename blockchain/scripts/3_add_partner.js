const { GANCHE, PARTNERS_ADDR, addPartner } = require("./0_utils");

const CamoParcel = artifacts.require("CamoParcel");

module.exports = async function (callback) {
	try {
		const accounts = await web3.eth.getAccounts();
		const owner = accounts[0];
		const partners = GANCHE ? [accounts[2]] : PARTNERS_ADDR;

		const camoParcel = await CamoParcel.deployed();
		for (let i = 0; i < partners.length; i++) {
			await addPartner(camoParcel, owner, partners[i]);
		}
	} catch (error) {
		console.log(error);
	}
	callback();
}