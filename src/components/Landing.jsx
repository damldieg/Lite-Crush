import React from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing">
      <h1 className="title">LITE CRUSH</h1>
      <Link to='/game' className="button">JUGAR</Link>
    </div>
  )
}

export default Landing
