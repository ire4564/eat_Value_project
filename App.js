/************************************************
 * Class : 전쳬 화면
 * 
 * state :
 *  - seleted_mode: 현재 선택된 모드
 *  - db_user: 현재 유저의 id
 * 
 * function :
 *  - changePage: 모드에 따른 화면 전환 메소드
 *  - changeMode: 모드 전환 메소드
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MenuBar from './components/menuBar';
import Home from './views/home';
import NowOrder from './views/now_order';
import OrderList from './views/order_list';
import Talk from './views/talk';
import User from './views/user';
import Navigation from './components/navigation';
import MakeRoom from './views/make_room';
import CheckOrder from './views/check_order';
import Notice from './views/notice';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        seleted_mode: 'home',
        db_user: {
          coupon_num: 0,
          id: "testID",
          name: "테스트계정",
          order_num: 0,
          location: "대전 유성구 궁동 99",
        },
    }
    
  }
  changePage(){
    switch(this.state.seleted_mode){
      case 'home':
        return <Home
        style={styles.page_component}
        db_user={this.state.db_user}
        changMode={this.changeMode.bind(this)}
        />;
      case 'check-order':
        return <CheckOrder
        style={styles.page_component}
        db_user={this.state.db_user}
        changMode={this.changeMode.bind(this)}
        />;
      case 'order-list':
        return <OrderList
        style={styles.page_component}
        db_user={this.state.db_user}
        changMode={this.changeMode.bind(this)}
        />;
      case 'now-order':
        return <NowOrder
        style={styles.page_component}
        db_user={this.state.db_user}
        changMode={this.changeMode.bind(this)}
        />;
      case 'talk':
        return <Talk
        style={styles.page_component}
        db_user={this.state.db_user}
        changMode={this.changeMode.bind(this)}
        />;
      case 'user':
        return <User
        style={styles.page_component}
        db_user={this.state.db_user}
        changMode={this.changeMode.bind(this)}
        />;
      case 'make-room':
        return <MakeRoom
        style={styles.page_component}
        db_user={this.state.db_user}
        changMode={this.changeMode.bind(this)}
        />;
      case 'notice':
        return <Notice
        style={styles.page_component}
        db_user={this.state.db_user}
        changMode={this.changeMode.bind(this)}
        />;
    }
  }
  changeMode(_mode){
    if(this.state.seleted_mode!==_mode){
              this.setState({
                seleted_mode: _mode,
              });
            }
  }
  render(){
    return(
      <View style={styles.container}>
        <Navigation
        mode={this.state.seleted_mode}
        changeMode={this.changeMode.bind(this)}
        />
        {this.changePage()}
        <MenuBar
        style={styles.menu_component}
        mode={this.state.seleted_mode}
        changeMode={this.changeMode.bind(this)}
        />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  //전체 화면 style
  container: {
    flex: 1,
    backgroundColor: '#40E0D0',
    alignContent: 'space-between',
  },

  //사용자 선택 화면 style
  page_component: {
    width: wp('100%'),
    height: hp('81%'),
    backgroundColor: '#fff',
  },
  
  //하단 메뉴 컴포넌트 style
  menu_component: {
    width: wp('100%'),
    height: hp('7%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;