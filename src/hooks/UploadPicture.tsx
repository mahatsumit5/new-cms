import { UploadImageToS3Bucket } from "@/axios/axiosProcessor";

import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

function UploadPicture(
  form: UseFormReturn<
    {
      status: boolean;
      image: string;
      title: string;
      parentCategory: string;
    },
    undefined
  >
) {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string>("");
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file as Blob);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function uploadImageToS3Bucket() {
    if (!file || !preview) {
      toast.warning("Please select an image file");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    const pending = UploadImageToS3Bucket(formData);
    setProgress(0);
    const { status, message, Location } = await pending;

    if (status === "success") {
      setProgress(100);
      form.setValue("image", Location!);
      setImage(Location as string);
    }
    toast[status](message);
  }
  const FileComponent = ({ url }: { url: string }) => {
    return (
      <div className="flex flex-col gap-2">
        <Input
          id="picture"
          type="file"
          name="profile"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.length) {
              setFile(e.target.files[0]);
            }
          }}
          accept=".jpg,.avif,.png,.jpeg"
          className="hidden"
        />
        <label
          htmlFor="picture"
          className=" relative h-56 border rounded-xl flex justify-center items-center shadow-lg"
        >
          <img
            src={preview || url || "/image-upload.jpeg"}
            className="overflow-hidden rounded-md shadow-lg bg-cover h-full w-full object-cover absolute bg-white/25"
          />

          {!preview && (
            <span className="rounded-md bg-primary p-3 text-primary-foreground z-50 absolute hover:cursor-pointer hover:shadow-lg">
              Select Image +
            </span>
          )}
        </label>
        {preview && (
          <span
            className="rounded-md bg-primary p-3 text-primary-foreground z-50  text-center hover:cursor-pointer shadow-xl"
            onClick={uploadImageToS3Bucket}
          >
            Upload Image
          </span>
        )}
        <Progress value={progress} className="w-full" />
        <span className="text-muted-foreground text-sm ">
          Accepted file type .jpg,.png,.avif,.jpeg-Max 1mb
        </span>
      </div>
    );
  };
  return {
    image,
    UploadComponent: FileComponent,
  };
}

export default UploadPicture;
