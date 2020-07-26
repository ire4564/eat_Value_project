/************************************************
 * Class : 홈 화면 
 * 
 * props :
 *  - user: 사용자의 id
 * 
 * const :
 *  - ICON_COLOR : 위치설정 칸 내 아이콘 색상
 *  - COLOR_SET : HOT 주문 색상 설정용.
 *                저장된 색상들이 순서대로 반복적으로 적용됨.
 *                (hotOrderList 참고)
 * state :
 *  - user: 사용자 id
 *  - adress: 주문하고자 하는 위치
 *  - hot_menu: 현재 인기 메뉴 리스트
 *  - hot_order: 현재 인기 주문 리스트
 *  - near_finish_order: 마감임박 주문 리스트
 * 
 * function :
 *  - hotMenuList : hot_menu를 통해 해당 목록의 버튼들을 리스트로 출력
 *  - hotOrderList : hot_order를 통해 해당 목록의 버튼들을 리스트로 출력
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import TouchableText from '../components/touchableText';
import TouchableOrder from '../components/touchableOrder';

const ICON_COLOR = '#40E0D0';
const COLOR_SET = ['#00CED1','#008080', '#40e0d0'];

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            adress: "대전 유성구 궁동 99",
            hot_menu: ['떡볶이', '치킨', '피자'],
            hot_order: [
                {name: '신가네 떡볶이', location: '궁동 로데오 거리', min: 4, current: 5},
                {name: '동대문 엽기 떡볶이', location: '궁동 욧골 공원', min: 2, current: 4},
                {name: '에꿍이 치킨', location: '궁동 충남대 막동', min: 3, current: 3},
            ],
            near_finish_order: [],
        }   
    }
    hotMemuList(){
        var list = [];
        var i = 0;
        while(i<this.state.hot_menu.length){
            list.push(<TouchableText
                        text={this.state.hot_menu[i]}
                        key={i+"_hot_menu"}/>);
            i = i + 1;
        }
        return list;
    }
    hotOrderList(){
        var list = [];
        var i = 0;
        while(i<this.state.hot_menu.length){
            list.push(<TouchableOrder
                list={this.state.hot_order[i]}
                key={i+"_hot_order"}
                color={COLOR_SET[i%COLOR_SET.length]}
                />);
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

                    <ScrollView 
                    style={styles.horizontal_scroll}
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}>
                        {this.hotMemuList()}
                    </ScrollView>
                    <ScrollView 
                    style={styles.horizontal_scroll}
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}>
                        {this.hotOrderList()}
                    </ScrollView>


                    <Text style={styles.headline}>
                        <Text>곧</Text>
                        <Text style={{fontWeight: "bold"}}> FINISH </Text>
                        <Text>주문</Text>
                    </Text>

                    <TouchableOpacity style={styles.makeOrder}>
                        <MaterialCommunityIcons name="silverware-fork-knife" size={18} color="#fff" />
                        <Text style={{color:'#fff'}}>방 만들기</Text>
                    </TouchableOpacity>

                    <TextInput
                    style={styles.search}
                    placeholder="원하시는 음식을 검색해보세요"/>

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
        //borderLeftWidth: 30,
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
        marginTop: 25,
        marginLeft: 20,
        //marginBottom: 10,
    },

    //가로 스크롤 style
    horizontal_scroll: {
        marginTop: 10,
        paddingHorizontal: 20,
    },

    //방 만들기 버튼 style
    makeOrder: {
        marginTop: -30,
        marginRight: 20,
        alignSelf: 'flex-end',
        backgroundColor: '#40e0d0',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 120,
    },

    //검색창 style
    search: {
        width: '90%',
        height: 40,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
  });

export default Home;