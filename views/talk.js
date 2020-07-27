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

class Talk extends Component {
    constructor(props){
        super(props);
        this.state = {
            db_user: this.props.db_user
        }   
    }
    render(){
        return(
            <View style={this.props.style}>
                <Text>Talk</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  });

export default Talk;