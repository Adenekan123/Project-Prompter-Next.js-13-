"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch,useSelector } from "react-redux";
import { prompts_fetch_pending,prompts_fetch_success } from "@store/prompt/prompt.slice";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const dispatch = useDispatch();
  const {isLoading,prompts} = useSelector((state)=> state.prompts)
  const searchParams = useSearchParams();

  const user = searchParams.get("name");
  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(prompts_fetch_pending())
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      dispatch(prompts_fetch_success(data));
      
    };
    if(params.id)fetchPosts();
  }, [params.id]);

  return (
    <>
      <Profile
        loading={isLoading}
        name={user}
        desc="Welcome to your personalized page"
        data={prompts}
      />
    </>
  );
};

export default UserProfile;
