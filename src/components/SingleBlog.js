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
  return <div className="text-left p-2 lg:mx-64">
    <Link to="/" className="text-blue-600">Back to Blogs</Link>
    {
      blog ? (
        <div className="text-sm mt-5 text-center">
          <h2 className="text-xl my-2">{blog.title}</h2>
          <div>
            <div className="text-gray-400">{blog.content}</div>
          </div>
          <div className="text-xs">{blog.createdAt}</div>
        </div>
      ) : null
    }
  </div>;
}

export default SingleBlog