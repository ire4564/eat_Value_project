/************************************************
 * Class : 주문했던 목록 리스트 화면
 * 
 * state :
 *  - db_user: 유저 정보
 *  //여기부터 아래의 state는 이후 수정이 필요함!!
 *  - order_list: 임시 데이터
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import TwoColorBlock from '../components/twoColorBlock';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class OrderList extends Component {
    constructor(props){
        super(props);
        this.state = {
            db_user: this.props.db_user,
            //아래는 추후 db연동을 위해 수정해야함!!!!
            order_list: [
                {store_name: "신당동 떡볶이 충남대점",
                store_image: '../images/test_image.jpg',
                date: "2020-07-18-00-00",
                order_detail: [{menu: '떡볶이(중간맛)', price: 4000, user_id: "testID"},
                                {menu: '모둠 튀김', price: 3000, user_id: "testID"},
                                {menu: '떡볶이(중간맛)', price: 4000, user_id: "other1"},
                                {menu: '떡볶이(중간맛)', price: 4000, user_id: "other2"},],
                            },
            ],
        }   
    }
    orderHistory_top(_num){
        var date = this.state.order_list[_num].date.split('-');
        var order_detail = this.state.order_list[_num].order_detail;
        var user_menu = [];
        for(let i=0; i<order_detail.length; i++){
            if(order_detail[i].user_id===this.state.db_user.id){
                user_menu.push(
                    <View key={i+"_user_menu"} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>{order_detail[i].menu}</Text>
                    <Text>{order_detail[i].price.toLocaleString()}원</Text>
                </View>);
            }
        }
        var top = <View style={styles.top_order_history}>
            <Image
            style={styles.store_image}
            source={require('../images/test_image.jpg')}/>
            <View>
                <Text>주문 일시 {Number(date[0])}년 {Number(date[1])}월 {Number(date[2])}일 {date[3]}:{date[4]}</Text>
                {user_menu}
            </View>
        </View>;
        return top;
    }
    orderHistory_bottom(_num){
    }
    orderHistoryList(){
        var list = [];
        var i = 0;
        
        list.push(
            <TouchableOpacity
            style={styles.order_history_container}
            key={i+"_history"}>
                <TwoColorBlock
                    topHeight={2}
                    bottomHeight={1}
                    type={0}
                    top={this.orderHistory_top(i)}
                    bottom={<Text>Test!!</Text>}/>
            </TouchableOpacity>
        );
        return list;
    }

    render(){
        return(
            <View style={this.props.style}>
                <ScrollView style={styles.main_scroll}>
                    {this.orderHistoryList()} 
                </ScrollView>
                
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //메인 스크롤 style
    main_scroll: {
        position: 'absolute',
        width: wp('100%'),
        height: hp('85%'),
        top: hp('-3%'),
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('3%'),
        backgroundColor: '#fff',
    },

    //주문 컴포넌트 style
    order_history_container: {
        height: hp('21%'),
    },

    //주문 컴포넌트 상위 블록 style
    top_order_history: {
        margin: hp('2%'),
        flexDirection: 'row',
    },

    //주문 컴포넌트 하위 블록 style
    bottom_order_history: {

    },

    //주문별 가게 image style
    store_image: {
        width: hp('10%'),
        height: hp('10%'),
        borderRadius: 10,
    },
  });

export default OrderList;