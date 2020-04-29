import React, { FunctionComponent } from 'react'

export const About: FunctionComponent = () => (
  <main>
    <h1>About</h1>
    <p className="mt-8">Bad times are upon us.</p>
    <p className="mt-2">
      COVID-19 is highly contagious and the best method or prevention is
      self-isolation and quarantine.
    </p>
    <p className="mt-2">
      So we built this challenge for everyone to take. How long can you maintain
      quarantine and stay safe?
    </p>
    <h2 className="font-medium text-2xl mt-4">Who are you?</h2>
    <p className="mt-2">
      We are Ali and Janet. She came up with the idea and I built it.
    </p>
    <h2 className="font-medium text-2xl mt-4">Tell us more</h2>
    <p className="mt-2">
      This app is open-source and built with React, TypeScript, and Firebase.
      You can find the source code on{' '}
      <a
        href="https://github.com/stay-home-challenge"
        rel="noopener noreferrer"
        target="_blank">
        GitHub
      </a>
      .
    </p>
  </main>
)
