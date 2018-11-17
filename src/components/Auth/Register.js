import React, { Component } from 'react';
import md5 from 'md5';
import Form from '../common/Form';
import Input from '../common/Input';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import firebase from '../../firebase';
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';


class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
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
    } if (!this.isPasswordValid(this.state)) {
      error = { message: '비밀번호가 유효하지 않습니다.' };
      this.setState({ errors: errors.concat(error) });
      return false;
    }
    return true;
  };

  isFormEmpty = ({
    username, email, password, passwordConfirmation,
  }) => !username.length || !email.length || !password.length || !passwordConfirmation.length;

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    }
    if (password !== passwordConfirmation) {
      return false;
    }
    return true;
  };

  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    const {
      email, password, username, errors,
    } = this.state;
    this.setState({ errors: [] });
    if (this.isFormValid()) {
      event.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser) => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: username,
              photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`,
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log('user saved');
              });
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          if (err.code === 'auth/email-already-in-use') {
            const error = { message: '이미 가입된 이메일 입니다.' };
            this.setState({ errors: errors.concat(error) });
          }
          console.error(err);
        });
    }
  };

  saveUser = (createdUser) => {
    const { usersRef } = this.state;
    return usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  render() {
    const {
      username, email, password, passwordConfirmation, errors,
    } = this.state;

    return (
      <section>
        <Form className={styles['register-form']}>
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
            id="username"
            value={username}
            name="username"
            placeholder="별명"
            type="text"
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
          <Input
            id="passwordConfirmation"
            value={passwordConfirmation}
            name="passwordConfirmation"
            placeholder="비밀번호 확인"
            type="password"
            onChange={this.handleChange}
          />
          {errors.length > 0 && (
            <ErrorMessage>
              {this.displayErrors(errors)}
            </ErrorMessage>
          )}
          <p className={styles['register-info']}>
            {'이미 가입하셨나요? '}
            <Link to="/login">로그인</Link>
          </p>
          <div className={styles['button-wrapper']}>
            <Button onClick={this.handleSubmit}>회원가입</Button>
          </div>
        </Form>
      </section>
    );
  }
}

export default Register;
