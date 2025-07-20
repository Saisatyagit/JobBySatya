
import React from "react";
import Index from './components';
import JobCollections from './components/JobCollections';

function Page() {
  return (
    <div
      className="min-vh-100 py-4 px-2 d-flex justify-content-center align-items-start"
      style={{
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        color: "white",
      }}
    >
      <div className="container">
        {/* Responsive Glassmorphism Card */}
        <div
          className="p-4 rounded-4 shadow-lg"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <div className="row">
            <div className="col-12">
              <Index />
            </div>

            <hr className="my-4 border-light" />

            <div className="col-12">
              <JobCollections />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;



