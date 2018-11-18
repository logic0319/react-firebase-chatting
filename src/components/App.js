import React, { Component } from 'react';
import SidePanel from './SidePanel/SidePanel';
import styles from './App.module.scss';
import '../styles/main.scss';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <SidePanel />
      </div>
    );
  }
}

export default App;
