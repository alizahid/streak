import React, { FunctionComponent, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { Spinner } from '../components'
import { data_countries } from '../data'
import { useAuth, useUser } from '../store'

export const Profile: FunctionComponent = () => {
  const [{ signedIn }] = useAuth()
  const [{ fetching, updating, user }, { destroy, fetch, update }] = useUser()

  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')

  useEffect(() => {
    if (signedIn) {
      fetch()
    }

    return () => {
      destroy()
    }
  }, [destroy, fetch, signedIn])

  useEffect(() => {
    if (user) {
      setName(user.name)
      setCountry(user.country ?? '')
      setCity(user.city ?? '')
    }
  }, [user])

  if (!signedIn) {
    return <Redirect to="/sign-in" />
  }

  const countries = Object.keys(data_countries)
  const cities = country ? data_countries[country] : []

  return (
    <main>
      <h1>Profile</h1>
      {fetching && <Spinner className="my-12" />}
      {user && (
        <form
          className="mt-8"
          onSubmit={(event) => {
            event.preventDefault()

            if (name) {
              update({
                city: city || undefined,
                country: country || undefined,
                name
              })
            }
          }}>
          <label>
            <span>Username</span>
            <input
              onChange={(event) => setName(event.target.value)}
              placeholder="Username"
              type="text"
              value={name}
            />
          </label>
          <label>
            <span>Country</span>
            <select
              onChange={(event) => {
                setCountry(event.target.value)
                setCity('')
              }}
              value={country}>
              <option value="">Select</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>
          {country && (
            <label>
              <span>City</span>
              <select
                onChange={(event) => setCity(event.target.value)}
                value={city}>
                <option value="">Select</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
          )}
          <button disabled={updating}>{updating ? 'Saving' : 'Save'}</button>
        </form>
      )}
    </main>
  )
}
