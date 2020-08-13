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

const TEST_IMG = '../images/detail_order_sample.png';
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
                        <Text style={styles.store_name}>동대문 엽기 떡볶이</Text>
                        <Text>가게 위치</Text>
                        <Text>주문 위치</Text>
                        <Text>인원 제한</Text>
                        <Text>상세 주문 내역</Text>   
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
        width: wp('100%'),
        height: hp('85%'),
        top: hp('-3%'),
        backgroundColor: '#fff',
      },

      //이미지 style
      image: {
        width: wp('100%'),
        height: hp('30%'),
        resizeMode: 'cover',
        opacity: 1,
      },

      //내용 컨테이너 style
      main_container: {
        top: hp('-5%'),
        width: wp('100%'),
        height: hp('85%'),
        backgroundColor: '#fff',
        borderTopLeftRadius: wp('5%'),
        borderTopRightRadius: wp('5%'),
        paddingHorizontal: wp('5%'),
        paddingVertical: wp('5%'),
      },

      //주문 대기 번호 및 시간 text style
      order_number: {
        fontSize: wp('3.2%'),
      },

      //가게명 text style
      store_name: {
        marginTop: hp('1%'),
        fontWeight: 'bold',
        fontSize: wp('7%'),
      },

      //가게 정보 text style
      store_info: {

      },

      //


  });

export default DetailOrder;