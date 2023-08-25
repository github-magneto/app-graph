import React from 'react'
import { Pagination } from '@mui/material'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element } = props

  React.useEffect(() => {
    if (monitor && monitor.setPage) {
      const remove = monitor.setPage(data => {
        property.page = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  
  React.useEffect(() => {
    if (monitor && monitor.setCount) {
      const remove = monitor.setCount(data => {
        property.count = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onChange = (e, v) => {
    if (env === 'dev') return
    property.page = v
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.page, e)
  }

  return <Pagination
    {...params}
    count={Number(property.count)}
    page={Number(property.page)}
    onChange={onChange}
    size={property.size}
    color={property.color}
    shape={property.shape}
    variant={property.variant}
  />
}

export default Render