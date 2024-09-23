import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllPosts } from "@/utils/api";

const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(""); 
  
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await getAllPosts(""); 
        setPosts(response.data);
        setFilteredPosts(response.data); 
        
      } catch (error) {
       
      } finally {
        setLoading(false);
      }
    };
  
    const handleSearchChange = (e) => {
      const newSearch = e.target.value;
      setSearch(newSearch); 
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(newSearch.toLowerCase())
      );
      setFilteredPosts(filtered); 
    };
  
    useEffect(() => {
      fetchPosts(); 
    }, []);

    const getPostById = (id) => {
      
      return posts.find((post) => post._id === id); 
    };
  
    return (
      <PostsContext.Provider value={{ filteredPosts, loading, handleSearchChange, getPostById  }}>
        {children}
      </PostsContext.Provider>
    );
  };
  