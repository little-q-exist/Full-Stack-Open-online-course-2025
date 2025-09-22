import React, { useState, useEffect } from 'react' // we need this now also in component files
import axios from 'axios'

const useNote = (url) => {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        axios.get(url).then(response =>
            setNotes(response.data)
        )
    }, [url])
    return notes
}

const App = () => {
    const [counter, setCounter] = useState(0)
    const [value, setValue] = useState([])

    const notes = useNote(BACKEND_URL)

    const handleClick = () => {
        setCounter(counter + 1)
        setValue(value.concat(counter))
    }

    return (
        <div className='container'>
            hello webpack {counter} clicks
            <button onClick={handleClick}>
                press
            </button>
            <div>
                {BACKEND_URL} has {notes.length} notes
            </div>
        </div>
    )
}

export default App