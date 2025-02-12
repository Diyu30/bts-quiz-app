import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/result_reducer'
import '../styles/Main.css'

export default function Main() {

    const inputRef = useRef(null)
    const dispatch = useDispatch()


    function startQuiz(){
        if(inputRef.current?.value){
            dispatch(setUserId(inputRef.current?.value))
        }
    }

  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>

        <ol>
            <li>You will be asked 10 questions about BTS.</li>
            <li>If you are a true ARMY, you will ace this quiz! Each correct answer earns you 10 points.</li>
            <li>Each question has three options. Choose the one you think is correct.</li>
            <li>You can review and change your answers before finishing the quiz.</li>
            <li>Your final score will show how well you know BTS. 💜</li>
            <li>Are you ready, ARMY? Let’s go! 💜✨</li>
        </ol>

        <form id="form">
            <input ref={inputRef} className="userid" type="text" placeholder='Username*' />
        </form>

        <div className='start'>
            <Link className='btn' to={'quiz'} onClick={startQuiz}>Start Quiz</Link>
        </div>

    </div>
  )
}
