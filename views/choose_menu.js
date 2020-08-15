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
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import TwoColorBlock from '../components/twoColorBlock';
import OrderItem from '../components/orderItem';


const RANK_IMG = "../images/rank.png";
const RATING_COLOR = '#fa4';
const COLOR_SET = ['#00CED1','#8BAAF0', '#7AD3FA', '#40e0d0'];

class ChooseMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            user : this.props.db_user,
            store: {
                rating : 4.5,
                category: 'undefined',
                min_order: 9999999,
                name: 'unknown',
                location: 'undefined',
            },
            store_menu: [
                {name: "test1", price: 10000},
                {name: "test2", price: 15000},
                {name: "test3", price: 5000},
            ],
            amount: [
                1,2,3
            ],
            temp : {
                time: [30, 40],
                tip: 2000,
                pay: "바로 결제, 만나서 결제",
            },
            like: false,
            user_order: [],
            db_order_key: "",
            db_store: [],
            db_store_menu: [],
        }
    }

    computeGauge(){
        /*
        if(this.state.db_store.length == 0){
            return "0%";
        }*/
        var i = this.state.store.rating/5;
        i = i * 20;
        if(i>= 20){
            i = 20;
        }
        return wp(i+"%");
    }

    printStoreTop(){
        return (
        <View style={styles.container}>

            {/* 가게명 부분 */}
            <Text style={[styles.top_text, styles.top_topic_text]}>{this.state.store.name}</Text>
            
            {/* 별점 부분 */}
            <View style={[styles.row_container, styles.center_container]}>
                <View style={[styles.rating_image_background, {width:this.computeGauge()},]}/>
                <Image source={require(RANK_IMG)} style={styles.rating_image}/>
                <Text style={[styles.top_text, {color: RATING_COLOR}]}>{this.state.store.rating}</Text>
            </View>

            {/* 버튼 부분 */}
            <View style={[styles.row_container, styles.center_container]}>
                <TouchableOpacity style={styles.top_button} onPress={function(){this.setState({like: !this.state.like});}.bind(this)}>
                    <Text style={styles.top_text}><Text style={{color: COLOR_SET[0]}}>{this.state.like?"♥":"♡"}</Text> 찜</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.top_button}>
                    <Text style={styles.top_text}><Text style={{color: COLOR_SET[0]}}>♡</Text> 지금 주문</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.top_button}>
                    <Text style={styles.top_text}><Text style={{color: COLOR_SET[0]}}>♡</Text> 전화</Text>
                </TouchableOpacity>

            </View>
        </View>);
    }
    printStoreBottom(){
        return (
        <View style={styles.container}>
            <View style={styles.row_container}>
                <Text style={styles.bottom_title_text}>#최소주문금액</Text>
                <Text>{this.state.store.min_order.toLocaleString()}원</Text>
            </View>
            <View style={styles.row_container}>
                <Text style={styles.bottom_title_text}>#결제방법</Text>
                <Text>{this.state.temp.pay}</Text>
            </View>
            <View style={styles.row_container}>
                <Text style={styles.bottom_title_text}>#배달시간</Text>
                <Text>{this.state.temp.time[0]}-{this.state.temp.time[1]}분 소요 예상</Text>
            </View>
            <View style={styles.row_container}>
                <Text style={styles.bottom_title_text}>#배달팁</Text>
                <Text>{this.state.temp.tip.toLocaleString()}원</Text>
            </View>
        </View>);
    }
    printMenu(){
        var list = [];
        var i = 0;

        list.push(
        <TouchableOpacity style={[styles.row_container]} key={i+"_menu"}>
            <Text>{this.state.store_menu[i].name}</Text>
            <Text>{this.state.store_menu[i].price.toLocaleString()}원</Text>
            <OrderItem 
                num={this.state.amount[i]}/>
            <Divider style={styles.separator} />
        </TouchableOpacity>);
        for(i=1; i<this.state.store_menu.length-1; i++){
            list.push(
                <TouchableOpacity style={[styles.row_container]} key={i+"_menu"}>
                    <Text>{this.state.store_menu[i].name}</Text>
                    <Text>{this.state.store_menu[i].price.toLocaleString()}원</Text>
                    <OrderItem 
                    num={this.state.amount[i]}/>
                    <Divider style={styles.separator} />
                </TouchableOpacity>);
        }
        list.push(
            <TouchableOpacity style={[styles.row_container]} key={i+"_menu"}>
                <Text>{this.state.store_menu[i].name}</Text>
                <Text>{this.state.store_menu[i].price.toLocaleString()}원</Text>
                <OrderItem 
                    num={this.state.amount[i]}/>
                <Divider style={styles.separator} />
            </TouchableOpacity>);

        return (
            <View>
                {list}
            </View>
        );
    }
    render(){
        return(
            <View style={[this.props.style, ]}>
                <View style={{top: hp('-3%'),}}>
                    <TwoColorBlock
                    top={this.printStoreTop()}
                    bottom={this.printStoreBottom()}
                    shadow={true}
                    />
                </View>
                
                <ScrollView style={styles.menu_container}>
                    <View style={[styles.row_container]}>
                        <AntDesign name="checksquare" size={wp('6%')} color={COLOR_SET[0]} style={{alignSelf: 'center'}} />
                        <Text style={styles.top_topic_text}> Menu 선택</Text>
                    </View>
                    {this.printMenu()}
                </ScrollView>

                <TouchableOpacity
                    style={styles.order_button}
                    onPress={function(){this.props.changeMode("complete-order")}.bind(this)}>
                        <Text style={{color:'#fff', fontSize: hp('2.5%'), fontWeight: 'bold'}}>
                            {this.state.user_order.length}개 주문
                            <Text style={{fontWeight:'normal'}}> 진행하기</Text></Text>
                    </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row_container: {
        flexDirection: 'row',
        marginBottom: wp('0.3%'),
        alignContent: 'center',
    },
    center_container: {
        alignSelf: 'center',
    },
    rating_image: {
        width: wp('20%'),
        height: wp('5%'),
        marginRight: wp('3%'),
    },
    rating_image_background: {
        position: 'absolute',
        backgroundColor: RATING_COLOR,
        width: wp('20%'),
        height: wp('5%'),
    },
    container: {
        marginHorizontal: wp('8%'),
        marginVertical: wp('4%'),
    },
    top_text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: wp('3.8%'),
    },
    top_topic_text: {
        fontWeight: 'bold',
        fontSize: wp('5.8%'),
    },
    top_button: {
        marginHorizontal: wp('1.5%'),
        marginTop: wp('3%'),
        paddingHorizontal: wp('5%'),
        paddingVertical: wp('0.5%'),
        borderWidth: 1.2,
        borderColor: '#888',
        borderRadius: wp('1.5%'),
    },
    bottom_text: {
        fontSize: hp('4%'),
    },
    bottom_title_text: {
        fontWeight: 'bold',
        marginRight: wp('5%'),
    },
    menu_container: {
        alignSelf: 'center',
        width: '90%',
        marginBottom: hp('9%'),
        backgroundColor: 'red',
    },
    menu_list_container: {

    },
    one_menu_container: {

    },
    order_button: {
        position: 'absolute',
        marginTop: hp('74%'),
        width: wp('90%'),
        alignSelf: 'center',
        backgroundColor: '#40e0d0',
        borderRadius: 10,
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
  });

export default ChooseMenu;