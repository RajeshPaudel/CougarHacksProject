// src/components/FeedbackForm.jsx
import React, { useState } from "react";
import { db } from "../../../firebase"; // ← import Firestore
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../css/feedback.css";

export default function FeedbackForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "feedback"), {
        name: form.name,
        email: form.email,
        msg: form.msg,
        sentAt: serverTimestamp(),
      });
      setSent(true);
    } catch (err) {
      console.error("Error saving feedback:", err);
      alert("Something went wrong—please try again later.");
    }
  };

  return (
    <section id="contact" className="feedback-wrapper">
      {sent ? (
        <div className="feedback-thanks">
          <h3>Thanks, {form.name || "there"}!</h3>
          <p>
            We’ll get back to you within{" "}
            <strong>2&nbsp;–&nbsp;3&nbsp;hours</strong>.
          </p>
        </div>
      ) : (
        <form className="feedback-form" onSubmit={handleSubmit}>
          <h3>Send us feedback</h3>

          <input
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Your e-mail"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="msg"
            rows="4"
            placeholder="Your message"
            value={form.msg}
            onChange={handleChange}
            required
          />

          <button type="submit">Send</button>
        </form>
      )}
    </section>
  );
}
