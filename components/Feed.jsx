"use client";

import { useState,useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({data,handleTagClick}) =>{

  return <div className="mt-16 prompt_layout">
    { !data.length ? <div>Loading...</div>: data.map((post)=> <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}  />)}
  </div>
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setsearchResult] = useState([]);
  const [timeoutId, seTtimeoutId] = useState(null);
  const [posts, setPosts] = useState([])


  const handleSearchChange = (e) =>{
    setSearchText(e.target.value);
  }

  useEffect(()=>{
    const fetchPosts = async () =>{
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  },[]);

  useEffect(()=>{
    if(posts.length){
      seTtimeoutId(prev=> setTimeout(()=>{
          const filteredPosts = posts.filter((post)=>{
            const {prompt,tag,username} = post;
            return  prompt?.includes(searchText) || tag?.includes(searchText) ||  username?.includes(searchText)
          });
          setsearchResult(filteredPosts);
      },1000));
    }
    return clearTimeout(timeoutId)
  },[posts,searchText])
  return (
    <scetion className="feed">
      <form action="" className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or a username"  value={searchText} onChange={handleSearchChange} required className="search_input peer"/>
      </form>
      <PromptCardList data={searchResult} handleTagClick={(tag)=>{setSearchText(tag)}} />
    </scetion>
  )
}

export default Feed