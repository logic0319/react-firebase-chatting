import React, { Component } from 'react';
import Form from '../common/Form';
import Input from '../common/Input';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import firebase from '../../firebase';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';


class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    usersRef: firebase.database().ref('users'),
  };

  isFormValid = () => {
    const errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: '모든 필드를 채워 주세요!' };
      this.setState({ errors: errors.concat(error) });
      return false;
    }
    return true;
  };

  isFormEmpty = ({
    email, password,
  }) => !email.length || !password.length;

  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ errors: [] }, () => {
      const { email, password, errors } = this.state;
      if (this.isFormValid(this.state)) {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((signedInUser) => {
            console.log(signedInUser);
          })
          .catch((err) => {
            console.error(err);
            if (err.code === 'auth/wrong-password') {
              const error = { message: '비밀번호가 유효하지 않습니다.' };
              this.setState({
                errors: errors.concat(error),
              });
            }
            if (err.code === 'auth/user-not-found') {
              const error = { message: '가입되지 않은 이메일 입니다' };
              this.setState({
                errors: errors.concat(error),
              });
            }
            if (err.code === 'auth/invalid-email') {
              const error = { message: '이메일을 확인해 주세요' };
              this.setState({
                errors: errors.concat(error),
              });
            }
          });
      }
    });
  };

  render() {
    const {
      email, password, errors,
    } = this.state;

    return (
      <section>
        <Form className={styles['login-form']}>
          <h1 className={styles.title}>OPEN CHAT</h1>
          <Input
            id="email"
            value={email}
            name="email"
            placeholder="이메일"
            type="email"
            onChange={this.handleChange}
          />
          <Input
            id="password"
            value={password}
            name="password"
            placeholder="비밀번호(최소 6자)"
            type="password"
            onChange={this.handleChange}
          />
          {errors.length > 0 && (
            <ErrorMessage>
              {this.displayErrors(errors)}
            </ErrorMessage>
          )}
          <p className={styles['login-info']}>
            {'처음 방문하셨나요? '}
            <Link to="/register">회원가입</Link>
          </p>
          <div className={styles['button-wrapper']}>
            <Button onClick={this.handleSubmit}>로그인</Button>
          </div>
        </Form>
      </section>
    );
  }
}

export default Login;
