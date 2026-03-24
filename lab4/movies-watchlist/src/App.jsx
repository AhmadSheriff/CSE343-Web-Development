import React, { useState } from "react";

export default function MoviesWatchListApp() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const addMovie = () => {
    if (!title) return;

    const newMovie = {
      id: Date.now(),
      title,
      comment,
      rating,
    };

    setMovies([...movies, newMovie]);
    setTitle("");
    setComment("");
    setRating(0);
  };

  const removeMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const renderStars = (count) => {
    return "⭐".repeat(count);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #4f46e5, #9333ea)",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "36px",
          marginBottom: "20px",
        }}
      >
        🎬 Movies Watch List
      </h1>

      {/* Form */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          maxWidth: "500px",
          margin: "0 auto 20px auto",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <input
          type="text"
          placeholder="Enter movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            fontSize: "16px",
          }}
        />

        <textarea
          placeholder="Write your review comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            fontSize: "16px",
          }}
        />

        <div style={{ marginBottom: "10px" }}>
          <p style={{ fontWeight: "bold" }}>Rate the movie:</p>
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onClick={() => setRating(num)}
              style={{
                fontSize: "28px",
                cursor: "pointer",
                marginRight: "5px",
              }}
            >
              {num <= rating ? "⭐" : "☆"}
            </span>
          ))}
        </div>

        <button
          onClick={addMovie}
          style={{
            width: "100%",
            padding: "12px",
            background: "#4f46e5",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add Movie
        </button>
      </div>

      {/* Movies List */}
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        {movies.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "white",
              fontSize: "18px",
            }}
          >
            No movies added yet 🍿
          </p>
        )}

        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: "#111",
                  fontSize: "22px",
                  fontWeight: "bold",
                  letterSpacing: "0.5px"
                }}
              >
                🎬 {movie.title}
              </h2>
              <p style={{ margin: "5px 0" }}>💬 {movie.comment}</p>
              <p style={{ fontSize: "18px" }}>
                {renderStars(movie.rating)}
              </p>
            </div>

            <button
              onClick={() => removeMovie(movie.id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 10px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
