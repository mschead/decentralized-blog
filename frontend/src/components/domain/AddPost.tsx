"use client";

import Button from "@/components/common/Button";
import MarkdownEditor from "@/components/common/MarkdownEditor";
import useAddPost from "@/hooks/useAddPost";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const initMarkdownContent = `---
title: 'title'
thumb: https://static.significados.com.br/foto/blog-og.jpg
date: '2021-09-22'
tags:
  - nextjs
---
`;

const AddPost = () => {
  const [currentContent, setCurrentContent] = useState(initMarkdownContent);
  const router = useRouter();
  const { isLoading, addPost } = useAddPost();

  const onChange = (data: { text: string }) => {
    setCurrentContent(data.text);
  };

  const onSaveClick = async () => {
    try {
      await addPost(currentContent);
      router.push("/");
      toast.success("Post created!");
    } catch (err) {
      toast.error("Error creating post!");
    }
  };

  return (
    <>
      <div
        style={{ maxWidth: "100%" }}
        className="prose flex justify-between mb-4"
      >
        <h1 style={{ marginBottom: 0 }}>Add post</h1>
        <Button
          className="btn-primary"
          isLoading={isLoading}
          onClick={onSaveClick}
        >
          Save
        </Button>
      </div>
      <MarkdownEditor
        readOnly={isLoading}
        value={currentContent}
        onChange={onChange}
      />
    </>
  );
};

export default AddPost;
