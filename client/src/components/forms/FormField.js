import React from 'react'
import { useFormikContext } from 'formik'

import ErrorMessage from './ErrorMessage'

function AppFormField({ name, width, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values
  } = useFormikContext()

  return (
    <>
      <input
        onBlur={() => setFieldTouched(name)}
        onChange={text => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  )
}

export default AppFormField
