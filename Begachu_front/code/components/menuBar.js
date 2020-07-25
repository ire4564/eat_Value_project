/************************************************
 * Class : 하단 메뉴 버튼 컴포넌트
 * 
 * notice :
 *  - 각 아이콘들은 expo/vector-icons에서 임의로 가져옴
 *    따라서 아이콘 변경이 아닌 이상 각 아이콘의 name 변경 불가
 * 
 * state :
 *  - seleted_mode: 현재 모드
 * 
 * props :
 *  - mode: 현재 모드
 *  - modeChange: modeChange에 대하여 모드 변화시 상위 컴포넌트가 수행할 이벤트
 * 
 * function :
 *  - modeChange: 각 아이콘 클릭에 대한 이벤트
 *  
 ************************************************/
import React, { Component } from 'react';
import { View } from 'react-native';
import IconButton from './iconButton';

class MenuBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            seleted_mode: this.props.mode
        }
    }

    modeChange(_mode){
        if(_mode !== this.state.seleted_mode){
            this.setState({
                seleted_mode: _mode
            });
            this.props.modeChange(_mode);
        }
    }

    render(){
        return(
            <View style={this.props.style}>
                <IconButton
                seleted_mode={this.state.seleted_mode}
                mode="home"
                icon="MaterialCommunityIcons"
                icon_name="home"
                icon_text="홈"
                modeChange={this.modeChange.bind(this)}/>

                <IconButton
                seleted_mode={this.state.seleted_mode}
                mode="order-list"
                icon="Ionicons"
                icon_name="ios-list-box"
                icon_text="주문 내역"
                modeChange={this.modeChange.bind(this)}/>

                <IconButton
                seleted_mode={this.state.seleted_mode}
                mode="now-order"
                icon="Fontisto"
                icon_name="motorcycle"
                icon_text="Now 주문"
                modeChange={this.modeChange.bind(this)}/>

                <IconButton
                seleted_mode={this.state.seleted_mode}
                mode="talk"
                icon="MaterialCommunityIcons"
                icon_name="message-processing"
                icon_text="Talk"
                modeChange={this.modeChange.bind(this)}/>

                <IconButton
                seleted_mode={this.state.seleted_mode}
                mode="user"
                icon="FontAwesome"
                icon_name="user-circle-o"
                icon_text="내 정보"
                modeChange={this.modeChange.bind(this)}/>
            </View>
        );
    }
}

export default MenuBar;