import React, { useState, useEffect } from 'react';
// import {} from '@material-ui/core';
import MaterialTable from 'material-table';
import {
  Delete,
  Edit,
  Search,
  Clear,
  ArrowDownward,
  FirstPage,
  LastPage,
  ChevronRight,
  ChevronLeft,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { API } from '../config/default.json';
import * as dayjs from 'dayjs';
import Axios from '../utils/axios';
import AlertDialog from './Common/AlertDialog';
import Alerts from './Common/Alerts';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  subheader: {
    padding: 16,
  },
  secondaryAction: {
    '& :not(:last-child)': {
      marginRight: 4,
    },
  },
}));

function ArticleList() {
  const classes = useStyles();
  const history = useHistory();
  const [list, setList] = useState([]);
  const [openConfrim, setOpenConfrim] = useState(false);
  const [selectId, setSelectId] = useState('');
  const [selectTitle, setSelectTitle] = useState('');

  // Alert
  const [openAlert, setOpenAlert] = useState({ open: false, message: '', type: 'error' });
  const handleAlertClose = () => {
    setOpenAlert(state => ({ ...state, open: false }));
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    let reqUrl = API.servicePath.getArticleList;
    let res = await Axios({
      method: 'get',
      url: reqUrl,
      withCredentials: true,
    });
    console.log(res);
    setList(() => res.data);
  };
  const handleCloseConfrim = () => {
    setOpenConfrim(false);
    setOpenAlert(state => ({ ...state, open: true, type: 'info', message: '操作取消' }));
  };
  const handleDeletArticleConfirm = async (id, title) => {
    setSelectTitle(() => title);
    setSelectId(() => id);
    setOpenConfrim(() => true);
  };

  const handleDelete = async () => {
    try {
      let reqUrl = API.servicePath.deleteArticleById + selectId;
      await Axios({
        method: 'delete',
        url: reqUrl,
        withCredentials: true,
      });
      setOpenConfrim(false);
      setOpenAlert(state => ({ ...state, open: true, type: 'success', message: '删除成功' }));
      // rerender table by getList
      getList();
    } catch (error) {
      setOpenConfrim(false);
      setOpenAlert(state => ({ ...state, open: true, type: 'error', message: '操作失败' }));
    }
  };

  const handleEditArticle = id => {
    history.push('/index/addarticle/' + id);
  };

  return (
    <div className={classes.root}>
      <AlertDialog
        open={openConfrim}
        title={selectTitle}
        handleClose={handleCloseConfrim}
        handleDelete={handleDelete}
      />

      <Alerts
        message={openAlert.message}
        type={openAlert.type}
        open={openAlert.open}
        handleClose={handleAlertClose}
      />
      <MaterialTable
        components={{
          Container: props => <div {...props} />,
        }}
        icons={{
          Search: React.forwardRef((props, ref) => <Search ref={ref}></Search>),
          ResetSearch: React.forwardRef((props, ref) => <Clear ref={ref}></Clear>),
          SortArrow: React.forwardRef((props, ref) => <ArrowDownward ref={ref}></ArrowDownward>),
          PreviousPage: React.forwardRef((props, ref) => <ChevronLeft ref={ref}></ChevronLeft>),
          NextPage: React.forwardRef((props, ref) => <ChevronRight ref={ref}></ChevronRight>),
          FirstPage: React.forwardRef((props, ref) => <FirstPage ref={ref}></FirstPage>),
          LastPage: React.forwardRef((props, ref) => <LastPage ref={ref}></LastPage>),
        }}
        localization={{
          header: {
            actions: '修改/删除',
          },
        }}
        title='所有文章列表'
        columns={[
          { title: '标题', field: 'title' },
          { title: '类别', field: 'type.type_name' },
          {
            title: '修改时间',
            field: 'add_time',
            render: rowData => (
              <time> {dayjs(rowData.add_time).format('YYYY-MM-DD HH:mm:ss')}</time>
            ),
          },
          { title: '浏览量', field: 'view_count', type: 'numeric' },
        ]}
        data={list}
        actions={[
          {
            icon: () => (
              <span>
                <Edit color='action' />
              </span>
            ),
            tooltip: 'Edit',
            onClick: (event, rowData) => handleEditArticle(rowData.id),
          },
          rowData => ({
            icon: () => (
              <span>
                <Delete color='error' />
              </span>
            ),
            tooltip: 'Delete',
            onClick: (event, rowData) => handleDeletArticleConfirm(rowData.id, rowData.title),
          }),
        ]}
        options={{
          search: true,
          actionsColumnIndex: -1,
          pageSize: 10,
        }}
      />
    </div>
  );
}
export default ArticleList;
