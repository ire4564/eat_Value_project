/************************************************
 * Class : 선택주문에 대한 상세 페이지
 * 
 * state :
 *  - 
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment'; 
import posed from 'react-native-pose';
import { AntDesign } from '@expo/vector-icons'; 
import TwoColorBlock from '../components/twoColorBlock';

const TEST_IMG = '../images/detail_order_sample.png';
const COLOR_SET = ['#00CED1','#8BAAF0', '#7AD3FA', '#40e0d0'];
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
            total_price: 0,
            member: [],
            user : this.props.db_user,
            order: {
                index: 123456,
                name: '신당동 엽기 떡볶이',
                location: '대전광역시 유성구 궁동 99 조각공원',
                current_order: 1,
                limit_order: 4,
                alone: 0,
                order_detail: [
                    {menu: '떡볶이(중간맛)', amount: 2, price: 4000, user_id: "testID"},
                    {menu: '모둠 튀김', amount: 1, price: 3000, user_id: "testID"},
                    {menu: '떡볶이(중간맛)', amount: 1, price: 4000, user_id: "other1"},  
                ],
            },
            store: {
                category: '떡볶이',
                min_order: 15000,
                name: '신당동 엽기 떡볶이',
                location: '대전광역시 유성구 봉명동',
            },
            event: 'closed',
        }
    }
    componentDidMount() {
        this.setState({event: 'open'});
        this.computeTotalPrice();
        this.computeMember();
    }

    //데이터 연산 관련 함수들
    computeTotalPrice(){
        var total = 0;
        for(let i=0; i<this.state.order.order_detail.length; i++){
            let temp_order = this.state.order.order_detail[i];
            total = total + temp_order.amount*temp_order.price;
        }
        this.setState({
            total_price: total
        })
        return total;
    }
    computeMember(){
        var list = [];
        for(let i=0; i<this.state.order.order_detail.length; i++){
            let temp_id = this.state.order.order_detail[i].user_id;
            if(!list.includes(temp_id)){
                list.push(temp_id);
            }
        }
        this.setState({
            member: list
        })
    }
    computeGauge(){
        var i = this.state.total_price/this.state.store.min_order;
        i = i * 100;
        if(i>= 100){
            i = 100;
        }
        return i+"%";
    }

    //컴포넌트 출력 관련 함수들
    printOrderDetail(){
        var list = [];
        //안전을 위해 주문에 참가한 경우에만 다른 맴버에 대한 아이디가 출력됨
        for(let i=0; i<this.state.member.length; i++){
            let temp = [];
            let temp_price = 0;
            for(let j=0; j<this.state.order.order_detail.length; j++){
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
            }
            list.push(<View key={i+"_user"} style={{width:wp('80%'), alignSelf:'center', marginBottom: wp('2%')}}>
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
        if(this.state.member.includes(this.state.user.id)){
            if(this.state.total_price<this.state.store.min_order){
                return (<TouchableOpacity style={[styles.close_button, {backgroundColor: '#999'}]} disabled={true}>
                    <Text style={styles.button_text}>참여 마감하기 (<Text>2</Text>/<Text>4</Text>)</Text>
                    <Text style={{color: '#fff', fontSize: wp('3%'), textAlign: 'center'}}>
                                ※ 최소 결제 금액 이상 달성 시에만 마감이 가능합니다.</Text>
                </TouchableOpacity>);
            }
            return (<TouchableOpacity style={styles.close_button}>
                        <Text style={styles.button_text}>참여 마감하기 (<Text>2</Text>/<Text>4</Text>)</Text>
                        <Text style={{color: '#fff', fontSize: wp('3%'), textAlign: 'center'}}>
                                    ※ 최대 인원이 모이면 자동 마감됩니다.</Text>
                    </TouchableOpacity>);
        }
        return (<TouchableOpacity style={styles.join_button}>
                    <Text style={styles.button_text}>참여하기 (<Text>2</Text>/<Text>4</Text>)</Text>
                </TouchableOpacity>);
    }
    printDeleteButton(){
        if(this.state.member.includes(this.state.user.id)){
            return (<TouchableOpacity style={styles.delete_button}>
                        <Text style={styles.button_text}>참여 취소하기</Text>
                    </TouchableOpacity>);
        }
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
                            <Text style={styles.order_number}>주문 번호 : {this.state.order.index}</Text>
                            <Text style={styles.order_number}>{moment().format('YYYY-MM-DD HH:mm:ss')}</Text>
                        </View>

                        <View>
                            <Text style={styles.store_name}>{this.state.store.name}</Text>
                            <Text style={styles.store_info}>{this.state.store.location}</Text>
                            <TouchableOpacity style={styles.eat_with_box}>
                                <Text style={styles.button_text}>{this.state.order.alone==1?"혼자 먹어요":"같이 먹어요"} </Text>
                                <AntDesign name="questioncircleo" style={{textAlignVertical: 'center'}} size={wp('3.5%')} color="#000" />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.order_container}>
                            <View style={styles.map_container}>
                                <View style={styles.mini_map}/>
                                <View style={{width: wp('48%')}}>
                                    <Text style={styles.order_header1}>배달 위치</Text>
                                    <Text style={styles.order_location}>{this.state.order.location}</Text>
                                    <Text style={{color: '#aaa', fontSize: wp('3%')}}>
                                    ※ '혼자 먹어요'의 경우 해당 위치는 전체 배달의 기준점이 되는 위치를 의미합니다.</Text>
                                </View>
                            </View>
                            <Text style={styles.order_header1}>주문 현황</Text>
                            <Text style={styles.order_header2}>- 최소 결제 금액 달성도</Text>
                            <View style={styles.gaugeBar}>
                                <View style={[styles.gauge, {width: this.computeGauge()}]}/>
                                <Text style={styles.gauge_text}>
                                    <Text>{this.state.total_price}원 </Text>
                                    /
                                    <Text> {this.state.store.min_order}원</Text>
                                </Text>
                            </View>
                            <Text style={{textAlign: 'center', fontSize: wp('3.5%'), marginBottom: wp('2%')}}>
                                {this.state.total_price>=this.state.store.min_order?
                                "최소 금액 달성 완료! 참여 마감 시 바로 주문완료가 가능해요!":
                                "앞으로 "+(this.state.store.min_order-this.state.total_price)+"원 더 모이면 주문완료가 가능해요!"}</Text>
                            <Text style={styles.order_header2}>- 상세 주문 내역</Text>
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
        borderWidth: wp('0.5%'),
        borderBottomWidth: 0,
        borderColor: '#eeeeee',
        paddingBottom: hp('15%'),

      },

      //주문 대기 번호 및 시간 text style
      order_number: {
        fontSize: wp('3.2%'),
      },

      //가게명 text style
      store_name: {
        marginTop: hp('1%'),
        fontWeight: 'bold',
        fontSize: wp('6.5%'),
      },

      //같이/혼자 먹어요 버튼 style
      eat_with_box: {
        marginTop: hp('1%'),
        position: 'absolute',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        backgroundColor: COLOR_SET[0],
        paddingHorizontal: wp('3%'),
        paddingVertical: wp('2%'),
        borderRadius: wp('2%'),
      },

      //버튼 text style
      button_text: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        textAlign: 'center',
      },

      //가게 정보 text style
      store_info: {
          fontSize: wp('3.6%'),
      },

      //주문 관련 text container style
      order_container:{
          marginVertical: hp('2.5%'),
          paddingTop: hp('2%'),
          borderTopWidth: 2,
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
        fontSize: wp('4.7%'),
        marginBottom: wp('1%'),
        paddingLeft: wp('2%'),
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
          backgroundColor: COLOR_SET[2],
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
        width: wp('80%'),
        height: hp('4.5%'),
        borderColor: '#aaa',
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
  });

export default DetailOrder;