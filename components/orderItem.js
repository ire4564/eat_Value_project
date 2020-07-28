
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import Counter from 'react-native-counters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class OrderItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
    }
    
    render(){
        return(
            <View>
                <View style={styles.counter_container}>
                <Counter
                    start={1}
                    buttonStyle={{
                        borderWidth: 0
                    }}
                    buttonTextStyle={{
                        color: '#00CED1',
                        fontWeight: 'bold'
                    }}
                    countTextStyle={{
                        color: '#333',
                    }}
                />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    counter_container : {
        marginTop: 10,
        borderColor: '#00CED1',
        borderWidth: 2,
        width: wp('27%'),
        height: wp('9%'),
        borderRadius: 25,
        alignSelf: 'flex-end',
        marginTop: 35,
        marginRight: 10
    },
});

export default OrderItem;