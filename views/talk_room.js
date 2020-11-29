/************************************************
 * Class : 선택 모드에 따른 화면
 * 
 * state :
 *  - 
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';
import posed from 'react-native-pose';

const COLOR_SET = ['#00CED1','#8BAAF0', '#7AD3FA', '#40e0d0'];

const Page = posed.View({
    open: {
        y: 0,
        opacity: 1,
        transition: {
          y: { 
              type: 'spring', 
              stiffness: 500, 
              damping: 100
            },
        }
    },
    closed: {
        y: hp('5%'), 
        opacity: 0
    },
});



class TalkRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            event: 'closed',
            data: this.props.data,
            user : this.props.db_user,
        }
    }

    componentDidMount() {
    this.setState({event: 'open'});
    }
    
    // 상대방 채팅 출력
    yourTalkbox(string){
        let date = moment()
      .utcOffset('+09:00')
      .format('a hh:mm');
        return <View style={[{flexDirection: 'row', marginBottom: hp('1%'),}]}>
            <View style={[styles.talkbox, styles.shadow]}>
                <View style={[styles.your_talkbox_pointer]}/>
                    <View style={[styles.your_talkbox]}>
                        <Text>{string}</Text>
                    </View>
                </View> 
                <Text style={[styles.date_text_left]}>{date}</Text>
            </View>;
    }
    
    //나의 채팅 출력
    myTalkbox(string){
        let date = moment()
      .utcOffset('+09:00')
      .format('a hh:mm');
        return <View style={[{flexDirection: 'row', alignSelf: 'flex-end', marginBottom: hp('1%'),}]}>
        <Text style={[styles.date_text_right]}>{date}</Text>
        <View style={[styles.talkbox, styles.shadow]}>
            <View style={[styles.my_talkbox_pointer]}/>
                <View style={[styles.my_talkbox]}>
                    <Text>{string}</Text>
                </View>
            </View>
        </View>;
    }

    render(){
        return(
            <Page style={[this.props.style, styles.component]} pose={this.state.event}>
                <ScrollView style={styles.main_scroll}>
                    {this.yourTalkbox('looooooooooooooooong message')}
                    {this.myTalkbox('loooooooooooong message')}
                    {this.yourTalkbox('short')}
                    {this.myTalkbox('short')}
                    
                    

                    
                </ScrollView>
                <KeyboardAvoidingView behavior="padding" style={styles.makeOrder}>
                    <TextInput style={styles.textInput}/>
                </KeyboardAvoidingView>
            </Page>
        );
    }
}

const styles = StyleSheet.create({
    component: {
        width: wp('100%'),
        height: hp('81%'),
    },

    //메인 스크롤 style
    main_scroll: {
        //position: 'absolute',
        width: wp('100%'),
        //height: hp('70%'),
        top: hp('-3%'),
        paddingHorizontal: wp('5%'),
        //paddingVertical: hp('1%'),
        backgroundColor: '#fff',
    },

    //말풍선 style
    talkbox: {
    },

    //상대방 말풍선 style
    your_talkbox: {
        left: wp('2%'),
        position: 'relative',
        //width: wp('50%'),
        //height: hp('10%'),
        maxWidth: wp('55%'),
        padding: wp('2%'),
        borderRadius: 12,
        backgroundColor: COLOR_SET[1],
        alignSelf: 'flex-start',
    },
    your_talkbox_pointer: {
        top: hp('3%'),
        position: 'relative',
        width: 0,
        height: 0,
        
        alignSelf: 'flex-start',
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: wp('1.5%'),
        borderRightWidth: wp('1.5%'),
        borderBottomWidth: wp('3%'),
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: COLOR_SET[1],
        transform: [
            {rotate: '-90deg'}
        ],
    },
    date_text_left: {
        fontSize: 12,
        textAlign: 'left',
        color: '#555555',
        left: wp('3%'),
        alignSelf: 'flex-end',
    },

    //나의 말풍선 style
    my_talkbox: {
        right: wp('2%'),
        position: 'relative',
        //width: wp('50%'),
        //height: hp('10%'),
        maxWidth: wp('55%'),
        padding: wp('2%'),
        borderRadius: 12,
        backgroundColor: COLOR_SET[2],
        alignSelf: 'flex-end',
    },
    my_talkbox_pointer: {
        top: hp('3%'),
        position: 'relative',
        width: 0,
        height: 0,
        borderBottomColor: COLOR_SET[2],
        alignSelf: 'flex-end',
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: wp('1.5%'),
        borderRightWidth: wp('1.5%'),
        borderBottomWidth: wp('3%'),
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        transform: [
            {rotate: '90deg'}
        ],
    },
    date_text_right: {
        fontSize: 12,
        textAlign: 'right',
        color: '#555555',
        right: wp('3%'),
        alignSelf: 'flex-end',
    },


    //그림자 관련 style
    shadow: {
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 2, height: 6 },
        elevation: 2,
    },

    makeOrder: {
        //position: 'absolute',
        width: wp('100%'),
        height: 'auto',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        
        
    },

    //텍스트 입력 창 style
    textInput: {
        backgroundColor: '#40e0d0',
        borderRadius: 10,
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
  });

export default TalkRoom;