import React, { useState, useEffect } from 'react';

import QuizView from '../QuizView/QuizView';
import Header from '../../sharedComponent/Header/Header';
import ActionButton from '../../sharedComponent/ActionButton/ActionButton';
import LoadingState from '../../sharedComponent/LoadingState/LoadingState';
import './styles.scss';
import ShoesListingPage from '../ShoesListingPage/ShoesListingPage';

const HIGHEST_RATINGS_COUNT = 3;
const LandingPage = () => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [shoesList, setShoesList] = useState([]);
  const [updatedShoesList, setUpdatesForShoesList] = useState([]);
  const [nextQuestionId, setNextQuestionId] = useState(0)
  const [isLoading, setIsLoading] = useState(false);

  const startQuizHandler = () => {
    setStartQuiz(true)
  }
  const restartQuiz = () => {
    setIsLoading(false);
    setStartQuiz(false)
    setShowResults(false)
    setNextQuestionId(0)
    setUpdatesForShoesList([])
  }
  const ratingIncreaseHandler = (ratingIncrease) => {
    let shoesListWithRatings = [];
    shoesList.forEach((shoes => {
      let ratingIncreaseValue = ratingIncrease[shoes.id]
      let getPreviousVal = updatedShoesList.length > 0 ? updatedShoesList.find((item) => shoes.id === item.id).rating : 0
      let shoesRating = {
        id: shoes.id,
        name: shoes.name,
        rating: getPreviousVal + ratingIncreaseValue
      }
      shoesListWithRatings.push(shoesRating)
    }))
    setUpdatesForShoesList(shoesListWithRatings)
  }
  const nextQuestionHandler = (answer) => {
    if (answer.nextQuestion != "") {
      setNextQuestionId(answer.nextQuestion)
      ratingIncreaseHandler(answer.ratingIncrease)
    } else {
      setStartQuiz(false)
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false);
        setShowResults(true);
      }, 2000)

    }

  }
  const getHighestRatedShoes = () => {
    const maxRating = updatedShoesList.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
    return maxRating.slice(0, HIGHEST_RATINGS_COUNT);
  }
  const findQuestionById = (questionAnswerId) => {
    return quizQuestions && quizQuestions.find((question) => question.id === questionAnswerId)
  }

  useEffect(() => {
    fetch('./data.json').then((res) => {
      return res.json();
    }).then((data) => {
      setQuizQuestions(data.questions)
      setShoesList(data.shoes)
    })
  }, [])

  const returnLandingView = () => {
    return (
      <div className='homepage-wrapper'>
        <img src={"./assets/bg-screen.png"} alt="x" />
        <div className='homepage-wrapper__content'>
          <h2>Take the quiz and try your first pair!</h2>
          <ActionButton clickHandler={startQuizHandler} text={"Try On Trial"} varient={"contained"} />
          <small>30 Days risk free</small>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Header />
      {!startQuiz && !isLoading && !showResults && returnLandingView()}
      {startQuiz && <QuizView key={nextQuestionId} question={findQuestionById(nextQuestionId)} answers={findQuestionById(nextQuestionId).answers} nextClickHandler={(next) => nextQuestionHandler(next)} />}
      {isLoading && <LoadingState />}
      {showResults && <ShoesListingPage highestRatedShoes={getHighestRatedShoes()} restartHandler={restartQuiz} />}
    </div>



  )
}
export default LandingPage