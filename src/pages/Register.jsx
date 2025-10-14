import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import { FormInput } from "../components/FormInput";
import { useRegister } from "../hooks/useRegister";
import { useEffect, useState } from "react";
import { formError } from "../components/Errorld";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return data;
}

function Register() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { register, isPending, error: _error } = useRegister();

  useEffect(() => {
    if (user?.name && user?.url && user?.email && user?.password) {
      register(user.name, user.url, user.email, user.password);
      setError(false);
    } else {
      setError(user ? formError(user) : false);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <Form
        method="post"
        // onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md border border-purple-200"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Signup
        </h2>

        {/* {error && <p className="text-red-500 text-sm mb-3">{error}</p>} */}

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">User name:</label>
            <FormInput
              type="text"
              name="name"
              // value={form.name}
              // onChange={handleChange}
              placeholder="User name"
              required
              className="w-full border border-purple-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo URL:</label>
            <FormInput
              type="text"
              name="photoURL"
              // value={form.photoURL}
              // onChange={handleChange}
              placeholder="Photo URL"
              className="w-full border border-purple-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <FormInput
              type="email"
              name="email"
              // value={form.email}
              // onChange={handleChange}
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
              // value={form.password}
              // onChange={handleChange}
              placeholder="Password"
              required
              className="w-full border border-purple-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Signup button */}
        {!isPending && (
          <button
            // disabled={loading}
            className="mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
          >
            Register
          </button>
        )}

        {isPending && (
          <button
            disabled
            // disabled={loading}
            className="mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
          >
            loading...
          </button>
        )}
        {/* Google button */}
        <button
          type="button"
          // onClick={handleGoogleSignup}
          className="mt-3 w-full bg-gray-800 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Google
        </button>

        {/* Link to login */}
        <Link
          to="/login"
          className="block mt-4 w-full text-center bg-pink-500 text-white font-medium py-2 rounded-lg hover:bg-pink-600 transition"
        >
          I have an account
        </Link>
      </Form>
      <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
      <div>{_error && <p style={{ color: "red" }}>{_error}</p>}</div>
    </div>
  );
}
export default Register;
