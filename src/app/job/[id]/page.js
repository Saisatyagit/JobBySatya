"use client";
import { useParams } from "next/navigation";
import ApplyForm from "@/app/apply/ApplyForm";

export default function JobPage() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Apply for Job</h1>
      {id && id.length === 24 ? (
        <ApplyForm jobId={id} />
      ) : (
        <p className="text-red-600">❌ Invalid or missing job ID in URL.</p>
      )}
    </div>
  );
}



