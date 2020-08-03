/************************************************
 * Class : 채팅 화면
 * 
 * state :
 *  - db_user: 유저 정보
 * //여기 아래부터는 db 변동에 따라 수정이 필요함
 *  - test_users: 전체 유저 정보
 *  - talk: 유저의 채팅 목록
 *      - user: 채팅한 유저의 유저 num
 *      - detail: 채팅 내역
 *          - text: 채팅 내용
 *          - user: 해당 채팅을 말한 유저 num
 *          - date: 보낸 시간 
 * 
 * function :
 *  - chattingList: 채팅방 출력 메소드
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/ko';

const UNNAMED = '../images/unnamed.jpg';

class Talk extends Component {
    constructor(props){
        super(props);
        this.state = {
            db_user: this.props.db_user,
            //이 아래부터는 db적용을 위해 수정이 필요한 state임!!
            test_users: [
                {   coupon_num: 0,
                    id: "testID",
                    name: "테스트계정",
                    order_num: 0,
                    location: "대전 유성구 궁동 99",
                  },
                {   coupon_num: 0,
                    id: "testID2",
                    name: "비가츄",
                    order_num: 0,
                    location: "대전 유성구 궁동 99",
                  },
                {   coupon_num: 1,
                    id: "testID3",
                    name: "바지",
                    order_num: 0,
                    location: "대전 유성구 궁동 99",
                  },
                {   coupon_num: 2,
                    id: "testID4",
                    name: "먹꼬쟈",
                    order_num: 0,
                    location: "대전 유성구 궁동 99",
                  },
            ],
            talk: [
                {user: 1,
                    detail:[
                        {text: "안녕하세요", user:0, date:"2020-08-03 09:20:32" },
                        {text: "안녕하세요!", user:1, date:"2020-08-03 09:23:01" },
                        {text: "오늘 같이 시켜먹어요!", user:1, date:"2020-08-03 13:51:28" },
                    ]
                },
                {user: 3,
                    detail:[
                        {text: "안녕!!", user:0, date:"2020-08-03 09:20:32" },
                        {text: "안뇽", user:3, date:"2020-08-03 09:23:01" },
                        {text: "먹꼬쟈님이 [신당동 떡볶이]을(를) 제안하셨습니다.", user:3, date:"2020-08-03 17:43:10" },
                    ]
                },
                {user: 2,
                    detail:[
                        {text: "안녕!!", user:0, date:"2020-08-03 10:20:32" },
                        {text: "안뇽", user:3, date:"2020-08-03 10:23:01" },
                        {text: "오늘 같이 시켜먹어요!", user:0, date:"2020-08-03 19:31:00" },
                    ]
                },
            ],
        }   
    }

    chattingList(){
        var list = [];
        for(let i=0; i<this.state.talk.length; i++){
            var talk = this.state.talk[i];
            var user = this.state.test_users[talk.user];
            //var now = moment().format('YYYY-MM-DD HH:mm:ss');
            var time = moment(talk.detail[talk.detail.length-1].date, 'YYYY-MM-DD HH:mm:ss', true);
            list.push(<TouchableOpacity style={styles.talk_container} key={i+"_talk"}>
                    <Image source={require(UNNAMED)} style={styles.profile_img}/>
                    <View style={styles.talk_text_container}>
                        <Text style={[{fontWeight: 'bold'}, styles.talk_text]} numberOfLines={1}>{user.name}</Text>
                        <Text style={styles.talk_text} numberOfLines={1}>{talk.detail[talk.detail.length-1].text}</Text>
                    </View>
                    <Text style={styles.talk_date}>{time.fromNow()}</Text>
                </TouchableOpacity>);
        }
        return list;
    }

    render(){
        return(
            <View style={this.props.style}>
                <View style={styles.main_container}>
                    <View style={styles.header_container}>
                        <MaterialCommunityIcons name="message-processing" size={hp('3%')} color='#40E0D0' />
                        <Text style={styles.header_text}><Text style={{fontWeight: 'bold'}}> 같이먹기</Text>를 제안해보세요!</Text>
                    </View>
                    <ScrollView style={styles.talk_scroll}>
                        {this.chattingList()}
                    </ScrollView>
                    <TouchableOpacity style={styles.button_container}>
                    <MaterialCommunityIcons name="message-plus" size={hp('3%')} color="#fff" />
                        <Text style={styles.button_text}> 메세지 보내기</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //메인 컨테이너 style
    main_container: {
        position: 'absolute',
        width: wp('100%'),
        height: hp('85%'),
        top: hp('-3%'),
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('3%'),
        backgroundColor: '#fff',
      },

    //톡방 스크롤 style
    talk_scroll: {
        alignSelf: 'center',
        width: '100%',
        height: '90%',
        //paddingVertical: hp('3%'),
        backgroundColor: '#fff',
    },

    //헤더 컨테이너 style
    header_container: {
        flexDirection: 'row',
        height: '5%',
        
    },

    //헤더 부분 text style
    header_text: {
        fontSize: hp('2%'),
    },

    //채팅 컨테이너 style
    talk_container: {
        width: '100%',
        borderColor: '#999',
        borderBottomWidth: 2,
        paddingVertical: wp('1%'),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },

    //채팅 프로필 image style
    profile_img: {
        width: wp('12%'),
        height: wp('12%'),
        borderRadius: 13,
    },
    
    //채팅 최근내용 및 상대방이름 컨테이너 style
    talk_text_container: {
        width: wp('54%'),
        height: wp('12%'),
        marginHorizontal: wp('2%'),
        alignContent: 'center',
        justifyContent: 'space-evenly',
    },

    //채팅 최근내용및 상대방이름 text style
    talk_text: {
        fontSize: wp('3.8%'),
    },

    //채팅 최근날짜 text style
    talk_date: {
        textAlignVertical: 'center',
        width: wp('20%'),
        height: wp('12%'),
        fontSize: wp('3%'),
    },

    //버튼 컨테이너 style
    button_container: {
        backgroundColor: '#40E0D0',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: hp('1%'),
        borderRadius: 10,
    },
    
    //버튼 내부 text style
    button_text: {
        color: '#fff',
        fontSize: hp('2.1%'),
    },
  });

export default Talk;