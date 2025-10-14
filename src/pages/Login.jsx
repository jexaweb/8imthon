import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import { FormInput } from "../components/FormInput";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return data;
}

function Login() {
  const data = useActionData();
  console.log(data);
  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4 sm:px-6">
      <Form
        method="post"
        className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-xl shadow-md border border-purple-200"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
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

        {/* Login button */}
        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
        ></button>

        {/* Google login */}
        <button
          type="button"
          className="mt-3 w-full bg-gray-800 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Google
        </button>

        {/* Link to register */}
        <Link
          to="/register"
          className="block mt-4 w-full text-center bg-pink-500 text-white font-medium py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Create new account
        </Link>
      </Form>
    </div>
  );
}
export default Login;
