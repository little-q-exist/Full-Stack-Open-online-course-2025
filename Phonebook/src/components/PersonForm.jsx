const PersonForm = ({ addNewPerson, handleNameChange, handleNumberChange, newName, newNumber }) => {
    return (
        <div>
            <form onSubmit={addNewPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit" >add</button>
                </div>
            </form>
        </div>
    )
}
export default PersonForm