import React from 'react'
import { Tooltip, IconButton } from '@material-ui/core'
import { MoreVertRounded } from '@material-ui/icons'
import { NavLink } from 'react-router-dom'

export default function ViewMoreBtn({ title = "View More", to = "/", color = "secondary", variant = "contained", placement = "left" }) {
  return (
    <Tooltip title={title} placement={placement}>
      <IconButton component={NavLink} to={to} color={color} variant={variant} >
        <MoreVertRounded />
      </IconButton>
    </Tooltip>
  )
}
