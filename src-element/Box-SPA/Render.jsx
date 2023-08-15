import React from 'react'

function Render(props) {
  const { event, property, monitor, env, update } = props

  const ref = React.useRef()

  React.useEffect(() => {
    if (monitor && monitor.setSrc) {
      const remove = monitor.setValue(data => {
        property.src = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (!env || !property.src) return
    const script = document.createElement('script')
    script.src = property.src
    document.getElementsByTagName('head')[0].appendChild(script)
  }, [property.src])

  return <div {...event} {...style} id={property.id} ref={el => ref.current = el}></div>
}

export default Render