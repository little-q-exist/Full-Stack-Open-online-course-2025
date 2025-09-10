import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { getAll, update } from './request'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: update,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id === newAnecdote.id ? newAnecdote : a))
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const anecdotesResult = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1
  })

  if (anecdotesResult.isLoading) {
    return <div>Loading...</div>
  }

  if (anecdotesResult.isError) {
    return (
      <div>
        <h2>{anecdotesResult.error.name}</h2>
        <div>
          anecdotes is not available due to errors: {anecdotesResult.error.message}
        </div>
      </div>
    )
  }

  const anecdotes = anecdotesResult.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
