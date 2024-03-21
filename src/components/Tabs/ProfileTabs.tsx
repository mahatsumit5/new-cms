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
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="flex flex-col gap-5 mt-8 md:w-[800px] ">
          <div className="bg-[#cadae0bd] h-28 flex justify-start gap-10 items-center rounded-md shadow-lg  px-4">
            <div className="flex  items-end">
              <span className=" relative bg-white rounded-full h-24 w-24">
                <img
                  src={preview || user.profile}
                  className="overflow-hidden rounded-full shadow-lg bg-cover h-24 w-24 object-cover"
                />
                <Label
                  htmlFor="profile"
                  className="p-2 absolute top-0 z-50 flex justify-center items-center bg-white rounded-full h-24 w-24 opacity-25 hover:opacity-75 transition-opacity"
                >
                  <TiPencil size={25} className="text-slate-500" />
                </Label>
              </span>{" "}
            </div>

            <h1 className=" md:text-2xl font-montserrat font-bold text-sm">
              Edit your account information
            </h1>
          </div>

          <EditAccount File={file} />
        </div>
      </TabsContent>
      <TabsContent value="password">
        <ChangePassword />
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
