"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

import { useDispatch } from "react-redux";
import { prompt_creating } from "@store/prompt/prompt.slice";

const CreatePrompt = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {data:session} = useSession();

  const [post, setpost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    dispatch(prompt_creating(true))
    try {
      const response = await fetch('/api/prompt/new',{
        method:"POST",
        body:JSON.stringify({
          prompt:post.prompt,
          userId:session?.user.id,
          tag:post.tag
        })
      });

      if(response.ok){
        router.push('/')
      }
    } catch (error) {
      console.log(error);

    }finally{
      dispatch(prompt_creating(false))
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setpost={setpost}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
