let camoParcel = artifacts.require("./CamoParcel.sol");

module.exports = function (deployer, network) {
	deployer.deploy(camoParcel);
};