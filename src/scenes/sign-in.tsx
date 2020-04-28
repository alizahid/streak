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
        className="bg-white rounded flex items-center text-black text-lg block p-4 mt-8 shadow"
        disabled={signingIn}
        onClick={signIn}>
        <img alt="Google" className="h-6 w-6 mr-4" src="/img/google.svg" />
        Sign in with Google
      </button>
    </main>
  )
}
