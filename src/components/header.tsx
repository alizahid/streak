import React, { FunctionComponent, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../store'

export const Header: FunctionComponent = () => {
  const [{ signedIn }, { signOut }] = useAuth()

  const [visible, setVisible] = useState(false)

  const onClick = () => setVisible(false)

  return (
    <header className="leading-none flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-teal-200 m-8">
        #stayhomechallenge
      </h2>
      <a
        className="p-8 z-20"
        href="#menu"
        onClick={(event) => {
          event.preventDefault()

          setVisible(!visible)
        }}>
        <img
          alt="Menu"
          className="h-6 w-6"
          src={`/img/${visible ? 'close' : 'menu'}.svg`}
        />
      </a>
      {visible && (
        <nav className="flex flex-col text-center fixed top-0 left-0 w-screen h-screen z-10 bg-menu flex items-center justify-center font-medium text-3xl">
          <Link
            className="p-4 text-white hover:text-teal-500"
            onClick={onClick}
            to="/">
            Leaderboard
          </Link>
          <Link
            className="p-4 text-white hover:text-teal-500"
            onClick={onClick}
            to="/about">
            About
          </Link>
          {signedIn ? (
            <>
              <Link
                className="p-4 text-white hover:text-teal-500"
                onClick={onClick}
                to="/check-in">
                Check in
              </Link>
              <Link
                className="p-4 text-white hover:text-teal-500"
                onClick={onClick}
                to="/profile">
                Profile
              </Link>
              <a
                className="p-4 text-white hover:text-teal-500"
                href="#sign-out"
                onClick={(event) => {
                  event.preventDefault()

                  signOut()

                  setVisible(false)
                }}>
                Sign out
              </a>
            </>
          ) : (
            <Link
              className="p-4 text-white hover:text-teal-500"
              onClick={onClick}
              to="/sign-in">
              Sign in
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}
