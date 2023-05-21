"use client";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
    const [posts, setPosts] = useState([]);
    const [loading,setLoading] = useState(false);
    const {data:session} = useSession();
    const router = useRouter();

    const handleEdit = (post) => {
          router.push(`/update-prompt?id=${post._id}`);
    }
    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure you want to delete this promt ?");

      if(hasConfirmed){
        try {
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method:"DELETE"
          });
          const filteredPost = posts.filter((p)=> p._id !== post._id);
          setPosts(filteredPost);
        } catch (error) {
          console.log(error)
        }
      }
    }

    useEffect(()=>{
        const fetchPosts = async () =>{
          setLoading(true);
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          setPosts(data);
          setLoading(false);
        }
       if(session?.user.id) fetchPosts();
      },[])
  return (
    <Profile name={"My"} loading={loading} desc="Welcome to your personalized page" data={posts} handleEdit={handleEdit} handleDelete={handleDelete}/>
  )
}

export default MyProfile