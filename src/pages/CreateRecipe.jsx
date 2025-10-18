import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FormInput } from "../components/FormInput";
import FormTextArea from "../components/FromTextArea";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [method, setMethod] = useState("");

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (newIngredient.trim() !== "") {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (imageUrl.trim() !== "") {
      setImages([...images, imageUrl.trim()]);
      setImageUrl("");
    }
  };

  const handleKeyPress = (e, callback) => {
    if (e.key === "Enter") {
      e.preventDefault();
      callback(e);
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const henldeSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const cookingTime = formData.get("cookingTime");
    const method = formData.get("method");
    const task = {
      title,
      cookingTime,
      ingredients,
      images,
      method,
      comments: [],
    };
    await addDoc(collection(db, "tasks"), {
      ...task,
    }).then(() => {
      alert("Mofaqatli Qo'shildi!");
      navigate("/");
    });
  };

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Add New Recipe
        </h1>

        <Form
          method="post"
          onSubmit={henldeSubmit}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <FormInput
            label="Title:"
            name="title"
            type="text"
            placeholder="Enter your meal name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <FormInput
            label="Cooking time:"
            name="cookingTime"
            type="text"
            placeholder="Enter preparation time of your meal"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          />

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Ingredients:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="ingredients"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleAddIngredient)}
                placeholder="Enter ingredient"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                onClick={handleAddIngredient}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                +
              </button>
            </div>

            <ol className="mt-3 space-y-2">
              {ingredients.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    x
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Images:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="imges"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleAddImage)}
                placeholder="Enter image URL"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                onClick={handleAddImage}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                +
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              {images.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Recipe ${index}`}
                    className="rounded-lg w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <FormTextArea
            label="Method:"
            name="method"
            placeholder="Describe how to prepare this meal..."
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />

          <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4 ">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            >
              Preview
            </button>
          </div>
        </Form>
      </div>
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-2xl p-6 relative">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
            <p className="text-gray-600 text-center mb-2">
              ⏱ Cooking time: {cookingTime || "Not specified"}
            </p>

            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-3 my-4">
                {images.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt=""
                    className="rounded-lg h-32 w-full object-cover"
                  />
                ))}
              </div>
            )}

            <h3 className="font-semibold mt-4 mb-2">Ingredients:</h3>
            <ol className="list-disc list-inside text-gray-700">
              {ingredients.length > 0 ? (
                ingredients.map((ing, i) => <li key={i}>{ing}</li>)
              ) : (
                <p>No ingredients added.</p>
              )}
            </ol>

            <h3 className="font-semibold mt-4 mb-2">Method:</h3>
            <p className="text-gray-700 ">{method}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRecipe;
