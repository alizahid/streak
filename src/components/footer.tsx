import React, { FunctionComponent } from 'react'

export const Footer: FunctionComponent = () => (
  <footer className="p-8 text-sm text-teal-200 leading-none">
    <p className="flex items-center justify-center">
      &copy; {new Date().getFullYear()} / Built with
      <img alt="love" className="mx-1 h-6 w-6" src="/img/heart.svg" />
      by
      <a
        className="ml-1 text-white hover:text-white"
        href="https://alizahid.dev">
        Ali Zahid
      </a>
    </p>
  </footer>
)
