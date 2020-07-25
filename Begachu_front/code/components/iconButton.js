/************************************************
 * Class : 메뉴 버튼
 * 
 * notice :
 *  - 각 아이콘들은 expo/vector-icons에서 임의로 가져옴
 * 
 * const :
 *  - NORMAL_BUTTON_COLOR: 선택되지 않은 버튼 색상
 *  - SELETED_BUTTON_COLOR: 선택된 버튼 색상
 *  - ICON_SIZE: 아이콘의 크기
 * 
 * state :
 *  - current_color: 현재 아이콘의 색상
 * 
 * props :
 *  - seleted_mode: 현재 모드
 *  - mode: 해당 컴포넌트의 모드
 *  - icon: expo/vector-icons의 컴포넌트 타입
 *  - icon_name: icon 이름
 *  - icon_text: icon 밑 표시될 글자
 * 
 * function :
 *  - colorChoose: 현재 mode에 따라 해당 아이콘이 띌 색상을 반환
 *  - iconTag: 선택한 아이콘에 따른 컴포넌트 반환
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome, Fontisto } from '@expo/vector-icons';

const NORMAL_BUTTON_COLOR = '#fff';
const SELETED_BUTTON_COLOR = '#000';
const ICON_SIZE = '120%';

class IconButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            current_color: NORMAL_BUTTON_COLOR
        }
    }
    colorChoose(){
        alert("test");
        if(this.props.seleted_mode!==this.props.mode){
            this.setState({
                current_color: NORMAL_BUTTON_COLOR
            });
        }else{
            this.setState({
                current_color: SELETED_BUTTON_COLOR
            });
        }
        return this.current_color;
    }
    iconClick(e){
        if(e.currentTarget.dataset.id!==this.props.seleted_mode){
            this.props.modeChange(e.currentTarget.dataset.id);
            alert("now seleted mode is "+e.currentTarget.dataset.id);   //변화 체크를 위한 임시 alert
        }
        this.colorChoose;
    }
    iconTag(){
        var component;
        if(this.props.icon==="MaterialCommunityIcons"){
            component =
                <MaterialCommunityIcons
                name={this.props.icon_name}
                 size={ICON_SIZE}
                 color={this.state.current_color}/>;
        }else if(this.props.icon==="Ionicons"){
            component =
                <Ionicons
                name={this.props.icon_name}
                size={ICON_SIZE}
                color={this.state.current_color}/>;
        }else if(this.props.icon==="FontAwesome"){
            component =
                <FontAwesome
                name={this.props.icon_name}
                size={ICON_SIZE}
                color={this.state.current_color}/>;
        }else if(this.props.icon==="Fontisto"){
            component =
                <Fontisto
                name={this.props.icon_name}
                size={ICON_SIZE}
                color={this.state.current_color}/>;
        }
        return component;
    }

    render(){
        return(
            <TouchableOpacity
            style={styles.icon_component}
            onPress={this.iconClick.bind(this)}
            data-id={this.props.mode}>
                    {this.iconTag()}
                    <Text
                    style={[styles.icon_text,
                    {color: this.state.current_color}]}
                    
                    >{this.props.icon_text}</Text>
                </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    icon_component: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%',
        width: '60%',
    },
    icon_text: {
        marginTop: 3,
        fontSize: 8,
    }
});

export default IconButton;