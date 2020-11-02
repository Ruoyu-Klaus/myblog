import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Project';
import Footer from '../components/Footer';
import '../styles/Pages/detailed.less';

import { Row, Col, Breadcrumb, Affix } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import MarkdownAnchor from '../components/MarkdownAnchor.tsx';

import axios from 'axios';

function Detailed({ post }) {
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
  const MdAnchor = new MarkdownAnchor();
  renderer.heading = function (text, level, raw) {
    const anchor = MdAnchor.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  const article = marked(post.article_content);

  console.log(post);

  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className='bread-div'>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href='/home'>首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href={`/list?id=${post.type_id}`}>{post.type_name}</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{post.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className='detailed-title'>{post.title}</div>

              <div className='list-icon center'>
                <span>
                  <FontAwesomeIcon icon='calendar-day' />
                  {post.add_time}
                </span>
                <span>
                  <FontAwesomeIcon icon='folder' /> {post.type_name}
                </span>
                <span>
                  <FontAwesomeIcon icon='fire' />
                  {post.view_count}
                </span>
              </div>

              <div className='detailed-content' dangerouslySetInnerHTML={{ __html: article }} />
            </div>
          </div>
        </Col>

        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className='detailed-nav comm-box'>
              <div className='nav-title'>文章目录</div>
              <div className='toc-list'>{MdAnchor && MdAnchor.render()}</div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </>
  );
}

import { API } from '../config/default.json';
//  Next.js will pre-render this page on each request using the data returned by getServerSideProps.
export async function getServerSideProps({ query }) {
  try {
    const id = query.id;
    const base = API.base;
    const requestUrl = base + API.servicePath.getArticleById;
    const res = await axios.get(requestUrl + id);
    const posts = await res.data;
    const post = posts.data[0];
    return {
      props: {
        post,
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

export default Detailed;
