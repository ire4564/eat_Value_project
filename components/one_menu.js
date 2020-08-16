import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import OrderItem from '../components/orderItem';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            choose: false,
            amount: 0,
        }
    }   
    coloring(){
        if(this.state.choose){
            return {
                backgroundColor: '#F2F2F2',
            };
        }
        return {};
    }
    setAmount(){
        var i = this.state.amount==0?1:0;
        this.setState({
            choose: !this.state.choose,
            amount: i
        });
        this.props.setAmount(this.props.num, i);
    }
    printCounter(){
        if(this.state.amount!=0){
            return (<OrderItem num={this.state.amount} style={{marginTop: 0, backgroundColor: '#fff'}}/>);
        }
        return null;
    }
    render(){
        return (
        <TouchableOpacity
        style={[styles.row_container, styles.one_menu_container, this.coloring()]}
        onPress={this.setAmount.bind(this)}>
            <Text style={styles.menu}>{this.props.store_menu.name}</Text>
            {this.printCounter()}
            <Text style={styles.price}>{this.props.store_menu.price.toLocaleString()}원</Text>
        </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    //가로 정렬 컴포넌트
    row_container: {
        flexDirection: 'row',
        marginBottom: wp('0.3%'),
        alignContent: 'center',
    },
    //가운데 정렬 컴포넌트
    center_container: {
        alignSelf: 'center',
    },
    //각 메뉴의 컴포넌트
    one_menu_container: {
        width: '100%',
        height: wp('13%'),
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingVertical: wp('2%'),
        borderBottomWidth: 1.5,
        borderColor: '#F2F2F2',
    },
    //가격 글씨
    price: {
        width: wp('15%'),
        alignSelf: 'center',
        textAlign: 'right',
        fontSize: wp('4.2%'),
        fontWeight: 'bold',
    },
    //메뉴명
    menu: {
        width: wp('30%'),
        alignSelf: 'center',
        textAlign: 'left',
        fontSize: wp('4.2%'),
    },
});

export default Menu;