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
    while(enemyHealth>0){
        //Ask user if they want to fight
        var promptFight=window.prompt(
            "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
        );
        //user chooses to fight
        if(promptFight === "fight" || promptFight === "FIGHT"){
            enemyHealth=enemyHealth-playerAttack;
            console.log(
            playerName + " attacked " + enemyName + ". "+enemyName+" now has "+enemyHealth+" health remaining."
            );
        
            playerHealth=playerHealth-enemyAttack;
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
        //user chooses to skip fight
        }else if (promptFight==="skip"||promptFight==="SKIP"){
            window.alert(playerName+" has choosen to skip the fight.");
            var confirmSkip=window.confirm("Are you sure you'd like to quit?");
            if(confirmSkip){
                window.alert(playerName+" has decided to skip this fight. Goodbye.");
                playerMoney=playerMoney-2;
            }
            else{
                fight();
            }
        }else{
            window.alert("You need to enter a valid option. Try again.");
        }
    }
};

//fight();

for(var i = 0; i < enemyNames.length; i++) {
   var pickedEnemyName=enemyNames[i];
    enemyHealth=50;
    fight(pickedEnemyName);
  }