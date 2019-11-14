import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from "../../actions/actions";
import icons from '../../services/icon-service';
import './post.scss';
const Fa_back = icons['fa-arrow-left'];
const Fa_Link = icons['fa-external-link-alt'];

class Post extends Component {

    updateQuery = (ev) => {
        this.props.actions.query_update(ev.target.value);
    }

    goBack = () => {
        this.props.history.goBack();
    }

    keyPress = ev => {
        if (ev.key === 'Enter') {
            this.props.actions.query_search(this.props.soc, this.props.user.query);
        }
    }

    query_search = () => {
        this.props.actions.query_search(this.props.soc, this.props.user.query);
    }

    changeTag = (ev) => {
        let st = ev.currentTarget.getAttribute('data');
        st = st.toLowerCase().split(' ').join('-');
        console.log(st);

        this.props.actions.query_update(st);
        this.props.actions.query_search(this.props.soc, st);

    }

    tagsUI = (tag, indx) => (
        <button
            key={indx}
            data={tag.tag}
            onClick={this.changeTag}
            type="button"
            class="btn m-1 btn-light"
        >
            {tag.tag}
        </button>
    )

    render() {
        const { posts } = this.props.user;
        const { match } = this.props;
        const id = match && match.params && match.params.id
        const indx = posts.findIndex(e => e.id === id);
        console.log(id, 'id');
        if(indx<0) {
            return (
                <div className="main">
                    <h2>NO SUCH POST</h2>
                </div>
            )
        }
        const post = {...posts[indx]};
        
        return (
            <div className="main">
                <img src={post.imgURL} className='img-fluid' />
                <h2 className="card-title my-2">{post.title}</h2>
                <p className="my-1">
                    <span>Description - </span>
                    <span>{post.description}</span>
                </p>
                <p className="my-1">
                    <h>Author - </h>
                    <span>{post.author}</span>
                </p>
                <p className="my-1">
                    <span>Date - </span>
                    <span>{post.date}</span>
                </p>
                <p className="my-1">
                    <span>Reading time - </span>
                    <span>{post.readingTime}</span>
                </p>
                {
                    post.tags && <div className="d-flex mb-2 align-items-center flex-wrap"> <h3>Tags : </h3> {post.tags.map(this.tagsUI)} </div>
                }
                <a href={post.link} className="btn btn-info" target="_blank">Open on Medium <Fa_Link/></a>
                <button onClick={this.goBack} className="btn btn-dark ml-2"><Fa_back/> Back</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);