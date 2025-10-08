import useInputField from '../hooks/useInputField'
import { Form, Button, Input, Space, List, Avatar, Divider } from 'antd'
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
                labelCol={{ span: 1 }}
                layout='vertical'
                requiredMark={false}
            >
                <Divider orientation='left'>Comment</Divider>
                <Form.Item
                    label={null}
                    name='comment'
                    rules={[{ required: true, message: 'Please input your comment' }]}
                >

                    <Space.Compact>
                        <Input {...comment}
                            variant='filled'
                        />
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