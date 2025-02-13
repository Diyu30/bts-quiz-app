import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/result_reducer'
import '../styles/Main.css'

export default function Main() {

    const inputRef = useRef(null)
    const dispatch = useDispatch()


    function startQuiz() {
        if (inputRef.current?.value) {
            const username = inputRef.current?.value;
            dispatch(setUserId(username));  // Store username in Redux
    
            // Store username in localStorage
            localStorage.setItem("username", username);
        }
    }    

  return (
    <div className='container'>

        <div className="logo-container">
            <img className='quiz-logo' src="https://i.postimg.cc/KjzkFbH6/logo2-removebg-preview.png" alt="Quiz Logo" />
            {/* <img className='heart-icon' src="https://i.postimg.cc/3Ncyx6Md/heart-removebg-preview.png" alt="Heart Icon" />
            <img className='army-logo' src="https://i.postimg.cc/Tw2hqGfK/army-removebg-preview.png" alt="Army Logo" />
            <img className='army-girl' src="https://i.postimg.cc/s2nCqGt4/girl-removebg-preview.png" alt="Army Girl" /> */}
        </div>

        <h1 className='title text-light'>BTS Quiz Application</h1>

        <ol className='instruction-list'>
            <li>Welcome, ARMY! Get ready for 15 fun BTS questions. 💜</li>
            <li>If you’re a true ARMY, you’ll ace this quiz! 💜 Each correct answer earns you 10 points. 🎶</li>
            <li>Pick the correct option from three choices!</li>
            <li>You can review and change your answers before finishing the quiz.</li>
            <li>Your final score will show how well you know BTS. 💜</li>
            <li>Are you ready, ARMY? Let’s go! 💜✨</li>
        </ol>

        <form id="form">
            <input ref={inputRef} className="userid" type="text" placeholder='Username' />
        </form>

        <div className='start'>
            <Link className='btn' to={'quiz'} onClick={startQuiz}>Start Quiz</Link>
        </div>

    </div>
  )
}
