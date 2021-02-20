import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
    //State variables
    const [persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')
    const [ success, setSuccess ] = useState('success')
    const [ notifcationMessage, setNotificationMessage ] = useState(null)

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
                        showNotification(`Updated contact information of ${returnedPerson.name}`, 'success')
                    })
                    .catch(() => {
                        showNotification(`Contact information of ${filtered[0].name} is alredy deleted from server`, 'error')
                        setPersons(persons.filter(n => n !== filtered[0]))
                    })
            }
        }else{
            personService
                .create(newPerson)
                .then(createdPerson => {
                    setPersons(persons.concat(createdPerson))
                    setNewName('')
                    setNewNumber('')
                    showNotification(`Added contact information for ${createdPerson.name}`, 'success')
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
            .then(() => {
                const removed = persons.filter(p => p.id === id)
                setPersons(persons.filter(p => p.id !== id))
                showNotification(`Removed contact information of ${removed[0].name}`, 'success')
            })
            .catch(() => {
                const removed = persons.filter(p => p.id === id)
                showNotification(`Contact information of ${removed[0].name} is alredy deleted from server`, 'error')
                setPersons(persons.filter(n => n !== removed[0]))
            })
        
    }

    const showNotification = (message, success) =>{
        setNotificationMessage(message)
        setSuccess(success)
        setTimeout(() => {
        setNotificationMessage(null)
        }, 5000)
    }
    //Filter persons
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={notifcationMessage} success={success} />

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