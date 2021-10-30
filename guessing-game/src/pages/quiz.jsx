/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import Header from "../components/header/header.component";
import GameMainImage from "../components/game-image/game-image.component";
import Score from "../components/progress-bar/progress-bar.component";
import { data } from "../fake-data/data";

function Quiz() {
   const url = window.location.href;
   const urlSplit = url.split("/");
   const id = urlSplit[4];
   const [arrNum, setArrNum] = useState(0);
   const [inputValue, setInputValue] = useState("");
   const [answersArr, setAnswersArr] = useState([]);
   const [myAnswer, setMyAnswer] = useState("");
   const [correctData, setCorrectData] = useState([]);

   const currentData = data.filter(function (item) {
      return item.id === id;
   });
   const quizData = currentData[0];

   let questionsFilter = quizData.images.filter(
      (itemX) => !correctData.includes(itemX.answer)
   );

   const nextQuestion = () => {
      setArrNum(arrNum + 1);
      const arrayLength = questionsFilter.length;
      const length = arrayLength - 1;

      console.log(arrayLength);

      if (arrNum >= length) {
         setArrNum(0);
      }
   };

   const prevQuestion = () => {
      const arrayLength = questionsFilter.length;

      setArrNum(arrNum - 1);

      if (arrNum <= 0) {
         setArrNum(arrayLength - 1);
      }
   };

   useEffect(() => {
      const ansArr = answersArr.length;
      const currAnswerNum = ansArr - 1;
      const CurrAnswer = answersArr[currAnswerNum];
      setMyAnswer(CurrAnswer);
   }, [answersArr]);

   // useEffect(() => {
   //    console.log("IBE ");
   // }, [quizData, myAnswer, arrNum]);

   useEffect(() => {
      const currData = quizData.images[arrNum];
      const answer = currData.answer;
      console.log("CHECK MY ANSWER", answer);
      const CorretAns = myAnswer == answer;

      console.log(CorretAns);
      console.log("this is the answer => => =>", answer);

      if (CorretAns) {
         setCorrectData([...correctData, myAnswer]);
      }
   }, [myAnswer, questionsFilter.length]);

   console.log(myAnswer);

   const checkAnswer = () => {
      const currData = quizData.images[arrNum];
      const answer = currData.answer;

      setAnswersArr([...answersArr, inputValue]);
   };

   // console.log("thi is the length => =>", questionsFilter.length);
   // console.log("thi is the arrNum => =>", arrNum);
   // console.log("this is the data => => => =>", questionsFilter);
   // console.log("this is search ", searches);
   // console.log("thi is the answer array => => => => => =>", answersArr);

   // console.log("thi sis my new arr", correctData);

   return (
      <div>
         <Header title="this is a quiz" />
         <div className="center-quiz">
            <div className="main-image-wrapper">
               <GameMainImage scr={quizData.image} />
            </div>

            <div className="control-wrapper">
               <div className="selected-image-wrapper">
                  <img
                     className="selected-image"
                     src={questionsFilter[arrNum].image}
                     alt="no-image"
                  />
               </div>

               <div className="score-answer-wrapper">
                  <div className="score-wrapper">
                     <Score />
                  </div>

                  <div className="input-wrapper">
                     <input
                        className="answer-input"
                        id="input"
                        type="text"
                        placeholder="Enter a Answer"
                        onChange={(ev) => setInputValue(ev.target.value)}
                     />
                     <div className="submit-wrapper">
                        <button className="submit" onClick={checkAnswer}>
                           Guess
                        </button>
                     </div>
                  </div>
               </div>

               <div className="buttons-wrapper">
                  <button
                     className="question-select-btn"
                     onClick={prevQuestion}
                  >
                     Previous
                  </button>
                  <button
                     className="question-select-btn"
                     onClick={nextQuestion}
                  >
                     Next
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Quiz;
