import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
    //State variables
    const [persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')

    //run only once after firts render to fetch data from json server
    useEffect(() => {
        //fetch data from json server
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    //Event handlers
    const handleSubmit = (event) => {
        event.preventDefault()

        //Create new person
        const newPerson = {
            name: newName,
            number: newNumber
        }
        
        //If person is already added -> alert, else add person
        //When alert is raised don't clear fields
        if(persons.filter(person => person.name === newName).length !== 0){
            alert(`${newName} is already added to phonebook`)
        }else{
            setPersons(persons.concat(newPerson))
            //Clear fields after adding
            setNewName('')
            setNewNumber('')
        }

        
    }

    //Update state variables
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    //Filter persons
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter 
            handleFilterChange={handleFilterChange}
            newFilter={newFilter}
            />
            
            <h2>add a new</h2>
            
            <PersonForm 
            handleSubmit={handleSubmit}
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}
            newName={newName}
            newNumber={newNumber}
            />
            
            <h2>Numbers</h2>

            <Persons persons={personsToShow} />
            
        
        </div>
    )

}

export default App