/**
  * @author MINIBEEF@github.com
  * @summary "parse database record from firebase url"
  */

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
   * @method "IsChange?"
   */
  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.db_store != this.state.db_store) || (nextState.db_user != this.state.db_user);
  }

  componentDidMount() {
    this._get();
  }
  
  /**
   * @return "main render"
   */
  render() {
    return (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <View>
            <Text>== store list ==</Text>
            {Object.keys(this.state.db_store).map(id => {
              const store = this.state.db_store[id];
              return(<Text key={id}>{store.name} {store.category} {store.min_order} </Text>);
            })}

            <Text>== user list ==</Text>
            {Object.keys(this.state.db_user).map(id => {
              const user = this.state.db_user[id];
              return(<Text key={id}>{user.id} {user.name} {user.coupon_num} {user.order_num}</Text>);
            })}
          </View>
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
