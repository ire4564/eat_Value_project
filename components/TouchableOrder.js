/************************************************
 * Class : HOT 주문 컴포넌트
 * 
 * notice : 최소 인원 이상인 경우 현재 인원 수의 색상을 타 색상으로 설정함.
 *          해당 변화 색상을 바꾸고 싶은 경우 getDerivedStateFromProps()의
 *          if문 내 반환되는 색상 변경하면 됨.
 * 
 * props :
 *  - name : 가게명
 *  - location : 주문 배달 위치
 *  - min : 최소 인원
 *  - current : 현재 인원
 *  - color : 버튼 색상(기본 색상)
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';


class TouchableOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : this.props.list.name,
            location : this.props.list.location,
            min : this.props.list.min,
            current : this.props.list.current,
            current_color : '#fff',
        }
    }

    static getDerivedStateFromProps(nextProps, nextState){
        if(nextProps.list.min<nextProps.list.current){
            return {current_color: '#f00'};
        }
        return null;
    }

    render(){
        return(
            <TouchableOpacity
            style={styles.container}
            onPress={function(){
                if(this.props.event!==undefined){
                    this.props.event;
                }
            }.bind(this)}
            >
                <Text
                style={styles.name}
                numberOfLines={2}
                >{this.state.name}</Text>
                <View style={styles.location}>
                    <Ionicons name="md-pin" size={18} color="#fff"/>
                    <Text style={styles.location_text}> {this.state.location}</Text>
                </View>
                <View style={styles.amount}>
                    <Text style={styles.amount_text}>현재인원 (<Text style={{color: this.state.current_color}}>{this.state.current}</Text>/{this.state.min})</Text>
                    <FontAwesome name="arrow-right" size={18} color="#fff" />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    //컨테이너 style
    container: {
        backgroundColor: '#00CED1',
        borderRadius: 20,
        marginRight: 10,
        width: 140,
        height: 160,
        alignContent: 'space-between',
    },

    //가게명 style
    name: {
        marginTop: 10,
        marginBottom: 20,
        width: 100,
        height: 60,
        color: '#000',
        fontWeight: 'bold',
        fontSize: 21,
        marginLeft: 15,
    },

    //위치 컴포넌트 style
    location: {
        flexDirection: 'row',
        height: 35,
        marginLeft: 10,
    },

    //위치 문자열 style
    location_text: {
        color: '#fff',
        fontSize: 13,
    },

    //인원표시 컴포넌트 style (화살표 포함)
    amount: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignContent: 'flex-end',
        justifyContent: 'space-between',
    },

    //인원표시 문자열 style
    amount_text: {
        color: '#fff',
        fontSize: 13,
    },
  });

export default TouchableOrder;