import react, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Author from '../components/Author';
import Project from '../components/Project';
import Footer from '../components/Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, List, Breadcrumb } from 'antd';

import '../styles/Pages/list.less';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

import Link from 'next/link';
import axios from 'axios';

function Mylist({ list, typeName }) {
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });
  const [mylist, setMylist] = useState(list.data);
  useEffect(() => {
    setMylist(list.data);
  }, [list]);

  return (
    <div>
      <Head>
        <title>{mylist[0].type_name} | Ruoyu </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={14} lg={12}>
          <div className='bread-div'>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href='/home'>首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{mylist[0].type_name}</Breadcrumb.Item>
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
                      {item.add_time}
                    </span>
                    <span>
                      <FontAwesomeIcon icon='folder' /> {item.type_name}
                    </span>
                    <span>
                      <FontAwesomeIcon icon='fire' />
                      {item.view_count}
                    </span>
                  </div>
                  <div
                    className='list-context'
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                  ></div>
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

    const typeRequestUrl = base + API.servicePath.getTypeInfo;
    const typeRes = await axios.get(typeRequestUrl);
    const types = await typeRes.data.data;
    const typeName = types.filter(type => type.id == id)[0].type_name;
    return {
      props: {
        list,
        typeName,
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
