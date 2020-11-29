/************************************************
 * 기본적인 화면 정보는 아래와 같음.
 * 
 * Class : 알림 기능을 담당하는 기능
 * 
 * state :
 *  - 
 * 
 * function :
 *  - onFinishedEvent_Pay(): 주문이 마감될 경우 가상 계좌의 금액을 점주에게 송금하는 기능을 함
 *  - onFinishedEvent_Alert(): 주문이 마감될 경우 참가중인 사용자들에게 알림을 전송하는 기능을 함
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput } from 'react-native';

class BroadcastModel extends Component {

    //onFinishedEvent_Pay(): 주문이 마감될 경우 가상 계좌의 금액을 점주에게 송금하는 기능을 함
    onFinishedEvent_Pay() {

    }

    //onFinishedEvent_Alert(): 주문이 마감될 경우 참가중인 사용자들에게 알림을 전송하는 기능을 함
    onFinishedEvent_Alert() {
        
    }

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

export default BroadcastModel;