/************************************************
 * 기본적인 화면 정보는 아래와 같음.
 * 
 * Class : 결제 기능에 관련된 클래스
 * 
 * state :
 *  - 
 * 
 * function :
 *  - UserIdentification(): Face ID, 지문 인증 등 사용자 인증과 관련된 메서드
 *  - payToSeller(): 가상 계좌에 금액을 송금하는 메서드
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput } from 'react-native';

class PaymentModel extends Component {

    //UserIdentification(): 사용자 인증과 관련된 메서드
    UserIdentification(){

    }

    //payToSeller(): 가상 계좌에 금액을 송금하는 메서드
    payToSeller() {
        
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

export default PaymentModel ;