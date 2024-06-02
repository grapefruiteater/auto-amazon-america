import React, { useState } from 'react'
import PropTypes from 'prop-types'

const FormInput = ({ type, value, onChange }) => {
  const [fileName, setFileName] = useState('')

  const handleFileChange = (event) => {
    const { files } = event.target
    if (files && files.length) {
      setFileName(files[0].name)
      onChange(event)
    }
  }

  return (
    <>
      {type === 'file' ? (
        <div className="form-input">
          <label className="file-label">
            <input
              type="file"
              className="file-input"
              onChange={handleFileChange}
              style={{
                backgroundColor: '#BDBFBF',
                color: 'black',
                display: 'flex',
                opacity: 100,
              }}
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-name">{fileName}</span>
            </span>
          </label>
        </div>
      ) : (
        <input
          type={type}
          className="form-input"
          value={value}
          onChange={onChange}
          style={{
            backgroundColor: '#BDBFBF',
            color: 'black',
            display: 'flex',
            opacity: 100,
          }}
        />
      )}
    </>
  )
}

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
}

export default FormInput
