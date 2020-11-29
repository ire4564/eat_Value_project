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
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

class PaymentModel extends Component {
    constructor(props){
        super(props);
        this.state = {
           color: "#40E0D0"
        }   
    }

    passHome() {
        this.props.changeMode("home");
    }

    //UserIdentification(): 사용자 인증과 관련된 메서드
    UserIdentification(){
        /*
         * 사용자 인증으로 지문 방식을 채택함.
         * 주문 후-> 결제로 넘어오는 화면 
         */
       //setTimeout(function() { }, 2000);
        alert(
            '주문이 완료되었습니다.',
            [{
                text: "확인",
            }]);
        {this.passHome()};
    }

    //payToSeller(): 가상 계좌에 금액을 송금하는 메서드
    payToSeller() {
        /*
         * 계좌에 송금을 하는 경우, 알림 기능과 함께 사용 
         * 송금이 되었다는 것과 함께 알림 사용
         * (알람 기능이 구현되어야지 가능함)
         */
    }

    render(){
        return(
            <View style={[this.props.style, styles.container]}>
                    <TouchableOpacity
                    style={styles.buttons}
                    onPress={function(){this.UserIdentification()}.bind(this)}>
                         <Ionicons name="md-finger-print" size={50} color={this.state.color} style={styles.icon}/>
                         <Text>지문 인증으로 결제합니다.</Text>
                        <Text>손가락을 올바른 위치에 올려주세요.</Text>
                    </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
     //전체 화면 style
    container:{
        alignItems: 'center',
    },
    icon: {
        marginTop: hp('25%'),
        marginBottom: hp('2%'),
    },
    buttons: {
        alignItems: 'center',
        width: wp('100%'),
        height: hp('50%')
    }

  });

export default PaymentModel ;