import altogic from "../altogic";
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

const BlogList = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); 
  const [blogs, setBlogs] = useState([]);

  const createBlogPost = async (event) =>  {
    event.preventDefault();
    const result = await altogic.db.model("blogs").object().create(
      {
        title:title,
        content:content,
      });
      setBlogs([...blogs, result.data]);
      setTitle("");
      setContent("");
  }

  useEffect(() => {
    const getBlocks = async () => {
      const result = await altogic.db.model("blogs").get();
      if(!result.errors){
        setBlogs(result.data);
      }
    }
    getBlocks();
  }, [])


  return (
  <>
  <div className="justify-center flex mb-5">
    <div className="border rounded p-3 w-96 my-4 bg-white">
      <form onSubmit={createBlogPost} className="text-left">
        <div>
        <label className="text-xs">Blog Title</label>
        <div>
          <input 
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="border rounded mb-2 text-sm w-full p-1"
          />
          </div>
          <div>
          <label className="text-xs">Blog Content</label>
        <div>
          <textarea value={content} onChange={(e) => {setContent(e.target.value)}}
          className="border rounded mb-2 text-sm w-full p-1"
          />
        </div>
        </div>
          </div>
       
        
        <button type="submit" disabled={title === ""} className="text-sm bg-blue-600 p-1 rounded text-white w-full">Create Blog Post</button>
      </form>
    </div>
    </div>
    <h2>Blog Posts</h2>
    <div className="grid grid-cols-3 m-3 px-12">
    {
      blogs ? blogs.map(
        (blog) => {
          return(
            <div key={blog._id } className="border rounded p-3 m-1 bg-white">
              <Link to={`/blog/${blog._id}`}>
                <div className="text-sm truncate">{blog.title}</div>
                <div className="text-xs truncate text-gray-400">{blog.content}</div>
                <div className="text-right text-xs my-1 text-gray-400">{blog.createdAt}</div>
              </Link>
            </div>
          ) 
        }
      ) : null
    }
    </div>

  </>
  );
}

export default BlogList