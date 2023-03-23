
import React from 'react';
import { Button, Form, Input, message } from 'antd';
import requestInstance from '@/gen/service/fetch';

interface IProps {
    onInitList: Function;
}

// 数据库连接默认信息
const initParams = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'testdb'
};

export default function DetailBox(props: IProps) {
    let { onInitList } = props;

    const onFinish = (values: any) => {
        console.log('values======', values);

        requestInstance.post('/api/dbinfo', values).then((res: any) => {
            if (res.code === 0) {
                console.log('data====', res.data);
                onInitList(res.data);
                message.info(res.msg || '查询成功');
            } else {
                // 清空传递数据
                onInitList([]);
                message.error(res.msg || '未知错误');
            }
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="absolute top-0 left-0 p-8 w-full h-1/2   ">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 400 }}
                // initialValues={{ remember: true }}
                initialValues={initParams}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="数据库地址"
                    name="host"
                    rules={[{ required: true, message: '请输入数据库地址' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="端口"
                    name="port"
                    rules={[{ required: true, message: '请输入端口' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="数据库名称"
                    name="database"
                    rules={[{ required: true, message: '请输入数据库名称' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="用户名"
                    name="user"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type='primary' htmlType="submit">
                        查询数据库
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
