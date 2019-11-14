import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as actions from "../actions/actions";
import * as socConnections from '../actions/socket/socket';
import Post from './Post/post';
import Main from './Main/main';

class Routes extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      soc : socConnections.connect_to_socket()
    }
  }

  render() {
    return (
      <div style={styles.fill}>
        <div
          style={{
            position: 'relative',
            minHeight: '100vh',
          }}>
          <div style={{ paddingBottom: '80px' }}>
            {/* <NavBar /> */}
            <Switch location={this.props.location}>
              <Route exact path="/" render={() => <Main soc={this.state.soc} />} />
              <Route exact path="/post/:id" component={Post} />
            </Switch>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    );
  }
}
const styles = {};
styles.fill = {
  position: 'fixed',
  overflowY: 'auto',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

Routes.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    location: state.router.location,
  };
};

const mapDispatchToProps = (dispatch)=>{
  return {
      actions: bindActionCreators(actions, dispatch) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
