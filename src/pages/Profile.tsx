import { Button, Form, Input, Typography } from 'antd';
import { useForm, Controller } from 'react-hook-form'


export default function Profile() {
    const { Title, Paragraph } = Typography;

    const { control, handleSubmit } = useForm()

    const onSubmit = handleSubmit(data => {
        alert("Username is " + data.username + " Password is " + data.password)
    })
    return (
        <div>
            <Title>
                Login
            </Title>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
                onSubmitCapture={onSubmit}
            >
                <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                        <Form.Item
                            label="Username"
                            id="outlined-basic"
                            {...field}
                        >
                            <Input
                                status={!!fieldState.error ? 'error' : ''}
                            />
                            {!!fieldState.error && <Paragraph style={{color: 'red'}}>Username is required.</Paragraph>}
                        </Form.Item>
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                        <Form.Item
                            label="Password"
                            {...field}
                        >
                            <Input.Password
                                status={!!fieldState.error ? 'error' : ''}
                            />
                            {!!fieldState.error && <Paragraph style={{color: 'red'}}>Password is required.</Paragraph>}
                        </Form.Item>

                    )}
                />

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}