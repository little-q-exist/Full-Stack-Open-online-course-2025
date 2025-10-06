import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import { Menu as HeaderMenu } from 'antd'

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
                { label: 'logout', key: 'logout' }
            ],
            key: 'current-user'
        }
    ]

    const onClick = (e) => {
        console.log(e.key);
        if (e.key === 'logout') {
            handleLogout()
        }
    }

    return (
        <div style={{ marginLeft: 'auto' }}>
            <HeaderMenu items={items} mode='horizontal' theme='dark' onClick={onClick} defaultSelectedKeys={['NAV-home']} />
        </div>
    )
}

export default Menu