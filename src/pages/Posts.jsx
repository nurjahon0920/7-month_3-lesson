import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR,
  PostContext,
} from "../context/postContext";
import StyledButton from "../components/shared/StyledButton";

const Posts = () => {
  const {
    blog: { loading, posts, error },
    dispatch,
  } = useContext(PostContext);

  const [formData, setFormData] = useState({
    id: "",
    firstname: "",
    lastname: "",
    group: "",
  });

  const [formError, setFormError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPosts = async () => {
    dispatch({ type: FETCH_POSTS_REQUEST });
    try {
      const res = await fetch("http://localhost:3000/users");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      dispatch({ type: FETCH_POSTS_SUCCESS, payload: data });
      setFilteredPosts(data); // Set initial filtered posts
    } catch (err) {
      dispatch({ type: FETCH_POSTS_ERROR, payload: err.message });
    }
  };

  const handleDelete = async (id) => {
    dispatch({ type: DELETE_POST_REQUEST });
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      dispatch({ type: DELETE_POST_SUCCESS, payload: id });
      setFilteredPosts(filteredPosts.filter((post) => post.id !== id)); // Update filtered posts
    } catch (err) {
      dispatch({ type: DELETE_POST_ERROR, payload: err.message });
      console.error("Error occurred:", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (
      !formData.id ||
      !formData.firstname ||
      !formData.lastname ||
      !formData.group
    ) {
      setFormError("All fields are required.");
      return;
    }
    dispatch({ type: ADD_POST_REQUEST });
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const newPost = await res.json();
      dispatch({ type: ADD_POST_SUCCESS, payload: newPost });
      setFormData({
        id: "",
        firstname: "",
        lastname: "",
        group: "",
      });
      setFormError("");
      setFilteredPosts([...filteredPosts, newPost]); // Update filtered posts
    } catch (err) {
      dispatch({ type: ADD_POST_ERROR, payload: err.message });
      console.error("Error occurred:", err);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredPosts(
      posts.filter(
        (post) =>
          post.firstname.toLowerCase().includes(value.toLowerCase()) ||
          post.lastname.toLowerCase().includes(value.toLowerCase()) ||
          post.group.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="container py-5">
      <form onSubmit={handleAdd} className="login_form">
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={formData.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="group"
          placeholder="Group"
          value={formData.group}
          onChange={handleChange}
        />
        {formError && <p style={{ color: "red" }}>{formError}</p>}
        <StyledButton type="submit">Add</StyledButton>
      </form>

      <div className="mt-4">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search..."
          onChange={handleSearch}
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {filteredPosts.map((post) => (
        <div key={post.id} className="card">
          <div>
            <h3>ID: {post.id}</h3>
            <p>First Name: {post.firstname}</p>
            <p>Last Name: {post.lastname}</p>
            <p>Group: {post.group}</p>
          </div>
          <StyledButton onClick={() => handleDelete(post.id)}>
            Delete
          </StyledButton>
        </div>
      ))}
    </div>
  );
};

export default Posts;
