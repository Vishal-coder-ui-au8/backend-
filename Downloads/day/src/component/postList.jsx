import React from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';

const PostList = (props) => {
    const { posts } = props;
    return (
        <div>
            <ul>
                {
                    map(posts,(todo,idx)=>{
                        return (
                            <li key={idx}>
                                {todo.title}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      posts : state.posts,
    }
}

export default connect(mapStateToProps)(PostList);