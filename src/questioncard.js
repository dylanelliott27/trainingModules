import React, {useState, useRef, useEffect} from 'react';
import './App.css';

function Questioncard(props) {
    const [chosenOption, setChosenOption] = useState();
    const [loading, setLoading] = useState();
    const [currentQuestion, setCurrentQuestion] = useState();
 

    useEffect(() => {
        console.log(chosenOption)

        console.log(currentQuestion);
    })

    useEffect(() => {
        getFirstCard();
      }, []);
      

    const getFirstCard = () => {
        setLoading(true);
        fetch('http://localhost:5000/firstquestion')
        .then(res => res.json())
        .then(data => {
        setCurrentQuestion(data);
        });
    }

    const requestNextQuestion = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch('http://localhost:5000/nextquestion', {method: "POST",  headers: {'Content-Type': 'application/json',},
         body: JSON.stringify({currentQuestion: currentQuestion[0].questionid, value: chosenOption})})
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            setChosenOption(null);
            setCurrentQuestion(data)
        });
    }
    /*const nextCardValidate = (num) => {
        const previousCard = nextCard;
        console.log(previousCard);
        setNextCard(num);
        setLoading(num);
  
        fetch('http://localhost:5000/nextquestion', {method: "POST",  headers: {
          'Content-Type': 'application/json',
        }, body: JSON.stringify({currentQuestion: previousCard, value: chosenOption})})
        .then(res => res.json())
        .then(data => {setLoading(0); console.log(data); setChosenOption(null)});
        setTimeout(() => { ///remove this!!!!!!!! just for imitation
          
        }, 1000);
*/
return (
    <div className="card shadow-sm">
    <h5 className="text-center card-header">{currentQuestion && currentQuestion[0].question}</h5>
          <div className="d-flex justify-content-center align-center flex-column card-body">
              <div className="d-flex justify-content-center">
                  <div className="date mb-3">
                  </div>
              </div>
              {currentQuestion ? currentQuestion.map(option =>
              <>
                <label htmlFor={option.option_name}>{option.option_name}</label> 
                <input onClick={(e) => setChosenOption(e.target.value)}type="radio" name={option.question} value={option.option_name} />
              </>) : <p>loading</p>}
              <button className="mNamet-3 btn btn-secondary" disabled>Saved</button>
              <button href='#' onClick={(e) => requestNextQuestion(e)} className="mt-3 btn btn-primary">Next</button>
              
          </div>
          </div>


)}

export default Questioncard;