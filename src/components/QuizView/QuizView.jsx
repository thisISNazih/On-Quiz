import React from 'react';
import ActionButton from '../../sharedComponent/ActionButton/ActionButton';
import './styles.scss';
const QuizView = (
    { question, answers, nextClickHandler, updateRatingIncrease }
) => {
    return (
        <div className='quizView-wrapper'>
            <div className='quizView-wrapper__trial'>
                <label>TRY ON QUIZ</label>
                <label>30 DAYS RISK FREE</label>
            </div>
            <div className='quizView-wrapper__content'>
                <h3 className='question'>{question.copy}</h3>
                <div className='answers'>
                    {answers.map((answer,i) => {
                        return <ActionButton key={answer.i} text={answer.copy} varient="outlined" clickHandler={()=>nextClickHandler(answer)} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default QuizView;