import React, { useEffect, useState } from 'react'
import { BehaviorSubject } from 'rxjs'

export const rx_FormMessages = new BehaviorSubject<string[]>([])

interface UseInputOptions {
  validator?: (val: any) => boolean
  [key: string]: any
}

export const useInput = (id: string, {validator = (val) => val !== ''}: UseInputOptions) => {
  const [value, setvalue] = useState('')
  const [error, seterror] = useState(false)

  useEffect(() => {
    rx_FormMessages.next([...rx_FormMessages.value, id])
  }, [id])

  const handleValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setvalue(e.target.value)
  }

  const resetValue = () => {
    setvalue('')
    seterror(false)
  }

  const handleError = (hasError: boolean) => {
    seterror(hasError)
  }

  const isValid = () => {
    if (!validator(value)) {
      handleError(true)
    }
    return validator(value)
  }

  return { [id]: { value, handleValue, resetValue, error, handleError, isValid } }
}
