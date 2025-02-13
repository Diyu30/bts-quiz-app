import React, { useEffect, useState } from 'react'
import '../styles/Result.css';
import { Link } from 'react-router-dom';

import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number } from '../helper/helper';

/** import actions  */
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult';

import { useNavigate } from 'react-router-dom';


export default function Result() {

    const navigate = useNavigate();  // Hook for navigation
    const dispatch = useDispatch()
    const { questions : { queue ,answers}, result : { result, userId}}  = useSelector(state => state)

    const [showPopup, setShowPopup] = useState(false);
    const [noAttemptsPopup, setNoAttemptsPopup] = useState(false);

    const totalPoints = queue.length * 10; // Total possible points
    const passingScore = totalPoints * 0.6; // 60% passing threshold (90 points for 150)

    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10)
    const flag = earnPoints >= passingScore; // Pass if earnPoints >= 90

    /** Show BTS ARMY pop-up if passed and attempts were made */
    useEffect(() => {
        if (flag && attempts > 0) {
            setShowPopup(true);
        }
    }, [flag, attempts]);

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

    /** Show No Attempts pop-up and redirect */
    useEffect(() => {
        if (attempts === 0) {
            setNoAttemptsPopup(true);
            setTimeout(() => {
                navigate('/');  // Redirect to main page
                window.location.reload(); // Force full refresh
            }, 5000);
        }
    }, [attempts, navigate]);

    // Function to get message based on earned points
    const getPerformanceMessage = (points) => {
        if (points >= 130) {
            return { title: "✨ Excellent! ✨", message: "대박! (Daebak!) You're a legendary BTS ARMY! 💜 Your passion shines like a Dynamite stage! 💜" };
        } else if (points >= 90) {
            return { title: "👏 Good Job! 👏", message: "You are on the way to being a BTS ARMY! 🚀 Keep going! 💜" };
        } else {
            return { title: "🎶 Keep Trying! 🎶", message: "You can do better! Fighting! 💜" };
        }
    };

    // Get message based on earned points
    const { title, message } = getPerformanceMessage(earnPoints);

  return (
    <div className='container'>
        <h1 className='title text-light'>BTS Quiz Application</h1>

        {/* Show results only if attempts were made */}
        {attempts > 0 && (
            <>
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
                    <ResultTable />
                </div>
            </>
        )}

        {/* Show BTS ARMY pop-up only if attempts were made */}
        {showPopup && !noAttemptsPopup && (
            <div className="popup-active">
                <div className="popup-content">
                    <h2>{title}</h2>
                    <p>{message}</p>
                    <button className="popup-btn" onClick={() => setShowPopup(false)}>💜 Borahae! 💜</button>
                </div>
            </div>
        )}

        {/* Show No Attempts pop-up if no questions were answered */}
        {noAttemptsPopup && (
            <div className="popup-active">
                <div className="popup-content">
                    <h2>⚠️ No Answers Attempted</h2>
                    <p>You did not attempt any questions. Try Again...</p>
                </div>
            </div>
        )}

        {/* Show incorrect answers if at least one answer is wrong */}
        {attempts > 0 && result.some((userAnswerIndex, index) => userAnswerIndex !== answers[index]) && (
            <div className="incorrect-answers">
                <h2>❌ Incorrect Answers</h2>
                {queue.map((question, index) => {
                    const userAnswerIndex = result[index] ?? -1; // Handle undefined values
                    const correctAnswerIndex = answers[index];

                    if (userAnswerIndex !== correctAnswerIndex) {
                        return (
                            <div key={index} className="wrong-answer">
                                <p><strong>Q{index + 1}: {question.question}</strong></p>
                                <p>Your Answer:&nbsp;
                                    <span style={{ color: '#d70101' }}>
                                        {userAnswerIndex !== -1 ? question.options[userAnswerIndex] : "No Answer"}
                                    </span>
                                </p>
                                <p>Correct Answer:&nbsp;
                                    <span style={{ color: 'green' }}>
                                        {question.options[correctAnswerIndex]}
                                    </span>
                                </p>
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
