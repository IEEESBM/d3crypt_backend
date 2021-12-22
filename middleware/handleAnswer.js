var userInput = 'the power of sun in the palm of my hand';

answerArray = ['power of the sun',
                'the power of sun in the palm of my hand',
                'hello peter'                
];


let result = checkAnswer(userInput);

console.log(result);


function checkAnswer(input) {
    
    for(let i=0; i<answerArray.length; i++){
        if(compareInput(input, answerArray[i])){
            return true;
        }
    }
    return false;
}


function compareInput(ans, correctAns) {
    return ans.toLowerCase() === correctAns;
}