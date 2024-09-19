"use client"
import React, { useState } from 'react'
import { SignFlow } from '../types'
import SignInCard from './sign-in-card'
import SignUpCard from './sign-up-card'

type Props = {}

const AuthScreen = (props: Props) => {
    const [state,setState]=useState<SignFlow>("signIn")
  return (
    <div className='h-full flex items-center justify-center bg-[#5C3B58]'>
        <div className='md:h-auto md:w-[420px]'>
       {state==="signIn"?<SignInCard setState={setState}/>:<SignUpCard setState={setState}/>}

        </div>
    </div>
  )
}

export default AuthScreen