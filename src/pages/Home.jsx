import React from "react";
import { userCollection } from "../hooks/userCollection";
import { Link } from "react-router-dom";

const Home = () => {
  const { data: tasks } = userCollection("tasks");

  return (
    <Link to={"/recipes"} className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900"> Recipes</h1>
        </div>

        {!tasks || tasks.length === 0 ? (
          <p className="text-gray-600 text-center">No Recipes Found </p>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-6">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {task.title}
                </h2>
                <div className="p-4">
                  <p className="text-gray-700 mb-2 line-clamp-3">
                    {task.method || "No description provided."}
                  </p>

                  <p className="bg-gray-500  ">⏱ {task.cookingTime || "N/A"}</p>
                  {task.images && task.images.length > 0 && (
                    <img
                      src={task.images[0]}
                      alt={task.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
};

export default Home;
