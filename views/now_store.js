/************************************************
 * 기본적인 화면 정보는 아래와 같음.
 * 
 * Class : 현재 선택 가능한 가게 목록 화면
 * 
 * state :
 *  - 
 * 
 * function :
 *  -  결정된 function은 없음.
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput } from 'react-native';

class NowStore extends Component {
    render(){
        return(
            <View style={this.props.style}>
                <Text>Page</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  });

export default NowStore;