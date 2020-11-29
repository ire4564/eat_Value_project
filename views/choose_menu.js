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
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import TwoColorBlock from '../components/twoColorBlock';
import Menu from '../components/one_menu';
import posed from 'react-native-pose';

const RANK_IMG = "../images/rank.png";
const RATING_COLOR = '#fa4';
const COLOR_SET = ['#00CED1','#8BAAF0', '#7AD3FA', '#40e0d0'];
const databaseURL = "https://cnu-eat-value.firebaseio.com/";
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

class ChooseMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            event: 'closed',
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
            amount: [],
            temp : {
                time: [30, 40],
                tip: 2000,
                pay: "바로 결제, 만나서 결제",
            },
            like: false,
            user_order: [],
            db_order_key: "",
            db_order: [],
            db_store: [],
            db_store_menu: [],
            total_price : 0,
        }
    }



    _delete() {
        var order_number = this.state.data;
        return fetch(`${databaseURL}/db_order/${order_number}.json`, { // TODO : set table json name
          method: 'DELETE',
        }).then(res => {
          if(res.status != 200) {
            throw new Error(res.statusText); // throw exception
          }
          return res.json();
        });
      }

    _get() {
        fetch(`${databaseURL}/db_store.json`).then(res => {
        if(res.status != 200) {
            throw new Error(res.statusText);
        }
        return res.json();
        }).then(db_store => this.setState({db_store: db_store}));

        fetch(`${databaseURL}/db_order.json`).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(db_order => this.setState({db_order: db_order}));

        fetch(`${databaseURL}/db_store_menu.json`).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(db_store_menu => this.setState({db_store_menu: db_store_menu}));
        
    }

    _move_to_order_history() {
        var order_number = this.state.data;
        var senddata = this.state.db_order[order_number];

        return fetch(`${databaseURL}/order_list.json`, { // TODO : set table json name
            method: 'POST',
            body: JSON.stringify(senddata)
          }).then(res => {
            if(res.status != 200) {
              throw new Error(res.statusText); // throw exception
            }
            return res.json();
          });
    }

    _post(jsondata) {
        var order_number = this.state.data;
        return fetch(`${databaseURL}/db_order/${order_number}/order_detail.json`, { // TODO : set table json name
          method: 'POST',
          body: JSON.stringify(jsondata)
        }).then(res => {
          if(res.status != 200) {
            throw new Error(res.statusText); // throw exception
          }
          return res.json();
        });
    }

    _post_current_order(next_current) {
        var order_number = this.state.data;
        return fetch(`${databaseURL}/db_order/${order_number}/current_order.json`, { // TODO : set table json name
          method: 'PUT',
          body: JSON.stringify(next_current)
        }).then(res => {
          if(res.status != 200) {
            throw new Error(res.statusText); // throw exception
          }
          return res.json();
        });
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        if(nextState.db_store.length == 0 || nextState.db_order.length == 0 || nextState.db_store_menu.length == 0 ){
            if(nextState.amount.length==0){
                var _amount = Array.from({length: nextState.store_menu.length}, () => 0);
                return {amount : _amount};
            }
            return null;
        }
        if(nextState.amount.length!=nextState.store_menu.length){
            var _amount = Array.from({length: nextState.store_menu.length}, () => 0);
            if(nextState.db_store[nextState.db_order[nextState.data].store_num]==undefined){
                return {amount : _amount};
            }
            return {
                store: nextState.db_store[nextState.db_order[nextState.data].store_num],
                store_menu: nextState.db_store_menu[nextState.db_order[nextState.data].store_num],
                amount : _amount};
        }
        if(nextState.db_store[nextState.db_order[nextState.data].store_num]==undefined){
            return {amount : _amount};
        }
        return {store: nextState.db_store[nextState.db_order[nextState.data].store_num],
            store_menu: nextState.db_store_menu[nextState.db_order[nextState.data].store_num],};
    }
    componentDidMount() {
        this._get();
        this.setState({event: 'open'});
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
    setAmount(_num, _amount){
        var temp = this.state.amount.concat();
        temp[_num] = _amount;
        this.setState({
            amount: temp
        });
        this.computePrice(temp);
    }
    computePrice(temp){
        var total = 0;
        for(let i=0; i<this.state.store_menu.length; i++){
            if(temp[i]==0) continue;
            total = total + temp[i]*this.state.store_menu[i].price;
        }
        this.setState({
            total_price: total
        });
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
    printBriefStoreInfo(){ // 데이터베이스를 조회하여 가게정보 출력
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
    printMenu(){ // 선택한 가게에 대한 메뉴 선택 화면 출력
        if(this.state.db_store.length==0||this.state.db_order.length==0 || this.state.db_store_menu.length==0){
            return null;
        }
        var list = [];
        var i = 0;
        

        list.push(
            <Menu
            num={i}
            key={i+"_menu"}
            store_menu={this.state.store_menu[i]}
            setAmount={this.setAmount.bind(this)}
            />);
        for(i=1; i<this.state.store_menu.length-1; i++){
            list.push(
                <Menu
                key={i+"_menu"}
                num={i}
                store_menu={this.state.store_menu[i]}
                setAmount={this.setAmount.bind(this)}
                />);
        }
        list.push(
            <Menu
            key={i+"_menu"}
            num={i}
            store_menu={this.state.store_menu[i]}
            setAmount={this.setAmount.bind(this)}
            />);

        return (
            <View style={styles.menu_list_container}>
                {list}
            </View>
        );
    }
    joinButton(){
        if(this.state.total_price==0){
            Alert.alert(
                '주문 실패',
                '메뉴를 결정해주세요!',
                [{
                    text: "네",
                }]);
                return null;
        }
        //db에 쏠 detail_order 만들기
        var list = [];
        for(let i=0; i<this.state.amount.length; i++){
            if(this.state.amount[i] == 0)   continue;
            list.push({amount: this.state.amount[i],
                        menu: this.state.store_menu[i].name,
                        price: this.state.store_menu[i].price,
                        user_id: this.state.user.name});
        }
        
        var isFinished = this.isOrderFinished();

        //case 1. 이미 정원 상태일 때
        if(isFinished){
            Alert.alert(
                '주문 실패',
                '이미 인원이 가득찬 주문입니다. 다른 방에 참여해주세요!',
                [{
                    text: "네",
                }]);
                this.props.changeMode("home");
        }

        else{
            let current = this.state.db_order[this.state.data].current_order + 1
            for(let i = 0; i < list.length; i++) {
                this._post(list[i]);
            }
            //마지막 참가자인 경우 & 주문 완료한 경우 한꺼번에 묶어서 수정
            if (current == this.state.db_order[this.state.data].limit_order){
                /*
                Alert.alert(
                    '주문 마감',
                    '결제 페이지로 이동합니다.',
                    [{
                        text: "확인",
                    }]);
                */
                this._move_to_order_history();
                //this._delete(); 지워지는 것 방지함 
                this.props.changeMode("payment-model");
            }
            else{
                //주문 가능 성공 시 payment_model 화면으로 전환하기
                this._post_current_order(current);
                this._move_to_order_history();
                /*
                Alert.alert(
                    '주문 완료',
                    '결제 페이지로 이동합니다.',
                    [{
                        text: "확인",
                    }]);
                */
                this.props.changeMode("payment-model");
            }
        }
    }
    isOrderFinished(){
        //DB로부터 해당 주문에 대한 정보 다시 받아오기
        fetch(`${databaseURL}/db_order.json`).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(db_order => this.setState({db_order: db_order}));

        //모집
        return this.state.db_order[this.state.data].limit_order<=this.state.db_order[this.state.data].current_order;
    }

    render(){
        return(
            <Page style={[this.props.style, ]} pose={this.state.event}>
                <View style={{top: hp('-3%'),}}>
                    <TwoColorBlock
                    top={this.printStoreTop()}
                    bottom={this.printBriefStoreInfo()}
                    height ={wp("60%")}
                    topHeight={1}
                    bottomHeight={1}
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
                    onPress={this.joinButton.bind(this)}>
                        <Text style={{color:'#fff', fontSize: hp('2.5%'), fontWeight: 'bold'}}>
                             총 {this.state.total_price}원 주문
                            <Text style={{fontWeight:'normal'}}> 진행하기</Text></Text>
                    </TouchableOpacity>
            </Page>
        );
    }
}

const styles = StyleSheet.create({
    //가로 정렬 컴포넌트
    row_container: {
        flexDirection: 'row',
        marginBottom: wp('0.3%'),
        alignContent: 'center',
    },
    //가운데 정렬 컴포넌트
    center_container: {
        alignSelf: 'center',
    },
    //별점 이미지
    rating_image: {
        width: wp('20%'),
        height: wp('5%'),
        marginRight: wp('3%'),
    },
    //별점 이미지의 게이지 부분(뒤의 색상)
    rating_image_background: {
        position: 'absolute',
        backgroundColor: RATING_COLOR,
        width: wp('20%'),
        height: wp('5%'),
    },
    //가게 정보 패널 부분의 위아래 컴포넌트
    container: {
        marginHorizontal: wp('8%'),
        marginVertical: wp('4%'),
    },
    //가게 정보 패널 상단 컴포넌트 내 글씨
    top_text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: wp('3.8%'),
    },
    //가게명
    top_topic_text: {
        fontWeight: 'bold',
        fontSize: wp('5.8%'),
    },
    //가게 정보 패널 부분의 버튼
    top_button: {
        marginHorizontal: wp('1.5%'),
        marginTop: wp('3%'),
        paddingHorizontal: wp('5%'),
        paddingVertical: wp('0.5%'),
        borderWidth: 1.2,
        borderColor: '#888',
        borderRadius: wp('1.5%'),
    },
    //가게 정보 패널 하단 부분의 글씨
    bottom_text: {
        fontSize: hp('4%'),
    },
    //가게 정보 패널 하단 부분의 글씨(강조)
    bottom_title_text: {
        fontWeight: 'bold',
        marginRight: wp('5%'),
    },
    //메뉴 컴포넌트
    menu_container: {
        alignSelf: 'center',
        width: '90%',
        marginBottom: hp('9%'),
    },
    //메뉴 리스트 컴포넌트
    menu_list_container: {
        width: '100%',
        marginTop: wp('4%'),
        top: -2,
        paddingVertical: wp('3%'),
        paddingHorizontal: wp('1.5%'),
        borderRadius: 18,
        borderColor: '#F2F2F2',
        borderWidth: 1,
        backgroundColor: '#fff',
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 2, height: 4 },
        elevation: 2,
        
    },
    //주문하기 버튼
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