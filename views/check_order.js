import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, CheckBox } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Divider } from 'react-native-elements';
import LocationBar from '../components/locationBar';
import OrderItem from '../components/orderItem';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Test } from '../components/BasicBtn';

const ICON_COLOR = '#40E0D0';

// npm install react-native-elements

class CheckOrder extends Component {
    /* 이 페이지에서 필요한 정보는 다음과 같음
     * 가게 이름, 주문 메뉴 정보(가격, 수량)
     * 모집 인원, 모인 금액
     * 가게 주소, 혼자 같이 여부 표시
     */
    constructor(props) {
        super(props);
        this.state = {
            db_user: this.props.db_user,
            //아래는 추후 db연동을 위해 수정해야함!!!!
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
                    want: 5,
                    exist: 4,
                    exist_prize: 25000
                }
            ]
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
                <View>
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

    //현재 인원, 남은 인원 계산 및 총 모인 금액 보여주기 탭
    total_info() {
        var other_people = this.state.room_info[0].want - this.state.room_info[0].exist;
        var total =
            <View>
                <Text style={styles.detail_title}>현재 인원 <Text style={{ color: '#DF0101' }}>{this.state.room_info[0].exist}</Text>/{this.state.room_info[0].want}</Text>
                <Text style={styles.detail_title}>앞으로 <Text style={{ color: '#40E0D0' }}> {other_people} 명</Text> 모집 후 자동 주문</Text>
                <View style={styles.togetPrize}>
                    <Text style={styles.togetFont}>모인 금액 <Text style={{ color: '#40E0D0' }}> {this.state.room_info[0].exist_prize} 원</Text></Text>
                </View>
            </View>;

        return total;
    }

    //혼자 먹기 같이 먹기 선택하기 버튼
    select_btn() {
        var btn = 
        <View>
            <View style={styles.checkBtn}>
            <Text style={styles.btnFont}>혼자 먹을래요</Text>
                </View>
                    <View style={styles.checkBtn}>
                    <Text style={styles.btnFont}>같이 먹을래요</Text>
                </View>
        </View>;

        return btn;
    }

    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                <Text style={styles.headline}>
                    <AntDesign
                        name="checksquare"
                        size={20}
                        color={ICON_COLOR}
                        style={styles.icon} />
                    <Text style={styles.orderFont}>  주문하기</Text>
                </Text>
                {/*주문하는 리스트 안의 내용*/}
                <View style={styles.orderlist}>
                    <View style={styles.top_container_style}>
                        {/*주문하는 가게 이름*/}
                        <Text style={styles.title}>{this.state.order_list[0].store_name}</Text>
                    </View>
                    <ScrollView style={styles.scrollView}>
                        {/*주문할 메뉴 함수로 return 받기*/}
                        {this.order_info()}
                    </ScrollView>
                </View>
                {/*위치 표시 바*/}
                <LocationBar db_user={this.state.db_user} />

                {/*현재 주문 상황*/}
                <View style={styles.checkPrize}>
                    {/*주문 진행 상황 함수로 return 받기*/}
                    {this.total_info()}
                </View>


                {/*위치 안내 패널*/}
                <View style={styles.checkLocation}>
                    <View style={styles.top_container_style}>
                        <Text style={styles.title}>위치 안내
                        <Text style={{ fontWeight: 'normal', fontSize: 12 }}>  지도를 클릭하여 자세히 볼 수 있습니다.</Text></Text>
                    </View>
                    {/*지도 넣기*/}
                    <View style={styles.mapSection}>

                    </View>
                    {/*위치 안내, 버튼 넣기*/}
                    <View style={{ alignContent: "flex-end", marginTop: -145 }}>
                        <View style={styles.up_container} />
                        <View style={{ alignItems: 'center' }}>
                            <EvilIcons
                                name="location"
                                size={25}
                                color={ICON_COLOR}
                                style={styles.icon} />
                            <Text style={styles.locationFont}>대전광역시 유성구 온천2동{"\n"}궁동로 18번길 24</Text>
                        </View>
                    
                    {/*혼자 먹기, 같이 먹기 선택하기 버튼*/}
                    {this.select_btn()}
                    </View>
                </View>

