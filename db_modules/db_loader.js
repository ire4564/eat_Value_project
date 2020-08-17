/**
  * @author MINIBEEF@github.com
  * @summary "parse database record from firebase url"
  */

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MapView from 'react-native-maps';

const databaseURL = "https://cnu-eat-value.firebaseio.com/";

/**
  * @component "main"
  */
export default class DB_Loader extends React.Component {
  
  /**
    * @constructor "state : storing loaded data"
    */
  constructor() {
    super();
    this.state = {
      db_store: {},
      db_user: {}
    };
  }

  _delete(id) {
    return fetch(`${databaseURL}/db_user/id.json`, { // TODO : set table json name
      method: 'DELETE',
    }).then(res => {
      if(res.status != 200) {
        throw new Error(res.statusText); // throw exception
      }
      return res.json();
    }).then(data => {
      let nextState = this.state.db_user; // TODO : set table json name
      delete nextState[id];
      this.setState({db_user : nextState});
    });
  }
  
  /**
   * @method "load data and then store to the state"
   */
  _get() {
    fetch(`${databaseURL}/db_store.json`).then(res => {
      if(res.status != 200) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(db_store => this.setState({db_store: db_store}));

    fetch(`${databaseURL}/db_user.json`).then(res => {
      if(res.status != 200) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(db_user => this.setState({db_user: db_user}));
  }
  /**
   * @method "insert data to firebase DB"
   */
  _post(jsondata) {
    return fetch(`${databaseURL}/db_user/0.json`, { // TODO : set table json name
      method: 'PUT',
      body: JSON.stringify(jsondata)
    }).then(res => {
      if(res.status != 200) {
        throw new Error(res.statusText); // throw exception
      }
      return res.json();
    }).then(data => {
      let nextState = this.state.db_user; // TODO : set table json name
      nextState[data.name] = jsondata
      this.setState({db_user : nextState});
    });
  }

  /**
   * @method "IsChange?"
   */
  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.db_store != this.state.db_store) || (nextState.db_user != this.state.db_user);
  }

  componentDidMount() {
    this._get();
  }
  
  _add_user() {
    const jsondata = {
      coupon_num: 123
    }
    this._post(jsondata);
  }
  /**
   * @return "main render"
   */
  render() {
    return (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Button title="add user" onPress={this._add_user.bind(this)}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
