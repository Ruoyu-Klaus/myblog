import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Author from '../components/Author';
import Project from '../components/Project';
import Footer from '../components/Footer';

import { Row, Col, List, Pagination } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Pages/index.less';

import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

import axios from 'axios';
import dayjs from 'dayjs';

function Home({ posts }) {
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

  const [mylist, setMylist] = useState(posts.data);
  const [currentPage, setPage] = useState(1);

  useEffect(() => {
    setMylist(posts.data);
  }, [posts]);

  const handlePageChange = page => {
    setPage(page);
  };
  return (
    <div>
      <Head>
        <title>Home | Ruoyu</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={14} lg={12}>
          <>
            <List
              header={<div>最新日志</div>}
              itemLayout='vertical'
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className='list-title'>
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className='list-icon'>
                    <span>
                      <FontAwesomeIcon icon='calendar-day' />
                      {dayjs(item.add_time).format('YYYY-MM-DD')}
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
          </>
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            total={50}
            style={{ textAlign: 'center' }}
          />
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
// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const base = API.base;
  const requestUrl = base + API.servicePath.getArticleList;
  const res = await axios.get(requestUrl);
  const posts = await res.data;
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}
export default Home;
