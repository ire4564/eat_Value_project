/************************************************
 * Class : 홈 화면 
 * 
 * props :
 *  - db_user: 사용자의 id
 * 
 * const :
 *  - ICON_COLOR : 위치설정 칸 내 아이콘 색상
 *  - COLOR_SET : HOT 주문 색상 설정용.
 *                저장된 색상들이 순서대로 반복적으로 적용됨.
 *                (hotOrderList 참고)
 * state :
 *  - db_user: 사용자 정보
 *  - hot_menu: 현재 인기 메뉴 리스트
 *  - db_order: 현재 인기 주문 리스트
 *  - near_finish_order: 마감임박 주문 리스트
 * 
 * function :
 *  - hotMenuList : hot_menu를 통해 해당 목록의 버튼들을 리스트로 출력
 *  - hotOrderList : db_order를 통해 해당 목록의 버튼들을 리스트로 출력
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TouchableText from '../components/TouchableText';
import TouchableOrder from '../components/TouchableOrder';
import LocationBar from '../components/locationBar';

const COLOR_SET = ['#00CED1','#008080', '#40e0d0'];

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            db_user: this.props.db_user,
            hot_menu: ['떡볶이', '치킨', '피자'],
            db_order: [
                {name: '신가네 떡볶이', location: '궁동 로데오 거리', limit_order: 4, current_order: 5, order_detail:[],},
                {name: '동대문 엽기 떡볶이', location: '궁동 욧골 공원', limit_order: 2, current_order: 4, order_detail:[],},
                {name: '에꿍이 치킨', location: '궁동 충남대 막동', limit_order: 3, current_order: 3, order_detail:[],},
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
        //db에서 받은 정보를 가공, 혹은 가공된 정보를 state에 저장 후 아래 수행
        while(i<this.state.hot_menu.length){
            list.push(<TouchableOrder
                list={this.state.db_order[i]}
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
                        <MaterialCommunityIcons name="silverware-fork-knife" size={hp('2%')} color="#fff" />
                        <Text style={{color:'#fff', fontSize:hp('1.9%')}}> 방 만들기</Text>
                    </TouchableOpacity>

                    <TextInput
                    style={styles.search}
                    placeholder="원하시는 음식을 검색해보세요"/>
                </ScrollView>
                
                
                <LocationBar db_user={this.state.db_user}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //전체 화면 style
    container:{
        alignItems: 'center',
    },

    //전체 화면 스크롤 style
    main_scroll: {
        width: wp('100%'),
        borderColor: '#fff',
        borderTopWidth: hp('1.5%'),
    },

    //headline style
    headline: {
        width: wp('90%'),
        fontSize: hp('3%'),
        marginTop: 25,
        marginLeft: 20,
        //marginBottom: 10,
    },

    //가로 스크롤 style
    horizontal_scroll: {
        marginTop: 10,
        paddingHorizontal: wp('5%'),
    },

    //방 만들기 버튼 style
    makeOrder: {
        marginTop: hp('-4%'),
        marginRight: wp('5%'),
        alignSelf: 'flex-end',
        backgroundColor: '#40e0d0',
        borderRadius: 10,
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
    },

    //검색창 style
    search: {
        width: wp('90%'),
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