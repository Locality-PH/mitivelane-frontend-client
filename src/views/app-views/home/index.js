import React, { useState, useEffect } from "react";
import { Row, Col, Card, message, Button, Avatar } from "antd";
import OrganizationList from "./organization-list";
import Campaign from "components/shared-components/Campaign";
import { CausesData } from "./DefaultDashboardData";
import { withRouter, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useAuth } from "contexts/AuthContext";
import CampaignCard from "components/shared-components/CampaignCard"
import InfiniteScroll from "react-infinite-scroll-component";
import utils from "utils";
import { UserAddOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";

export const DefaultDashboard = () => {
  const { currentOrganization, generateToken } = useAuth();

  //initialize
  const history = useHistory();

  //for api
  const source = axios.CancelToken.source();
  const cancelToken = source.token;

  //useState
  const [causesData] = useState(CausesData);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageSetup, setPageSetup] = useState({
    page: 1,
    pageSize: 4,
    landingPage: "homepage",
  });
  const [trendingCampaign, setTrendingCampaign] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);

  //useEffect
  useEffect(() => { }, []);

  useEffect(() => {
    getLatestCampaign();
  }, [pageSetup]);

  useEffect(() => {
    getTrendingCampaigns();
  }, []);

  //axios
  const getLatestCampaign = async () => {
    setLoading(true);
    const { page, pageSize, landingPage } = pageSetup;

    await axios
      .get(
        `/api/campaign/latest?page=${page}&pageSize=${pageSize}&landingPage=${landingPage}`,
        generateToken()[1],
        { cancelToken }
      )
      .then((res) => {
        var data = res.data;
        setCampaigns([...campaigns, ...data]);
        if (data.length == 0) setHasMore(false);
      })
      .catch((error) => {
        message.error("There is a problem with uploading the data!!!");
        console.log("error", error);
      });

    setLoading(false);
  };

  const getTrendingCampaigns = async () => {
    await axios
      .get("/api/campaign/trending?length=5", generateToken()[1])
      .then((response) => {
        setTrendingCampaign(response.data);
        // console.log("response.data", response.data);
        setTrendingLoading(false);
      })
      .catch((err) => {
        message.error("Could not fetch the data in the server!");
        console.log(err);
      });
  };

  const handleLoadMore = () => {
    setPageSetup({ ...pageSetup, page: pageSetup.page + 1 });
  };

  return (
    <>
      <InfiniteScroll
        dataLength={campaigns.length - 1} //This is important field to render the next data
        next={() => handleLoadMore()}
        hasMore={hasMore}
        style={{ margin: "-22px" }}
        loader={
          <Row align="center">
            <Col xs={24} sm={24} md={22} lg={15} xl={15} xxl={14}>
              <Card loading={true} />
            </Col>
          </Row>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Row align="center">
          {/* OrganizationList */}
          <Col xs={24} sm={24} md={22} lg={15} xl={15} xxl={14}>
            <OrganizationList />
          </Col>
        </Row>

        <Row align="center">
          {/* Trending Campaign */}
          <Col xs={24} sm={24} md={22} lg={15} xl={15} xxl={14}>
            <Card
              title="Trending Campaign"
              extra={
                <Link to="feeds/list/campaigns" style={{ fontSize: "1rem" }}>
                  More
                </Link>
              }
              loading={trendingLoading}
            >
              <div className="mt-3">
                {trendingCampaign.map((result, i) => (
                  <div
                    key={i}
                    className={`d-flex align-items-center justify-content-between mb-4`}
                  >
                    <div className="avatar-status d-flex align-items-center">
                      {result && result.images && result.images[0] != null ? (
                        <Avatar
                          className="mb-2 mr-1 rounded custom-hover-pointer"
                          icon={<UserOutlined />}
                          size={55}
                          src={result.images[0].data}
                          onClick={() => history.push(`/home/posts/${result.organization}/${result.campaign_id}/single/data`)}
                        />
                      ) : (
                        <Avatar
                          className="font-size-sm custom-hover-pointer"
                          style={{
                            backgroundColor: result.publisher.profileLogo,
                          }}
                          onClick={() => history.push(`/home/posts/${result.organization}/${result.campaign_id}/single/data`)}
                        >
                          {utils.getNameInitial(result.title)}
                        </Avatar>
                      )}
                      {/* future data */}
                      {/* <Avatar
                        className="mb-2 mr-1 rounded"
                        icon={<UserOutlined />}
                        size={55}
                        style={{
                          backgroundColor: result.publisher.profileLogo,
                        }}
                        src={
                          result && result.images && result.images[0] != null
                            ? result.images[0].data
                            : null
                        }
                      /> */}
                      <div className="ml-2">
                        <div>
                          <div className="avatar-status-name">
                            <h4
                            className="custom-text-hover-pointer"
                              onClick={() => history.push(`/home/posts/${result.organization}/${result.campaign_id}/single/data`)}
                            >
                              {result.title}
                            </h4>

                          </div>
                          <span>{ }</span>
                        </div>
                        <div className="text-muted avatar-status-subtitle h5">
                          {result.participantCounter} Participants
                        </div>
                      </div>
                    </div>
                    <div>
                      <Link
                        to={`/home/posts/${result.organization}/${result.campaign_id}/single/data`}
                      >
                        <Button type="primary" shape="round">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Post */}
        <Row align={"center"}>
          {campaigns.length > 0 &&
            campaigns.map((campaign, id) => (
              <Col
                xs={24}
                sm={24}
                md={22}
                lg={15}
                xl={15}
                xxl={14}
                key={id}
                className="mb-2"
              >
                <CampaignCard
                  title={campaign?.title}
                  category={campaign.category}
                  orgName={campaign?.organization?.organization_name}
                  orgId={campaign?.organization?.organization_id}
                  startingDate={campaign?.starting_date}
                  content={campaign?.description}
                  orgProfile={campaign?.organization?.profile}
                  images={campaign?.images}
                  status={campaign?.status}
                  campaignStatus={{
                    likeCounter: campaign?.likeCounter,
                    isLike: campaign?.isLike,
                    participantCounter: campaign?.participantCounter,
                    isParticipant: campaign?.isParticipant,
                    participants: campaign?.participants,
                  }}
                  // isVisit={false}
                  suggestorName={
                    campaign?.suggestor?.first_name +
                    " " +
                    campaign?.suggestor?.last_name
                  }
                  suggestorEmail={campaign?.suggestor?.email}
                  campaignId={campaign?._id}
                  enableVisit={false}
                  enablePost={true}
                />
              </Col>
            ))}
        </Row>
      </InfiniteScroll>
    </>
  );
};

export default withRouter(DefaultDashboard);
