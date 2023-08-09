function Render(props) {
  const React = window.React
  const { Radio } = window.MaterialUI

  const { compound, property, listen, dispatch, pure, update } = props

  React.useEffect(() => {
    if (listen && listen.setCheckedOpen) {
      const remove = listen.setCheckedOpen(data => {
        property.checked = true
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setCheckedClose) {
      const remove = listen.setCheckedClose(data => {
        property.checked = false
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onChange = (e) => {
    if (!pure) return
    property.checked = true
    update()
    if (dispatch && dispatch.onChange) dispatch.onChange(property.checked, e)
  }

  return <Radio
    {...compound}
    checked={property.checked}
    onChange={onChange}
    size={property.size}
    color={property.color}
    disabled={property.disabled}
  />
}

export default Render