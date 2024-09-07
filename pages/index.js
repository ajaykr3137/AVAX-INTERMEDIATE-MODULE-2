import { useState, useEffect } from "react";
import { ethers } from "ethers";
import eventTicketingAbi from "../artifacts/contracts/Assessment.sol/EventTicketing.json"; // Ensure the path to the ABI is correct

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [eventTicketing, setEventTicketing] = useState(undefined);
  const [remainingTickets, setRemainingTickets] = useState(undefined);
  const [ticketPrice, setTicketPrice] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed contract address
  const eventTicketingABI = eventTicketingAbi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // Once wallet is set, get a reference to the deployed contract
    getEventTicketingContract();
  };

  const getEventTicketingContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const eventTicketingContract = new ethers.Contract(
      contractAddress,
      eventTicketingABI,
      signer
    );

    setEventTicketing(eventTicketingContract);
  };

  const getContractDetails = async () => {
    if (eventTicketing) {
      try {
        const tickets = await eventTicketing.remainingTickets();
        const price = await eventTicketing.ticketPrice();
        
        // Convert BigNumber to string and format price
        setRemainingTickets(tickets.toString());
        setTicketPrice(ethers.utils.formatEther(price));
      } catch (error) {
        console.error("Error fetching contract details: ", error);
      }
    }
  };

  const purchaseTicket = async () => {
    if (eventTicketing) {
      try {
        const price = await eventTicketing.ticketPrice();
        const tx = await eventTicketing.buyTicket({
          value: price, // Ensure this matches the ticket price
        });
        await tx.wait(); // Wait for the transaction to be confirmed
        getContractDetails(); // Update contract details after purchase
      } catch (error) {
        console.error("Error purchasing ticket: ", error);
        alert("Transaction failed. Please check the console for more details.");
      }
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this service.</p>;
    }

    if (!account) {
      return (
        <button className="btn connect-btn" onClick={connectAccount}>
          Connect MetaMask Wallet
        </button>
      );
    }

    if (remainingTickets === undefined || ticketPrice === undefined) {
      getContractDetails();
    }

    return (
      <div className="info-container">
        <p><strong>Your Account:</strong> {account}</p>
        <p><strong>Remaining Tickets:</strong> {remainingTickets}</p>
        <p><strong>Ticket Price:</strong> {ticketPrice} ETH</p>
        <button className="btn purchase-btn" onClick={purchaseTicket}>Purchase Ticket</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>🎟️ Welcome to the Event Ticketing DApp! 🎟️</h1>
        <p>Purchase tickets securely using your MetaMask wallet.</p>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 30px;
          text-align: center;
          background: linear-gradient(135deg, #4e54c8, #8f94fb);
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          color: #fff;
          font-family: 'Poppins', sans-serif;
        }

        header {
          margin-bottom: 40px;
        }

        h1 {
          color: #fff;
          font-size: 3em;
          margin-bottom: 10px;
        }

        p {
          color: #e0e0e0;
          font-size: 1.2em;
          margin: 10px 0;
        }

        .info-container {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          margin-top: 20px;
          border-radius: 10px;
          backdrop-filter: blur(5px);
        }

        .btn {
          display: inline-block;
          padding: 15px 25px;
          margin-top: 20px;
          font-size: 1.2em;
          font-weight: bold;
          color: #ffffff;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: linear-gradient(135deg, #ff416c, #ff4b2b);
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(255, 75, 43, 0.6);
        }

        .connect-btn {
          background: linear-gradient(135deg, #1f4037, #99f2c8);
        }

        .connect-btn:hover {
          box-shadow: 0 8px 16px rgba(153, 242, 200, 0.6);
        }

        .purchase-btn {
          background: linear-gradient(135deg, #ff8c00, #ff0080);
        }

        .purchase-btn:hover {
          box-shadow: 0 8px 16px rgba(255, 0, 128, 0.6);
        }
      `}</style>
    </main>
  );
}
