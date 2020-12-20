import React, { useState } from 'react'
import EachBlog from './EachBlog'

const Blog = ({ blog, addLikes, handleDelete, user }) => {
  const [toggleButton, setToggleButton] = useState(false)

  const button = () => {
    setToggleButton(!toggleButton)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} written by {blog.author}
      {toggleButton ? (
        <div>
          <button onClick={button}>Hide</button>
          <EachBlog blog={blog} addLikes={addLikes} user={user} handleDelete={handleDelete} />
        </div>
      ) : (
        <button onClick={button}>Show</button>
      )}
    </div>
  )
}

export default Blog
