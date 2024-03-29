import React, { useState, useEffect } from "react";
import { Card, message, Avatar, Button } from "antd";
import { BarangayData } from "../DefaultDashboardData";
import { withRouter, Link, useHistory } from "react-router-dom";
import { COLORS } from "constants/ChartConstant";
import axios from "axios"; 
import { useAuth } from "contexts/AuthContext";
import { UserAddOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import utils from "utils";

const OrganizationList = () => {
  const { currentOrganization, generateToken } = useAuth();
  const history = useHistory();

  const [organizationList, setOrganizationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLatestOrganizations();
  }, []);

  const getAllOrganizations = async () => {
    await axios
      .get("/api/organization/get-all-organizations", generateToken()[1])
      .then((response) => {
        setOrganizationList(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        message.error("Could not fetch the data in the server!");
        console.log(err);
      });
  };

  const getLatestOrganizations = async () => {
    await axios
      .get(
        "/api/organization/get-latest-organizations?length=5",
        generateToken()[1]
      )
      .then((response) => {
        setOrganizationList(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        message.error("Could not fetch the data in the server!");
        console.log(err);
      });
  };

  return (
    <>
      <Card
        title="List of Organization"
        style={{ overflow: "hidden" }}
        loading={isLoading}
        extra={
          <Link to="feeds/list/organizations" style={{ fontSize: "1rem" }}>
            More
          </Link>
        }
      >
        <div className="mt-3">
          {organizationList.map((result, i) => (
            <div
              key={i}
              className={`d-flex align-items-center justify-content-between mb-4`}
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
                    className="font-size-sm"
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
                    <span>{ }</span>
                  </div>
                  <div className="text-muted avatar-status-subtitle h5">
                    {result.address}
                  </div>
                </div>
              </div>
              <div>
                <Link to={`/home/organization/${result.organization_id}`}>
                  <Button type="primary" shape="round">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};

export default OrganizationList;
