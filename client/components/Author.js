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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore culpa eveniet quod.
        Possimus non quibusdam ea alias porro placeat eos rem, excepturi, exercitationem
        reprehenderit qui consequuntur harum libero? Ratione, dolorem.
        <Divider>社交账号</Divider>
        <Avatar size={30} icon={<GithubFilled />} className='account' />
        <Avatar size={30} icon={<QqCircleFilled />} className='account' />
        <Avatar size={30} icon={<WechatFilled />} className='account' />
      </div>
    </div>
  );
}

export default Author;
