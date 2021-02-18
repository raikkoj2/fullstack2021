import React from 'react'

const Person = ({person, handleRemove}) => (
    <p>{person.name} {person.number} <button onClick={handleRemove}>delete</button></p>
)

export default Person