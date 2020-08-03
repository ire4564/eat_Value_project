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
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
                        <Text>test</Text>
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
        width: wp('100%'),
        height: '85%',
        paddingVertical: hp('3%'),
        backgroundColor: '#fff',
    },

    //헤더 컨테이너 style
    header_container: {
        flexDirection: 'row',
        
    },

    //헤더 부분 text style
    header_text: {
        fontSize: hp('2%'),
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