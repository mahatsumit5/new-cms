import SignUpForm from "./SignUp";

function Admin() {
  return (
    <div className="min-h-screen flex flex-col gap-5">
      <p className="text-3xl py-5 border-b  font-embed">Create new account</p>

      <div>
        <SignUpForm />
      </div>
    </div>
  );
}

export default Admin;
