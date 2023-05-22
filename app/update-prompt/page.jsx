"use client";

import { useEffect, useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import { useDispatch} from "react-redux";

import { prompt_creating } from "@store/prompt/prompt.slice";

import Form from "@components/Form";

const EditPrompt = () => {
  const dispatch = useDispatch();

  const router = useRouter();
const searchParams = useSearchParams();
const promptId = searchParams.get('id');

  const [post, setpost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(()=>{
    const getPomptDetails = async () =>{
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setpost({
            prompt:data.prompt,
            tag:data.tag
        })
    }
    if(promptId) getPomptDetails();
  },[promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    dispatch(prompt_creating(true));

    if(!promptId) return alert("Prompt ID not found!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`,{
        method:"PATCH",
        body:JSON.stringify({
          prompt:post.prompt,
          tag:post.tag
        })
      });

      if(response.ok){
        router.push('/')
      }
    } catch (error) {
      console.log(error);

    }finally{
      dispatch(prompt_creating(false));
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setpost={setpost}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
