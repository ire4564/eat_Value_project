/************************************************
 * Class : 상단 우측 네비게이션 버튼 패널
 * 
 * state :
 *  - 
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';

class Navigation extends Component {
    render(){
        return(
            <TouchableOpacity>
                <Text>Navigation</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  });

export default Navigation;