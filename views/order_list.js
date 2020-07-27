/************************************************
 * Class : 
 * 
 * state :
 *  - 
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput } from 'react-native';

class OrderList extends Component {
    constructor(props){
        super(props);
        this.state = {
            db_user: this.props.db_user
        }   
    }
    render(){
        return(
            <View style={this.props.style}>
                <Text>OrderList</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  });

export default OrderList;