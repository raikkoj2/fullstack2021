import React from 'react'
import Person from './Person'

const Persons = ({persons, handleRemove}) => (
    <div>
        {persons.map(person => 
            <Person 
                key={person.name} 
                person={person} 
                handleRemove={() => {
                    if(window.confirm(`Delete ${person.name}?`)){
                        return(
                            handleRemove(person.id)
                        )
                    }
                } }
            />)}
    </div>
)

export default Persons