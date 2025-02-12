import React, { useEffect, useState } from 'react'
import '../styles/Result.css';
import { Link } from 'react-router-dom';

import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';

/** import actions  */
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult';


export default function Result() {

    const dispatch = useDispatch()
    const { questions : { queue ,answers}, result : { result, userId}}  = useSelector(state => state)

    const [showPopup, setShowPopup] = useState(false);

    const totalPoints = queue.length * 10; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10)
    const flag = flagResult(totalPoints, earnPoints)

    /** Show BTS ARMY pop-up if passed */
    useEffect(() => {
        if (flag) {
            setShowPopup(true);
        }
    }, [flag]);

    /** store user result */
    usePublishResult({
        result,
        username: userId,
        attempts,
        points: earnPoints,
        achived: flag ? "Passed" : "Failed"
    });

    function onRestart(){
        dispatch(resetAllAction())
        dispatch(resetResultAction())
        setShowPopup(false); // Hide pop-up on restart
    }

  return (
    <div className='container'>
        <h1 className='title text-light'>BTS Quiz Application</h1>

        <div className='result flex-center'>
            <div className='flex'>
                <span>Username</span>
                <span className='bold'>{userId || ""}</span>
            </div>
            <div className='flex'>
                <span>Total Quiz Points : </span>
                <span className='bold'>{totalPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Questions : </span>
                <span className='bold'>{ queue.length || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Attempts : </span>
                <span className='bold'>{attempts || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Earn Points : </span>
                <span className='bold'>{earnPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Quiz Result</span>
                <span style={{ color : `${flag ? "#2aff95" : "#ff2a66" }` }} className='bold'>{flag ? "Passed" : "Failed"}</span>
            </div>
        </div>

        <div className="start">
            <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
        </div>

        <div className="container">
            {/* result table */}
            <ResultTable></ResultTable>
        </div>

         {/* Show pop-up with background shadow */}
        {showPopup && (
            <div className="popup-active">
                <div className="popup-content">
                    <h2>🎶 You are a True ARMY! 💜</h2>
                    <p>"Yeah, you know it! BTS & ARMY Forever! 💜"</p>
                    <button className="popup-btn" onClick={() => setShowPopup(false)}>💜 Borahae! 💜</button>
                </div>
            </div>
        )}

        {/* Show incorrect answers only if the user fails */}
        {!flag && result.length > 0 && (
            <div className="incorrect-answers">
                <h2>❌ Incorrect Answers</h2>
                {queue.map((question, index) => {
                    const userAnswerIndex = result[index]; // User's selected answer index
                    const correctAnswerIndex = answers[index]; // Correct answer index

                    if (userAnswerIndex !== correctAnswerIndex) {
                        return (
                            <div key={index} className="wrong-answer">
                                <p><strong>Q{index + 1}: {question.question}</strong></p>
                                <p>Your Answer: <span style={{ color: '#d70101' }}>{question.options[userAnswerIndex] || "No Answer"}</span></p>
                                <p>Correct Answer: <span style={{ color: 'green' }}>{question.options[correctAnswerIndex]}</span></p>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        )}

    </div>
  )
}
