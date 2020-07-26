/************************************************
 * Class : 홈 화면 
 * 
 * state :
 *  - 
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ICON_COLOR = '#40E0D0';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            adress: "대전 유성구 궁동 99",
            hot_menu: ['떡볶이', '치킨', '피자'],
            hot_order: {},
            near_finish_order: {},
        }   
    }
    render(){
        return(
            <View style={this.props.style}>
                {/*클릭시 투명화를 방지하기 위한 임시 패널*/}
                <View style={styles.up_container}/>

                <TouchableOpacity style={styles.up_container}>
                    <MaterialIcons
                    name="location-on"
                    size={25} 
                    color={ICON_COLOR}
                    style={styles.adress_icon}/>
                    <Text style={styles.adress_text}>{this.state.adress}</Text>
                </TouchableOpacity>
                
                <Text>지금 HOT한 주문</Text>

                <Text>곧 FINISH 주문</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //header 부분을 침범해야하는 경우 추가할 style
    up_container: {
        position: 'absolute',
        top: -10,
        alignItems: 'center',
        //justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },

    //주소 설정 패널 style
    adress_text: {
        fontSize: 15,
        marginLeft: 10,
    },

    //주소창 아이콘 style
    adress_icon: {
        marginLeft: 10,
    },
  });

export default Home;