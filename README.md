
# **AVALANCHE INTERMEDIATE MODULE 2**

## **Project Title: Solidity Smart Contract for Event Ticketing DApp**

### **Smart Contract Interface**

### **Description**

The `EventTicketing` Solidity smart contract is designed for a decentralized application (DApp) to manage event ticket sales. The smart contract allows users to purchase tickets, check remaining tickets, and handle ticket transfers securely on the Ethereum blockchain. It provides a real-world example of using smart contracts for digital asset management in a transparent and secure manner.

### **Overview**

This project demonstrates the implementation of a smart contract for an event ticketing system, showcasing essential Solidity features such as event handling, secure payment transactions, and interaction with a web3 frontend using MetaMask. The DApp interface is built with React.js, providing a seamless user experience for interacting with the smart contract functions.

## **Getting Started**

Follow these steps to set up and run the contract on your local machine:

### **Installing**

1. **Clone the GitHub repository to your local machine:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd your-repo
   ```

3. **Install the project dependencies:**

   ```bash
   npm install
   ```

### **Executing Program**

1. **Open two additional terminals in your VS Code.**

2. **In the second terminal, start a local Ethereum node using Hardhat:**

   ```bash
   npx hardhat node
   ```

3. **In the third terminal, deploy the smart contract to the local network:**

   ```bash
   npx hardhat run --network localhost scripts/deploy.js
   ```

4. **In the first terminal, launch the front-end:**

   ```bash
   npm run dev
   ```

5. **Access the project in your web browser at [http://localhost:3000/](http://localhost:3000/).**

### **Project Structure**

- **`contracts/`**: Contains the Solidity smart contract file `EventTicketing.sol`.
- **`artifacts/`**: Stores compiled contract artifacts.
- **`scripts/`**: Includes scripts for deploying contracts.
- **`pages/`**: Holds the frontend code for interacting with the smart contract, specifically `index.js`.
- **`hardhat.config.js`**: Hardhat configuration file.
- **`package.json`**: Project configuration and dependencies.
- **`README.md`**: Project documentation.

### **Smart Contract Features**

- **Purchase Ticket:** Allows users to purchase event tickets by sending Ether to the contract.
- **Check Remaining Tickets:** Provides functionality to view the number of tickets remaining for the event.
- **Ticket Transfer:** Enables users to transfer their purchased tickets to another account securely.
- **Secure Payments:** Utilizes `require` statements to handle secure Ether transactions and error handling.

### **Technologies Used**

- **Solidity:** For writing the smart contract.
- **Hardhat:** For local blockchain development and contract deployment.
- **Ethers.js:** For interacting with the Ethereum blockchain.
- **React.js:** For building the frontend user interface.
- **MetaMask:** For user wallet connection and transaction signing.

### **Author**

Ajaykr3137

