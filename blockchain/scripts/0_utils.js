const GANCHE = false;
const SHIPPER_ADDR = "0x5f2b6C5BC8d96Cd813e0641aab18504e3b825E8c";
const PARTNER_ADDR = "0x996d97848c1BccecAe9e3Ba36Eb38Ea4C8112fac";


const sendFunds = async (camoParcel, sender) => {
	console.log("sendFunds() called");
	const result = await camoParcel.fund.sendTransaction({ from: sender, value: "100000000000000000000" });
	console.log("result: ", result);
	await checkBalance(camoParcel);
}

const checkBalance = async (camoParcel) => {
	console.log("checkBalance() called");
	const result = await camoParcel.getBalance.call();
	console.log("result: ", result.toString());
}

const addShipper = async (camoParcel, owner, shipper) => {
	console.log("addShipper() called");
	const result = await camoParcel.addShipper.sendTransaction(shipper, { from: owner });
	console.log("result: ", result);
}

const addPartner = async (camoParcel, owner, partner) => {
	console.log("addPartner() called");
	const result = await camoParcel.addPartner.sendTransaction(partner, { from: owner });
	console.log("result: ", result);
}

module.exports = {
	GANCHE,
	SHIPPER_ADDR,
	PARTNER_ADDR,
	sendFunds,
	checkBalance,
	addShipper,
	addPartner
}