pragma solidity ^0.8.0; 

contract Ranking {
    address _owner;
    
    address[] public players;
    uint256 public playerIndex;

    event PlayerRank(address indexed player, uint256 indexed amount);

    uint256 move;
    uint256 lastMoveBlock;

    mapping(address=> playerInfo) public score;

    struct playerInfo {
        address plaYer;
        uint256 score;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner);
        _;
    }

    constructor() {
        _owner = msg.sender;
        // lastMoveBlock = block.number;
    }
    function completeGame(uint256 amount) public {
        uint x = amount;
        addRanking(msg.sender, x);
    }

    function addRanking(address player, uint256 amount)
    internal {
        if(score[player].score == 0) {
            players.push(player);
            score[player].plaYer = player;
            playerIndex +=1; 
            score[player].score += amount;
        } 
        if (amount <= score[player].score) {
        score[player].score = amount;
        }

        emit PlayerRank(player, amount);
    }

    // function Move() public {
    //     require(getRank(), "Complete the game");

    //     lastMoveBlock = block.number;

    //     addRanking(msg.sender, move);
    // }

    // function getRank() public {
    //     require(!score == 0, "You did not start the game");


    // }
}