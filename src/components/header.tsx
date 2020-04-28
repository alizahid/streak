import React, { FunctionComponent, useState } from 'react'
import { Link } from 'react-router-dom'

import { img_close, img_menu } from '../assets'
import { useAuth } from '../store'

export const Header: FunctionComponent = () => {
  const [{ signedIn }] = useAuth()

  const [visible, setVisible] = useState(false)

  return (
    <header className="leading-none flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-teal-200 m-8">
        COVID-19 Streak
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
          src={visible ? img_close : img_menu}
        />
      </a>
      {visible && (
        <nav className="flex flex-col text-center fixed top-0 left-0 w-screen h-screen z-10 bg-menu flex items-center justify-center font-medium text-3xl">
          <Link className="p-4 text-white hover:text-teal-900" to="/">
            Leaderboard
          </Link>
          <Link className="p-4 text-white hover:text-teal-900" to="/about">
            About
          </Link>
          {signedIn ? (
            <>
              <Link
                className="p-4 text-white hover:text-teal-900"
                to="/profile">
                Profile
              </Link>
              <Link
                className="p-4 text-white hover:text-teal-900"
                to="/sign-out">
                Sign out
              </Link>
            </>
          ) : (
            <Link className="p-4 text-white hover:text-teal-900" to="/sign-in">
              Sign in
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}
