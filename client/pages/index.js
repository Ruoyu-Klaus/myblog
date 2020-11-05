import Head from 'next/head';
import { Row, Col } from 'antd';
import Author from '../components/Author';

import axios from 'axios';

function Cover() {
  return (
    <div style={{ height: '100vh' }}>
      <Head>
        <title>Cover | Ruoyu</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Row type='flex' justify='center'>
        <Col xs={24} sm={24} md={24} lg={24}>
          <img
            src='/SaoPaulo.jpg'
            alt='cover page'
            style={{
              position: 'absolute',
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
          />
          <Author coverStyle={true} />
        </Col>
      </Row>
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
export default Cover;
