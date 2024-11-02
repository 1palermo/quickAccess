"use client";
import React from "react";
import { FileUpload } from "@/components/ui/file-upload";

export default function FileUploadDemo() {

  return (
    <div className="w-full max-w-4xl mx-auto  border border-green-400/40 border-dashed rounded-2xl z-50">
      <FileUpload 
      onChange={(file) => console.log('File selected:', file)}
    />

    </div>
  );
}
