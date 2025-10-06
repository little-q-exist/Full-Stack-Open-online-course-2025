import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import { Menu as HeaderMenu, Button } from 'antd'

const Menu = ({ handleLogout }) => {
    const currentUser = useSelector(state => state.user)

    const items = [
        {
            label: (<Link to={'/'}>HOME</Link>),
            key: 'NAV-home',
        },
        {
            label: (<Link to={'/users'}>USERS</Link>),
            key: 'NAV-users',
        },
        {
            label: `${currentUser.name} has logged in.`,
            children: [
                { label: (<Button onClick={handleLogout}>logout</Button>), key: 'BTN-logout' }
            ],
            key: 'current-user'
        }
    ]

    return (
        <div style={{ marginLeft: 'auto' }}>
            <HeaderMenu items={items} mode='horizontal' theme='dark' />
        </div>
    )
}

export default Menu