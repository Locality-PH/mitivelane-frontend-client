import React from 'react'
import { Form, Input, Select, Button, Card, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { list as campaignType } from "../../../../constants/CampaignType"
const { Option } = Select;

const CampaignForm = () => {
    console.log("campaignType", campaignType)
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <>
            <Card title="Suggestions Form">
                <Form name="complex-form" onFinish={onFinish}>
                    <Form.Item>
                        <h4>Campaign Name</h4>
                        <Form.Item
                            name="name"
                            noStyle
                            rules={[{ required: true, message: 'Name is required' }]}
                        >
                            <Input placeholder="Enter Campaign Name" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <h4>Campaign Type</h4>
                        <Input.Group compact>
                            <Form.Item
                                name="type"
                                noStyle
                                rules={[{ required: true, message: 'Campaign Type is required' }]}
                            >
                                <Select placeholder="Select Campaign Type" style={{ width: "100%" }}>
                                    {campaignType.map((type, i) => {
                                        return <Option value={type} key={i}>{type}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item>
                        <h4>Description</h4>
                        <Form.Item
                            name="description"
                            noStyle
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea placeholder="Write Description" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">Send</Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default CampaignForm
