
   pragma solidity >0.4.99;
   contract Weather {
       address payable public owner;
       uint256 public minimumBet;
       uint256 public totalBet;
       uint256 public numberOfBets;
       uint256 public maxAmountOfBets = 1000;

       address payable[] public players;

       struct Player {
          uint256 amountBet;
          bool over;
       }

       // Address of the player and => the user info
       mapping(address => Player) public playerInfo;  //find method

       function kill() public {
          if(msg.sender == owner) selfdestruct(owner);
        }

       constructor() public {
          owner = msg.sender;
          minimumBet = 100000000000000;
          totalBet = 0;
       }

       function checkPlayerStatus(address player) public view returns(bool) {
           for(uint256 i=0; i<players.length; i++) {
               if(players[i] == player) {return true;}
           }
           return false;
       }

       function checkBalance() public view returns(uint256) { return totalBet;}

       function bet(bool over) public payable {
           require(!checkPlayerStatus(msg.sender));

           require(msg.value >= minimumBet);

           playerInfo[msg.sender].amountBet = msg.value;
           playerInfo[msg.sender].over = over;

           players.push(msg.sender);

           totalBet += msg.value;
       }

       function distributePrizes(bool result) public {

          require(msg.sender == owner);
          address payable[1000] memory winners;

          uint256  winnercount = 0;
          uint256  losingbet = 0;
          uint256  winningbet = 0;


          for(uint256 i=0; i<players.length; i++) {
              if(playerInfo[ players[i]].over == result) {
                  winningbet += playerInfo[ players[i]].amountBet;
                  winners[winnercount] =  players[i];
                  winnercount++;
              }
              else {
                  losingbet += playerInfo[players[i]].amountBet;
              }
          }

          for(uint256 j=0; j<winnercount; j++) {
              if(winners[j] != address(0)) {
                 winners[j].transfer((playerInfo[winners[j]].amountBet*(10000+(losingbet*10000/winningbet)))/10000 );
              }
          }

          delete playerInfo[players[players.length-1]];

          delete players;

          losingbet = 0; //reinitialize the bets
          winningbet = 0;
          totalBet = 0;


       }
   }
