import { Avatar, Divider } from 'antd';
import Link from 'next/link';
import { WechatFilled, FacebookFilled, GithubFilled } from '@ant-design/icons';
import '../styles/Components/Author.less';

function Author(props) {
  const { coverStyle } = props;
  return (
    <div className={`author-div ${coverStyle ? 'cover-box' : 'comm-box'}`}>
      <div>
        <Avatar size={coverStyle ? 120 : 100} src='https://picsum.photos/200/300' />
      </div>
      <div className={`${coverStyle ? 'author-introduction-cover' : 'author-introduction'}`}>
        你好，我叫王若宇。
        <br />
        卡迪夫大学 MSc Computational and Data Journalism <br />
        中国地质大学 MA Communication and Journalism
        <br />
        {coverStyle && <Link href={{ pathname: '/home' }}>进入主页</Link>}
        <Divider style={coverStyle && { color: '#eee' }}>社交账号</Divider>
        <a target='_blank' href='https://github.com/Ruoyu-Klaus'>
          <Avatar size={coverStyle ? 50 : 30} icon={<GithubFilled />} className='account' />
        </a>
        <a target='_blank' href='https://www.facebook.com/ruoyu.wang.9028194'>
          <Avatar size={coverStyle ? 50 : 30} icon={<FacebookFilled />} className='account' />
        </a>
        <a target='_blank' href='https://i.loli.net/2020/07/03/WklZBzG2MxepQyg.jpg'>
          <Avatar size={coverStyle ? 50 : 30} icon={<WechatFilled />} className='account' />
        </a>
      </div>
    </div>
  );
}

export default Author;
