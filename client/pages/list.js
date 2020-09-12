import react, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Author from '../components/Author';
import Project from '../components/Project';
import Footer from '../components/Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, List, Breadcrumb } from 'antd';

import Link from 'next/link';
import axios from 'axios';

function Mylist({ list }) {
  const [mylist, setMylist] = useState(list.data);
  useEffect(() => {
    setMylist(list.data);
  });
  return (
    <div>
      <Head>
        <title>List</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={14} lg={12}>
          <div className='bread-div'>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href='/'>首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>视频列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <List
              header={<div>最新日志</div>}
              itemLayout='vertical'
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className='list-title'>
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      {item.title}
                    </Link>
                  </div>
                  <div className='list-icon'>
                    <span>
                      <FontAwesomeIcon icon='calendar-day' />
                      {item.addTime}
                    </span>
                    <span>
                      <FontAwesomeIcon icon='folder' /> {item.typeName}
                    </span>
                    <span>
                      <FontAwesomeIcon icon='fire' />
                      {item.view_count}
                    </span>
                  </div>
                  <div className='list-context'>{item.context}</div>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={8} lg={6} xl={6}>
          <Author />
          <Project />
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

import { API } from '../config/default.json';

//  Next.js will pre-render this page on each request using the data returned by getServerSideProps.
export async function getServerSideProps({ query }) {
  try {
    const id = query.id;
    const base = API.base;
    const requestUrl = base + API.servicePath.getListById;
    const res = await axios.get(requestUrl + id);
    const list = await res.data;
    return {
      props: {
        list,
      },
    };
  } catch (error) {
    return {
      props: {
        msg: 'server error',
      },
    };
  }
}

export default Mylist;
