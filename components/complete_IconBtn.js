/************************************************
 * Class : 마지막 완료 버튼 컴포넌트
 * 
 * props:
 * - text: 버튼 안에 들어갈 text 내용'
 * - iconName: 버튼 안에 들어갈 아이콘 정의 이름 
 * (단, AntDesign에 있는 것만 가능)
 * 
 * function :
 *  - completeOrder(): 버튼을 눌렀을 때 동작 구현
 *  - putBtn() : 버튼 컴포넌트 자체
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';

class complete_IconBtn extends Component {
    //버튼 컴포넌트 리턴
    putBtn() {
        var btn =
        <TouchableOpacity style={styles.completeBtn} onPress={this.props.clickFunc}>
            <AntDesign
                name={this.props.iconName}
                size={20}
                color="#FFFFFF"
                style={styles.icon}
            />
            <Text style={styles.completeFont}>{this.props.text}</Text>
        </TouchableOpacity>;
        return btn;
    }
    render(){
        return(
            <View>
                {this.putBtn()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //주문 완료 버튼
    completeBtn: {
        borderColor: '#40E0D0',
        backgroundColor: '#40E0D0',
        borderWidth: 2,
        width: wp('90%'),
        height: wp('10%'),
        borderRadius: 13,
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    //주문 완료 버튼
    completeFont: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: "center",
        fontSize: 18,
        marginTop: -22,
        marginLeft: 30
    },
    icon: {
        alignSelf: "center",
        marginRight: 160,
        marginTop: 8
    }
  });

export default complete_IconBtn;