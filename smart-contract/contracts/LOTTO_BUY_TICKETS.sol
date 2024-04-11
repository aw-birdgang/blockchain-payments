// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LottoSystem {
    struct Ticket {
        uint round;
        uint ticketId;
        uint timestamp;
        address buyer;
        uint[] numbers;
    }

    uint public currentRound = 1;
    uint private nextTicketId = 1;
    mapping(uint => Ticket) public tickets; // 티켓 ID를 키로 사용하는 매핑
    mapping(uint => uint[]) public roundToTickets; // 회차별 티켓 ID 목록

    event TicketPurchased(uint round, uint ticketId, address buyer, uint[] numbers);

    function buyTicket(uint[] calldata numbers) external {
        tickets[nextTicketId] = Ticket(currentRound, nextTicketId, block.timestamp, msg.sender, numbers);
        roundToTickets[currentRound].push(nextTicketId);
        emit TicketPurchased(currentRound, nextTicketId, msg.sender, numbers);
        nextTicketId++;
    }

    function getTicket(uint ticketId) public view returns (Ticket memory) {
        return tickets[ticketId];
    }

    function getTicketsByRound(uint round) public view returns (uint[] memory) {
        return roundToTickets[round];
    }

    // 새로운 회차를 시작하기 위한 함수
    function startNewRound() external {
        currentRound++;
    }
}
