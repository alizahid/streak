import './assets/index.css'

import React, { FunctionComponent, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from './scenes'
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
    <React.StrictMode>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </React.StrictMode>
  )
}

ReactDOM.render(<Streak />, document.getElementById('root'))

unregister()
