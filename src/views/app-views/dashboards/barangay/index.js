import React, { useState } from "react";
import { Row, Col, Card, Typography, Button} from 'antd';
import HeaderCover from "./HeaderCover";
import Header from "./Header";
import Officials from "./Officials";
import Barangay from "./Barangay";
import { 
  BarangayData, NewsReportData
} from '../default/DefaultDashboardData';

const { Text, Link } = Typography;

const Index = ({match}) => {
    const [barangayData] = useState(BarangayData);

  return (
    <> 
      <HeaderCover img="/img/others/img-12.jpg"></HeaderCover>

      <div className="container my-4">
        <Header name={match.params.name} avatarSize={150}
          quote="We rise and fall as one people, one nation."
          email="caniogan@gmail.com" phoneNumber="+12 123 1234" address="Caniogan Morong, Rizal"
          website="facebook.com"></Header>

        <Row gutter="16">
          <Col xs={24} sm={24} md={8}>
            <Officials></Officials>
          </Col>
          
          <Col xs={24} sm={24} md={16}>
          </Col>
        </Row> 
      </div>
      {/* <Barangay name={match.params.name}></Barangay> */}
    </>
  )
}

export default Index
