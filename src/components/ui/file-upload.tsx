import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconUpload, IconX, IconQrcode, IconCopy, IconDownload } from "@tabler/icons-react";
import { useDropzone, FileRejection } from "react-dropzone";
import { createClient } from "@/lib/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

const supabase = createClient();

interface FileUploadProps {
  onChange?: (file: File | null) => void;
}

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const FileUpload: React.FC<FileUploadProps> = ({ onChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "complete" | "error">("idle");
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showQR, setShowQR] = useState<boolean>(true);

  const handleFileChange = (newFiles: File[]) => {
    setFile(newFiles[0]);
    onChange?.(newFiles[0]);
    setDownloadUrl("");
    setError("");
    setShowQR(true);
  };

  const handleUpload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (!file) {
        throw new Error('Please select a file first');
      }
    
      setUploadStatus("uploading");
      setError("");
    
      const timestamp = new Date().getTime();
      const randomString = Math.random().toString(36).substring(7);
      const fileExt = file.name.split('.').pop();
      const fileName = `${timestamp}-${randomString}.${fileExt}`;
      const filePath = `public/${fileName}`;
    
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });
    
      if (uploadError) {
        throw uploadError;
      }
    
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from("files")
        .getPublicUrl(filePath);
    
      // Check if urlData exists and set the download URL
      if (urlData) {
        setDownloadUrl(urlData.publicUrl);
      } else {
        setError('Failed to get public URL');
      }
    
      setUploadStatus("complete");
    
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Error uploading file');
      setUploadStatus("error");
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    onChange?.(null);
    setDownloadUrl("");
    setError("");
    setShowQR(false);
  };

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(downloadUrl);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const toggleQR = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowQR(!showQR);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: false,
    maxSize: 50 * 1024 * 1024,
    onDrop: handleFileChange,
    onDropRejected: (fileRejections: FileRejection[]) => {
      const error = fileRejections[0]?.errors[0]?.message || "File upload failed";
      setError(error);
    },
  });
  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        whileHover="animate"
        className="p-10 group/file block rounded-xl cursor-pointer w-full relative overflow-hidden"
      >
        <input
          {...getInputProps()}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-300 text-base">
            Upload file
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 text-base mt-2">
            Drag or drop your files here or click to upload
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {file ? (
              <div onClick={(e) => e.stopPropagation()}>
                <motion.div
                  key="file-upload"
                  layoutId="file-upload"
                  className={cn(
                    "relative overflow-hidden z-40 bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-sm"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-neutral-300 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm bg-neutral-800 text-white shadow-input"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>
                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-4 py-0.5 rounded-md bg-neutral-800"
                    >
                      {file.type}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                  <button
                    onClick={removeFile}
                    className="absolute top-0 right-0 text-green-500 hover:text-neutral-300"
                  >
                    <IconX className="w-5 h-5" />
                  </button>
                </motion.div>

                {!downloadUrl && (
                  <button 
                    onClick={handleUpload}
                    disabled={uploadStatus === "uploading"}
                    className="bg-green-500 text-black px-4 py-2 font-semibold rounded-lg mt-4 w-full hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadStatus === "uploading" ? "Uploading..." : "Upload"}
                  </button>
                )}

                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {downloadUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 space-y-4"
                  >
                    <div className="flex flex-col gap-4 p-4 bg-neutral-900 rounded-lg">
                      <div className="flex items-center justify-between">
                        <p className="text-neutral-300">Download Link:</p>
                        <div className="flex gap-2">
                          <button
                            onClick={copyToClipboard}
                            className="p-2 hover:bg-neutral-800 rounded-md transition-colors"
                          >
                            <IconCopy className="w-5 h-5 text-green-500" />
                          </button>
                          <button
                            onClick={toggleQR}
                            className="p-2 hover:bg-neutral-800 rounded-md transition-colors"
                          >
                            <IconQrcode className="w-5 h-5 text-green-500" />
                          </button>
                          <a
                            onClick={(e) => e.stopPropagation()}
                            href={downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-neutral-800 rounded-md transition-colors"
                          >
                            <IconDownload className="w-5 h-5 text-green-500" />
                          </a>
                        </div>
                      </div>
                      
                      <input
                        type="text"
                        value={downloadUrl}
                        readOnly
                        className="w-full bg-neutral-800 text-green-300 p-2 rounded-md text-sm"
                      />

                      {showQR && (
                        <div className="flex justify-center m-4">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(downloadUrl)}&color=42C773&bgcolor=000000`}
                            alt="QR Code"
                            className="w-48 h-48 rounded-3xl p-2 border-2 border-green-400"
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}
            {!file && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-green-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern(): JSX.Element {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-neutral-950"
                  : "bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}