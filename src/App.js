import {useState, useEffect} from 'react'
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from './services/persons'
import "./Phonebook.css";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [showName, setShowName] = useState(true)
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [filterPersons, setFilterPersons] = useState(persons)

    useEffect(() => {
        personService
            .getAll()
            .then(allPersons => {
                setPersons(allPersons)
            })
    }, [])


    const addName = (event) => {
        event.preventDefault()
        const personsArray = persons.map(e => e.name)
        const nameObject = {
            name: newName, number: newNumber
        }
        if (personsArray.includes(`${nameObject.name}`)) {
            window.confirm(`${newName} is already added to phonebook`)
        } else {
            personService
                .create(nameObject)
                .then(Persons => {
                    setPersons(persons.concat(nameObject))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const deleteName = (person) => {
        const msg = `Delete ${person.name}?`
        const confirm = window.confirm(msg)
        if (confirm) {
            personService
                .deletePerson(person.id)
                .then(persons => setPersons(persons))
        }
    }

const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value.toLocaleString())
}

const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
}

const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setFilterPersons(persons.filter((person) => (person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)))
}

const nameToShow = showName ? persons : persons.filter(allPersons => allPersons.important)

const addPersonData = {
    newName, newNumber, handleNameChange, handleNumberChange
}


return (<div className="page">
        <h2 className='title'>Phonebook</h2>
    <img alt='phone' src={`https://i.pinimg.com/originals/0b/2f/45/0b2f456e10f9ae3e91e522c1966150e6.png`}/>
        <h2>Filter contacts</h2>
        <Filter onChange={handleFilterChange} value={filter} type="text"/>
        <h2>Add a new contact</h2>
        <PersonForm addName={addName} data={addPersonData}/>
        <h2>Saved numbers</h2>
        <p>
            {(filter !== "") ? filterPersons.map(person =>
                <Persons key={person.name} person={person}
                         number={person.number}/>) : nameToShow.map(person =>
                <Persons key={person.name} person={person} number={person.number}
                         deleteEntry={() => deleteName(person)}/>)}
        </p>
    </div>)
}

export default App