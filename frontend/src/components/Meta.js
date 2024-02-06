import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To CivilGuruji',
  description: 'We sell the best Courses for cheap',
  keywords: 'Corporate Training courses, Autodesk 3ds Max, cheap rate Courses',
}

export default Meta
