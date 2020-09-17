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
      let res = await Axios({
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
          Search: props => <Search {...props} />,
          ResetSearch: props => <Clear {...props} />,
          SortArrow: props => <ArrowDownward {...props} />,
          PreviousPage: props => <ChevronLeft {...props} />,
          NextPage: props => <ChevronRight {...props} />,
          FirstPage: props => <FirstPage {...props} />,
          LastPage: props => <LastPage {...props} />,
        }}
        localization={{
          header: {
            actions: '修改/删除',
          },
        }}
        title='所有文章列表'
        columns={[
          { title: '标题', field: 'title' },
          { title: '类别', field: 'typeName' },
          { title: '修改时间', field: 'addTime' },
          { title: '浏览量', field: 'view_count', type: 'numeric' },
        ]}
        data={list}
        actions={[
          {
            icon: () => <Edit color='action' />,
            tooltip: 'Edit',
            onClick: (event, rowData) => handleEditArticle(rowData.id),
          },
          rowData => ({
            icon: () => <Delete color='error' />,
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
