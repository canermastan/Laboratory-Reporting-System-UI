import React from 'react'
import { useField } from "formik"
import { FormTextArea, Label } from "semantic-ui-react"

export default function TextArea({...props}) {
    const [field,meta] = useField(props)
    
    return (
        <>
        <textarea className="text-area" {...field} {...props} />
        {meta.touched && meta.error ? (
            <Label pointing basic color="red" content={meta.error}></Label>
        ) : null}
    </>
    )
}