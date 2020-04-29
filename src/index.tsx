import './assets/index.css'

import React, { FunctionComponent, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Header, Spinner } from './components'
import { About, CheckIn, Home, Profile, SignIn } from './scenes'
import { unregister } from './serviceWorker'
import { useAuth } from './store'

const Streak: FunctionComponent = () => {
  const [{ initialising }, { destroy, initialise }] = useAuth()

  useEffect(() => {
    initialise()

    return () => {
      destroy()
    }
  }, [destroy, initialise])

  if (initialising) {
    return (
      <div className="fixed h-screen w-screen flex items-center justify-center left-0 top-0">
        <Spinner light />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/check-in">
          <CheckIn />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(<Streak />, document.getElementById('root'))

unregister()
