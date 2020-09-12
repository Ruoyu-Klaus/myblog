import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { API } from '../config/default.json';

import '../styles/Components/Header.less';
import { Row, Col, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
  const [navArray, setArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const base = API.base;
      const requestUrl = base + API.servicePath.getTypeInfo;
      const res = await axios.get(requestUrl);
      const data = await res.data.data;
      setArray(data);
    };
    fetchData();
  }, []);

  const handleClick = e => {
    if (e.key == 0) {
      Router.push('/');
    } else {
      Router.push('/list?id=' + e.key);
    }
  };

  return (
    <div className='header'>
      <Row type='flex' justify='center'>
        <Col xs={24} sm={24} md={14} lg={12}>
          <span className='header-logo'>伯格</span>
          <span className='header-text'>克劳斯</span>
        </Col>
        <Col xs={0} sm={0} md={10} lg={8} xl={6}>
          <Menu mode='horizontal' onClick={handleClick}>
            <Menu.Item key='0'>
              <FontAwesomeIcon icon='home' />
              首页
            </Menu.Item>
            {navArray.map(nav => (
              <Menu.Item key={nav.id}>
                <FontAwesomeIcon icon={nav.icon} />
                {nav.typeName}
              </Menu.Item>
            ))}
          </Menu>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
