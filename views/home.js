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
 *  - hot_store: 현재 인기 가게
 *  - db_order: 현재 주문 리스트
 *  - db_store: 가게 리스트
 * 
 * function :
 *  - (static) getDerivedStateFromProps : db를 통해 hot_menu와 hot_store 연산 수행
 *  - hotMenuList : hot_menu를 통해 해당 목록의 버튼들을 리스트로 출력
 *  - hotOrderList : db_order와 db_store를 통해 해당 목록의 버튼들을 리스트로 출력
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TouchableText from '../components/TouchableText';
import TouchableOrder from '../components/TouchableOrder';
import TouchableList from '../components/touchableList';
import LocationBar from '../components/locationBar';

const COLOR_SET = ['#00CED1','#008080', '#40e0d0'];

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            db_user: this.props.db_user,
            hot_menu: [],
            hot_store:[],
            db_order: [
                {store_num: 0, location: '궁동 로데오 거리', limit_order: 5, current_order: 4, order_detail:[],},
                {store_num: 1, location: '궁동 욧골 공원', limit_order: 4, current_order: 2, order_detail:[],},
                {store_num: 2, location: '궁동 충남대 막동', limit_order: 3, current_order: 1, order_detail:[],},
            ],
            db_store: [
                {category: "떡볶이", min_order: 12000, name: '신가네 떡볶이'},
                {category: "떡볶이", min_order: 10000, name: '동대문 엽기 떡볶이'},
                {category: "치킨", min_order: 10000, name: '에꿍이 치킨'},
                {category: "피자", min_order: 10000, name: '덤앤덤 피자 충남대점'},
                {category: "중식", min_order: 5000, name: '하오치 궁동점'},
                {category: "분식/돈까스", min_order: 12000, name: '숑숑 돈까스 노은점'},
            ],
        }   
    }
    static getDerivedStateFromProps(nextProps, nextState){
        var hot_menu=[];
        var hot_store=[];
        var i = 0;
        while(i < nextState.db_order.length){
            var found_menu = hot_menu.find(element => 
                element.category===nextState.db_store[nextState.db_order[i].store_num].category);
            var found_store = hot_store.find(element =>
                element.store_num==nextState.db_order[i].store_num);
            if(found_menu==undefined){
                hot_menu.push({category: nextState.db_store[nextState.db_order[i].store_num].category, amount: 1});
            }else {
                found_menu.amount = found_menu.amount + 1;
            }
            if(found_store==undefined){
                hot_store.push({store_num: nextState.db_order[i].store_num, amount: 1});
            }else{
                found_store.amount = found_store.amount + 1;
            }
            i = i + 1;
        }
        hot_menu.sort(function (a, b){
            return a.amount > b.amount ? -1 : a.amount < b.amount ? 1 : 0;
        });
        hot_store.sort(function (a, b){
            return a.amount > b.amount ? -1 : a.amount < b.amount ? 1 : 0;
        });

        var result_menu = [];
        var result_store = [];

        for(let j = 0; j < hot_menu.length; j++){
            result_menu.push(hot_menu[j].category);
        }
        for(let j = 0; j < hot_store.length; j++){
            result_store.push(hot_store[j].store_num);
        }
        return {
            hot_menu: result_menu,
            hot_store: result_store,
        };
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
        if(list.length==0){
            list.push(<Text key={"empty_hot_menu"}>주문이 없어요!</Text>);
        }
        return list;
    }
    hotOrderList(){
        var list = [];
        var i = 0;
        //db에서 받은 정보를 가공, 혹은 가공된 정보를 state에 저장 후 아래 수행
        while(i<this.state.db_order.length){
            list.push(<TouchableOrder
                store={this.state.db_store[this.state.db_order[i].store_num]}
                order={this.state.db_order[i]}
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
                    {/* 지금 HOT한 주문 부분 */}
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

                    {/* 곧 FINISH 주문 부분 */}
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

                    <TouchableList db_order={this.state.db_order[0]}></TouchableList>
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