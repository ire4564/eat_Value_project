/************************************************
 * Class : 선택주문에 대한 상세 페이지
 * 
 * const :
 *  - TEST_IMG: 최상단 위치하는 가게 이미지(임시)
 *  - COLOR_SET: 기본 컬러 팔레트
 *  - Page: (pose) 최상위 컴포넌트 애니메이션 설정 정보
 * 
 * state :
 *  - data: 이전 mode로부터 받아온 주문 번호
 *  - member: 해당 주문의 참여한 유저 목록
 *  - total_price: 전체 주문 금액
 *  - user: 사용자 본인
 *  - order: 현재 주문 정보
 *  - store: 현재 가게 정보
 *  - event: 애니메이션을 위한 state
 *  **********여기서부터는 db************
 *  - db_user: 유저 정보들 모음
 *  - db_store: 가게 정보 모음
 *  - db_order: 전체 주문 모음
 * 
 * function :
 *  - computeTotalPrice: 전체 주문 금액 계산 후 state에 반영
 *  - computeMember: 주문에 참여한 유저 목록 state에 반영
 *  - computeGauge: 주문 금액에 따라 게이지 길이 조정하는 메소드
 *  - printOrderDetail: 상세 주문 정보 출력
 *  - printCloseButton: 주문 참여 시 주문 마감 버튼, 아닌 경우 참여 버튼 출력
 *  - printDeleteButton: 주문 참여한 경우 취소 버튼 출력
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment'; 
import posed from 'react-native-pose';
import { AntDesign } from '@expo/vector-icons';
import TwoColorBlock from '../components/twoColorBlock';
import LocationBox from '../components/locationBox_detail';
const ICON_COLOR = '#40E0D0';

const TEST_IMG = '../images/test_store.png';
const COLOR_SET = ['#00CED1','#8BAAF0', '#7AD3FA', '#40e0d0'];
const databaseURL = "http://34.64.120.109:3000";
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

class DetailOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            db_user: [ 
                {   coupon_num: 0,
                    id: "testID",
                    name: "테스트계정",
                    order_num: 0,
                    location: "대전 유성구 궁동 99",
                  },
                {   coupon_num: 0,
                    id: "testID2",
                    name: "비가츄",
                    order_num: 0,
                    location: "대전 유성구 궁동 99",
                  },
                {   coupon_num: 1,
                    id: "testID3",
                    name: "바지",
                    order_num: 0,
                    location: "대전 유성구 궁동 99",
                  },
                {   coupon_num: 2,
                    id: "testID4",
                    name: "먹꼬쟈",
                    order_num: 0,
                    location: "대전 유성구 궁동 99",
                  },
            ],
            db_store: [],
            db_order: [],
            order_list: [],
            total_price: 0,
            member: [],
            user : this.props.db_user,
            order: {
                date : "2020-08-01-00-00",
                order_number: -1,
                store_image : "../images/test_image.jpg",
                store_name : "unknown",
                current_order : 0,
                limit_order : 100,
                location : {name: "undefined"},
                store_num : 1,
                order_detail :  [{ menu: 'test', amount: 2, price: 4000, user_id: "testID" },
                    { menu: 'test2', amount: 3, price: 4000, user_id: "other1" },
                    { menu: 'test4', amount: 1, price: 4000, user_id: "other2" },
                    { menu: 'test', amount: 1, price: 3000, user_id: "testID" },
                    ],
                alone : 1,
            },
            store: {
                category: 'undefined',
                min_order: 9999999,
                name: 'unknown',
                location: 'undefined',
            },
            event: 'closed',
            location: {
                name: "대전광역시 유성구 궁동 25번길",//this.props.name,
                latitude: this.props.latitude,
                longitude: this.props.longitude,
                latitudeDelta: this.props.latitudeDelta,
                longitudeDelta: this.props.longitudeDelta
            },
        }
    }
    /**
     * @method "load data and then store to the state"
     */
    _get() {
        fetch(`${databaseURL}/db_store`).then(res => {
        if(res.status != 200) {
            throw new Error(res.statusText);
        }
        return res.json();
        }).then(db_store => this.setState({db_store: db_store}));

        fetch(`${databaseURL}/db_order`).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(db_order => this.setState({db_order: db_order}));

        fetch(`${databaseURL}/order_list`).then(res => {
            if(res.status != 200) {
              throw new Error(res.statusText);
            }
            return res.json();
          }).then(order_list => this.setState({order_list: order_list}));
    }

    _post(new_order) {
        return fetch(`${databaseURL}/db_order/${this.state.data.split(" ")[1]}`, { // TODO : set table json name
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(new_order),
            credentials: 'include',
        }).then(res => {
          if(res.status != 200) {
            throw new Error(res.statusText); // throw exception
          }
          return res.json();
        });
    }
    /**
     * @method "IsChange?"
    */
    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.db_store != this.state.db_store) || 
        (nextState.db_order != this.state.db_order) ||
        (nextState.order_list != this.state.order_list) ||
         (nextState.order != this.state.order) ||
         (nextState.total_price != this.state.total_price);
    }

    _delete(id) {
        var order_number = id;
        //alert(`${databaseURL}/order_list/${order_number}`);
        return fetch(`${databaseURL}/db_order/${order_number}`, { // TODO : set table json name
          method: 'DELETE',
          credentials: 'include',
        }).then(res => {
          if(res.status != 200) {
            throw new Error(res.statusText); // throw exception
          }
          return res.json();
        });
      }

    //alone 정보를 받아오기 위해서 
    sendData(_data){
        this.setState({
          alone: _data,
        });
    }
    componentDidMount() {
        this._get();
        this.setState({event: 'open'});
        this.computeMember();
        this.computeTotalPrice();
        
    }

    componentDidUpdate(){
        //this._get();
        //this.setState({event: 'open'});
        this.computeMember();
        this.computeTotalPrice();
    }
    static getDerivedStateFromProps(nextProps, nextState) {
        if(nextState.db_store.length == 0 || nextState.db_order.length == 0 || nextState.order_list == 0){
            return null;
        }
        let temp = nextProps.data.split(' ');
        if(temp[0] == '1'){
            return {order: nextState.db_order[temp[1]],
                store: nextState.db_store[nextState.db_order[temp[1]].store_num],};
        }else{
            return {order: nextState.order_list[temp[1]],
                store: nextState.db_store[nextState.order_list[temp[1]].store_num],};
        }
    } 
    //데이터 연산 관련 함수들
    computeTotalPrice(){
        let total = 0;
        /*
        for(let i=0; i<this.state.order.order_detail.length; i++){
            let temp_order = this.state.order.order_detail[i];
            total = total + temp_order.amount*temp_order.price;
        }*/
        Object.keys(this.state.order.order_detail).map(id => {
            let temp_order = this.state.order.order_detail[id];
            total = total + temp_order.amount*temp_order.price;
        });
        this.setState({
            total_price: total
        })
        return total;
    }
    computeMember(){
        var list = [];
        Object.keys(this.state.order.order_detail).map(id => {
            let temp_id = this.state.order.order_detail[id].user_id;
            if(!list.includes(temp_id)){
                list.push(temp_id);
            }
        });
        this.setState({
            member: list
        })
    }
    computeGauge(){
        if(this.state.db_store.length == 0){
            return "0%";
        }
        var i = this.state.total_price/this.state.store.min_order;
        i = i * 100;
        if(i>= 100){
            i = 100;
        }
        return i+"%";
    }

    //컴포넌트 출력 관련 함수들
    printOrderDetail(){
        if(this.state.db_store.length == 0 || this.state.order == null){
            return null;
        }
        var list = [];
        //안전을 위해 주문에 참가한 경우에만 다른 맴버에 대한 아이디가 출력됨
        for(let i=0; i<this.state.member.length; i++){
            let temp = [];
            let temp_price = 0;
            Object.keys(this.state.order.order_detail).map(j => {
                let temp_order = this.state.order.order_detail[j];
                //현재 탐색하고자 하는 유저의 주문들 저장
                if(this.state.member[i]==temp_order.user_id){
                    temp.push(<View key={"user_menu_"+j} style={styles.detail_order_menu}>
                    <Text style={styles.detail_order_menu_text}>
                        {temp_order.menu}
                        {' *'+temp_order.amount}
                    </Text>
                    <Text style={styles.detail_order_menu_text}>{(temp_order.price*temp_order.amount).toLocaleString()}원</Text>
                </View>);
                temp_price = temp_price + temp_order.price* temp_order.amount;
                }    
            });
            list.push(<View key={i+"_user"} style={{width:wp('90%'), alignSelf:'center', marginBottom: wp('2%'), marginTop: hp('1%')}}>
                <TwoColorBlock
                top={<View style={styles.detail_order_container}>
                        <Text style={styles.detail_order_text}>{this.state.member.includes(this.state.user.id)?this.state.member[i]:"맴버_" + i}</Text>
                        {temp}
                    </View>}
                bottom={<View style={styles.detail_order_bottom_container}>
                        <Text style={styles.detail_order_menu_text}>전체 주문 금액</Text>
                        <Text style={[styles.detail_order_menu_text, {fontWeight: 'bold'}]}>{temp_price.toLocaleString()}원</Text>
                    </View>}
                shadow={true}
                />
                </View>);
        }
        
        return list;
    }
    printCloseButton(){
        if(this.state.db_store.length == 0 || this.state.db_order.length == 0){
            return null;
        }
        
        if(this.state.member.includes(this.state.user.id)){
            if(this.state.total_price<this.state.store.min_order){
                return (<TouchableOpacity style={[styles.close_button, {backgroundColor: '#999'}]} disabled={true}>
                    <Text style={styles.button_text}>참여 마감하기 (<Text>{this.state.order.current_order}</Text>/<Text>{this.state.order.limit_order}</Text>)</Text>
                    <Text style={{color: '#fff', fontSize: wp('3%'), textAlign: 'center'}}>
                                ※ 최소 결제 금액 이상 달성 시에만 마감이 가능합니다.</Text>
                </TouchableOpacity>);
            }
            return (<TouchableOpacity style={styles.close_button} onPress={this.clickCloseOrderButton.bind(this)}>
                        <Text style={styles.button_text}>참여 마감하기 (<Text>{this.state.order.current_order}</Text>/<Text>{this.state.order.limit_order}</Text>)</Text>
                        <Text style={{color: '#fff', fontSize: wp('3%'), textAlign: 'center'}}>
                                    ※ 최대 인원이 모이면 자동 마감됩니다.</Text>
                    </TouchableOpacity>);
        }
        return (<TouchableOpacity style={styles.join_button} onPress={this.clickJoinButton.bind(this)}>
                    <Text style={styles.button_text}>참여하기 (<Text>{this.state.order.current_order}</Text>/<Text>{this.state.order.limit_order}</Text>)</Text>
                </TouchableOpacity>);
    }
    printDeleteButton(){
        if(this.state.db_store.length == 0 || this.state.db_order.length == 0){
            return null;
        }
        //alert(JSON.stringify(this.state.member))
        if(this.state.member.includes(this.state.user.id)){
            return (<TouchableOpacity style={styles.delete_button} onPress={this.clickDeleteOrderButton.bind(this)}>
                        <Text style={styles.button_text}>참여 취소하기</Text>
                    </TouchableOpacity>);
        }
    }

    //버튼 이벤트 관련 함수들
    clickEatWithInfo(){
        if(this.state.order.alone == 1){
            Alert.alert(
                '"혼자 먹어요"란?',
                '비슷한 위치로 함께 묶음 주문을 하되, 자신이 원하는 위치에서 따로 먹을 수 있어요.',
                [{
                    text: "이해했어요",
                }]);
        }else{
            Alert.alert(
                '"같이 먹어요"란?',
                '지정된 위치에서 주문에 참여한 사람들과 먹을 수 있어요. 소분이 힘든 음식도 주문이 가능하고, 배달료가 저렴해요!',
                [{
                    text: "이해했어요",
                }]);
        }
    }
    clickJoinButton(){ // 메뉴 선택 화면 이동
        this.props.sendData(this.props.data.split(" ")[1]);
        this.props.changeMode("choose-menu");
    }
    clickDeleteOrderButton(){ // 해당 주문에 대한 참여를 취소
        this._delete(this.state.data.split(" ")[1]);
        let temp_order = this.state.order;
        var list = [];
        //order.order_detail 일부 삭제
        Object.keys(this.state.order.order_detail).map(i => {
            var temp = this.state.order.order_detail[i];
            if(temp.user_id!==this.state.user.id){
                list.push(temp);
            }
        });
        if(list.length==0){
            alert("주문 모집이 취소되었습니다.");
            this.props.changeMode('home');
            return ;
        }
        alert("주문 참여가 정상 취소되었습니다.");
        temp_order.order_detail = list;
        temp_order.current_order -= 1;
        this._post(temp_order);
        this.props.changeMode('home');
    }
    clickCloseOrderButton(){ // 마감 조건 달성한 경우 주문 수동 마감
        //아예 limit_order를 current_order로 변경
        var result = {limit_order: this.state.order.current_order};
        return alert(result);
    }
    registerReivew(){ // 가게 리뷰를 등록하는 기능
        // 사용자의 리뷰 내용 및 점수 입력 가져오기
        // 이후 데이터베이스에 내용 반영, (수정: 김도희) 우선 로컬에 등록되는 것으로 동작함
        
    }

    moveReview() {
        //리뷰가 써있는 페이지로 이동하기
        this.props.changeMode("show-review");
    }

    render(){
        return(
            <Page style={this.props.style} pose={this.state.event}>
                <ScrollView style={styles.scroll_container}>

                    <Image
                    source={require(TEST_IMG)}
                    style={styles.image}/>
                    <View style={styles.main_container}>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.order_number}>주문 코드 : {this.state.data.split(' ')[1]}</Text>
                            <Text style={styles.order_number}>{moment(this.state.order.date,'YYYY-MM-DD-HH-mm').format('YYYY-MM-DD HH:mm')}</Text>
                        </View>

                        <TouchableOpacity style={styles.review_box} onPress={this.moveReview.bind(this)}>
                                <Text style={styles.button_text2}>가게 리뷰 </Text>
                                <AntDesign name="star" size={hp('2%')} style={styles.icons} color="orange"/>
                        </TouchableOpacity>
                        
                        <View>
                            <Text style={styles.store_name}>{this.state.store.name}
                            <Text style={styles.store_info}>  {this.state.store.location}점</Text>
                            </Text>
                            <TouchableOpacity style={styles.eat_with_box} onPress={this.clickEatWithInfo.bind(this)}>
                                <Text style={styles.button_text}>{this.state.order.alone==1?"혼자 먹어요":"같이 먹어요"} </Text>
                                <AntDesign name="questioncircleo" style={{textAlignVertical: 'center'}} size={wp('3.5%')} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.order_container}>
                            <View style={styles.map_container}>
                                <View style={{width: wp('48%')}}>
                                      {/*위치 안내 패널*/}
                                    <LocationBox
                                        sendData={this.sendData.bind(this)}
                                        locationName = {this.state.order.location.name}
                                    ></LocationBox>
                                </View>
                            </View>
                            <Text style={styles.headline}>
                           
                            <AntDesign
                                name="checksquare"
                                size={20}
                                color={ICON_COLOR}
                                style={styles.icon} />
                            <Text style={styles.orderFont}>  NOW ORDER</Text>
                            </Text>

                            <Text style={styles.order_header2}>▶  최소 결제 금액 달성도</Text>
                            <View style={styles.gaugeBar}>
                                <View style={[styles.gauge, {width: this.computeGauge()}]}/>
                                <Text style={styles.gauge_text}>
                                    <Text style={styles.existPrize_font}>{this.state.total_price}원 </Text>
                                    /
                                    <Text> {this.state.store.min_order}원</Text>
                                </Text>
                            </View>
                            <Text style={{textAlign: 'center', fontSize: wp('3.5%'), marginBottom: wp('2%'), 
                            color: ICON_COLOR, fontWeight: "bold",}}>
                                {this.state.total_price>=this.state.store.min_order?
                                "최소 금액 달성 완료! 참여 마감 시 바로 주문완료가 가능해요!":
                                "앞으로 "+(this.state.store.min_order-this.state.total_price)+" 원 더 모이면 주문완료가 가능해요!"}</Text>
                            <Text style={styles.order_header2}>▶  상세 주문 내역</Text>
                            {this.printOrderDetail()}
                        </View>
                          
                    </View>

                {/* 화면 위치 고정 버튼 컴포넌트들 */}    
                </ScrollView>
                {this.printDeleteButton()}
                {this.printCloseButton()}
            </Page>
        );
    }
}

