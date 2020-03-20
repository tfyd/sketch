import React from 'react';
import ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import { setIdleTimeout } from '../../../utils/timer';
import './notice.scss';
import { ToastProps, Toast, ToastType as NoticeType } from './toast';
export { ToastType as NoticeType } from './toast';

type NoticeProps = {
  noticeList:NoticeConfig[];
};

interface NoticeConfig extends ToastProps {
  id:string;
}

const noticeList:NoticeConfig[] = [];
const localContainer = document.createElement('div');
// tslint:disable-next-line: no-floating-promises
(async () => {
  while (true) {
    const app = document.getElementById('app');
    if (app) {
      app.appendChild(localContainer);
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
})();

class Notice extends React.Component<NoticeProps, {}> {
  public render () {
    return (
      <div className="comp-common-notice">
        {this.props.noticeList.map((_notice) => {
          return (
            <Toast {..._notice} style={{marginBottom: '10px'}} key={_notice.id}/>
          );
        })}
      </div>
    );
  }
}

function addNotice(content:string, type:NoticeType, duration?:number) : string {
  const id = uuid.v4();
  noticeList.push({
    content,
    type,
    id: id,
    onClose: () => closeNotice(id),
  });
  if (noticeList.length > 6) {
    noticeList.shift();
  }
  render();
  setIdleTimeout(() => closeNotice(id), duration || 3500);
  return id;
}

function closeNotice (id:string) {
  for (let i = 0; i < noticeList.length; i++) {
    if (id === noticeList[i].id) {
      noticeList.splice(i, 1);
      render();
      return;
    }
  }
}

function render() {
  const localDom = (
    <Notice noticeList={noticeList}/>
  );
  ReactDOM.render(localDom, localContainer);
}

function success(content:string, duration?:number) {
  return addNotice(content, NoticeType.success, duration);
}
function info(content:string, duration?:number) {
  return addNotice(content, NoticeType.info, duration);
}
function warning(content:string, duration?:number) {
  return addNotice(content, NoticeType.warning, duration);
}
function error(content:string, duration?:number) {
  return addNotice(content, NoticeType.error, duration);
}

export const notice = {
  success,
  info,
  warning,
  error,
  closeNotice,
  addNotice,
  requestError: (err) => {
    try {
      const errorMsg = JSON.parse(err.message);
      if (errorMsg.msg) {
        return error(errorMsg.msg);
      } else {
        return error('未知错误');
      }
    } catch (e) {
      return error('未知错误');
    }
  },
};