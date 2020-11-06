import React from 'react'

const PersonForm = ({
    handleForm,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange
  }) => 
    <div>
      <form onSubmit={handleForm}>
          <div>
            name: 
            <input 
              value={newName}
              onChange={handleNameChange}
            />
          </div>
          <div>number:
            <input 
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    </div>

export default PersonForm