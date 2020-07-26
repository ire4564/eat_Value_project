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
            user: this.props.user
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