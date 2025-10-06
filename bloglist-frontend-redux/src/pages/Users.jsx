import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'

const Users = () => {
    const users = useSelector(state => state.users)

    console.log(users);


    return (
        <div>
            <Table dataSource={users} rowKey={(user => user.id)}>
                <Column title='Name' dataIndex='name' />
                <Column
                    title='Blog Posted'
                    dataIndex='blogs'
                    key='blog-length'
                    render={blogs => (
                        <div>{blogs.length}</div>
                    )}
                />
                <Column
                    title='Details'
                    key='details'
                    render={(_, user) => (
                        <Link to={`/users/${user.id}`}>View</Link>
                    )}
                />
            </Table>
        </div>
    )
}

export default Users