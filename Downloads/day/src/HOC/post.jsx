import React, { Fragment } from 'react';
import PostList from '../component/postList';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { postAction } from '../redux/action';

class Posts extends React.Component {

    componentDidMount(){
        this.fetchPosts();
    }

    fetchPosts = () => {
        console.log('fetchPosts===>',this.props.posts);
        if(isEmpty(this.props.posts)) {
            this.props.postList();
        }
    }

    render(){
        return (
            <Fragment>
                <div>
                    <h2>Posts</h2>
                </div>
                <div>
                    <PostList />
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      posts : state.posts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postList: () => dispatch(postAction.fetchList())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Posts);