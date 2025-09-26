const LoginForm = ({ username, password, handleLogin }) => {
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        username
                        <input {...username} />
                    </label>
                </div>
                <div>
                    <label>
                        password
                        <input {...password} />
                    </label>
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm