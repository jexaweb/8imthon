import { Form, Link, useActionData } from "react-router-dom";
import { FormInput } from "../components/FormInput";
import { useRegister } from "../hooks/useRegister";
import { useEffect, useState } from "react";
import { formError } from "../components/Errorld";
import { useGoogle } from "../hooks/useGoogle";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

function Register() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { register, isPending, error: _error } = useRegister();
  const {
    googleProvider,
    isPending: isPendingGoogle,
    error: errorGoogle,
  } = useGoogle();
  useEffect(() => {
    if (user?.name && user?.photoURL && user?.email && user?.password) {
      register(user.name, user.photoURL, user.email, user.password);
      setError(false);
    } else {
      setError(user ? formError(user) : false);
    }
  }, [user]);
  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (_error) {
      alert(_error);
    }
  }, [_error]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <Form
        method="post"
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md border border-purple-200"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Signup
        </h2>
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">User name:</label>
            <FormInput type="text" name="name" placeholder="Name" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Photo URL:</label>
            <FormInput type="url" name="photoURL" placeholder="Photo URL" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <FormInput
              type="email"
              name="email"
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password:</label>
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
        </div>
        {!isPending ? (
          <button className="mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition">
            Register
          </button>
        ) : (
          <button
            disabled
            className="mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 rounded-lg opacity-80"
          >
            Loading...
          </button>
        )}
        {!isPendingGoogle && (
          <button
            onClick={googleProvider}
            type="button"
            className="mt-3 w-full bg-gray-800 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Google
          </button>
        )}
        {isPendingGoogle && (
          <button
            disabled
            type="button"
            className="mt-3 w-full bg-gray-800 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Loading...
          </button>
        )}
        <Link
          to="/login"
          className="block mt-4 w-full text-center bg-pink-500 text-white font-medium py-2 rounded-lg hover:bg-pink-600 transition"
        >
          I have an account
        </Link>
        <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
        <div>{_error && <p style={{ color: "red" }}>{_error}</p>}</div>
      </Form>
    </div>
  );
}

export default Register;
