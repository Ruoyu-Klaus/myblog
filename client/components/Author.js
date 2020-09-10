import { Avatar, Divider } from 'antd';
import { WechatFilled, QqCircleFilled, GithubFilled } from '@ant-design/icons';
import '../styles/Components/Author.less';

function Author() {
  return (
    <div className='author-div comm-box'>
      <div>
        <Avatar size={100} src='https://picsum.photos/200/300' />
      </div>
      <div className='author-introduction'>
        光头程序员，专注于WEB和移动前端开发。要录1000集免费前端视频的傻X。此地维权无门，此时无能为力，此心随波逐流。
        <Divider>社交账号</Divider>
        <Avatar size={30} icon={<GithubFilled />} className='account' />
        <Avatar size={30} icon={<QqCircleFilled />} className='account' />
        <Avatar size={30} icon={<WechatFilled />} className='account' />
      </div>
    </div>
  );
}

export default Author;
