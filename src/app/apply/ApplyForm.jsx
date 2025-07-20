"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplyForm({ jobId }) {
  const [form, setForm] = useState({ name: "", email: "", resume: null });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.resume) {
      setMessage("❌ Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("resume", form.resume);
    formData.append("jobId", jobId);

    const res = await fetch("/api/apply", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      router.push(`/status`);
    } else {
      setMessage("❌ Failed to apply");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setForm({ ...form, resume: e.target.files[0] })}
        required
      />
      <button type="submit">Apply</button>
      <p>{message}</p>
    </form>
  );
}




