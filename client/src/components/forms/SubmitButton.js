import React from 'react'
import { useFormikContext } from 'formik'

function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext()

  return <button title={title} onClick={handleSubmit} />
}

export default SubmitButton
