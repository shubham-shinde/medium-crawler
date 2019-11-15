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


    responsesUI = (resp) => (
        <div className="card bg-light mb-3" key={resp.id}>
            <div className='m-2'>
                <h3 className="card-title mb-3">{resp.name}</h3>
                <p className="m-0">{resp.content}</p>
            </div>
        </div>
    )

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
            <div className="main overflow-hidden">
                <img src={post.imgURL} className='img-fluid' />
                <h1 className="card-title my-2">{post.title}</h1>
                <div className='d-flex justify-content-end'>
                    <button onClick={this.goBack} className="btn btn-dark mr-2"><Fa_back/> Back</button>
                    <a href={post.link} className="btn btn-info" target="_blank">Open on Medium <Fa_Link/></a>
                </div>
                <h4 className="my-1">
                    <span>Description - </span>
                    <span>{post.description}</span>
                </h4>
                <h3 className="my-1">
                    <h>Author - </h>
                    <span>{post.author}</span>
                </h3>
                <p className="my-1">
                    <span>Date - </span>
                    <span>{post.date}</span>
                </p>
                <p className="my-1">
                    <span>Reading time - </span>
                    <span>{post.readingTime}</span>
                </p>
                {
                    post.tags && <div className="d-flex mb-2 align-items-center flex-wrap"> <h4>Tags : </h4> {post.tags.map(this.tagsUI)} </div>
                }
                <p className="post-text" dangerouslySetInnerHTML={{__html: post.post}} />
                <div className='d-flex justify-content-between'>
                    <button onClick={this.goBack} className="btn btn-dark ml-2"><Fa_back/> Back</button>
                    <a href={post.link} className="btn btn-info" target="_blank">Open on Medium <Fa_Link/></a>
                </div>
                {
                    post.responses.length!==0 && 
                    <div>
                        <h1 className="mt-5">Responses</h1>
                        {post.responses.map(this.responsesUI)}
                        <div className='d-flex justify-content-between'>
                            <button onClick={this.goBack} className="btn btn-dark ml-2"><Fa_back/> Back</button>
                            <a href={post.link} className="btn btn-info" target="_blank">Open on Medium <Fa_Link/></a>
                        </div>  
                    </div>                  
                }
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
