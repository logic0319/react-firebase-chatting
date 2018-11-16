import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Button, CssBaseline, FormControl, Input, InputLabel, Paper, Typography,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function Register(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="title">
          Register for OpenChat
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="username">별명</InputLabel>
            <Input id="username" name="username" autoFocus />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email">이메일</InputLabel>
            <Input id="email" name="email" autoComplete="email" />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="password">비밀번호</InputLabel>
            <Input name="password" type="password" id="password" />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="passwordConfirmation">비밀번호 확인</InputLabel>
            <Input name="passwordConfirmation" type="password" id="passwordConfirmation" />
          </FormControl>
          <span>
            이미 가입 하셨나요?
            <Link to="/login"> 로그인</Link>
          </span>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            회원가입
          </Button>
        </form>
      </Paper>
    </main>
  );
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
