import React from "react";
import Upload from "@/components/upload";
import NavBar from "@/components/NavBar";
import PageTitle from "@/components/PageTitle";

const uploadPage = () => {
  return (
    <div>
      <main className="h-screen bg-cream">
        <NavBar />
        <PageTitle />
        <Upload />
      </main>
    </div>
  );
};

export default uploadPage;
