import React from 'react';
import '../styles/Components/Header.less';
import { Row, Col, Menu } from 'antd';
import { HomeOutlined, YoutubeOutlined, SmileOutlined } from '@ant-design/icons';

function Header() {
  return (
    <div className='header'>
      <Row type='flex' justify='center'>
        <Col xs={24} sm={24} md={14} lg={12}>
          <span className='header-logo'>伯格</span>
          <span className='header-text'>克劳斯</span>
        </Col>
        <Col xs={0} sm={0} md={10} lg={8} xl={6}>
          <Menu mode='horizontal'>
            <Menu.Item key='home'>
              <HomeOutlined />
              首页
            </Menu.Item>
            <Menu.Item key='video'>
              <YoutubeOutlined />
              视频
            </Menu.Item>
            <Menu.Item key='life'>
              <SmileOutlined />
              生活
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
