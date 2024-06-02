import * as React from 'react'
import { Input } from '@mui/material'

function handleFileSelect(event) {
  const files = event.target.files
  console.log(files)
}

function FileInput() {
  return (
    <Input
      type="file"
      onChange={handleFileSelect}
      onClick={(e) => {
        e.target.value = ''
      }}
      style={{
        backgroundColor: '#BDBFBF',
        color: 'black',
        opacity: 100,
        fontSize: '16px',
      }}
    />
  )
}

export default FileInput
