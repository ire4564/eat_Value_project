/************************************************
 * Class : NOW 주문
 * 
 * state :
 *  - db_user: 유저 정보
 *  //여기부터 아래의 state는 이후 수정이 필요함!!
 *  - order_list: 임시 데이터
 * 
 * const :
 *  - MAX_MENU_NUM: 각 주문 내 표시할 최대 자신이 주문한 메뉴 개수
 *                  해당 숫자 이상의 메뉴를 주문한 경우 이후부터는 '그외 #개의 메뉴'로 대체
 * function :
 *  - orderHistory_top: 주문 컴포넌트의 상단 부분에 추가할 컴포넌트 반환
 *  - orderHistory_bottom: 주문 컴포넌트의 하단 부분에 추가할 컴포넌트 반환
 *  - orderHistoryList: 주문 컴포넌트의 리스트를 반환
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Button } from 'react-native';
import TwoColorBlock from '../components/twoColorBlock';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import LocationBar from '../components/locationBar';
import posed from 'react-native-pose';

const MAX_MENU_NUM = 2;
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

class NowOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            event: 'closed',
            db_user: this.props.db_user,
            //아래는 추후 db연동을 위해 수정해야함!!!!
            order_list: [
                {store_name: "신당동 떡볶이 충남대점",
                store_image: '../images/test_image.jpg', //적용안됨. image 처리는 후에 수정
                date: "2020-07-18-00-00",
                order_detail: [{menu: '떡볶이(중간맛)', amount: 2, price: 4000, user_id: "testID"},
                                {menu: '모둠 튀김', amount: 1, price: 3000, user_id: "testID"},
                                {menu: '떡볶이(중간맛)', amount: 1, price: 4000, user_id: "other1"},
                                {menu: '떡볶이(중간맛)', amount: 1, price: 4000, user_id: "other2"},],
                },
                {store_name: "신당동 떡볶이 충남대점",
                store_image: '../images/test_image.jpg', //적용안됨. image 처리는 후에 수정
                date: "2020-07-18-00-00",
                order_detail: [{menu: '떡볶이(매운맛)', amount: 1, price: 4000, user_id: "testID"},
                                {menu: '모둠 튀김', amount: 2, price: 3000, user_id: "testID"},
                                {menu: '떡볶이(중간맛)', amount: 1, price: 4000, user_id: "testID"},
                                {menu: '떡볶이(중간맛)', amount: 1, price: 4000, user_id: "other2"},],
                },
            ],
        }   
    }
    orderHistory_top(_num){
        var date = this.state.order_list[_num].date.split('-');
        var order_detail = this.state.order_list[_num].order_detail;
        var user_menu = [];
        var user_menu_amount = 0;

        //order_detail 연산 겸 price 연산도 함께 진행
        var total_price = 0;    
        var user_price = 0;
        

        //해당 순서 데이터의 order_detail을 받아와 컴포넌트 생성
        for(let i=0; i<order_detail.length; i++){
            if(order_detail[i].user_id===this.state.db_user.id){
                user_price = user_price + order_detail[i].price*order_detail[i].amount;
                user_menu_amount = user_menu_amount + 1;
                if(user_menu.length<MAX_MENU_NUM){
                    user_menu.push(
                        <View key={i+"_user_menu"} style={styles.row_container}>
                        <Text style={styles.user_menu_text}>
                            {order_detail[i].menu}
                            {' *'+order_detail[i].amount}
                        </Text>
                        <Text style={styles.user_menu_text}>{(order_detail[i].price*order_detail[i].amount).toLocaleString()}원</Text>
                    </View>);
                }
            }
            total_price = total_price + order_detail[i].price*order_detail[i].amount;
        }
        //MAX_MENU_NUM 이상의 메뉴가 있을 경우 추가로 출력
        if(user_menu_amount>MAX_MENU_NUM){
            user_menu.push(<Text key="more_user_menu" style={styles.user_menu_text}>그 외 {user_menu_amount-MAX_MENU_NUM}개의 메뉴</Text>);
        }

        //실질적인 top 블록에 추가할 컴포넌트
        var top = <View style={styles.top_order_history}>
            <Image
            style={styles.store_image}
            source={require('../images/test_image.jpg')}/>
            <View style={styles.top_text_container}>
                <Text style={styles.date_text}>
                    주문 일시  {Number(date[0])}년 {Number(date[1])}월 {Number(date[2])}일 {date[3]}:{date[4]}
                </Text>
                <View style={styles.user_menu}>{user_menu}</View>
            </View>
        </View>;
        return [top, user_price, total_price];
    }

    orderHistory_bottom(_num, user_price, total_price){
        return<View style={styles.bottom_order_history}>
                <Text style={styles.store_name}>
                    {this.state.order_list[_num].store_name}
                </Text>
                <View style={styles.price_container}>
                    <View style={styles.row_container}>
                        <Text style={styles.total_price_text}>전체 결제 금액</Text>
                        <Text style={styles.total_price}>{total_price.toLocaleString()}</Text>
                    </View>
                    <View style={styles.row_container}>
                        <Text style={styles.user_price_text}>모인 결제 금액</Text>
                        <Text style={styles.user_price}>{user_price.toLocaleString()}</Text>
                    </View>
                </View>
            </View>;
    }

    orderHistoryList(){
        var list = [];
        var i = 0;
        
        while(i<this.state.order_list.length){
            var top_data = this.orderHistory_top(i);
            list.push(
                <TouchableOpacity
                style={styles.order_history_container}
                key={i+"_history"}>
                    <TwoColorBlock
                        topHeight={2}
                        bottomHeight={1}
                        type={0}
                        top={top_data[0]}
                        bottom={this.orderHistory_bottom(i, top_data[1], top_data[2])}/>
                </TouchableOpacity>
            );
            i = i + 1;
        }
        return list;
    }

    componentDidMount() {
        this.setState({event: 'open'});
    }

    render(){
        return(
            <Page style={this.props.style} pose={this.state.event}>
                <View style={{top: hp('2%')}}>
                    <TouchableOpacity
                        style={styles.search_bar}>
                            <Text style={{color:'#fff', fontSize:hp('1.9%')}}> Search </Text>
                            <AntDesign name="downcircleo" size={hp('2%')} color="#fff" />
                    </TouchableOpacity>
                    <View style={{marginLeft:'5%', marginTop:'2%', flexDirection: 'row'}}>
                        <AntDesign name="checkcircle" size={hp('2%')} color="#40e0d0" />
                        <Text style={{fontSize:hp('2%'), fontWeight: 'bold', marginLeft: '2%'}}>NOW 주문</Text>
                    </View>

                    <ScrollView style={styles.main_scroll}>
                        
                        {this.orderHistoryList()} 
    
                    </ScrollView>

                    <TouchableOpacity
                        style={styles.makeOrder}
                        onPress={function(){this.props.changMode("make-room")}.bind(this)}>
                            <MaterialCommunityIcons name="silverware-fork-knife" size={hp('2%')} color="#fff" />
                            <Text style={{color:'#fff', fontSize:hp('1.9%'), fontWeight: 'bold'}}> 방 만들기</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{alignItems: 'center', top: hp('-77.5%'), alignItems: 'center'}}>
                    <LocationBar db_user={this.state.db_user}/>
                </View>
            </Page>
            
        );
    }
}

const styles = StyleSheet.create({
    //메인 스크롤 style
    main_scroll: {
        position: 'absolute',
        marginTop: '25%',
        width: wp('100%'),
        height: hp('85%'),
        top: hp('-1%'),
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('3%'),
        backgroundColor: '#fff',
    },

    //주문 컴포넌트 style
    order_history_container: {
        height: hp('21%'),
        marginBottom: hp('1.5%'),
    },

    //주문 컴포넌트 상위 블록 style
    top_order_history: {
        margin: hp('2%'),
        flexDirection: 'row',
    },

    //주문 컴포넌트 상단 블록의 우측 text 블록 style
    top_text_container: {
        width: wp('50%'),
    },
    
    //주문일시 text style
    date_text: {
        fontSize: hp('1.5%'),
        marginBottom: hp('1%'),
    },

    //메뉴 text style
    user_menu_text: {
        fontSize: hp('1.8%'),
    },

    //주문 컴포넌트 하위 블록 style
    bottom_order_history: {
        margin: hp('2%'),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between'
    },

    //주문별 가게 image style
    store_image: {
        width: wp('20%'),
        height: hp('10%'),
        borderRadius: 10,
        marginRight: wp('3%'),
    },

    //가로 나열 배치 및 각 content 간격 최대 style
    row_container: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },

    

    //가게명 text style
    store_name: {
        width: '65%',
        fontSize: hp('2%'),
        fontWeight: 'bold',
        alignSelf: 'center',
    },

    //결제 금액 블록 style
    price_container:{
        width: '35%',
        justifyContent: 'space-between',
    },

    //전체 결제 금액 text style
    total_price_text: {
        fontSize: hp('1.5%'),
        color: '#555',
    },

    //전체 결제 금액 style
    total_price: {
        fontSize: hp('1.5%'),
        fontWeight: 'bold',
        color: '#555',
    },

    //개인 결제 금액 text style
    user_price_text: {
        fontSize: hp('1.5%'),
        fontWeight: 'bold',
        color: '#555',
    },

    //개인 결제 금액 style
    user_price: {
        fontSize: hp('1.5%'),
        fontWeight: 'bold',
        color: '#40E0D0',
    },
    makeOrder: {
        width: wp('90%'),
        marginTop: hp('63%'),
        alignSelf: 'center',
        backgroundColor: '#40e0d0',
        borderRadius: 10,
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },

    search_bar: {
        width: wp('90%'),
        height: hp('5%'),
        marginTop: '5%',
        alignSelf: 'center',
        backgroundColor: '#40e0d0',
        borderRadius: 10,
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }

  });

export default NowOrder;