import { useState } from 'react'

import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456'}
    ])

    const [newName, setNewName] = useState('')


    const [showName, setShowName] = useState(true)
    const [newNumber, setNewNumber] = useState('')

    const [filter, setFilter] = useState('')
    const [filterPersons, setFilterPersons] = useState(persons)


    const addName = (event) => {
        event.preventDefault()
        const personsArray = persons.map(e => e.name)
        const nameObject = {
            name: newName,
            number: newNumber,

        }

        if(personsArray.includes(`${nameObject.name}`)) {
            window.confirm(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat(nameObject))
            setNewName('')
            setNewNumber('')
        }
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value.toLocaleString().toLowerCase())
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
        setFilterPersons(persons.filter((person) =>
            (person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)))
    }

    const nameToShow = showName ? persons : persons.filter(person => person.important)

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onChange={handleFilterChange} value={filter} />
            <h2>add a new</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input
                    value={newName} onChange={handleNameChange}
                />
                </div>
                <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <p>
                { (filter != "") ? filterPersons.map(person =>
                    <Persons key={person.name} person={person} number={person.number}/>
                    ) : nameToShow.map(person =>
                    <Persons key={person.name} person={person} number={person.number}/>
                )
                }
            </p>
        </div>
    )
}

export default App