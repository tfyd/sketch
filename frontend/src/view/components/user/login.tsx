import * as React from 'react';
import { Link } from 'react-router-dom';
import { validEmail } from '../../../utils/validates';
import { Card } from '../common/card';
import { NoticeBar } from '../common/notice-bar';
import './login.scss';
// FIXME: internal server error will be treated as incorrect password 
interface Props {
  login:(email:string, pwd:string) => Promise<boolean>;
}
interface State {
  email:string;
  password:string;
  errMsg:string;
}

export class Login extends React.Component<Props, State> {
  public state = {
    email: '',
    password: '',
    errMsg: '',
  };

  public render () {
    return <Card style={{
        height: '100%', marginTop: '0', padding: '10%'
      }}>
        <div className="card-content">


        
        <div className="login-logo"> 废 </div>


        <div className="inputbox">
        <div className = "textfield">账号</div> <div className = "dividing-line">|</div> 
        <input className="input is-normal inputfield"
          type="email"
          value={this.state.email}
          onChange={(ev) => this.setState({email:ev.target.value})} />
        <br />
        </div>

        <div className="inputbox">
        <div className = "textfield">密码</div> <div className = "dividing-line">|</div> 
        <input
          className="input is-normal inputfield"
          type="password"
          value={this.state.password}
          onChange={(ev) => this.setState({password:ev.target.value})} />
        </div>

        { this.state.errMsg && <NoticeBar>{this.state.errMsg}</NoticeBar> }

        <a className="button color-primary login-button"onClick={async (ev) => {
          if (this.state.email === '') {
            this.setState({errMsg: '邮箱 不能为空。'});
          } else if (this.state.password === '') {
            this.setState({errMsg: '密码 不能为空。'});
          } else if (!validEmail(this.state.email)) {
            this.setState({errMsg: '邮箱格式不符'});
          } else {
            try{
              await this.props.login(this.state.email, this.state.password);
            } catch (e){
              this.setState({errMsg: '用户名或密码错误。'});
            }
          }
        }}>登录</a>

        <Link to="reset_password"
        style={{
        color: '#CE565D',
        float: 'left',
        fontSize: '12px',
        margin: '10px'
      }}>忘记密码?</Link>
      </div>




      <div className="card-footer">
      废文1.0｜copyright xxx
      </div>

    </Card>
  }
}

// <label className="checkbox"><input type="checkbox" />记住我</label>
// <span>还没账号?&#160;&#160;</span><Link to="/register">现在注册</Link>!