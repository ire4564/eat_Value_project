/************************************************
 * Class : 
 * 
 * state :
 *  - 
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const UNNAMED = '../images/unnamed.jpg';

class Talk extends Component {
    constructor(props){
        super(props);
        this.state = {
            db_user: this.props.db_user
        }   
    }
    render(){
        return(
            <View style={this.props.style}>
                <View style={styles.main_container}>
                    <View style={styles.header_container}>
                        <MaterialCommunityIcons name="message-processing" size={hp('3%')} color="black" />
                        <Text style={styles.header_text}><Text style={{fontWeight: 'bold'}}> 같이먹기</Text>를 제안해보세요!</Text>
                    </View>
                    <ScrollView style={styles.talk_scroll}>
                        <TouchableOpacity style={styles.talk_container}>
                            <Image source={require(UNNAMED)} style={styles.profile_img}/>
                            <View style={styles.talk_text_container}>
                                <Text style={[{fontWeight: 'bold'}, styles.talk_text]} numberOfLines={1}>비가츄</Text>
                                <Text style={styles.talk_text} numberOfLines={1}>오늘 같이 시켜먹어요!</Text>
                            </View>
                            <Text style={styles.talk_date}>2020-08-03</Text>
                        </TouchableOpacity>
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