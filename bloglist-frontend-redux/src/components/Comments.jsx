import useInputField from '../hooks/useInputField'
import { Form, Button, Input, Space, List, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const Comments = ({ comments, addComment }) => {
    const { reset, ...comment } = useInputField('text')

    const handleCommentSubmit = () => {
        addComment(comment.value)
        reset()
    }

    return (
        <div>
            <Form
                onFinish={handleCommentSubmit}
                name='comment'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                layout='vertical'
            >
                <Form.Item label='Comment' name='comment'>
                    <Space.Compact>
                        <Input {...comment} />
                        <Button htmlType='submit' type='primary'>submit</Button>
                    </Space.Compact>
                </Form.Item>
            </Form>
            <List
                size='large'
                itemLayout='vertical'
                dataSource={comments}
                renderItem={item =>
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar icon={<UserOutlined />} />}
                            title='Anonymous User'
                            description={item}
                        />
                    </List.Item>
                }
            />
        </div>
    )
}

export default Comments