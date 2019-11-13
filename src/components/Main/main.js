import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from "../../actions/actions";
import icons from '../../services/icon-service';
import './main.scss';

const Fa_Search = icons['fa-search'];

class Main extends Component {

    updateQuery = (ev) => {
        this.props.actions.query_update(ev.target.value);
    }

    keyPress = ev => {
        if(ev.key==='Enter') {
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

    cardUI = (post) => (
        <div className="card bg-light mb-3" key={post.id}>
            <img src={post.imgURL} className='img-fluid' />
            <div className='m-2'>
                <h4 className="card-title">{post.title}</h4>
                <p>{post.description}</p>
                <p className="m-0">Author : {post.author}</p>
                <p className="m-0">
                    <span>Date : </span>
                    <span>{post.date}</span>
                </p>
                <p className="m-0">
                    <span>Reading time : </span>
                    <span>{post.readingTime}</span>
                </p>
                {
                    post.tags && <p> Tags : {post.tags.map((t) => t.tag + ', ')} </p>
                }
                {post.loading 
                    ? <h3>LOADING MORE INFO....</h3> 
                    : <a href={post.link} type="button" className="btn btn-primary" target="_blank">Open post on medium</a>}
            </div>
        </div>
    )
    
    tagsUI = (tag, indx) => (
        <button 
            key={indx} 
            data={tag.tag}
            onClick={this.changeTag} 
            type="button" 
            class="btn btn-sm m-1 btn-light"
        >
            {tag.tag}
        </button>
    )

    render() {
        const {posts, related, query, loading }= this.props.user;
        return (
            <div className="main">
                <div class="form-group has-search">
                    <span class="form-control-feedback"><Fa_Search/></span>
                    <input 
                        type="text" 
                        value={query} 
                        onChange={this.updateQuery}
                        onKeyPress={this.keyPress} 
                        class="form-control" 
                        placeholder="Search" 
                    />
                </div>
                {
                    loading && <h2>LOADING......</h2>
                }
                {
                    related.length!==0 &&
                    <div className='my-4'>
                        <h3>Related Tags</h3>
                        <div className='d-flex flex-wrap'>
                            {related.map(this.tagsUI)}
                        </div>
                    </div>
                }
                {posts.map(this.cardUI)}
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