                {/*주문 완료 버튼*/}
                <View style={styles.completeBtn}>
                    <AntDesign
                        name="rightcircleo"
                        size={20}
                        color="#FFFFFF"
                        style={styles.arrow_icon}
                    />
                    <Text style={styles.compelteFont}>8,000원 주문 완료 하기</Text>
                </View>

                <Test></Test>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    /*checkPrize랑 orderlist, checkLocation 유사함, 나중에 될 수 있으면 컴포넌트로 작성하여 사용하기*/
    //주문 완료 버튼
    completeBtn: {
        borderColor: '#40E0D0',
        backgroundColor: '#40E0D0',
        borderWidth: 2,
        width: wp('92%'),
        height: wp('10%'),
        borderRadius: 13,
        alignSelf: 'flex-end',
        marginRight: 15,
        marginTop: 18,
    },
    //주문 완료 버튼
    compelteFont: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: "center",
        fontSize: 18,
        marginTop: -22,
        marginLeft: 20
    },
    //지도 들어갈 곳
    mapSection: {
        width: wp('40%'),
        height: wp('33%'),
        backgroundColor: '#eeeeee',
        marginTop: 10,
        marginLeft: 10
    },
    locationFont: {
        fontWeight: "normal",
        fontSize: 15,
        alignSelf: 'flex-end',
        marginRight: 30,
        marginTop: -20,
        marginBottom: 5
    },
    //혼자 먹을래요, 같이 먹을래요 버튼 폰트
    btnFont: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: "center",
        fontSize: 15,
        marginTop: 5
    },
    //혼자 먹을래요, 같이 먹을래요 버튼 
    checkBtn: {
        borderColor: '#585858',
        backgroundColor: '#585858',
        borderWidth: 2,
        width: wp('40%'),
        height: wp('9%'),
        borderRadius: 25,
        alignSelf: 'flex-end',
        marginRight: 15,
        marginTop: 8,
    },
    //위치 창
    checkLocation: {
        width: wp('90%'),
        height: wp('48%'),
        marginTop: wp('5%'),
        backgroundColor: '#ffffff',
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 2, height: 4 },
        elevation: 2,
        borderRadius: 10
    },
    //모인 금액 창
    togetPrize: {
        borderColor: '#eeeeee',
        borderWidth: 2,
        width: wp('40%'),
        height: wp('9%'),
        borderRadius: 25,
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: -30
    },
    togetFont: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: "center",
        marginTop: 6,
        marginRight: -10
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
    //스크롤 뷰
    scrollView: {
        marginHorizontal: 7,

    },
    //전체 화면 설정
    headline: {
        width: wp('90%'),
        fontSize: hp('3%'),
        marginTop: 40,
        marginLeft: 20,
        marginBottom: -10,
    },
    orderFont: {
        fontWeight: "bold",
        fontSize: 17,
        marginLeft: 10,
    },
    //나누는 선
    separator: {
        marginTop: 10,
        backgroundColor: '#E6E6E6',
        height: 2
    },
    //전체적인 틀
    container: {
        alignItems: 'center',
    },

    orderlist: {
        width: wp('90%'),
        height: wp('45%'),
        marginTop: wp('5%'),
        backgroundColor: '#ffffff',
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 2, height: 4 },
        elevation: 2,
        borderRadius: 10
    },
    // 주문 정보 넣기
    orderinfo: {

    },
    //주문 가게 이름 표시
    title: {
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 10,
        fontSize: wp('4%'),
        fontWeight: 'bold'
    },
    //안의 글씨 소제목(시킨 음식)
    detail_title: {
        marginTop: 10,
        marginBottom: 2,
        marginLeft: 15,
        fontSize: 16,
        fontWeight: 'bold'
    },
    //안의 글씨 내용
    detail_prize: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 15,
        fontSize: 15
    },
    //주문 가게 이름 표시 바탕
    top_container_style: {
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
    },

    icon: {
        marginRight: -15,
        marginTop: 15
    },
    arrow_icon: {
        alignSelf: "center",
        marginRight: 170,
        marginTop: 8
    }
});

export default CheckOrder;