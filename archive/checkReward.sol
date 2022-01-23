pragma solidity ^0.8.0; 

// import "./PurseTokenUpgradable.sol";

contract checkReward {
    address _owner;

    address[] public players;
    uint256 public playerIndex;

    PurseTokenUpgradable public purseToken;

    event Scoredeclare(address indexed player, uint256 indexed amount, uint256 multi);
    // event updateReward(uint256 indexed multi);
    event tokenTransferred(address indexed player, uint256 indexed token);
    // uint256 move;

    mapping(address=> playerInfo) public score;

    struct playerInfo {
        address plaYer;
        uint256 scOre;
        uint256 mulTi;
    }

    // modifier onlyOwner() override {
    //     require(msg.sender == _owner);
    //     _;
    // }

    constructor() {
        _owner = msg.sender;
    }

    function startGame(uint256 token) public {
        // require(token>=1000);
        purseToken.transfer(_owner, token);
     }

    function completeGame(uint256 amount) public {
        uint x = amount;
        checkScore(msg.sender, x);
    }

    function checkScore(address player, uint256 amount) internal {
        
        if(amount == 10) {
            players.push(player);
            score[player].plaYer = player;
            playerIndex +=1;
            score[player].scOre += amount;
                        
            score[player].mulTi = 2;
            
            // getPurse(player, multi);
            emit Scoredeclare(player, amount, 2);
            // emit updateReward(multi);             
        }

        if(amount == 9) {
            players.push(player);
            score[player].plaYer = player;
            playerIndex +=1;
            score[player].scOre += amount;
                        
            score[player].mulTi = 3;
            
            // getPurse(player, multi);
            emit Scoredeclare(player, amount, 3);
            // emit updateReward(multi);             
        }

        if(amount == 8) {
            players.push(player);
            score[player].plaYer = player;
            playerIndex +=1;
            score[player].scOre += amount;
                        
            score[player].mulTi = 4;
            
            // getPurse(player, multi);
            emit Scoredeclare(player, amount, 4);
            // emit updateReward(multi);             
        }

        if(amount == 7) {
            players.push(player);
            score[player].plaYer = player;
            playerIndex +=1;
            score[player].scOre += amount;
                        
            score[player].mulTi = 5;
            
            // getPurse(player, multi);
            emit Scoredeclare(player, amount, 5);
            // emit updateReward(multi);             
        }

        if(amount == 6) {
            players.push(player);
            score[player].plaYer = player;
            playerIndex +=1;
            score[player].scOre += amount;
                        
            score[player].mulTi = 6;
            
            // getPurse(player, multi);
            emit Scoredeclare(player, amount, 6);
            // emit updateReward(multi);             
        }
                
    }

    

    // function getPurse(address _to, uint256 multi) public onlyOwner {
    //     require(_to != address(0), "send to blackhole"   );
    //     _to = msg.sender; 
    //     uint256 purseTokenbet = 1000;
    //     uint256 rewardPurse = purseTokenbet* multi ;
        
    //     emit updateReward(rewardPurse); 
    //     // eth.transfer(_to, rewardPurse);
    // }

}