// scripts/deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Correctly get the contract factory
  const EventTicketing = await ethers.getContractFactory("EventTicketing");
  
  // Define the constructor arguments
  const totalTickets = 100; // Example: 100 tickets available
  const ticketPrice = ethers.utils.parseEther("0.1"); // Example: 0.1 ETH per ticket

  // Deploy the contract with constructor arguments
  const eventTicketing = await EventTicketing.deploy(totalTickets, ticketPrice);
  await eventTicketing.deployed();

  console.log("EventTicketing contract deployed to:", eventTicketing.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
