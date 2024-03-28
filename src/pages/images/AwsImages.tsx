import { Button } from "@/components/ui/button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { deleteAwsImageAction } from "@/Action/images.action";
import { useSearchParams } from "react-router-dom";

const AwsImages = () => {
  const { images } = useAppSelector((store) => store.awsImages);

  return (
    <div className="flex  flex-col justify-between w-full gap-10">
      <div className="flex flex-wrap gap-2 justify-center">
        {images.map((item) => {
          return (
            <>
              <ImageCard image={item.Key} key={item.Key} />
            </>
          );
        })}
      </div>
      <div className="w-full flex justify-end gap-2">
        <Button variant={"outline"}>
          <IoIosArrowBack />
          Prev
        </Button>
        <Button variant={"outline"}>
          Next <IoIosArrowForward />
        </Button>
      </div>
    </div>
  );
};

function ImageCard({ image }: { image: string }) {
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();

  const [selectedImages, setSelected] = useState<string[]>([]);
  function handleSelected(key: string) {
    setSelected([key]);
  }

  function handleRemove(key: string) {
    setSelected((prev) => prev.filter((i) => i !== key));
  }

  async function handleDelete(key: string) {
    const limit = Number(params.get("limit"));
    dispatch(deleteAwsImageAction(key, limit));
  }

  return (
    <div className="relative h-40 w-40  md:h-52 md:w-48 rounded-lg shadow-md border lg:w-64 lg:h-72">
      <img
        src={import.meta.env.VITE_AWS_BUCKET_LINK + image}
        className="object-cover overflow-hidden h-40 w-40 rounded-lg  md:h-52 md:w-48 lg:w-64 lg:h-72"
        loading="lazy"
      />
      <div className="h-40 w-40  md:h-52 md:w-48 rounded-lg shadow-md border lg:w-64 lg:h-72 absolute top-0 hover:bg-black/25 hover:backdrop-blur-md flex gap-3 bg-white/5 justify-center items-center opacity-0 hover:opacity-95">
        {selectedImages.includes(image) ? (
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              handleRemove(image);
            }}
          >
            <RxCross2 size={35} color="red" />
          </Button>
        ) : (
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              handleSelected(image);
            }}
          >
            <IoCheckmarkCircleOutline size={35} />
          </Button>
        )}

        <Button
          size={"icon"}
          variant={"destructive"}
          onClick={() => {
            handleDelete(image);
          }}
        >
          <AiOutlineDelete />
        </Button>
      </div>
    </div>
  );
}

export default AwsImages;
