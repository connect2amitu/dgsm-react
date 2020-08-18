import React from 'react'
import { Helmet } from "react-helmet";

export default function Meta({ title = "DGSM", canonical = window.location.href, description = "description", url = false }) {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
      <meta name="description" content={description} />
      {url && <meta property="og:image" content={url}></meta>}
    </Helmet>
  )
}
