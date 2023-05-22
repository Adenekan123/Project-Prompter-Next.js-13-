"use client";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch,useSelector } from "react-redux";
import { prompts_fetch_pending,prompts_fetch_success,prompts_fetch_failure ,prompt_delete} from "@store/prompt/prompt.slice";

import Profile from "@components/Profile";

const MyProfile = () => {
  const dispatch = useDispatch();
    const {data:session} = useSession();
    const router = useRouter();

    const {isLoading:loading,prompts:posts} = useSelector((state)=> state.prompts)

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
          dispatch(prompt_delete(post))
        } catch (error) {
          console.log(error)
        }
      }
    }

    useEffect(()=>{
        const fetchPosts = async () =>{
          dispatch(prompts_fetch_pending())
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          dispatch(prompts_fetch_success(data))

        }
       if(session?.user.id) fetchPosts();
      },[])
  return (
    <Profile name={"My"} loading={loading} desc="Welcome to your personalized page" data={posts} handleEdit={handleEdit} handleDelete={handleDelete}/>
  )
}

export default MyProfile