import React, { FunctionComponent, HTMLProps } from 'react'

interface Props {
  light?: boolean
}

export const Spinner: FunctionComponent<Props & HTMLProps<HTMLDivElement>> = ({
  className,
  light = false
}) => (
  <div className={`spinner ${className}`}>
    <div className={`bounce1 ${light ? 'bg-white' : 'bg-teal-500'}`}></div>
    <div className={`bounce2 ${light ? 'bg-white' : 'bg-teal-500'}`}></div>
    <div className={`bounce3 ${light ? 'bg-white' : 'bg-teal-500'}`}></div>
  </div>
)
