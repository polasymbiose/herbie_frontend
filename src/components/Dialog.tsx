import Dialog from '@material-ui/core/Dialog'
import React from 'react'
import Button from './Button/Button'

export default function AlertDialog(props: any) {
  return (
    <div>
      <Dialog open={props.open} onClose={props?.handleClose}>
        <div style={{padding: 8}}>
          <h3>{props?.message}</h3>
          
          <Button handler={props.handleClose} black label={'Schließen'} />
        </div>
      </Dialog>
    </div>
  )
}
