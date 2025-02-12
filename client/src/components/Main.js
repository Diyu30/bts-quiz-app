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
