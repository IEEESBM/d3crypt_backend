var userInput = 'the power of sun in the palm of my hand';

answerArray = ['power of the sun',
                'the power of sun in the palm of my hand',
                'hello peter'                
];

checkAnswer(answerArray);

function checkAnswer(arrayOfAnswers) {
    
    arrayOfAnswers.forEach(element => {
    if(compareInput(userInput, element)){
        console.log('Right');
    }else{
        console.log('wrong!!')
    }
    });
}


function compareInput(ans, correctAns) {
    return ans.toLowerCase() === correctAns;
}