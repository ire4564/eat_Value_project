/*********************************************************************
 * Class : 방 만들기 화면
 * 
 * state :
 *  - seleted_mode: 현재 선택된 모드
 *  - db_user: 현재 유저의 id
 *  - order_list: 주문 제목, 주문 리스트
 *  - room_info: 방의 정보: 모집 인원, 모인 인원, 모인 금액에 대한 정보
 * 
 * function :
 *  - order_info() 주문하기 밑에 주문 정보 탭
 *  - select_info(): 모집하기에 대한 정보를 받아오기 위한 입력 탭
 * 
 *  
 ***********************************************************************/


import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, CheckBox } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Divider } from 'react-native-elements';
import LocationBar from '../components/locationBar';
import OrderItem from '../components/orderItem';
import { AntDesign } from '@expo/vector-icons';
import CompleteBtn from '../components/complete_IconBtn';
import OrderBox from '../components/basicBox';
import LocationBox from '../components/locationBox';
import InfoBox from '../components/infoBox';
const ICON_COLOR = '#40E0D0';

class MakeRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            db_user: this.props.db_user,
            //order_list 사용
            order_list: [
                {
                    store_name: "신당동 떡볶이 충남대점",
                    date: "2020-07-18-00-00",
                    order_detail: [{ menu: '떡볶이(중간맛)', amount: 2, price: 4000, user_id: "testID" },
                    { menu: '모둠 튀김', amount: 1, price: 3000, user_id: "testID" },
                    { menu: '떡볶이(중간맛)', amount: 3, price: 4000, user_id: "other1" },
                    { menu: '떡볶이(중간맛)', amount: 1, price: 4000, user_id: "other2" },],
                },
                //리스트가 더 있어도 상관없음, 테스트를 위해 하나만 함 (메뉴는 여러 개)
            ],
            //방의 정보: 모집 인원, 모인 인원, 모인 금액에 대한 정보
            room_info: [
                {
                    want: 5, //사용
                    exist: 4,
                    exist_prize: 25000
                }
            ],
            totalPrize: 8000, //사용
        }
    }

     //주문하기 밑에 주문 정보 탭
     order_info() {
        var list_info = [] //return 정보를 담을 곳
        var order_details = this.state.order_list[0].order_detail;
        for (let i = 0; i < order_details.length; i++) {
            var this_total_prize = order_details[i].price * order_details[i].amount;
            //onchange 사용해서 총 수량에 따른 잔액 실시간으로 변경하기!!!!
            list_info.push(
                <View key={i}>
                    <Text style={styles.detail_title}>{order_details[i].menu}</Text>
                    <Text style={styles.detail_prize}>● 기본: {order_details[i].price} 원</Text>
                    <Text style={styles.detail_prize}> {this_total_prize} 원</Text>
                    <OrderItem num={order_details[i].amount}/>
                    <Divider style={styles.separator} />
                </View>
            )
        }
        return [list_info];
    }

    //모집 조건 선택 
    select_info() {
        var info = 
        <View>
            <Text style = {styles.detail_prize_s}>
                ※ 인원 모집 조건을 정확하게 기재해주세요!
            </Text>
            <Text style = {styles.detail_title}>
                총 모집 인원
            </Text>
            <OrderItem num={1}/>
            <Divider style={styles.separator} />
            <Text style = {styles.detail_title}>
                총 모집 금액
            </Text>
            {/*이 부분 input 받는 곳으로, 키보드 입력 받는 곳으로 수정*/}
            <View style={styles.togetPrize}>
                    <Text style={styles.togetFont}>총 모집 금액  <Text style={{ color: '#40E0D0' }}> 
                        {this.state.room_info[0].exist_prize} 원</Text>
                    </Text>
                </View>
        </View>
       
        ;
        return info;
    }
    render(){
        return(
            <View style={[this.props.style, styles.container]}>
               
                {/*위치 표시 바*/}
                <LocationBar db_user={this.state.db_user} />
                
                <Text style={styles.headline}>
                    <AntDesign
                        name="checksquare"
                        size={20}
                        color={ICON_COLOR}
                        style={styles.icon} />
                    <Text style={styles.orderFont}>  모집 조건 선택 & 주문 확인</Text>
                </Text>

                 {/*모집 조건 선택, 총 모집 인원 및 모집금액 설정*/}
                 <InfoBox 
                    title = {this.state.order_list[0].store_name}
                    func = {this.select_info()}
                ></InfoBox>

                {/*주문하는 리스트 안의 내용*/}
                <OrderBox 
                    title = {this.state.order_list[0].store_name}
                    func = {this.order_info()}
                ></OrderBox>

    
                {/*위치 안내 패널*/}
                <LocationBox></LocationBox>

               
                {/*주문 완료 버튼*/}
                <CompleteBtn text = '주문하고 모집 시작하기' iconName="rightcircleo"></CompleteBtn>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
     //모인 금액 창
     togetPrize: {
        borderColor: '#BDBDBD',
        borderWidth: 2,
        width: wp('40%'),
        height: wp('9%'),
        borderRadius: 25,
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: -30
    },
    //모인 금액 표시 폰트
    togetFont: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: "center",
        marginTop: 6,
        marginRight: -15
    },
    //현재 가격 체크 탭
    checkPrize: {
        width: wp('90%'),
        height: wp('19%'),
        marginTop: wp('5%'),
        backgroundColor: '#ffffff',
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 2, height: 4 },
        elevation: 2,
        borderRadius: 10
    },
    //전체 화면 설정
    headline: {
        width: wp('90%'),
        fontSize: hp('3%'),
        marginTop: 40,
        marginLeft: 20,
        marginBottom: -10,
    },
    //주문 목록 폰트
    orderFont: {
        fontWeight: "bold",
        fontSize: 15,
        marginLeft: 10,
    },
    //나누는 선
    separator: {
        marginTop: 10,
        backgroundColor: '#E6E6E6',
        height: 2,
        marginBottom: 5
    },
    //전체적인 틀
    container: {
        alignItems: 'center',
    },
    //안의 글씨 소제목(시킨 음식)
    detail_title: {
        marginTop: 10,
        marginBottom: 2,
        marginLeft: 15,
        fontSize: 16,
        fontWeight: 'bold'
    },
    //안의 글씨 내용(중)
    detail_prize: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 15,
        fontSize: 15
    },
    //안의 글씨 내용(소)
    detail_prize_s: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 15,
        fontSize: 12,
        color: "#848484"
    },
    icon: {
        marginRight: -15,
        marginTop: 15
    },
  });

export default MakeRoom;