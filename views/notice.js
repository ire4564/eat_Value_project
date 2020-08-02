/************************************************
 * Class : 알림창
 * 
 * state :
 *  - db_user: 유저 정보
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PostItBlock from '../components/postItBlock';
import { MaterialIcons } from '@expo/vector-icons';
import PostBlock from '../components/postItBlock';

class Notice extends Component {
    constructor(props){
        super(props);
        this.state = {
            db_user: this.props.db_user,
            //이 아래부터의 state는 db 변경 이후 수정해야함!!!!
            notice : [
                "'신전 떡볶이'주문 완료! 모집 완료하여 자동 결제",
                "오늘은 중국집 상품 2,000원 할인의 날!",
                "'비가츄'님이 당신을 친구 목록에 추가하였습니다.",
                "'떡보끼'님이 당신을 친구목록에 추가하였습니다.",
                "'오늘은 족발집'은 어땠나요? 리뷰를 작성해주세요!",
                "알림 설정 이벤트! 3,000원 할인 쿠폰 지급 이벤트!",
            ],
        }
    }
    noticeList(){
        var list = [];
        for(let i=0; i<this.state.notice.length; i++){
            list.push(<TouchableOpacity 
            key={i+"_notice"}
            style={styles.notice}>
                <PostBlock color_type={i} text={this.state.notice[i]}/>
            </TouchableOpacity>);
        }
        return list;
    }
    render(){
        return(
            <View style={[this.props.style, styles.container]}>
                <View style={styles.header_contanier}>
                    <MaterialIcons name="notifications-active" size={hp('2.2%')} color="black" />
                    <Text style={styles.header_text}> PUSH 알림을 설정하고 쿠폰 및 주문 정보를 받아보세요!</Text>
                </View>
                <ScrollView style={styles.main_scroll}>
                    <View style={styles.notice_container}>
                        {this.noticeList()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //전체 화면 style
    container: {
        alignContent: 'center',
    },

    //해당 화면의 상위 컨테이너 부분 style
    header_contanier: {
        width: wp('100%'),
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: hp('2%'),
        paddingBottom: hp('2%'),
    },

    //전체 화면 스크롤 style
    main_scroll: {
        width: wp('100%'),
        borderColor: '#fff',
        borderTopWidth: hp('1.5%'),
    },
    //상위 text style
    header_text: {
        fontSize: hp('1.5%'),
    },
    //알림 컴포넌트가 위치할 컨테이너 style
    notice_container: {
        width: wp('90%'),
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    //알림 컴포넌트 테두리 style
    notice: {
        marginBottom: 5,
    },
  });

export default Notice;