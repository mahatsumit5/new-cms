import { IoIosEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

export function ViewPassword({
  showPassword,
  togglePasswordVisibility,
}: {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}) {
  return (
    <span className="absolute right-2 top-8 cursor-pointer ">
      <>
        {!showPassword ? (
          <IoMdEye
            size={20}
            onClick={togglePasswordVisibility}
            className="text-white dark:text-black"
          />
        ) : (
          <IoIosEyeOff
            size={20}
            className="text-white dark:text-black"
            onClick={togglePasswordVisibility}
          />
        )}
      </>
    </span>
  );
}
