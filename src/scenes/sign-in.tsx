import React, { FunctionComponent } from 'react'
import { Redirect } from 'react-router-dom'

import { useAuth } from '../store'

export const SignIn: FunctionComponent = () => {
  const [{ signedIn, signingIn }, { signIn }] = useAuth()

  if (signedIn) {
    return <Redirect to="/" />
  }

  return (
    <main>
      <h1>Sign in</h1>
      <button
        className="bg-white rounded flex items-center text-black text-lg w-full p-4 mt-8 shadow-md"
        disabled={signingIn}
        onClick={() => signIn('google')}>
        <img alt="Google" className="h-6 w-6 mr-4" src="/img/google.svg" />
        Sign in with Google
      </button>
      <button
        className="bg-white rounded flex items-center text-black text-lg w-full p-4 mt-8 shadow-md"
        disabled={signingIn}
        onClick={() => signIn('facebook')}>
        <img alt="Facebook" className="h-6 w-6 mr-4" src="/img/facebook.svg" />
        Sign in with Facebook
      </button>
    </main>
  )
}
