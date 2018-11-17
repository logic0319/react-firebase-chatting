import React, { Component } from 'react';
import md5 from 'md5';
import Form from '../common/Form';
import Input from '../common/Input';
import Button from '../common/Button';
import firebase from '../../firebase';
import styles from './Register.module.scss';


class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    usersRef: firebase.database().ref('users'),
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    const { email, password, username } = this.state;
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
        console.error(err);
      });
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
      username, email, password, passwordConfirmation,
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
            placeholder="비밀번호"
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
          <div className={styles['button-wrapper']}>
            <Button onClick={this.handleSubmit}>회원가입</Button>
          </div>
        </Form>
      </section>
    );
  }
}

export default Register;
