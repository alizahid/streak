import React, { FunctionComponent, HTMLProps } from 'react'

export const Spinner: FunctionComponent<HTMLProps<HTMLDivElement>> = ({
  className
}) => <div className={`spinner ${className}`} />
