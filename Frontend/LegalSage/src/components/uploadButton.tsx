import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useRef } from "react";

interface UploadButtonProps {
  onSuccess?: () => void;
}

export function UploadButton({ onSuccess }: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert("Upload failed: " + result.detail);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong.");
    }

    if (onSuccess) onSuccess()
  };

  return (
    <>
      <input
        type="file"
        accept=".pdf,.docx,.txt"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        variant="default"
        className="bg-blue-600 hover:bg-blue-700 text-white ml-auto"
        onClick={handleClick}
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload
      </Button>
    </>
  );
}
