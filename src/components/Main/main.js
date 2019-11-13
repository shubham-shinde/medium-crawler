import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from "../../actions/actions";
import icons from '../../services/icon-service';
import './main.scss';

const Fa_Search = icons['fa-search'];

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query : ''
        }
    }

    updateQuery = (ev) => {
        if(ev.key==='Enter') {
            this.props.actions.query_search(this.props.soc, this.state.query);
            return;
        }
        this.setState({...this.state, query : ev.target.value});
    }

    query_search = () => {
        this.props.actions.query_search(this.props.soc, this.state.query);
    }

    render() {
        return (
            <div class="main">
                <div class="input-group">
                    <input type="text" onKeyPress={this.updateQuery} class="form-control" placeholder="Search this blog" />
                    <div class="input-group-append">
                    <button onClick={this.query_search} class="btn btn-secondary" type="button">
                        <Fa_Search/>
                    </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
