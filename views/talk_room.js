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
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';
import posed from 'react-native-pose';
import { FontAwesome } from '@expo/vector-icons';

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
            user: this.props.db_user,
            input: '',
            db_talk: [
                [{date: '2020-11-30 00:12:12', text: 'text message 1'},
                {date: '2020-11-30 00:15:14', text: 'text message 2'},
                {date: '2020-11-30 00:20:20', text: 'text message 3'},
                {date: '2020-11-30 01:01:12', text: 'text message 4'},],
                [{date: '2020-11-30 00:11:12', text: 'text message 5'},
                {date: '2020-11-30 00:13:12', text: 'text message 6'},
                {date: '2020-11-30 00:49:12', text: 'text message 7'},
                {date: '2020-11-30 00:50:12', text: 'text message 8'},
            ]
            ],
        }
    }

    componentDidMount() {
    this.setState({event: 'open'});
    }

    //db_talk으로부터 데이터 읽어오기
    roadTalk(){
        //전체 대화 내용을 저장할 곳
        let talkLog = [];
        let me = 0;
        let you = 0;

        //먼저 온 순서대로 리스트에 출력
        while (me<=this.state.db_talk[0].length && you<=this.state.db_talk[1].length){
            
            let my_talk_date = moment(this.state.db_talk[0][me].date,'YYYY-MM-DD HH:mm:ss')
            let your_talk_date = moment(this.state.db_talk[1][you].date,'YYYY-MM-DD HH:mm:ss')

            if(0<moment.duration(my_talk_date.diff(your_talk_date)).asMinutes()){    //상대방 메시지가 더 먼저 왔던 것인 경우
                talkLog.push(this.yourTalkbox(this.state.db_talk[1][you]))
                you += 1
                if(you == this.state.db_talk[1].length){    // 한 쪽 메시지가 모두 소진된 경우 남은 쪽 메시지 모두 출력
                    while(me<this.state.db_talk[0].length){
                        talkLog.push(this.myTalkbox(this.state.db_talk[0][me]))
                        me += 1
                    }
                    break;
                }
            }else{                              //나의 메시지가 더 먼저 왔던 것인 경우
                talkLog.push(this.myTalkbox(this.state.db_talk[0][me]))
                me += 1
                if(me == this.state.db_talk[0].length){    // 한 쪽 메시지가 모두 소진된 경우 남은 쪽 메시지 모두 출력
                    while(you<this.state.db_talk[1].length){
                        talkLog.push(this.yourTalkbox(this.state.db_talk[1][you]))
                        you += 1
                    }
                    break;
                }

            }
        }
        return talkLog;
    }
    
    // 상대방 채팅 출력
    yourTalkbox(data){
        let time = moment(data.date, 'YYYY-MM-DD HH:mm:ss', true).format('a hh:mm');
        return <View style={[{flexDirection: 'row', marginBottom: hp('1%'),}]}>
            <View style={[styles.talkbox, styles.shadow]}>
                <View style={[styles.your_talkbox_pointer]}/>
                    <View style={[styles.your_talkbox]}>
                        <Text>{data.text}</Text>
                    </View>
                </View> 
                <Text style={[styles.date_text_left]}>{time}</Text>
            </View>;
    }
    
    //나의 채팅 출력
    myTalkbox(data){
        let time = moment(data.date, 'YYYY-MM-DD HH:mm:ss', true).format('a hh:mm');
        return <View style={[{flexDirection: 'row', alignSelf: 'flex-end', marginBottom: hp('1%'),}]}>
        <Text style={[styles.date_text_right]}>{time}</Text>
        <View style={[styles.talkbox, styles.shadow]}>
            <View style={[styles.my_talkbox_pointer]}/>
                <View style={[styles.my_talkbox]}>
                    <Text>{data.text}</Text>
                </View>
            </View>
        </View>;
    }

    //sendMessage(): 메세지를 연결된 상대방에게 전송한다.
    sendMessage(){
        //실제 전송하는 부분 구현 필요. 일단은 state에 바로 반영함.
        let date = moment().format('YYYY-MM-DD HH:mm:ss');
        
        let temp = this.state.db_talk
        temp[0].push({date: date, text: this.state.input})
        this.setState({db_talk: temp})

        this.myTalkbox(date, this.state.input);
        this.setState({input: ''})
    }

    //inviteFriend(): 친구를 주문으로 초대한다.
    inviteFriend(){

    }   

    //acceptInvite(): 친구가 채팅을 통해 보낸 초대를 수락한다.
    acceptInvite(){

    }

    //rejectInvite(): 친구가 보낸 초대를 거절한다.
    rejectInvite(){

    }
    render(){
        return(
            <Page style={[this.props.style, styles.component]} pose={this.state.event}>
                <ScrollView
                style={styles.main_scroll}
                ref={ref => {this.scrollView = ref}}
                onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                >
                    {this.roadTalk()}
                </ScrollView>
                <KeyboardAvoidingView behavior="padding" style={styles.staticPanel}>
                    <TextInput
                    ref={ref => {this.textInput = ref}}
                    style={styles.textInput}
                    onChangeText={(text)=>this.setState({input: text})}
                    value={this.state.input}
                    //multiline = {true}
                    onSubmitEditing={() => this.sendMessage()}/>
                    <TouchableOpacity
                    style={styles.sendButton}
                    onPress={function(){
                        this.sendMessage()
                    }.bind(this)}>
                    <FontAwesome name="paper-plane" size={wp('5%')} color='#fff' />
                    </TouchableOpacity>
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

    staticPanel: {
        //position: 'absolute',
        width: wp('100%'),
        height: 'auto',
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },

    //텍스트 입력 창 style
    textInput: {
        borderColor: '#40e0d0',
        width: wp('82%'),
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('1%'),
        marginBottom: 5,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    //전송 버튼 style
    sendButton: {
        borderRadius: 10,
        marginLeft: wp('1%'),
        marginBottom: 5,
        backgroundColor: COLOR_SET[3],
        width: 'auto',
        paddingHorizontal: wp('3%'),
        alignContent: 'center',
        justifyContent: 'center',
    },
  });

export default TalkRoom;