// var userInput = 'the power of sun in the palm of my hand';
answerArray = ['power of the sun',
                'the power of sun in the palm of my hand',
                'hello peter'                
];


async function checkAnswer(input) {
    
    for(let i=0; i<answerArray.length; i++){
        if(await compareInput(input, answerArray[i])){
            return true;
        }
    }
    throw 'Wrong Answer!';
}


async function compareInput(ans, correctAns) {
    return ans.toLowerCase() === correctAns;
}


// checkAnswer(userInput)
// .then(data => { console.log(data);} )
// .catch(error => { console.log (error)} )


module.exports = { checkAnswer }
