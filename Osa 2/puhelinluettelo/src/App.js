import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
    //State variables
    const [persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')

    //run only once after firts render to fetch data from json server
    useEffect(() => {
        //fetch data from json server
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
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
        const filtered = persons.filter(person => person.name === newName)
        if(filtered.length !== 0){
            if(window.confirm(`${filtered[0].name} is already added to phonebook, replace the old number with a new one?`)){
                personService
                    .update(filtered[0].id, newPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== filtered[0].id ? person : returnedPerson))
                        setNewName('')
                        setNewNumber('')
                    })
            }
        }else{
            personService
                .create(newPerson)
                .then(createdPerson => {
                    setPersons(persons.concat(createdPerson))
                    setNewName('')
                    setNewNumber('')
                })
                        
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

    const handleRemove = (id) => {
       
        personService
            .remove(id)
            .then(setPersons(persons.filter(p => p.id !== id)))
        
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

            <Persons persons={personsToShow} handleRemove={handleRemove} />
            
        
        </div>
    )

}

export default App