// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LOTTO {
    // 관리자 주소를 저장하는 변수
    address public manager;

    // 로또 구매 내역을 저장하는 구조체
    struct Ticket {
        uint drawNumber; // 회차 번호
        uint[] numbers; // 구매한 로또 번호
    }

    // 회차별 로또 구매 내역을 저장하는 매핑. 키는 회차 번호, 값은 해당 회차에 구매한 티켓의 배열
    mapping(uint => Ticket[]) public ticketsByDraw;

    // 사용자가 구매한 티켓을 추적하는 매핑. 키는 사용자의 주소, 값은 사용자가 구매한 티켓 배열
    mapping(address => Ticket[]) public ticketsByPlayer;

    // 스마트 계약 생성자, 계약을 배포하는 사람을 관리자로 설정
    constructor() {
        manager = msg.sender;
    }

    // 관리자만이 호출할 수 있는 함수를 위한 modifier
    modifier onlyManager() {
        require(msg.sender == manager, "Only the manager can perform this action.");
        _;
    }

    // 로또 티켓을 구매하는 함수
    function buyTicket(uint _drawNumber, uint[] memory _numbers) public {
        require(_numbers.length == 6, "Ticket must contain exactly 6 numbers.");
        // 구매한 티켓 정보를 생성
        Ticket memory newTicket = Ticket({drawNumber: _drawNumber, numbers: _numbers});
        // 회차별 티켓 배열에 새 티켓 추가
        ticketsByDraw[_drawNumber].push(newTicket);
        // 사용자별 티켓 배열에 새 티켓 추가
        ticketsByPlayer[msg.sender].push(newTicket);
    }

    // 특정 회차의 모든 로또 티켓을 조회하는 함수
    function getTicketsByDraw(uint _drawNumber) public view returns (Ticket[] memory) {
        return ticketsByDraw[_drawNumber];
    }

    // 특정 사용자가 구매한 모든 로또 티켓을 조회하는 함수
    function getTicketsByPlayer(address _player) public view returns (Ticket[] memory) {
        return ticketsByPlayer[_player];
    }
}