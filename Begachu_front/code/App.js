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
import { StyleSheet, View } from 'react-native';
import MenuBar from './components/menuBar';
import Page from './components/page';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        seleted_mode: 'none',
    }
}

  render(){
    return(
      <View style={styles.container}>
        <Page style={styles.page_component}></Page>
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
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  //사용자 선택 화면 style
  page_component: {
    width: '100%',
    flex: 11,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  //하단 메뉴 컴포넌트 style
  menu_component: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#1AD',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default App;