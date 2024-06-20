

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <input type="button" onClick={() => onRemove(url)}  className="bg-red-1 text-white">
                delete
              </input>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>

      <CldUploadWidget uploadPreset="x2uckqjw" onUpload={onUpload}>
        {({ open }) => {
          return (
            <input type="button" onClick={() => open()} className="bg-grey-1 text-white">
              
              Upload Image
            </input>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;














