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
  <div>
    <div>
      <form onSubmit={createBlogPost}>
        <label>Blog Title</label>
        <div>
          <input value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>
        <label>Blog Content</label>
        <div>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}/>
        </div>
        <button type="submit" disabled={title === ""}>Create Blog Post</button>
      </form>
    </div>
    <h2>Blog Posts</h2>
    {
      blogs ? blogs.map(
        (blog) => {
          return(
            <div>
              <Link to={`/blog/${blog._id}`}>
                <div>{blog.title}</div>
                <div>{blog.content}</div>
                <div>{blog.createdAt}</div>
              </Link>
            </div>
          ) 
        }
      ) : null
    }
  </div>
  );
}

export default BlogList