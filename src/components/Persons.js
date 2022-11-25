import React from 'react'

const Persons = ({person, deleteEntry}) =>
    <li className="people">{person.name} {person.number}
    <button onClick={deleteEntry}>delete</button></li>
export default Persons