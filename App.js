/************************************************
 * Class : 전쳬 화면
 * 
 * state :
 *  - seleted_mode: 현재 선택된 모드
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MenuBar from './components/menuBar';
import Home from './views/home';
import NowOrder from './views/now_order';
import OrderList from './views/order_list';
import Talk from './views/talk';
import User from './views/user';
import Navigation from './components/navigation';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        seleted_mode: 'home',
    }
    
}
  headerText(){
    if(this.state.seleted_mode==='home'){
        return "가치 value 먹자";
      }else if(this.state.seleted_mode==='order-list'){
        return "My Orders";
      }else if(this.state.seleted_mode==='now-order'){
        return "Now Order";
      }else if(this.state.seleted_mode==='talk'){
        return "Talk";
      }else if(this.state.seleted_mode==='user'){
        return "My Page";
      }
  }
  changePage(){
    if(this.state.seleted_mode==='home'){
      return <Home style={styles.page_component}/>;
    }else if(this.state.seleted_mode==='order-list'){
      return <OrderList style={styles.page_component}/>;;
    }else if(this.state.seleted_mode==='now-order'){
      return <NowOrder style={styles.page_component}/>;;
    }else if(this.state.seleted_mode==='talk'){
      return <Talk style={styles.page_component}/>;;
    }else if(this.state.seleted_mode==='user'){
      return <User style={styles.page_component}/>;;
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <Navigation style={styles.header_button}></Navigation>
        <Text
        children={this.headerText()}
        style={styles.header}
        ></Text>
        {this.changePage()}
        <MenuBar
        style={styles.menu_component}
        mode={this.state.seleted_mode}
        modeChange={
          function(_mode){
            if(this.state.seleted_mode!==_mode){
              this.setState({
                seleted_mode: _mode,
              });
            }
          }.bind(this)
        }
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  //상단 헤더부분 style
  header: {
    flex: 1,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },

  //상단 헤더 메뉴 버튼
  header_button: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  //사용자 선택 화면 style
  page_component: {
    width: '100%',
    flex: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  //하단 메뉴 컴포넌트 style
  menu_component: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#40E0D0',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default App;