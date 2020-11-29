/************************************************
 * Class : 리뷰를 등록하기 위한 화면
 * 
 * state :
 *  - 
 * 
 * function :
 *  - 
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, StatusBarIOS } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';

class WriteReview extends Component {
    constructor(props){
        super(props);
        this.state = {
            reviewText : ""
        }   
    }

    showStar() {
        var stars = [];
        for(var i=0; i<5; i++){
            stars.push(
                <AntDesign name="star" size={hp('4%')} style={styles.icons} color="orange" key={"key"+i}/>
            ); 
        }
        return stars;
    }
    render(){
        return(
            <View style={[this.props.style, styles.container]}>

                 <Text style={styles.headline}>
                        <Text style={{fontWeight: "bold"}}> 리뷰 </Text>
                        <Text>작성하기</Text>
                </Text>
                <Text style={{color:'#fff', fontSize:hp('1.9%')}}>별을 클릭하여 별점을 주세요.</Text>
                <Text style={{alignSelf: "flex-start", marginLeft: ("5%")}}>
                    {this.showStar()}
                </Text>

                {/*텍스트 입력 부분*/}
                 <TextInput
                    style={styles.inputText}
                    placeholder="맛있게 드셨나요? 주문한 음식의 리뷰를 작성해 주세요."
                    onChangeText={(text)=>this.setState({reviewText: text})}
                    value={this.state.reviewText}/>

                {/*리뷰 버튼*/}
                <TouchableOpacity
                    style={styles.cancelOrder_style2}
                    onPress={function(){
                            alert("리뷰가 등록되었습니다!")
                            this.props.changeMode("order-list");
                    }.bind(this)}>
                    <Text style={{color:'#fff', fontSize:hp('2.3%'), fontWeight: "bold"}}> 리뷰 쓰기 </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        width: wp('100%'),
        marginTop: hp('-1.5%')
    },
    //입력 텍스트 style
    inputText: {
        width: wp('90%'),
        height: hp('30%'),
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 2,
        paddingHorizontal: 10,
    },
    //headline style
    headline: {
        width: wp('90%'),
        fontSize: hp('3%'),
        marginTop: 25,
        //marginBottom: 10,
    },
    cancelOrder_style2: {
        width: wp('90%'),
        backgroundColor: '#40e0d0',
        borderRadius: 10,
        paddingVertical: hp('1.7%'),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    icons: {
        alignSelf: "flex-start", 
        marginLeft: wp("5%"), 
        marginBottom: hp('0.5%')
    }
  });

export default WriteReview;