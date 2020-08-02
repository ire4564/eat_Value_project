/************************************************
 * Class : 알림창
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

class Notice extends Component {
    render(){
        return(
            <View style={this.props.style}>
                <Text>Notice</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  });

export default Notice;