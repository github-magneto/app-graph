import React from 'react'
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element } = props

  React.useEffect(() => {
    if (monitor && monitor.setOpenTrue) {
      const remove = monitor.setOpenTrue(data => {
        property.open = true
        update()
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (monitor && monitor.setOpenFalse) {
      const remove = monitor.setOpenFalse(data => {
        property.open = false
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onClose = (e) => {
    if (property.enableClose === false) return

    property.open = false
    update()
    if (trigger && trigger.onClose) trigger.onClose(property.open, e)
  }

  const R = <>
    <DialogTitle>
      {
        children && children.title ? children.title() : null
      }
    </DialogTitle>

    <DialogContent dividers={property.dividers}>
      {
        children && children.main ? children.main() : null
      }
    </DialogContent>

    <DialogActions>
      {
        children && children.action ? children.action() : null
      }
    </DialogActions>
  </>

  if (env === 'prod') return <Dialog open={property.open} onClose={onClose} sx={{ '& .MuiDialog-paper': style.style }}>
    {R}
  </Dialog>

  if (env === 'dev') return <div {...params}>
    {R}
  </div>
}

export default Render