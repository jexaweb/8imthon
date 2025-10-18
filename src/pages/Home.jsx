import React from "react";
import { userCollection } from "../hooks/userCollection";
import { Link } from "react-router-dom";

const Home = () => {
  const { data: tasks } = userCollection("tasks");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold "> Recipes</h1>
        </div>

        {!tasks || tasks.length === 0 ? (
          <p className="text-gray-600 text-center">No Recipes Found </p>
        ) : (
          <ul className="grid sm:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-4">
                  <Link to={"/recipes"}>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {task.title}
                    </h2>
                    <p className="text-gray-700 mb-2 line-clamp-3">
                      {task.method || "No description provided."}
                    </p>
                    <div className="mb-5 flex gap-5 justify-end">
                      {" "}
                      <p className="bg-orange-400  w-30 h-7 ">
                        ⏱ {task.cookingTime}
                      </p>
                      <h3 className="bg-cyan-700 w-11 h-7 ">!NEW</h3>
                    </div>
                    {task.images && task.images.length > 0 && (
                      <img
                        src={task.images[0]}
                        alt={task.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
