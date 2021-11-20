window.alert("Lets Play!");
var playerName=window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney=10;
console.log(playerName, playerHealth, playerAttack, playerMoney);

var enemyNames=["Roborto","Amy Android","Robo Trumble"];
var enemyHealth="50";
var enemyAttack="12";

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);

//fight function
var fight=function(enemyName){
    while(enemyHealth>0&&playerHealth>0){
        //Ask user if they want to fight
        var promptFight=window.prompt(
            "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
        );
        //user chooses to skip fight
        if (promptFight==="skip"||promptFight==="SKIP"){
            window.alert(playerName+" has choosen to skip the fight.");
            var confirmSkip=window.confirm("Are you sure you'd like to quit?");
            if(confirmSkip){
                window.alert(playerName+" has decided to skip this fight. Goodbye.");
                playerMoney=Max.math(0,playerMoney-10);
                console.log("playerMoney: ",playerMoney)
                break;
            }
        }
    
        //user chooses to fight
        var damage=randomNumber(playerAttack-3,playerAttack);
        enemyHealth=Math.max(0,enemyHealth-damage);
        console.log(
        playerName + " attacked " + enemyName + ". "+enemyName+" now has "+enemyHealth+" health remaining."
        );
        
        var damage=randomNumber(enemyAttack-3,enemyAttack);
        playerHealth=Math.max(0,playerHealth-damage);
        console.log(
            enemyName+" attacked "+playerName+". "+playerName+" now has "+playerHealth+" health remaining."
        )
        // check enemy's health
        if(enemyHealth<=0){
            window.alert(enemyName+" has died!");
        } 
        else{
            window.alert(enemyName+" still has "+enemyHealth+" health left.");
        }
        //check player's health
        if(playerHealth<=0){
            window.alert(playerName+" has died!");
        }
        else{
            window.alert(playerName+" still has "+playerHealth+" health left.");
        }
    }
};

//start game function
var startGame=function(){

    //reset player stats
    playerHealth=100;
    playerAttack=10;
    playerMoney=10;

    //start a round
    for(var i = 0; i < enemyNames.length; i++) {
        if(playerHealth>0){
            window.alert("Welcome to Robot Gladiators! Round " + (i+1));
        }
        else{
            window.alert("You have lost your robot in battle. Gamer Over!");
            break;
        }
        var pickedEnemyName=enemyNames[i];
        enemyHealth=randomNumber(40,60);
        fight(pickedEnemyName);

        //if we're not at the last enemy in the array
        if(playerHealth>0 && i<enemyNames.length -1){
            //ask player if they want to shop
            var shopConfirm=window.confirm("The fight is over, visit the store before the next round?");
            if(shopConfirm){
                shop();
            }
        }
        //play again
        //startGame();
    }
    endGame();
};

//end game function
var endGame=function(){
    if(playerHealth>0){
    window.alert("The game has now ended. Let's see how you did! You now have a score of " + playerMoney+".");
    }
    else{
        window.alert("You lost your robot in battle.");
    }

    //ask player if they want to play again
    var playAgainConfirm=window.confirm("Would you like to play again?");

    if(playAgainConfirm){
        //restart game
        startGame();
    }
    else{
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

var shop = function(){
    window.alert("welcome to the shop");

    //ask player what they'd like to do
    var shopOptionPrompt=window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    
    //choices
    switch(shopOptionPrompt){
        case "refill":
        case "REFILL":
            if(playerMoney>=7){
                window.alert("Refilling player's health by 20 for 7 dollars.")
            
                //increase health decrease money
                playerMoney=playerMoney-7;
                playerHealth=playerHealth+20;
                }
            else{
                window.alert("You don't have enough money.")
            }
        break;

        case "upgrade":
        case "UPGRADE":
            if (playerMoney>=7){
                window.alert("Upgrading player's atack by 6 for 7 dollars");

                //decrease money upgrade attack
                playerMoney=playerMoney-7;
                playerAttack=playerAttack+6;
            }
            else{
                window.alert("You don't have enough money.")
            }
        break;

        case "leave":
        case "LEAVE":
            window.alert("Leaving store.");
            //function ends
        break;

        default:
            window.alert("You did not puck a valid option. Try again.");

            //call shop again to force a valid option
            shop();
        break;
    }
}

//function to generate a random numeric value
var randomNumber=function(min,max){
    var value=Math.floor(Math.random()*(max-min+1)+min);
    return value;
}

//start game
startGame();