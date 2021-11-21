window.alert("Lets Play!");

//function to generate a random numeric value
var randomNumber=function(min,max){
    var value=Math.floor(Math.random()*(max-min+1)+min);
    return value;
}

//Defining player
var playerInfo={
    name:window.prompt("What is your robot's name?"),
    health:100,
    attack:10,
    money:10,
    reset:function(){
        this.health=100;
        this.money=10;
        this.attack=10;
    },
    refillHealth:function(){
        if(this.money>=7){
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health+=20;
            this.money-=7;
        }
        else{
            window.alert("You don't have enough money.");
        }
    },
    upgradeAttack:function(){
        if (this.money>=7){
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack+=6;
            this.money-=7;
        }
    }
};

//defining enemy
var enemyInfo=[
    {
        name:"Roborto",
        attack:randomNumber(10,14)
    },
    {
        name:"Amy Android",
        attack:randomNumber(10,14)
    },
    {
        name:"Robo Trumble",
        attack:randomNumber(10,14)
    }
];

//console log with right code
/*console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);*/

//fight function
var fight=function(enemy){
    console.log(enemy);
    while(enemy.health>0&&playerInfo.health>0){
        //Ask user if they want to fight
        var promptFight=window.prompt(
            "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
        );
        //user chooses to skip fight
        if (promptFight==="skip"||promptFight==="SKIP"){
            window.alert(playerInfo.name+" has choosen to skip the fight.");
            var confirmSkip=window.confirm("Are you sure you'd like to quit?");
            if(confirmSkip){
                window.alert(playerInfo.name+" has decided to skip this fight. Goodbye.");
                playerInfo.money=Max.math(0,playerInfo.money-10);
                console.log("player money: ",playerInfo.money)
                break;
            }
        }
    
        //user chooses to fight
        var damage=randomNumber(playerInfo.attack-3,playerInfo.attack);
        enemy.health=Math.max(0,enemy.health-damage);
        console.log(
        playerInfo.name + " attacked " + enemy.name + ". "+enemy.name+" now has "+enemy.health+" health remaining."
        );
        
        var damage=randomNumber(enemy.attack-3,enemy.attack);
        playerInfo.health=Math.max(0,playerInfo.health-damage);
        console.log(
            enemy.name+" attacked "+playerInfo.name+". "+playerInfo.name+" now has "+playerInfo.health+" health remaining."
        )
        // check enemy's health
        if(enemy.health<=0){
            window.alert(enemy.name+" has died!");
        } 
        else{
            window.alert(enemy.name+" still has "+enemy.health+" health left.");
        }
        //check player's health
        if(playerInfo.health<=0){
            window.alert(playerInfo.name+" has died!");
        }
        else{
            window.alert(playerInfo.name+" still has "+playerInfo.health+" health left.");
        }
    }
};

//start game function
var startGame=function(){

    //reset player stats
    playerInfo.reset();

    //start a round
    for(var i = 0; i < enemyInfo.length; i++) {
        if(playerInfo.health>0){
            window.alert("Welcome to Robot Gladiators! Round " + (i+1));
        }
        else{
            window.alert("You have lost your robot in battle. Gamer Over!");
            break;
        }
        var pickedEnemyObj=enemyInfo[i];
        pickedEnemyObj.health=randomNumber(40,60);
        fight(pickedEnemyObj);

        //if we're not at the last enemy in the array
        if(playerInfo.health>0 && i<enemyInfo.length -1){
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
}

//end game function
var endGame=function(){
    if(playerInfo.health>0){
    window.alert("The game has now ended. Let's see how you did! You now have a score of " + playerInfo.money+".");
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

//shop
var shop = function(){
    window.alert("welcome to the shop");

    //ask player what they'd like to do
    var shopOptionPrompt=window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    
    //choices
    switch(shopOptionPrompt){
        //increase health decrease money
        case "refill":
        case "REFILL":
            playerInfo.refillHealth();
        break;

        //decrease money upgrade attack
        case "upgrade":
        case "UPGRADE":
            playerInfo.upgradeAttack();
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

//start game
startGame();