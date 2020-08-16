
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import Counter from 'react-native-counters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class OrderItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0,
        }
    }

    //counter에서 orderItem 값 가져오기
    sendData(_data) {
        if(this.props.countPrize == true){
            this.setState({
                count: _data
            });
            this.props.sendCounter(_data);
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