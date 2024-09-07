// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventTicketing {
    address public owner;
    uint256 public ticketPrice;
    uint256 public totalTickets;
    uint256 public remainingTickets;
    mapping(address => uint256) public ticketsOwned;

    event TicketsPurchased(address indexed buyer, uint256 quantity);
    event TicketTransferred(address indexed from, address indexed to, uint256 quantity);

    constructor(uint256 _ticketPrice, uint256 _totalTickets) {
        owner = msg.sender;
        ticketPrice = _ticketPrice;
        totalTickets = _totalTickets;
        remainingTickets = _totalTickets;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function buyTicket() external payable {
        uint256 quantity = msg.value / ticketPrice;
        require(quantity > 0, "Insufficient funds for ticket");
        require(remainingTickets >= quantity, "Not enough tickets available");

        ticketsOwned[msg.sender] += quantity;
        remainingTickets -= quantity;

        emit TicketsPurchased(msg.sender, quantity);
    }

    function transferTicket(address _to, uint256 _quantity) external {
        require(ticketsOwned[msg.sender] >= _quantity, "Insufficient tickets");
        require(_to != address(0), "Invalid address");

        ticketsOwned[msg.sender] -= _quantity;
        ticketsOwned[_to] += _quantity;

        emit TicketTransferred(msg.sender, _to, _quantity);
    }

    function getRemainingTickets() external view returns (uint256) {
        return remainingTickets;
    }

    function getTicketPrice() external view returns (uint256) {
        return ticketPrice;
    }
}
