/************************************************
 * Class : 홈 화면 
 * 
 * props :
 *  - user: 사용자의 id
 * 
 * state :
 *  - user: 사용자 id
 *  - adress: 주문하고자 하는 위치
 *  - hot_menu: 현재 인기 메뉴 리스트
 *  - hot_order: 현재 인기 주문 리스트
 *  - near_finish_order: 마감임박 주문 리스트
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TouchableText from '../components/TouchableText';

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
    hotMemuList(){
        var list = [];
        var i = 0;
        while(i<this.state.hot_menu.length){
            list.push(<TouchableText
                        text={this.state.hot_menu[i]}
                        key={i}/>);
            i = i + 1;
        }
        return list;
    }

    render(){
        return(
            <View style={[this.props.style, styles.container]}>

                <ScrollView style={styles.main_scroll}>
                    <Text style={styles.headline}>
                        <Text>지금</Text>
                        <Text style={{fontWeight: "bold"}}> HOT한 </Text>
                        <Text>주문</Text>
                    </Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {this.hotMemuList()}
                    </ScrollView>


                    <Text style={styles.headline}>
                        <Text>곧</Text>
                        <Text style={{fontWeight: "bold"}}> FINISH </Text>
                        <Text>주문</Text>
                    </Text>
                </ScrollView>

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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //전체 화면 설정
    container:{
        alignItems: 'center',
    },

    main_scroll: {
        width: '100%',
        borderColor: '#fff',
        borderTopWidth: 25,
        borderLeftWidth: 30,
    },

    //header 부분을 침범해야하는 경우 추가할 style
    up_container: {
        position: 'absolute',
        top: -20,
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

    //headline style
    headline: {
        width: '90%',
        fontSize: 25,
        marginTop: 20,
        marginBottom: 10,
    },
  });

export default Home;