import SignUpForm from "./SignUp";

function Admin() {
  return (
    <div className="min-h-screen flex flex-col gap-2">
      <p className="text-3xl py-5 border-b  font-embed">Create new account</p>

      <div className="w-full flex justify-between gap-2 mt-2">
        <SignUpForm />

        <div className="hidden md:block w-1/2 mt-5 rounded-md">
          <img src="/welcome.svg" className="h-full w-full object-cover " />
        </div>
      </div>
    </div>
  );
}

export default Admin;
