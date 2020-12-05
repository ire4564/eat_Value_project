/************************************************
 * Class : 리뷰를 보여주는 화면 (목록 출력)
 * 
 * state :
 *  - 
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, StatusBarIOS } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';

class ShowReivew extends Component {
    constructor(props){
        super(props);
        this.state = {
            //DB에 넘어갈 state 내용: 좌측에서부터 차례대로
            //리뷰 내용, 주문 가게, 주문 목록, 주문자, 별점 순
            reviewText : "",
            db_store: "신가네 떡볶이",
            db_order: "떡볶이(보통맛)",
            db_user: "한유경",
            db_star: 5 
        }   
    }
    //목록 쭉 출력해주기 (DB 정보 임의로 설정)
    render(){
        return(
                <View style={[this.props.style, styles.container]}>

                 <Text style={styles.headline}>
                        <Text style={{fontWeight: "bold"}}> 리뷰 </Text>
                        <Text>작성하기</Text>
                </Text>
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
        },
  });

export default ShowReivew;