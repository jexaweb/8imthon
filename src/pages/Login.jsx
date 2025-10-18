import { Form, Link, useActionData } from "react-router-dom";
import { FormInput } from "../components/FormInput";
import { useLogin } from "../hooks/useLogin";
import { useEffect, useState } from "react";
import { formError } from "../components/Errorld";
import { useGoogle } from "../hooks/useGoogle";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

function Login() {
  const {
    googleProvider,
    isPending: isPendingGoogle,
    error: errorGoogle,
  } = useGoogle();
  const { _login, error: _error, isPending } = useLogin();
  const user = useActionData();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email && user?.password) {
      _login(user.email, user.password);
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
    <div className="flex justify-center items-center min-h-screen bg-white px-4 sm:px-6">
      <Form
        method="post"
        className="w-full max-w-sm bg-gray-600 p-6 sm:p-8 rounded-xl shadow-md border border-purple-200"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-center  mb-6">
          Login
        </h2>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <FormInput
              type="email"
              name="email"
              placeholder="example@email.com"
              required
              className="w-full border border-purple-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password:</label>
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full border border-purple-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {!isPending ? (
          <button className="mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition">
            Login
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
          to="/register"
          className="block mt-4 w-full text-center bg-pink-500 text-white font-medium py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Create new account
        </Link>
        <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
        <div>{_error && <p style={{ color: "red" }}>{_error}</p>}</div>
      </Form>
    </div>
  );
}

export default Login;
