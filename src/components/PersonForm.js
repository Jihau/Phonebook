import React from 'react'

const PersonForm = ({ addName, data }) => {
    return (
        <form onSubmit={addName}>
            <div>
                name: <input
                value={data.newName}
                onChange={data.handleNameChange}
            /><br />
                number: <input
                value={data.newNumber}
                onChange={data.handleNumberChange}
            />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm