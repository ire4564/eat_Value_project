/*********************************************************************
 * Class : 방 만들기 화면
 * 
 * state :
 *  - seleted_mode: 현재 선택된 모드
 *  - db_user: 현재 유저의 id
 *  - db_order: 주문 제목, 주문 리스트
 *  - room_info: 방의 정보: 모집 인원, 모인 인원, 모인 금액에 대한 정보
 * 
 * function :
 *  - order_info() 주문하기 밑에 주문 정보 탭
 *  - select_info(): 모집하기에 대한 정보를 받아오기 위한 입력 탭
 * 
 *  
 ***********************************************************************/


import React, { Component } from 'react';
import { StyleSheet, Text, View , TouchableOpacity, AppRegistry, ScrollView} from 'react-native';
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
var first = true;
var count = 0; //해당되는 리스트 길이 세기
const databaseURL = "http://34.64.120.109:3000";
var resultPrize = 0;

class MakeRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            db_user: "testID", //this.props.db_user //(원래 이거 사용 테스트를 위해서 임시로 넣어둠)
            //db_order 사용
            db_order: [
                {
                    store_name: "신당동 떡볶이 충남대점",
                    date: "2020-07-18-00-00",
                    order_detail: [{ menu: '참치마요덮밥', amount: 0, price: 4000, user_id: "testID" },
                    { menu: '튀김오뎅', amount: 0, price: 4000, user_id: "testID" },
                    { menu: '떡볶이(중간맛)', amount: 0, price: 4000, user_id: "testID" },
                    ],
                },
                //리스트가 더 있어도 상관없음, 테스트를 위해 하나만 함 (메뉴는 여러 개)
            ],
            //방의 정보: 모집 인원, 모인 인원, 모인 금액에 대한 정보
            room_info: [
                {
                    limit_order: 5, //최대 인원
                    current_order: 1, //현재 인원
                    exist_prize: 25000 //현재 모인 돈
                }
            ],
            location: {
                name: "대전광역시 유성구 궁동 25번길",//this.props.name,
                latitude: this.props.latitude,
                longitude: this.props.longitude,
                latitudeDelta: this.props.latitudeDelta,
                longitudeDelta: this.props.longitudeDelta
            },
            //가게 정보 DB 포함
            db_store: {
                category: this.props.category,
                min_order: 18000,
                name: this.props.name,
                rating: this.props.rating
            },

            db_store_menu: {},
            
            test_location: {
                "latitude" : 37.78825,
                "longitude" : -122.4324
            },
            totalPrize: 0, //사용
            alone: 0 ,//혼자 먹을래요면 true, 함께면 false,
            clickType: -1, //counter 버튼이 어떤게 눌렸는지 (true: +, false: -)
            BtnIndex: 0
        }
    }

  _get() {
    fetch(`${databaseURL}/db_store/0`).then(res => {
      if(res.status != 200) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(db_store => this.setState({db_store: db_store}));

    fetch(`${databaseURL}/db_store_menu/0`).then(res => {
        if(res.status != 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      }).then(db_store_menu => this.setState({db_store_menu: db_store_menu}));

  }


  componentDidMount() {
    this._get();
    var tmp_order = this.state.db_order;
    var tmp_menu = this.state.db_store_menu;
    for(let i = 0; i < tmp_menu.length; i++) {
        tmp_menu[i].user_id = this.state.db_user;
    }
    tmp_order.order_detail = tmp_menu;

    this.setState({db_order:tmp_order});
  }
  
    /**
     * @author MINIBEEF
     * @name _post
     * @method "_post insert to data with rest API"
     */
    _post(jsondata) {
        return fetch(`${databaseURL}/db_order/${this._get_date()}`, { // TODO : set table json name
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsondata),
            credentials: 'include',
        }).then(res => {
          if(res.status != 200) {
            throw new Error(res.statusText); // throw exception
          }
          return res.json();
        });
    }

    _get_date() {
        const date = new Date();
        var YYYY = date.getFullYear();
        var MM = date.getMonth() + 1;
        var DD = date.getDate();
        var HH = date.getHours();
        var MIN = date.getMinutes();
        return `${YYYY}${MM}${DD}${HH}${MIN}`
    }

    /**
     * @author MINIBEEF
     * @name _add_order_to_database
     * @method "_add_order_to_database arrange data and then, push to firebase DB"
     */
    _add_order_to_database() {
        const date = new Date();
        var YYYY = date.getFullYear();
        var MM = date.getMonth() + 1;
        var DD = date.getDate();
        var HH = date.getHours();
        var MIN = date.getMinutes();

        const jsondata = {
            date : `${YYYY}-${MM}-${DD}-${HH}-${MIN}`,
            store_image : "../images/test_image.jpg",
            store_name : this.state.db_store.name,
            current_order : this.state.room_info[0].current_order,
            limit_order : this.state.room_info[0].limit_order,
            location : {
                name : this.state.db_store.location,
                "latitude" : 36.363225,
                "latitudeDelta" : 0.0922,
                "longitude" : 127.344945,
                "longitudeDelta" : 0.0421,
            },
            store_num : 0, // 수정 필요
            order_detail : this.state.db_order[0].order_detail,
            alone : this.state.alone
        }
        this._post(jsondata);
    }

    //createRoom(): 방 만들기에 대한 입력한 정보를 DB로 보내고 주문 완료 후, 주문 완료 화면으로 전환
    createRoom = () => {
         this.setState ({
            totalPrize: this.renew_prize()
        })
        this._add_order_to_database();
        {{this.props.changeMode("complete-order")}} 
    }

    //숫자 입력 값에 표기하기
    addComma(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // 콤마 추가를 했다가, DB에는 빼고 숫자로 저장하는 용도
    replaceComma(x){
        if(x.indexOf(",") != -1) {
            //콤마가 있으면 replace
            x = x.replace(/,/gi, '');
        }
        return x;
    }

    //counter 값에 따라서 총 금액 달리하기
    renew_prize() {
        return resultPrize;
    }
    //주문하기 밑에 주문 정보 탭
    order_info() {

    var list_info = [] //return 정보를 담을 곳
    var order_details = this.state.db_order[0].order_detail;
    for (let i = 0; i < order_details.length; i++) {
        if(order_details[i].user_id == this.state.db_user){
            //주문 중에서 현재 주문자의 리스트만 출력
            var this_total_prize = order_details[i].price * order_details[i].amount;
            if(this.state.clickType == -1) {
                //처음 총액 계산
                resultPrize += this_total_prize;
            }
            else if(this.state.clickType == true){
                //+를 눌렀을 경우
                resultPrize += order_details[this.state.BtnIndex].price/2;
            } else {
                resultPrize -= order_details[this.state.BtnIndex].price/2;
                if (resultPrize < 0)    resultPrize = 0;
            }
            //onchange 사용해서 총 수량에 따른 잔액 실시간으로 변경하기!!!!
            list_info.push(
                <View key={"info"+i}>
                    <Text style={styles.detail_title}>{order_details[i].menu}</Text>
                    <Text style={styles.detail_prize}>● 기본: {this.addComma(order_details[i].price)} 원</Text>
                    <Text style={styles.detail_prize}> {this.addComma(this_total_prize)} 원</Text>
                    <OrderItem  
                     //그 카운터의 수를 세기
                        btnNum = {i}
                        num={order_details[i].amount}
                        sendCounter={this.sendCounter.bind(this)}
                        countPrize={true}
                        />
                    <Divider style={styles.separator} />
                </View>
            )
            count++;
        } 
    }
    //리스트에 아무것도 없으면 주문 선택 화면으로 가기
    if(count == 0){
        list_info.push(
            <View>
                <Text style={styles.gotoOrder_detail}>
                        NONE ORDER
                </Text>
                <TouchableOpacity 
                    style={styles.gotoOrder} 
                    onPress={function(){this.props.changeMode("choose-menu")}.bind(this)}>
                    <Text style={styles.gotoOrder_font}>
                        원하는 가게 선택하러 가기 !
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    return list_info;
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
            <OrderItem 
                num={this.state.room_info[0].limit_order}
                sendCounter={this.sendCounter.bind(this)}
                countPrize={false}
                btnNum = {-1}
                />
            <Divider style={styles.separator} />
            <Text style = {styles.detail_title}>
                최소 주문 금액
            </Text>           
            <View style={styles.togetPrize}>
            <Text style={styles.search}>
                {this.addComma(this.state.db_store.min_order)} 원
            </Text>
            </View>

        </View>
       
        ;
        return info;
    }
    //alone 정보를 받아오기 위해서 
    sendData(_data){
        this.setState({
          alone: _data,
        });
    }
    //Counter 값을 가져오기 위해서
    sendCounter(_data, index, type) {
        var detail = this.state.db_order
        detail[0].order_detail[index].amount = _data
        this.setState({
            db_order : detail,
            clickType: type,
            BtnIndex: index
        });
    }
 
    render(){
        return(
            <View style={[this.props.style, styles.container]}>

                <ScrollView>
                    <View style={styles.main}>
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
                    title = {this.state.db_order[0].store_name}
                    func = {this.select_info()}
                ></InfoBox>

                {/*주문하는 리스트 안의 내용*/}
                <OrderBox 
                    title = {this.state.db_order[0].store_name}
                    func = {this.order_info()}
                ></OrderBox>

    
                {/*위치 안내 패널*/}
                <LocationBox
                    mylocation={this.state.location.name}
                    sendData={this.sendData.bind(this)}
                ></LocationBox>

               {/*주문 완료 버튼*/}
               <CompleteBtn 
                    text = {this.addComma(this.renew_prize()) +' 원  주문 완료하기'} 
                    iconName="rightcircleo"
                    clickFunc = {this.createRoom}
                ></CompleteBtn>
                </View>
                </ScrollView>

                {/*위치 표시 바*/}
                <LocationBar db_user={this.state.db_user} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
     //목록 안에 주문 이동 버튼
    gotoOrder: {
        borderColor: ICON_COLOR,
        borderWidth: 2,
        width: wp('50%'),
        height: wp('9%'),
        borderRadius: 25,
        alignSelf: 'center',
        marginRight: wp('-1%'),
        marginTop: hp('2%'),
        color: "#fff"
    },
    main: {
        width: wp("100%"),
        alignItems: 'center',
    },
    gotoOrder_font: {
        fontSize: 15,
        marginTop: wp('1.5%'),
        color: ICON_COLOR,
        fontWeight: "normal",
        alignSelf: 'center',
    },
    //위에 설명 글씨
    gotoOrder_detail: {
        fontSize: 20,
        marginTop: wp('5%'),
        color: ICON_COLOR,
        fontWeight: "bold",
        alignSelf: 'center',
    },
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
    search: {
        fontSize: 15,
        marginRight: wp('5%'),
        marginTop: wp('1.5%'),
        color: ICON_COLOR,
        fontWeight: "bold",
        alignSelf: 'flex-end',
    }, 
    won: {
        fontSize: 14,
        fontWeight: "bold",
        color: ICON_COLOR,
        justifyContent: 'flex-end',
        marginTop: -23,
        marginLeft: 130
    }
  });

export default MakeRoom;