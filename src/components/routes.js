import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as actions from "../actions/actions";
// Components import
// import LandingPage from './Landing/landing-page';
// import Header from '../components/Header/Header.js';
// import Footer from '../components/Footer/Footer.js';
// import signIn from '../components/signIn/signIn.js';
// import colorKey from '../components/colorKey/colorKey.js';
// import NavBar from '../components/Navbar/Navbar';
// import WhyMatic from '../components/WhyMatic/WhyMatic';
// import Marketplace from '../components/Marketplace/Marketplace.js';
// import Wallet from '../components/Wallet/Wallet.js';
// import Activity from '../components/Activity/Activity.js';
// import MaticCard from '../components/MaticCard/MaticCard.js';
// import MyCard from '../components/MyCard/MaticCard';
// import AddFund from '../components/AddFund/AddFund.js';
// import MaticNetwork from '../components/MaticNetwork/MaticNetwork.js';
// import Address from '../components/Address/Address.js';
// import NotPartOfDesign from '../components/NotPartOfDesign/NotPartOfDesign.js'

class Routes extends Component {
  
  componentWillMount() {
    this.props.actions.connect_to_soc();
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
            {/* <NavBar />ter */}
            <Switch location={this.props.location}>
              {/* <Route exact path="/" component={LandingPage} />
              <Route exact path="/signin" component={signIn} />
              <Route exact path="/colorKey" component={colorKey} />
              <Route exact path="/whymatic" component={WhyMatic} />
              <Route exact path="/marketplace/:page" component={Marketplace} />
              <Route exact path="/marketplace" component={Marketplace} />
              <Route exact path="/wallet" component={Wallet} />
              <Route exact path="/activity" component={Activity} />
              <Route exact path="/addfund" component={AddFund} />
              <Route exact path="/maticcard" component={MaticCard} />
              <Route exact path="/mycard" component={MyCard} />
              <Route exact path="/maticnetwork" component={MaticNetwork} />
              <Route exact path="/myland" component={Address} />
              <Route exact path="/notpartofdesign" component={NotPartOfDesign}/> */}
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
