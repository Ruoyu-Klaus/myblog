import React, { useState, useEffect } from 'react';

import '../static/css/AddArticle.css';

import { Grid, TextField, Button } from '@material-ui/core';
import TypeSelection from './Common/TypeSelection';
import DatePicker from './Common/DatePicker';
import TextArea from './Common/TextArea';
import HtmlMarkdown from './Common/HtmlMarkdown';
import Alert from './Common/Alerts';

import { API } from '../config/default.json';
import * as dayjs from 'dayjs';
import Axios from '../utils/axios';

function AddArticle({ history }) {
  const [articleId, setArticleId] = useState(0); // 文章ID 0新增加，不是0修改
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState(''); //markdown的编辑内容
  const [introContent, setIntroContent] = useState(); //简介的markdown内容

  const [updateDate, setUpdateDate] = useState(); //修改日志的日期

  const [openAlert, setOpenAlert] = useState({ open: false, message: '', type: 'error' });

  useEffect(() => {
    getTypeInfo();
  }, []);

  const handleArticleChange = event => {
    setArticleContent(event.target.value);
  };

  const handleIntroChange = event => {
    setIntroContent(event.target.value);
  };

  //从中台得到文章类别信息
  const getTypeInfo = async () => {
    let reqUrl = API.servicePath.getTypeInfo;
    let res = await Axios.get(reqUrl);
    if (res.data === '没有登录') {
      localStorage.removeItem('openId');
      console.log(res);
      history.push('/signin');
    } else {
      setTypeInfo(res.data);
    }
  };

  // 处理种类
  const [selectedType, setSelectedType] = useState('');
  const handleTypeChange = event => {
    setSelectedType(event.target.value);
  };

  // 处理日期
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const saveArticle = () => {
    if (!selectedType) {
      setOpenAlert(state => ({ ...state, open: true, message: '必须选择文章类别' }));
      return false;
    } else if (!articleTitle) {
      setOpenAlert(state => ({ ...state, open: true, message: '文章标题不能为空' }));
      return false;
    } else if (!articleContent) {
      setOpenAlert(state => ({ ...state, open: true, message: '文章内容不能为空' }));
      return false;
    } else if (!introContent) {
      setOpenAlert(state => ({ ...state, open: true, message: '简介不能为空' }));
      return false;
    } else if (!selectedDate) {
      setOpenAlert(state => ({ ...state, open: true, message: '发布日期不能为空' }));
      return false;
    }
    let dataProps = new Object();
    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.introduce = introContent;
    dataProps.addTime = dayjs(selectedDate).unix();

    setOpenAlert(state => ({ ...state, open: true, message: '检验通过' }));
    if (articleId === 0) {
      dataProps.view_count = 0;
      const uploadArticle = async function () {
        let reqUrl = API.servicePath.addArticle;
        let res = await Axios({
          method: 'post',
          url: reqUrl,
          data: dataProps,
          withCredentials: true,
        });
        setOpenAlert(state => ({
          ...state,
          open: true,
          type: res.isSuccess ? 'success' : 'error',
          message: res.isSuccess ? '上传成功' : '上传失败',
        }));
        res.isSuccess && setArticleId(res.insertId);
      };
      uploadArticle();
    } else {
      dataProps.id = articleId;
      const updateArticle = async function () {
        let reqUrl = API.servicePath.updateArticle;
        let res = await Axios({
          method: 'post',
          url: reqUrl,
          data: dataProps,
          withCredentials: true,
        });
        setOpenAlert(state => ({
          ...state,
          open: true,
          type: res.isSuccess ? 'success' : 'error',
          message: res.isSuccess ? '更新成功' : '更新失败',
        }));
        res.isSuccess && setArticleId(res.insertId);
      };
      updateArticle();
    }
  };
  const handleClose = () => {
    setOpenAlert(state => ({ ...state, open: false }));
  };

  return (
    <Grid container spacing={2}>
      <Alert
        message={openAlert.message}
        type={openAlert.type}
        open={openAlert.open}
        handleClose={handleClose}
      />
      <Grid item xs={8} md={9}>
        <Grid container direction='column' spacing={2}>
          <Grid item container xs={12} style={{ minHeight: 90 }}>
            <Grid item xs={8} container justify='center' alignItems='flex-end'>
              <TextField
                id='article-title'
                value={articleTitle}
                onChange={e => setArticleTitle(e.target.value)}
                label='Title'
                fullWidth
                style={{ margin: 8 }}
              />
            </Grid>
            <Grid item xs={4} container alignItems='flex-end'>
              <TypeSelection
                option={selectedType}
                handleChange={handleTypeChange}
                types={typeInfo}
                placehoder='请选择种类'
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={1}>
            <Grid item xs={6}>
              <HtmlMarkdown class_name='show-html' raw_content={articleContent} />
            </Grid>
            <Grid item xs={6}>
              <TextArea rows={36} handleChange={handleArticleChange} value={articleContent} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={4} md={3}>
        <Grid container direction='column' spacing={2}>
          <Grid item container xs={12} style={{ minHeight: 90 }} alignItems='flex-end'>
            <Grid item xs={10}>
              <Button variant='contained' color='secondary' onClick={saveArticle}>
                暂存文章
              </Button>{' '}
              <Button variant='contained' color='primary'>
                发布文章
              </Button>
            </Grid>
          </Grid>
          <Grid item container direction='column' xs={12} spacing={1}>
            <Grid item xs={12}>
              <TextArea rows={12} handleChange={handleIntroChange} value={introContent} />
            </Grid>
            <Grid item xs={12}>
              <HtmlMarkdown class_name='introduce-html' raw_content={introContent} />
            </Grid>
            <Grid item xs={12}>
              <div className='date-select'>
                <DatePicker selectedDate={selectedDate} handleChange={handleDateChange} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AddArticle;
