import SignInForm from "@/components/SignInForm/SignInForm";
import img from "/sign-in.svg";
const SignIn = () => {
  return (
    <div className="flex justify-between  bg-cover w-full">
      <div className="w-full md:w-1/2  md:bg-none bg-secondary ">
        <SignInForm />
      </div>
      <div className=" hidden md:block w-1/2">
        <img src={img} className="h-full object-cover" />
      </div>
    </div>
  );
};

export default SignIn;
