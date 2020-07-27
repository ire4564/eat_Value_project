import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, CheckBox } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Divider } from 'react-native-elements';
import LocationBar from '../components/locationBar';
// npm install react-native-elements

class CheckOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            db_user: this.props.db_user
        }   
    }

    render(){
        return(
            <View style={[this.props.style, styles.container]}>
                <Text style={styles.headline}>
                        <Text style={{fontWeight: "bold"}}>주문하기</Text>
                </Text>
                
                <View style={styles.orderlist}>
                    <Text style={styles.title}>주문 가게 이름</Text>
                    <Divider style={styles.separator}/>
                </View>

                <LocationBar db_user={this.state.db_user}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //전체 화면 설정
    headline: {
        width: wp('90%'),
        fontSize: hp('3%'),
        marginTop: 40,
        marginLeft: 20,
        //marginBottom: 10,
    },

    container: {
        alignItems: 'center'
    },
     
    orderlist: {
        width: wp('90%'),
        height: wp('20%'),
        marginTop: wp('5%'),
        backgroundColor: '#ffffff',
        shadowColor: "#000000", 
        shadowOpacity: 0.1,
        shadowOffset: { width: 2, height: 4 }, 
        elevation: 2,
        borderRadius: 10
    },

    title: {
        marginTop: 10, 
        marginLeft: 10,
        marginBottom: 10,
        fontSize: wp('4%'),
        fontWeight: 'bold'
    },

    separator: {
        backgroundColor: '#E6E6E6',
        height: 2
    }
});

export default CheckOrder;