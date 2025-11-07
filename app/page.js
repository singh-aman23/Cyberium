"use client";

import { useEffect, useState } from "react";
import styles from "./Home.module.css";

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
        body: JSON.stringify({ content }),
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
    <main className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.gridOverlay}></div>

      <h1 className={styles.title}> WELCOME TO THE CYBERIUM</h1>

      <div className={styles.inputBox}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Transmit your thought..."
          className={styles.input}
        />
        <button onClick={addPost} className={styles.button}>
          Transmit
        </button>
      </div>

      <div className={styles.posts}>
        {posts.length === 0 ? (
          <p className={styles.noPosts}>No transmissions yet...</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className={styles.postCard}>
              {post.content}
            </div>
          ))
        )}
      </div>

      <p className={styles.footer}>
        MADE BY  <span>AMANDEEP SINGH</span>
      </p>
    </main>
  );
}
