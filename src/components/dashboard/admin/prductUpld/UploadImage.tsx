import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { useUploadImageMutation } from "@/Redux/features/upload/uploadApi";

interface UploadImageProps {
  label: string;
  name: string;
  setImage: (image: string) => void;
}

export interface UploadImageRef {
  clearFile: () => void;
}

const UploadImage = forwardRef<
  UploadImageRef,
  UploadImageProps
>(({ label, name, setImage }, ref) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const [uploadImage] = useUploadImageMutation();

  const convertBase64 = (
    file: File
  ): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  const handleUploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoading(true);

      const base64 = await convertBase64(file);

      if (typeof base64 !== "string") return;

   const response = await uploadImage({
  image: base64,
    }).unwrap();

    setPreview(response.imageUrl);
 // Backend expects a single string
  setImage(response.imageUrl);

    } catch (error) {
      console.error("Image Upload Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    clearFile() {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setPreview("");
      setImage("");
    },
  }));

  return (
    <div className="space-y-3">
      <label
        htmlFor={name}
        className="block text-sm font-medium"
      >
        {label}
      </label>

      <input
        ref={fileInputRef}
        id={name}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleUploadImage}
        className="w-full rounded border p-2"
      />

      {loading && (
        <p className="text-sm text-blue-600">
          Uploading image...
        </p>
      )}

      {!loading && preview && (
        <img
          src={preview}
          alt="Preview"
          className="h-28 w-28 rounded border object-cover"
        />
      )}
    </div>
  );
});

UploadImage.displayName = "UploadImage";

export default UploadImage;