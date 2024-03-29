import React, { useState, useEffect } from "react";
import { Carousel } from "@trendyol-js/react-carousel";
import { Row, Col, Card } from "antd";
import News from "views/app-views/home/announcement";
import { NewsReportData } from "./DefaultDashboardData";
import CommentSection from "components/shared-components/CommentSection";
const BlogComponent = () => {
  const [data, setData] = useState(false);
  const newsReportData = NewsReportData;
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    const listener = window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
    return () => window.removeEventListener("resize", listener);
  }, []);
  return (
    <div>
      <section id="blog" className="blog-area ptb-80">
        <div className="container">
          <div className="section-title">
            <h2>
              Latest Blog <span>Campaign</span>
            </h2>
            <p>
              Manage your own organization to create campaign crowdfunding
              allows you to raise money for a{" "}
              <strong>
                variety of events, from life events such as disaster relief,
                graduations to celebration and Illness.
              </strong>
            </p>
          </div>

          <>
            <Col lg={24} md={24}>
              <Carousel
                show={width <= 590 ? 1 : width <= 768 ? 2 : 3}
                slide={width <= 590 ? 1 : width <= 768 ? 2 : 3}
                transition={0.5}
                swiping={true}
                className="blog-carousel"
                style={{ padding: " 15px 0" }}
              >
                {newsReportData.map((result, id) => (
                  <News
                    isVisit={false}
                    key={id}
                    title={result.title}
                    type={result.type}
                    img={result.img}
                    content={result.content}
                    margin={"5px 5px"}
                    classData={"blog-data"}
                  />
                ))}
              </Carousel>
            </Col>
            {/* <Carousel show={5} slide={5} transition={0.5}>
              <div style={{ height: 150, width: 300, background: "red" }} />
              <div style={{ height: 150, width: 300, background: "blue" }} />
              <div style={{ height: 150, width: 300, background: "green" }} />
              <div style={{ height: 150, width: 300, background: "yellow" }} />
              <div style={{ height: 150, width: 300, background: "orange" }} />
              <div style={{ height: 150, width: 300, background: "cian" }} />
              <div style={{ height: 150, width: 300, background: "purple" }} />
              <div style={{ height: 150, width: 300, background: "brown" }} />
              <div style={{ height: 150, width: 300, background: "black" }} />
              <div style={{ height: 150, width: 300, background: "orange" }} />
            </Carousel> */}
          </>
        </div>
      </section>
    </div>
  );
};

export default BlogComponent;
