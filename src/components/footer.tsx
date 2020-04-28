import React, { FunctionComponent } from 'react'

import { img_heart } from '../assets'

export const Footer: FunctionComponent = () => (
  <footer className="m-8 text-sm text-teal-200 leading-none">
    <p className="flex items-center justify-center mt-4">
      &copy; {new Date().getFullYear()} / Built with
      <img alt="love" className="mx-1 h-6 w-6" src={img_heart} />
      by
      <a
        className="ml-1 text-white hover:text-white"
        href="https://alizahid.dev">
        Ali Zahid
      </a>
    </p>
  </footer>
)
