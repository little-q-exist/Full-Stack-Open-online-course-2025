import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useNotificationDispatch, setNotification } from '../NotificationContext'
import { create } from '../request'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const NotificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      console.log(error);

      const errorMessage = error.response.data.error
      setNotification(NotificationDispatch, { type: 'ERROR', payload: errorMessage })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    if (content.length < 5) {
      console.log('length should not be less than five')
    } else {
      setNotification(NotificationDispatch, { type: 'CREATE', payload: content })
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