const styles = StyleSheet.create({
    existPrize_font: {
        color: ICON_COLOR,
        fontWeight: "bold",
    },
    //메인 컨테이너 style
    scroll_container: {
        position: 'absolute',
        width: wp('101%'),
        height: hp('85%'),
        top: hp('-3%'),
        alignSelf: 'center',
        backgroundColor: '#fff',
      },

      //이미지 style
      image: {
        width: '100%',
        height: hp('30%'),
        resizeMode: 'cover',
        opacity: 1,
      },

      //내용 컨테이너 style
      main_container: {
        top: hp('-5%'),
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: wp('5%'),
        borderTopRightRadius: wp('5%'),
        paddingHorizontal: wp('5%'),
        paddingVertical: wp('5%'),
        borderWidth: wp('0.2%'),
        borderBottomWidth: 0,
        borderColor: '#eeeeee',
        paddingBottom: hp('15%'),

      },

      //주문 대기 번호 및 시간 text style
      order_number: {
        fontSize: wp('3.5%'),
        marginTop: hp('-1%')
      },

      //가게명 text style
      store_name: {
        marginTop: hp('0.5%'),
        marginLeft: wp('-1%'),
        fontWeight: 'bold',
        fontSize: wp('6%'),
      },

      //같이/혼자 먹어요 버튼 style
      eat_with_box: {
        marginTop: hp('0.8%'),
        position: 'absolute',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        backgroundColor: COLOR_SET[0],
        paddingHorizontal: wp('3%'),
        paddingVertical: wp('2%'),
        borderRadius: wp('2%'),
      },

      //같이/혼자 먹어요 버튼 style
      review_box: {
        borderWidth: wp("0.3%"),
        color: "black",
        marginTop: hp('0.8%'),
        alignSelf: 'flex-end',
        flexDirection: 'row',
        backgroundColor: "white",
        paddingHorizontal: wp('3%'),
        paddingVertical: wp('2%'),
        borderRadius: wp('2%'),
      },

      //버튼 text style
      button_text: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#fff"
      },

      //버튼 text style 2 (review btn)
      button_text2: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        textAlign: 'center',
        color: "black",
        marginRight: wp("0.5%"),
        marginLeft: wp("0.5%")
      },

      //가게 정보 text style
      store_info: {
          fontSize: wp('4%'),
     
      },

      //주문 관련 text container style
      order_container:{
          marginVertical: hp('2.5%'),
          paddingTop: hp('2%'),
          borderTopWidth: 1,
          borderColor: '#ddd',
      },

      //모이는 주소가 나와있는 컴포넌트 style
      map_container: {
          flexDirection: 'row',
          marginBottom: hp('2%'),
      },

      //작은 지도 style
      mini_map: {
          backgroundColor: '#ddd',
          width: wp('40%'),
          height: wp('30%'),
          marginRight: wp('2%'),
          marginBottom: wp('2%'),
      },

      //주소 text style
      order_location: {
          fontSize: wp('4%'),
          marginBottom: wp('3%'),
      },

      //주문 내역 내용 중 각 헤더1 text
      order_header1: {
        fontWeight: 'bold',
        fontSize: wp('5.2%'),
        marginTop: wp('1%'),
      },

      //주문 내역 내용 중 각 헤더2 text
      order_header2: {
        fontWeight: 'bold',
        fontSize: wp('4%'),
        marginBottom: wp('1%'),
        color: "#585858",
        marginTop: wp('2%'),
        marginBottom: wp('2%'),
      },

      //참여하기 버튼 style
      join_button: {
          position: 'absolute',
          alignSelf: 'center',
          top: hp('72.5%'),
          width: wp('90%'),
          height: hp('7%'),
          backgroundColor: COLOR_SET[0],
          alignContent: 'center',
          justifyContent: 'center',
          borderRadius: wp('2.5%'),
      },

      //참여 마감하기 버튼 style
      close_button: {
        position: 'absolute',
        alignSelf: 'center',
        top: hp('72.5%'),
        width: wp('90%'),
        height: hp('7%'),
        backgroundColor: COLOR_SET[3],
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: wp('2.5%'),
      },

      //참여 취소 버튼 style
      delete_button : {
        position: 'absolute',
        alignSelf: 'center',
        top: hp('65.5%'),
        width: wp('90%'),
        height: hp('6%'),
        backgroundColor: '#ff3030',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: wp('2.5%'),
    },

      //게이지바 style
    gaugeBar: {
        width: wp('90%'),
        height: hp('4.5%'),
        marginTop: hp('1%'),
        marginBottom: hp('1%'),
        borderColor: ICON_COLOR,
        borderWidth: hp('0.2%'),
        borderRadius: wp('3%'),
        alignContent: 'center',
        alignSelf: 'center',
    },

    //게이지 내부 글씨 style
    gauge_text: {
        height: hp('4.1%'),
        position: 'absolute',
        textAlign: 'center',
        alignSelf: 'center',
        textAlignVertical: 'center',
        fontSize: hp('2%'),
    },

    //게이지 style
    gauge: {
        height: hp('4.1%'),
        borderRadius: wp('2.4%'),
        backgroundColor: COLOR_SET[1],
    },
    
    //상세 주문 내역 컴포넌트 style
    detail_order_container:{
        width: wp('80%'),
        alignSelf: 'center',
        marginBottom: wp('1%'),
        paddingVertical: wp('2%'),
    },

    //상세 주문 내역 유저ID text style
    detail_order_text: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        paddingHorizontal: wp('2%'),
        textAlign: 'center',
    },

    //상세 주문 내역 메뉴 컴포넌트 style
    detail_order_menu: {
        width: '90%',
        //height: hp('10%'),
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    //상세 주문 내역 메뉴 text style
    detail_order_menu_text: {

    },

    //상세 주문 내역 하단 style
    detail_order_bottom_container: {
        paddingVertical: wp('2%'),
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    //주문 목록 폰트
        orderFont: {
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: 10,
        color: ICON_COLOR
    },
  });

export default DetailOrder;