## Inspiration
The project have been inspired by the desire to create a decentralized and transparent system for tracking parcels and improving the efficiency of logistics processes while guaranteeing the compensation for parcel delay. The **CamoParcel** smart contract provides functionality for shippers to ship parcels, partners to update parcel locations, and receivers to get automatic compensation on delayed delivery. 

## What it does
User can receive parcel by just having an account on XDC blockchain and without any registration.
To create a shipment the user has to register as shipper or as a partner for updating location of shipments, which he can do by writing an email and specifying the wallet address.
- **Shippers** can ship parcels after providing details such as the item name, description, receiver's wallet address, expected delivery time, base compensation, and OTP . On successful shipment creation shipper will be provided with QR that can be sticked on the parcel.
- **Partners** can update the location of parcels by scanning the QR or entering the parcel-id manually.
- Partners can mark parcels as delivered by scanning the QR on parcel and entering OTP from the receiver. If the OTP matches, the parcel's status is updated to delivered, and compensation will be sent to the receiver if there is a delay in delivery.
- **Users** can view their parcels and it's corresponding details in `My Parcels` Tab.

## How we built it
ParcelPledge utilizes user accounts on the XDC Blockchain to enable various entities to participate and utilize the platform effectively. Shippers, partners, and receivers can create their accounts on the XDC Blockchain, providing a secure and decentralized environment for their interactions within the CamoParcel ecosystem. This approach ensures transparency, immutability, and reliability of the data and transactions performed by different entities on the platform.

## Challenges we ran into
- Understanding and implementing smart contract logic correctly.
- Integrating the front-end with the smart contract and interacting with the blockchain.
- Handling asynchronous operations and managing the state of the application.
- Ensuring security and reliability of the smart contract code and the application as a whole.

## Accomplishments that we are proud of
- Successfully implementing the parcel tracking system using the CamoParcel smart contract.
- Creating a user-friendly and intuitive front-end interface for interacting with the smart contract.
- Integrating different technologies and libraries effectively to build the project.
- Testing the functionality of the system and ensuring it works as intended.

## What we learned
- Solidity programming for creating smart contracts.
- Truffle and Ganache as development tool.
- Interacting with the XDC blockchain using Web3.js.
- Building user interfaces with React and UI libraries like Chakra UI.
- Understanding and implementing a dApp architecture.
- Working with events emitted by smart contracts and handling them in the front-end application.

## What's next
- Adding additional features and functionality to the parcel tracking & insurance system, such as user reviews/ratings.
- Enhancing the UI and UX to make it more intuitive and visually appealing.
- Conducting further testing and optimization to improve the efficiency and reliability of the system.
- Expanding the project to support multiple parcel types, advanced analytics, or integration with other logistics systems or platforms.

Business Plan- 
[Google Doc](https://docs.google.com/document/d/1mnUCdxMC7ntAxSSS8gyzJfGrSGU-cPpT_4hVj-rgmys/)

Demo -

[![Watch the video](https://img.youtube.com/vi/8eQbibi4N3s/default.jpg)](https://youtu.be/8eQbibi4N3s)

