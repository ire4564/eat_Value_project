/************************************************
 * Class : 주문 완료 시 완료 화면
 * 
 * state :
 *       
 *
 *      
 * 
 * function :
 *  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import posed from 'react-native-pose';
import 'moment/locale/ko';

const UNNAMED = '../images/unnamed.jpg';
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

class CompleteOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
        }   
    }

    componentDidMount() {
        this.setState({event: 'open'});
    }

    render(){
        return(
            <Page style={this.props.style} pose={this.state.event}>
                <View style={styles.main_container}>
                    
                    <View style={styles.iconView}>
                        <AntDesign name="checkcircleo" size={30} color="#6BECE4" style={styles.icon}/>
                        <Entypo name="bowl" size={100} color="#6BECE4" style={styles.icon} /> 

                        <Text style={styles.orderText}>  주문이 접수되었습니다.</Text>
                        <Text style={styles.orderText_s}>  ※ 결제 진행 시 알림을 보내드리겠습니다.</Text>
                    </View>
                   
                   
                    <TouchableOpacity style={styles.button_container}
                    onPress={function(){this.props.changeMode("home")}.bind(this)}>
                    <Entypo name="log-out" size={20} color="#ffffff" />
                        <Text style={styles.button_text}>  HOME 으로 돌아가기</Text>
                    </TouchableOpacity>
                </View>
            </Page>
        );
    }
}

const styles = StyleSheet.create({
    //메인 컨테이너 style
    main_container: {
        position: 'absolute',
        width: wp('100%'),
        height: hp('85%'),
        top: hp('-3%'),
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('3%'),
        backgroundColor: '#fff',
      },

    //버튼 컨테이너 style
    button_container: {
        backgroundColor: '#40E0D0',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: hp('1%'),
        height: hp('5%'),
        width: wp('55%'),
        borderRadius: 10,
        alignSelf: 'center'
    },
    
    //버튼 내부 text style
    button_text: {
        color: '#fff',
        fontSize: hp('2.1%'),
    },
    icon: {
        alignSelf: 'center',
        marginBottom: 5,

    },
    iconView: {
        marginTop: hp("18%"),
        marginBottom: wp("10%"),
    },
    orderText: {
        color: "#777B7B",
        alignSelf: 'center',
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 18,
    },
    orderText_s: {
        color: "#777B7B",
        alignSelf: 'center',
        marginTop: 3,
        fontWeight: "bold",
        fontSize: 15,
    }
  });

export default CompleteOrder;