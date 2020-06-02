import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import './createmodule.css';

function Createmodule() {
const [questions, setQuestions] = useState();
const [currentQuestion, setCurrentQuestion] = useState(1);
const [questionMakerDialog, openQuestionMakerDialog] = useState();
const [questionCreationParentQuestion, setQuestionCreationParentQuestion] = useState();
const [parentOption, setParentOption] = useState();
const [optionOne, setOptionOne] = useState();
const [optionTwo, setOptionTwo] = useState();
const [optionThree, setOptionThree] = useState();
const [questionName, setQuestionName] = useState();
const [parentModuleCoordinates, setParentModuleCoordinates] = useState();

const [testNode, setTestNode] = useState();

useEffect(() => {
    console.log(questions);
    console.log(questionCreationParentQuestion);
    console.log(currentQuestion);

})

function createQuestion(){ 
    if(!questions){
        setQuestions([{questionid: currentQuestion, questionname: questionName, optionone: optionOne, optiontwo: optionTwo, optionthree: optionThree, parentquestion: null, childrenquestions: 0 }])
    }
    else if(questions[0].childrenquestions <= 3){
        setQuestions([...questions, {questionid: currentQuestion, questionname: questionName, optionone: optionOne, optiontwo: optionTwo, optionthree: optionThree, parentquestion: questionCreationParentQuestion, parentoption: parentOption, parenttop: parentModuleCoordinates.top, parentleft: parentModuleCoordinates.left, parentbottom: parentModuleCoordinates.bottom, parentright: parentModuleCoordinates.right, children: 0, childquestion: questions[questionCreationParentQuestion].children + 1 }])
    }
    //questions is empty, so this is the FIRST question.    setCurrentQuestion(currentQuestion + 1);
    setOptionOne();
    setOptionTwo();
    setOptionThree();
    openQuestionMakerDialog(false);
    setCurrentQuestion(currentQuestion + 1);
}

function createModule(){
    console.log("create");
    fetch('http://localhost:5000/createflow', {headers:{'Content-Type': 'application/json'}, method: 'POST', body: JSON.stringify(questions)})
    .then(res => res.json)
    .then(data => console.log(data));
    
}

function insertTestNode(coordinates){
    console.log(coordinates);
    setTestNode({position: 'absolute', zindex: 10, backgroundColor: 'black', top: coordinates.top + 110 + "px", left: coordinates.left, bottom: coordinates.bottom, right: coordinates.right, height: '30px', width: '30px'  })
}

function getModulePosition(childnumber, questionid){
    if(questionid == 1){
        return null;
    }
    if(childnumber == 1){
        return {position: 'absolute', top: questions[1].parenttop + 125 + "px", left: questions[1].parentleft + 100 + "px", bottom: questions[1].bottom, right: questions[1].parentright, height: 113 + "px", width: 174 + "px"};
    }
    if(childnumber == 2){
        return {position: 'absolute', top: questions[questionid].parenttop + 125 + "px", left: questions[questionid].parentleft - 100 + "px", bottom: questions[questionid].bottom, right: questions[questionid].parentright, height: 113 + "px", width: 174 + "px"};
    }
    if(childnumber == 3){
        return {position: 'absolute', top: questions[questionid].parenttop + 125 + "px", left: questions[questionid].parentleft - 300 + "px", bottom: questions[questionid].bottom, right: questions[questionid].parentright, height: 113 + "px", width: 174 + "px"};
    }
    //{position: 'absolute', top: question.parenttop + 125 + "px", left: question.parentleft + 100 + "px", bottom: question.parentbottom, right: question.parentright, height: 113 + "px", width: 174 + "px"} : {backgroundcolor: 'red'}
}

return (
    <div>
        <div onClick={() => openQuestionMakerDialog(true)}>
            Create question
        </div>
        
        <div className="createquestioncardscontainer">
                {questions && questions.map(question =>
                    <div style={getModulePosition(question.childquestion, question.questionid)} key={question.questionid} className="questioncard">
                        <p>{question.questionid}</p>
                        <p>{question.questionname}</p>
                        <p>{question.optionone}</p>
                        <p>{question.optiontwo}</p>
                        <p>{question.optionthree}</p>
                        <div onClick={(e) => { setParentModuleCoordinates(e.target.getBoundingClientRect()); openQuestionMakerDialog(true); setQuestionCreationParentQuestion(question.questionid)}} className="addquestion"></div>
                </div>)}
        </div>

        {questionMakerDialog &&
        <div className="questioncreationdialog">
            <h1>Question ID: </h1>
            {questionCreationParentQuestion && 
                questions.map(question => 
                    question.questionid == questionCreationParentQuestion &&
                    <select key={question.questionid} onChange={e => setParentOption(e.target.value)} placeholder="Parent option">
                        <option >Choose corresponding question</option>
                        <option value={question.optionone}>{question.optionone}</option>
                        <option value={question.optiontwo}>{question.optiontwo}</option>
                        <option value={question.optionthree}>{question.optionthree}</option>
                    </select>
                     )}
                    <input onChange={(e) => setQuestionName(e.target.value)} placeholder="questionname"></input>
                    <input onInput={(e) => setOptionOne(e.target.value)}placeholder="option 1"></input>
                    <input onInput={(e) => setOptionTwo(e.target.value)}placeholder="option 2"></input>
                    <input onInput={(e) => setOptionThree(e.target.value)}placeholder="option 3"></input>
                    <button onClick={createQuestion}>Create</button>
                </div>}
        <button onClick={createModule}>SUBMIT FLOW</button>
    </div>
)
}

export default Createmodule;
