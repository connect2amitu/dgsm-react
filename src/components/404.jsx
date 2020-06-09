import React from 'react'
import { Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

export default function Page404() {
  return (
    <div>
      <p>Page not found</p>
      <div><Button component={NavLink} to="/" color={"secondary"} variant={"contained"}>Go to main Page</Button></div>

    </div>
  )
}
