import React from 'react'
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag } from 'antd';
import { 
    UserAddOutlined, 
    FileExcelOutlined, 
    PrinterOutlined, 
    PlusOutlined, 
    EllipsisOutlined, 
    StopOutlined, 
    ReloadOutlined 
} from '@ant-design/icons';

const TrendingNews = ({title, newsType, like}) => {
    const latestTransactionOption = (
        <Menu>
          <Menu.Item key="0">
            <span>
              <div className="d-flex align-items-center">
                <ReloadOutlined />
                <span className="ml-2">Not interested in this</span>
              </div>
            </span>
          </Menu.Item>
          <Menu.Item key="1">
            <span>
              <div className="d-flex align-items-center">
                <PrinterOutlined />
                <span className="ml-2">This trend is harmful or spammy</span>
              </div>
            </span>
          </Menu.Item>
          {/* <Menu.Item key="12">
            <span>
              <div className="d-flex align-items-center">
                <FileExcelOutlined />
                <span className="ml-2">Export</span>
              </div>
            </span>
          </Menu.Item> */}
        </Menu>
      );

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="avatar-status d-flex align-items-center">
                  <div className="ml-2">
                  <div className="text-muted avatar-status-subtitle">{newsType}</div>
                    <div>
                        <div className="avatar-status-name">{title}</div>
                    </div>
                    <div className="text-muted avatar-status-subtitle">{like}k Tweets</div>
                  </div>
                </div>
                <div>
                <Dropdown overlay={latestTransactionOption} trigger={['click']} placement="bottomRight">
                  <a href="/#" className="text-gray font-size-lg" onClick={e => e.preventDefault()}>
                    <EllipsisOutlined />
                  </a>
                </Dropdown>
                </div>
              </div>
        </>
    )
}

export default TrendingNews;
