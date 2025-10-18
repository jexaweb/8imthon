import React from "react";
import { userCollection } from "../hooks/userCollection";
import { Link } from "react-router-dom";

function Recipes() {
  const { data: tasks } = userCollection("tasks");

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 ">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold ">Recipes elements</h1>
        </div>

        {!tasks || tasks.length === 0 ? (
          <p className=" text-center">No Recipes Found </p>
        ) : (
          <div>
            {tasks.map((task, index) => (
              <article key={task.id || index}>
                {task.images && task.images.length > 0 ? (
                  <div className="grid lg:grid-cols-4  md:grid-cols-3  sm:grid-cols-2 gap-2 bg-gray-800 px-1 py-1">
                    {task.images.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`${task.title} ${i + 1}`}
                        className=" flex"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                <div className="p-4">
                  <h2 className="text-xl font-semibold  mb-2">{task.title}</h2>
                  method:
                  <p className=" mb-2 line-clamp-3">
                    {task.method || "No method provided."}
                  </p>
                  <p className="text-sm">
                    <span className=" font-bold mr-1">⏱ Cooking Time:</span>
                    {task.cookingTime || "N/A"}
                  </p>
                  {task.ingredients && task.ingredients.length > 0 && (
                    <div className="mt-3  flex gap-1.5    ">
                      <span className="text-3xl">ingredients:</span>
                      {task.ingredients.slice(0, 10).map((ing, i) => (
                        <span
                          key={`${task.id || index}-ing-${i}`}
                          className="block bg-gray-600  items-center w-13   h-7 mt-2 rounded text-white"
                        >
                          {ing}
                        </span>
                      ))}
                      {task.ingredients.length > 10 && (
                        <span
                          key={`${task.id || index}-more`}
                          className="block   "
                        ></span>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="flex   mb-4">
          <Link
            className="bg-gray-600 text-white text-2xl px-4 py-2 rounded hover:bg-gray-700 transition-colors items-end"
            to="/"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Recipes;
