pragma solidity ^0.8.0; 

import "./Token.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Ranking {
    address _owner;    
    address[] public players;
    uint256 public playerIndex;
    bool public paymentMade;
    

    // mapping(address => uint256) public balanceOf;

    Token public token;

    event PlayerRank(address indexed player, uint256 indexed amount, uint256 indexed multi);
    event tokenPaid(bool indexed payment);
    event Scoredeclare(address indexed player, uint256 indexed amount, uint256 multi);

    // uint256 move;
    // uint256 lastMoveBlock;

    mapping(address=> playerInfo) public score;

    struct playerInfo {
        address plaYer;
        uint256 score;
        uint256 mulTi;
    }

    // modifier onlyOwner() {
    //     require(msg.sender == _owner);
    //     _;
    // }

    constructor(Token _token) {        
        token = _token;
        _owner = msg.sender;
        // lastMoveBlock = block.number;
    }
    
    function startGame() public {
        // require( token.balanceOf(address(this)) >= 1000*(10 ** 18), "Not enough purse token.");
       uint tokenAmount = 1000000000000000000000;
       _owner = 0x2a9830C640d84fCeA5DF266cfEaA33428937F265;   
       token.transfer(_owner, tokenAmount);
       
    //    emit tokenPaid(true);
              
     }

    
    
    function completeGame(uint256 amount) public {
        uint x = amount;
        addRanking(msg.sender, x);
    }

    function addRanking(address player, uint256 amount) internal {
        uint256 multi;
        if(score[player].score == 0) {
            if (amount <= 10 || amount >= 6) {
            checkScore(player, amount);            
            } else {
            players.push(player);
            score[player].plaYer = player;
            playerIndex +=1; 
            score[player].score += amount;
            multi = 0;
            }
            
            
        } else 
        if (amount <= score[player].score) {
        score[player].score = amount;
        }
        
        emit PlayerRank(player, amount, multi);
    }

    function checkScore(address player, uint256 amount) internal {
        
        if(amount == 10) {
            players.push(player);
            score[player].plaYer = player;
            playerIndex +=1;
            score[player].score += amount;
                        
            score[player].mulTi = 2;
            
            token.transfer(msg.sender, 2000000000000000000000);
            // getPurse(player, multi);
            emit Scoredeclare(player, amount, 2);
            // emit updateReward(multi);             
        }

        if(amount == 9) {
            players.push(player);
            score[player].plaYer = player;
            playerIndex +=1;
            score[player].score += amount;
                        
            score[player].mulTi = 3;
            
            // getPurse(player, multi);
            token.transfer(msg.sender, 3000000000000000000000);
            emit Scoredeclare(player, amount, 3);
            // emit updateReward(multi);             
        }

        if(amount == 8) {
            players.push(player);
            score[player].plaYer = player;
            playerIndex +=1;
            score[player].score += amount;
                        
            score[player].mulTi = 4;
            
            token.transfer(msg.sender, 4000000000000000000000);
            // getPurse(player, multi);
            emit Scoredeclare(player, amount, 4);
            // emit updateReward(multi);             
        }

        if(amount == 7) {
            players.push(player);
            score[player].plaYer = player;
            playerIndex +=1;
            score[player].score += amount;
                        
            score[player].mulTi = 5;

            token.transfer(msg.sender, 5000000000000000000000);
            // getPurse(player, multi);
            emit Scoredeclare(player, amount, 5);
            // emit updateReward(multi);             
        }

        if(amount == 6) {
            players.push(player);
            score[player].plaYer = player;
            playerIndex +=1;
            score[player].score += amount;
                        
            score[player].mulTi = 6;
            
            token.transfer(msg.sender, 6000000000000000000000);
            // getPurse(player, multi);
            emit Scoredeclare(player, amount, 6);
            // emit updateReward(multi);             
        }
                     
    }
    
}