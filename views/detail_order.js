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
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment'; 
import posed from 'react-native-pose';
import { AntDesign } from '@expo/vector-icons'; 

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
            db_user: this.props.db_user,
            db_store: this.props.db_store,
            db_order: this.props.db_order,
            event: 'closed',
        }
    }
    componentDidMount() {
        this.setState({event: 'open'});
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
                            <Text style={styles.order_number}>주문 번호 : 123456</Text>
                            <Text style={styles.order_number}>{moment().format('YYYY-MM-DD HH:mm:ss')}</Text>
                        </View>

                        <View>
                            <Text style={styles.store_name}>동대문 엽기 떡볶이</Text>
                            <Text style={styles.store_info}>대전광역시 유성구 봉명동</Text>
                            <View style={styles.eat_with_box}>
                                <Text style={styles.eat_with_box_text}>같이 먹어요 </Text>
                                <AntDesign name="questioncircleo" style={{textAlignVertical: 'center'}} size={wp('3.5%')} color="#000" />
                            </View>
                        </View>
                        
                        <View style={styles.order_container}>
                            <View style={styles.map_container}>
                                <View style={styles.mini_map}/>
                                <View style={{width: wp('48%')}}>
                                    <Text style={styles.order_header}>배달 위치</Text>
                                    <Text style={styles.order_location}>대전광역시 유성구 궁동 99 조각공원</Text>
                                    <Text style={{color: '#aaa', fontSize: wp('3%')}}>
                                    ※ '혼자 먹어요'의 경우 해당 위치는 전체 배달의 기준점이 되는 위치를 의미합니다.</Text>
                                </View>
                            </View>
                            
                            <Text style={styles.order_header}>앞으로 2명 더 모이면 자동주문!</Text>
                            <Text style={styles.order_header}>최소 결제 금액 달성까지 앞으로</Text>
                            <Text style={styles.order_header}>상세 주문 내역</Text> 
                        </View>
                          
                    </View>
                    
                </ScrollView>
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

      //같이/혼자 먹어요 상자 style
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
      eat_with_box_text: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
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
      },

      //주소 text style
      order_location: {
          fontSize: wp('4%'),
          marginBottom: wp('3%'),
      },

      //주문 내역 내용 중 각 헤더 text
      order_header: {
        fontWeight: 'bold',
        fontSize: wp('5%'),
        marginBottom: wp('1%'),
      },
  });

export default DetailOrder;