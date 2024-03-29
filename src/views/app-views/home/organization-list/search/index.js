import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Input,
  Button,
  Tag,
  message,
  Avatar,
  Row,
  Col,
  Skeleton,
  Divider,
} from "antd";
import Flex from "components/shared-components/Flex";
import AvatarStatus from "components/shared-components/AvatarStatus";
import { BarangayData } from "../../DefaultDashboardData";
import utils from "utils";
import { COLORS } from "constants/ChartConstant";
import { Link, useHistory } from "react-router-dom";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const Organizations = () => {
  const { currentOrganization, generateToken } = useAuth();
  const history = useHistory();

  const [barangayList, setBarangayList] = useState([]);
  const [listLimit, setListLimit] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllOrganizations();
  }, []);

  const getAllOrganizations = async () => {
    await axios
      .get("/api/organization/get-all-organizations-client", generateToken()[1])
      .then((response) => {
        setBarangayList(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        message.error("Could not fetch the data in the server!");
        console.log(err);
      });
  };

  return (
    <>
      {!isLoading ? (
        <Row className="borderless" justify="center">
          <Col sm={24} md={15}>
            <Card>
              {barangayList.map(
                (result, i) =>
                  i < listLimit && (
                    <div key={i}>
                      <div
                        className={`d-flex align-items-center justify-content-between`}
                      >
                        <div className="avatar-status d-flex align-items-center">
                          {result.profile != null ? (
                            <Avatar
                              className="font-size-sm custom-hover-pointer"
                              icon={<UserOutlined />}
                              src={result.profile.fileUrl}
                              onClick={() => history.push(`/home/organization/${result.organization_id}`)}
                            >
                              {utils.getNameInitial(result.organization_name)}
                            </Avatar>
                          ) : (
                            <Avatar
                              className="font-size-sm custom-hover-pointer"
                              style={{ backgroundColor: result.profile_color }}
                              onClick={() => history.push(`/home/organization/${result.organization_id}`)}
                            >
                              {utils.getNameInitial(result.organization_name)}
                            </Avatar>
                          )}

                          <div className="ml-2">
                            <div>
                              <div className="avatar-status-name">
                                <h4
                                  className="custom-text-hover-pointer"
                                  onClick={() => history.push(`/home/organization/${result.organization_id}`)}
                                >
                                  {result.organization_name}
                                </h4>
                              </div>
                            </div>
                            <div className="text-muted avatar-status-subtitle">
                              <h5
                                className="custom-text-hover-pointer"
                                onClick={() => history.push(`/home/organization/${result.organization_id}`)}
                              >
                                {result.address}
                              </h5>

                            </div>
                          </div>
                        </div>
                        <div>
                          <Link
                            to={`/home/organization/${result.organization_id}`}
                          >
                            <Button type="primary" shape="round">
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <Divider />
                    </div>
                  )
              )}

              <Button
                style={{ width: "100%", height: "3rem" }}
                shape="round"
                type="primary"
                onClick={() => setListLimit(listLimit + 5)}
                hidden={barangayList.length <= listLimit ? true : false}
              >
                Load more
              </Button>
            </Card>
          </Col>
        </Row>
      ) : (
        <Card>
          <Skeleton loading={isLoading} avatar active></Skeleton>
          <Skeleton loading={isLoading} avatar active></Skeleton>
          <Skeleton loading={isLoading} avatar active></Skeleton>
        </Card>
      )}
    </>
  );
};

export default Organizations;
