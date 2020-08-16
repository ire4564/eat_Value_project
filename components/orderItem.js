
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import Counter from 'react-native-counters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
var btnNum = -1;

class OrderItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0,
        }
    }

    //counter에서 orderItem 값 가져오기
    sendData(_data, type) {
        //countPrize가 true이면 order 목록의 카운터라는 뜻
        //btnNum: DB 연동을 위해 몇 번째 목록에서 만들어진 버튼인지 (index 표시)
        //type: +인지 -인지 알 수 있도록 추가
        var resultType = true;
        if(this.props.countPrize == true){
            btnNum = this.props.btnNum;
            this.setState({
                count: _data
            });
            if(type == '-') {
                resultType = false;
            }
            this.props.sendCounter(_data, btnNum, resultType);
        }
    }
    
    render(){
        return(
            <View>
                <View style={[styles.counter_container, this.props.style]}>
                <Counter
                    sendData={this.sendData.bind(this)}
                    start={this.props.num}
                    buttonStyle={{
                        borderWidth: 0
                    }}
                    buttonTextStyle={{
                        color: '#40E0D0',
                        fontWeight: 'bold',
                        marginRight: -15,
                        marginTop: -3
                    }}
                    countTextStyle={{
                        color: '#40E0D0',
                        fontWeight: 'bold',
                        fontSize: 15,
                        marginRight: -12,
                        marginTop: -3
                    }}
                />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    counter_container : {
        borderColor: '#00CED1',
        borderWidth: 2,
        width: wp('30%'),
        height: wp('9%'),
        borderRadius: 25,
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: -30
    },
});

export default OrderItem;