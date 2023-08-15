import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Switch } from '@mui/material'
import { Button } from '@mui/material'
import { Divider } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  const [aceDialog, setAceDialog] = React.useState()

  return <Grid container spacing={1}>

    <Grid item xs={12}>
      <Button style={{ textTransform: 'none' }} fullWidth variant='outlined' onClick={() => setAceDialog(true)}>设置数据</Button>
    </Grid>
    {
      aceDialog ?
        <component.AceDialog
          value={JSON.stringify(value.value, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              onChange((value) => value.value = v_)
              setAceDialog(false)
            } catch {
              alert('格式错误')
            }
          }}
          onClose={() => setAceDialog(false)}
          mode='json'
          initValue={'{}'}
        /> : null
    }

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>立即执行</div>
      <Switch checked={value.immediate} onChange={e => onChange((value) => value.immediate = e.target.checked)} />
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>window绑定数据</div>
        <Switch checked={value.useWindow} onChange={e => onChange((value) => value.useWindow = e.target.checked)} />
      </Grid>
    </Grid>
    {
      value.useWindow ?
        <>
          <Grid item xs={12}>
            <TextField {...sx.TextFieldSX} fullWidth label='字段名称' value={value.windowName} onChange={e => onChange((value) => value.windowName = e.target.value)} />
          </Grid>
        </> : null
    }
  </Grid>
}

export default Edit