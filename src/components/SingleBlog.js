import altogic from "../altogic";
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const SingleBlog = () => {
  const {id} = useParams();
  const [blog, setBlog] = useState();

  useEffect(() => {
    const getBlog = async () => {
      const result = await altogic.db.model("blogs").object(id).get();
      if(!result.errors){
        setBlog(result.data);
      }
    };
    getBlog();
  }, [])
  return <div>
    <Link to="/">Back to Blogs</Link>
    {
      blog ? (
        <div>
          <h2>{blog.title}</h2>
          <div>
            <div>{blog.content}</div>
          </div>
          <div>{blog.createdAt}</div>
        </div>
      ) : null
    }
  </div>;
}

export default SingleBlog