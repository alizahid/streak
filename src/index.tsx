import './assets/index.css'

import React, { FunctionComponent, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Header } from './components'
import { Home, SignIn } from './scenes'
import { unregister } from './serviceWorker'
import { useAuth } from './store'

const Streak: FunctionComponent = () => {
  const [, { destroy, initialise }] = useAuth()

  useEffect(() => {
    initialise()

    return () => {
      destroy()
    }
  }, [destroy, initialise])

  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(<Streak />, document.getElementById('root'))

unregister()
