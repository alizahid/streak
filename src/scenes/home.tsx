import React, { FunctionComponent } from 'react'

import { Footer, Header } from '../components'

export const Home: FunctionComponent = () => (
  <>
    <Header />

    <main>
      <h1>Leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="mt-8 leading-none">
          <thead>
            <tr>
              <th className="text-center">Rank</th>
              <th>Name</th>
              <th className="text-center">Days</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">1</td>
              <td>mildpanda</td>
              <td className="text-center">45</td>
            </tr>
            <tr>
              <td className="text-center">2</td>
              <td>MadamePompadour</td>
              <td className="text-center">4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <Footer />
  </>
)
