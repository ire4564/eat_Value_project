/************************************************
 * Class : 상단 우측 네비게이션 버튼 패널
 * 
 * state :
 *  - 
 * 
 * props :
 *  - mode: 상위 패널로부터 받아온 현재 모드
 * 
 * function :
 *  - headerText: 현재 모드에 따라 text 변환 기능
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

class Navigation extends Component {
    headerText(){
      switch(this.props.mode){
        case 'home':
          return <Text
                  style={styles.text}>
                    가치<Text style={{fontSize: hp('2%'),}}>value</Text>먹자
                  </Text>;
        case 'order-list':
          return <Text
                  style={styles.text}>
                    My Orders
                  </Text>;
        case 'now-order':
          return <Text
                  style={styles.text}>
                    Now Order
                  </Text>;
        case 'talk':
          return <Text
                  style={styles.text}>
                    Talk
                  </Text>;
        case 'user':
          return <Text
                  style={styles.text}>
                    내 정보
                  </Text>;
        case 'make-room':
          return <Text
                  style={styles.text}>
                    방 만들기
                  </Text>;
        case 'notice':
          return <Text
                  style={styles.text}>
                    내 알림
                  </Text>;
        case 'check-order':
          return <Text
                  style={styles.text}>
                    주문 확인
                  </Text>;
      }
      return <Text
      style={styles.text}>
        test-page
      </Text>;
    }

    render(){
        return(
            <LinearGradient
            colors={['#40E0D0', '#7AD3FA', '#8BAAF0']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={styles.container}>
              {this.headerText()}
                <TouchableOpacity
                style={styles.header_button}
                onPress={function(){this.props.changeMode('notice')}.bind(this)}>
                  <Ionicons name="md-notifications" size={23} color="#222" /> 
                </TouchableOpacity>    
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({

    //헤더 컨테이너 style
    container: {
        width: wp('100%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    //상단 모드 text style
    text: {
        fontSize: hp('2.5%'),
        marginTop: hp('4%'),
    },

    //네비게이션 버튼 style
    header_button: {
        position: 'absolute',
        top: hp('4%'),
        left: 20,
    },
  });

export default Navigation;