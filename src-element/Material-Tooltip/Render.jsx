import React from 'react'

function Render(props) {
  const { Tooltip } = window.MaterialUI
  const { styled } = window.MaterialUI

  const TooltipS = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    '& .MuiTooltip-tooltip': {
      backgroundColor: 'white',
      padding: 0
    },
  });

  const { event, property, monitor, trigger, children, env, update } = props

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

  const onOpen = (e) => {
    property.open = true
    update()
    if (trigger && trigger.onOpen) trigger.onOpen(property.open, e)
  }

  const onClose = (e) => {
    property.open = false
    update()
    if (trigger && trigger.onClose) trigger.onClose(property.open, e)
  }

  const R = children && children.main ? children.main() : null

  if (env === 'prod') return <TooltipS
    open={property.open}
    enenterDelay={property.enterDelay}
    leaveDelay={property.leaveDelay}
    title={children && children.float ? children.float() : null}
    placement={property.placementPosition + (property.placementAlign === 'center' ? '' : '-' + property.placementAlign)}
    arrow={property.arrow}
    onOpen={onOpen}
    onClose={onClose}
  >
    <span>
      {R}
    </span>
  </TooltipS>

  if (env === 'dev') return R
}

export default Render