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
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';

class Navigation extends Component {
    headerText(){
        if(this.props.mode==='home'){
            return "가치 value 먹자";
          }else if(this.props.mode==='order-list'){
            return "My Orders";
          }else if(this.props.mode==='now-order'){
            return "Now Order";
          }else if(this.props.mode==='talk'){
            return "Talk";
          }else if(this.props.mode==='user'){
            return "My Page";
          }
      }

    render(){
        return(
            <View style={styles.container}>
                <Text
                children={this.headerText()}
                style={styles.text}
                ></Text>
                <TouchableOpacity style={styles.header_button}>
                    <FontAwesome name="navicon" size={20} color="#222" />    
                </TouchableOpacity>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({

    //헤더 컨테이너 style
    container: {
        width: wp('100%'),
        height: hp('6%'),
        marginBottom: hp('5%'),
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    //상단 모드 text style
    text: {
        fontSize: 20,
        marginTop: 30,
    },

    //네비게이션 버튼 style
    header_button: {
        position: 'absolute',
        top: 30,
        left: 20,
    },
  });

export default Navigation;