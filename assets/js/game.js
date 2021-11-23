window.alert("Lets Play!");

//function to generate a random numeric value
var randomNumber=function(min,max){
    var value=Math.floor(Math.random()*(max-min+1)+min);
    return value;
}

//naming player
var getPlayerName = function(){
    var name="";
    while(name==="" || name===null){
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is "+name);
    return name;
}

//Defining player
var playerInfo={
    name:getPlayerName(),
    health:100,
    attack:randomNumber(7,10),
    money:10,
    reset:function(){
        this.health=100;
        this.money=randomNumber(7,10);
        this.attack=10;
    },
    //refilling health
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
    //upgrading attack
    upgradeAttack:function(){
        if (this.money>=7){
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack+=6;
            this.money-=7;
        }
        else{
            window.alert("You don't have enough money.");
        }
    }
};

//defining enemy object
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

//fight or skip function
var fightOrSkip=function(){
    var promptFight=window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    if(!promptFight){
        window.alert("You must enter a valid entry. Try again.");
        return fightOrSkip();
    }

    //confirm skip
    promptFight=promptFight.toLocaleLowerCase();
    if (promptFight==="skip"){
        window.alert(playerInfo.name+" has choosen to skip the fight.");
        var confirmSkip=window.confirm("Are you sure you'd like to quit?");
        if(confirmSkip){
            window.alert(playerInfo.name+" has decided to skip this fight. Goodbye.");
            playerInfo.money=playerInfo.money-10;
            console.log("player money: ",playerInfo.money);
            return true;
        }
        return false;
    }

}

//fight function
var fight=function(enemy){
    console.log(enemy);
    console.log(playerInfo);
    console.log(Math.random());
    console.log(Math.random());

    //select who goes first
    var isPlayerTurn=true;
    if(Math.random()>0.5){
        isPlayerTurn=false;
    }

    //while enemy or player are alive
    while(enemy.health>0&&playerInfo.health>0){
        console.log("its players turn: ", isPlayerTurn);
        //players turn
        if(isPlayerTurn){
            //ask user to fight or skip
            if(fightOrSkip()){
                //if true, leave fight by breaking loop
                break;
            }
            //player attacks enemy
            var damage=randomNumber(playerInfo.attack-3,playerInfo.attack);
            enemy.health=Math.max(0,enemy.health-damage);
            console.log(
            playerInfo.name + " attacked " + enemy.name + ". "+enemy.name+" now has "+enemy.health+" health remaining."
            );
            // check enemy's health
            if(enemy.health<=0){
                window.alert(enemy.name+" has died!");
                //award for winning battle
                playerInfo.money=playerInfo.money+20;
                break;
            } 
            else{
                window.alert(enemy.name+" still has "+enemy.health+" health left.");
            }
        }
        else{
            //enemy attacks player
            var damage=randomNumber(enemy.attack-3,enemy.attack);
            playerInfo.health=Math.max(0,playerInfo.health-damage);
            console.log(
                enemy.name+" attacked "+playerInfo.name+". "+playerInfo.name+" now has "+playerInfo.health+" health remaining."
            );
            //check player's health
            if(playerInfo.health<=0){
                window.alert(playerInfo.name+" has died!");
            }
            else{
                window.alert(playerInfo.name+" still has "+playerInfo.health+" health left.");
            }
        }
        //switch turn order for next round
        isPlayerTurn=!isPlayerTurn;
    }
}

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
    //alert loss
    alert("You lost your robot in battle.");
    
    //check LocalStorage for high score
    var highScore=localStorage.getItem("highscore");
    if(highScore===null){
        highScore=0;
    }

    //new highscore
    if(playerInfo.money>highScore){
        localStorage.setItem("highscore",playerInfo.money);
        localStorage.setItem("name",playerInfo.name);

        alert(playerInfo.name+" now has the highscore of "+playerInfo.money);
    }
    else{
        alert(playerInfo.name+" you did not beat the highscore of "+highScore);
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
    "Would you like to 1)REFILL your health, 2)UPGRADE your attack, or 3)LEAVE the store? Please enter 1, 2, or 3 to make a choice."
    );
    shopOptionPrompt=parseInt(shopOptionPrompt);
    
    //choices
    switch(shopOptionPrompt){
        //increase health decrease money
        case 1:
            playerInfo.refillHealth();
        break;

        //decrease money upgrade attack
        case 2:
            playerInfo.upgradeAttack();
        break;

        case 3:
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