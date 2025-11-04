"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState(""); 

  async function fetchPosts() {
    try {
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addPost() {
    if (!content.trim()) return;
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }), // 👈 sending { content }
      });
      if (!res.ok) throw new Error("Failed to add post");
      setContent("");
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Welcome to CYBERIUM 🐦</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)} 
          placeholder="What's on your mind?"
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={addPost}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Post
        </button>
      </div>

      <div className="space-y-3">
        {posts.length === 0 && (
          <p className="text-gray-500 text-center">No posts yet 😅</p>
        )}
        {posts.map((post) => (
          <div
            key={post._id}
            className="border p-3 rounded shadow-sm bg-gray-50"
          >
            {post.content}
          </div>
        ))}
      </div>
    </main>
  );
}
