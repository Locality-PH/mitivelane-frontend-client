import React, { Component } from "react";
import {
  Form,
  Avatar,
  Button,
  Input,
  DatePicker,
  Row,
  Col,
  message,
  Upload,
  Card,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";

export class EditProfile extends Component {
  avatarEndpoint = "https://www.mocky.io/v2/5cc8019d300000980a055e76";

  state = {
    avatarUrl: "/img/avatars/thumb-6.jpg",
    name: "Charlie Howard",
    email: "charlie.howard@themenate.com",
    userName: "Charlie",
    dateOfBirth: null,
    phoneNumber: "+44 (1532) 135 7921",
    website: "",
    address: "San Isidro St",
    city: "Morong",
    postcode: "1972",
  };

  render() {
    const onFinish = (values) => {
      const key = "updatable";
      message.loading({ content: "Updating...", key });
      setTimeout(() => {
        this.setState({
          name: values.name,
          email: values.email,
          userName: values.userName,
          dateOfBirth: values.dateOfBirth,
          phoneNumber: values.phoneNumber,
          address: values.address,
          city: values.city,
          postcode: values.postcode,
        });
        message.success({ content: "Done!", key, duration: 2 });
      }, 1000);
    };

    const {
      name,
      email,
      userName,
      dateOfBirth,
      phoneNumber,
      website,
      address,
      city,
      postcode,
      avatarUrl,
    } = this.state;

    return (
      <>
        <Form
          name="basicInformation"
          layout="vertical"
          initialValues={{
            name: name,
            email: email,
            username: userName,
            dateOfBirth: dateOfBirth,
            phoneNumber: phoneNumber,
            address: address,
            city: city,
            postcode: postcode,
          }}
        >
          <Card className="setting-content">
            <Flex
              alignItems="center"
              mobileFlex={false}
              className="text-center text-md-left"
            >
              <Avatar size={90} src={avatarUrl} icon={<UserOutlined />} />
              <div className="mt-3 ml-3 mt-md-0">
                <Button type="primary">Change Avatar</Button>

                <Button className="ml-2">Remove</Button>
              </div>
            </Flex>
            <div className="mt-4">
              <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <Row gutter={ROW_GUTTER}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message: "Please enter a valid email!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>{" "}
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Date of Birth" name="dateOfBirth">
                        <DatePicker className="w-100" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button type="primary" htmlType="submit">
                    Save Change
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
          <Card className="setting-content" title={"Billing Information"}>
            <Row gutter={ROW_GUTTER}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Phone Number" name="phoneNumber">
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24}>
                <Form.Item label="Address" name="address">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="City" name="city">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Country" name="country">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Post code" name="postcode">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>{" "}
        </Form>
      </>
    );
  }
}

export default EditProfile;
