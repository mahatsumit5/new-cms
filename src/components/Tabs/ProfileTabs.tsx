import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePassword from "../profile/ChangePassword";
import EditAccount from "../profile/EditAccount";
import { useAppSelector } from "@/hooks";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { TiPencil } from "react-icons/ti";
export function ProfileTabs() {
  const { user } = useAppSelector((store) => store.userInfo);
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>("");
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file as Blob);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  return (
    <Tabs defaultValue="account" className="">
      <TabsList className="grid w-full grid-cols-2 bg-primary text-white">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="w-full flex justify-between gap-2 mt-5">
          <div className="flex flex-col gap-5 mt-8 md:w-1/2 w-full">
            <div className="bg-secondary py-5  flex flex-col-reverse md:flex-row justify-start gap-5 md:gap-10 items-center rounded-md shadow-lg  px-4   ">
              <div className="flex  items-end">
                <span className=" relative bg-white rounded-full h-40 w-40">
                  <img
                    src={preview || user.profile}
                    className="overflow-hidden rounded-full shadow-lg bg-cover h-40 w-40 object-cover"
                  />
                  <Label
                    htmlFor="profile"
                    className="p-2 absolute top-0 z-50 flex justify-center items-center bg-white rounded-full h-40 w-40 opacity-25 hover:opacity-75 transition-opacity"
                  >
                    <TiPencil size={25} className="text-slate-500" />
                  </Label>
                </span>{" "}
              </div>

              <h1 className=" text-2xl font-embed font-bold ">
                Edit your account information
              </h1>
            </div>

            <EditAccount File={file} />
          </div>
          <div className="hidden md:block w-1/2 mt-5 rounded-md">
            <img src="/edit.svg" className="h-full w-full object-cover " />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="password" className="flex justify-end">
        <div className="w-full flex justify-between gap-2 mt-10">
          <div className="hidden md:block w-1/2 mt-5 rounded-md">
            <img src="/password.svg" className="h-full w-full object-cover " />
          </div>
          <ChangePassword />
        </div>
      </TabsContent>{" "}
      <Input
        type="file"
        id="profile"
        className="hidden"
        onChange={(e) => {
          const { files } = e.target;
          setFile(files ? (files[0] as File) : undefined);
        }}
      />
    </Tabs>
  );
}
