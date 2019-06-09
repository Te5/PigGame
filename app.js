/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/ 

let scores, roundScore, activePlayer, gamePlaying, activePlayerLastDiceRoll;
init();
function init()
    {
        gamePlaying = true;
        //scores for both players
        scores = [0,0];
        roundScore = 0;
        activePlayer = 0;
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';

        //setting all the scores to zero at the beginning
        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
                  
        document.getElementById('name-0').textContent = 'Player 1';    
        document.getElementById('name-1').textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('winner');      
        document.querySelector('.player-1-panel').classList.remove('winner');      
        document.querySelector('.player-0-panel').classList.remove('active');  
        document.querySelector('.player-1-panel').classList.remove('active');    
        document.querySelector('.player-0-panel').classList.add('active');    
        
        
    }


// document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + dice + '</em>';

// let x = document.querySelector('#score-0').textContent;
// console.log(x);




var diceDOM = document.querySelector('.dice');
let diceDOM2 = document.querySelector('.dice2');

function nextPlayer()
{
            //Next player
            activePlayer === 0? activePlayer = 1 : activePlayer = 0;
            roundScore = 0;
            
            document.getElementById('current-0').textContent = '0';
            document.getElementById('current-1').textContent = '0';

            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');
            
            // document.querySelector('.player-0-panel').classList.remove('active');
            // document.querySelector('.player-1-panel').classList.add('active');
            diceDOM.style.display = 'none';    
            diceDOM2.style.display = 'none';   
}

document.querySelector('.btn-roll').addEventListener('click', function()
    {
        if(gamePlaying) {
            //1. Random number to be generated
            dice1 = Math.floor(Math.random() * 6) + 1;
            dice2 = Math.floor(Math.random() * 6) + 1;

            diceSum = dice1 + dice2;
            //1. Here to check whether previous dice roll and the current one equals 6.
            if(activePlayerLastDiceRoll === 12 && dice === 12)
            {
                activePlayerLastDiceRoll = null;
                scores[activePlayer] = 0;
                document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
                nextPlayer();
                alert('Two 6`s in a row!! that is cheating');
            } else
            {
                //2. Display the result
                
                diceDOM.style.display = 'block';
                diceDOM2.style.display = 'block';
                diceDOM.src = 'dice-'+ dice1 + '.png';
                diceDOM2.src = 'dice-'+ dice2 + '.png';

                activePlayerLastDiceRoll = dice1 + dice2;
                

                document.querySelector('#current-'+activePlayer).textContent = dice1+ dice2;

                //3. Update the round score IF rolled number != 1
                if (dice1 !== 1 && dice2 !==1)
                {
                    //Add score
                    roundScore += (dice1 + dice2);
                    document.querySelector('#current-'+activePlayer).textContent = roundScore;



                } else
                {
                    nextPlayer();
                }
            }

        }
    });

document.querySelector('.btn-hold').addEventListener('click', function(){
        if(gamePlaying)
        {
            //1. Current score adds to Player`s total score
            scores[activePlayer] += roundScore;
            document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
            activePlayerLastDiceRoll = null;
            let finalScore;

            document.querySelector('.final-score').value? finalScore = document.querySelector('.final-score').value : finalScore = 100;
            //2. Check if player won the game
            if(scores[activePlayer] >= finalScore)
            {
                document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
                diceDOM.style.display = 'none';   
                diceDOM2.style.display = 'none'; 
                document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner'); 
                document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active'); 
                gamePlaying = false;            
            } else
            {
                //3. Change of active player        
                nextPlayer();
                        
            }
        }

});


//new game button functionality
document.querySelector('.btn-new').addEventListener('click', init);
