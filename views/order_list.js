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
                                {menu: '떡볶이(중간맛)', price: 4000, user_id: "other"},
                                {menu: '떡볶이(중간맛)', price: 4000, user_id: "other"},],
                            },
            ],
        }   
    }
    orderHistoryList(){
        var list = [];
        var i = 0;
        var top = <View style={styles.top_order_history}>
            <Image
            style={styles.store_image}
            source={require('../images/test_image.jpg')}/>
            <Text>주문 일시</Text>
        </View>;
        list.push(
            <TouchableOpacity
            style={styles.order_history_container}>
                <TwoColorBlock
                    key={i+"_history"}
                    topHeight={2}
                    bottomHeight={1}
                    type={0}
                    top={top}
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