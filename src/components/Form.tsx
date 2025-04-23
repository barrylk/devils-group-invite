import React, { useState } from "react";
import sendToTelegram from "../utils/sendToTelegram";

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    tgUsername: "",
    phoneNumber: "",
    city: "",
    location: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.age || !formData.tgUsername || !formData.phoneNumber || !formData.city) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Send data to Telegram
      await sendToTelegram(formData);

      setIsSubmitted(true);
      setTimeout(() => {
        window.location.href = "https://t.me/your_telegram_group_link"; // Redirect to your Telegram group
      }, 2000);
    } catch (error) {
      console.error("Error submitting form", error);
      setIsSubmitting(false);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prevData) => ({
            ...prevData,
            location: `https://www.google.com/maps?q=${latitude},${longitude}`,
          }));
        },
        (error) => {
          alert("Unable to retrieve location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSubmitted ? (
        <div className="text-center text-xl text-green-500">Thank you for your collaboration!</div>
      ) : (
        <>
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="input"
              placeholder="First and Last Name"
              required
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-semibold">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="input"
              placeholder="Your Age"
              required
            />
          </div>

          <div>
            <label htmlFor="tgUsername" className="block text-sm font-semibold">Telegram Username</label>
            <input
              type="text"
              id="tgUsername"
              name="tgUsername"
              value={formData.tgUsername}
              onChange={handleInputChange}
              className="input"
              placeholder="Your Telegram Username"
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="input"
              placeholder="Your Phone Number"
              required
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-semibold">City/Town</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="input"
              placeholder="Your City/Town"
              required
            />
          </div>

          <button
            type="button"
            onClick={getLocation}
            className="btn"
          >
            Get My Location
          </button>

          <div className="mt-4">
            <button
              type="submit"
              className="btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default Form;
