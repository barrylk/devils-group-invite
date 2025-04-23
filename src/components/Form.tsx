import { useState, useEffect } from "react";
import { sendToTelegram } from "../util/sendtotelegram";
import ThankYouModal from "./thankyoumodal";

const Form = () => {
  const [fullName, setFullName] = useState({ firstName: "", lastName: "" });
  const [age, setAge] = useState("");
  const [tgUsername, setTgUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch location when the component is mounted
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data to send to Telegram
    const formData = {
      fullName: `${fullName.firstName} ${fullName.lastName}`,
      age,
      tgUsername,
      phone,
      city,
      location,
    };

    sendToTelegram(formData).then(() => {
      setShowModal(true); // Show Thank You modal after submission
      // Reset the form
      setFullName({ firstName: "", lastName: "" });
      setAge("");
      setTgUsername("");
      setPhone("");
      setCity("");
      setLocation(null);
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Devil's Group Invitation</h2>

        <label className="form-label">Full Name:</label>
        <div className="name-inputs">
          <input
            type="text"
            placeholder="First Name"
            value={fullName.firstName}
            onChange={(e) =>
              setFullName({ ...fullName, firstName: e.target.value })
            }
            className="form-input"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={fullName.lastName}
            onChange={(e) =>
              setFullName({ ...fullName, lastName: e.target.value })
            }
            className="form-input"
            required
          />
        </div>

        <label className="form-label">Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="form-input"
          required
        />

        <label className="form-label">Telegram Username:</label>
        <input
          type="text"
          value={tgUsername}
          onChange={(e) => setTgUsername(e.target.value)}
          className="form-input"
          required
        />

        <label className="form-label">Phone Number:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-input"
          required
        />

        <label className="form-label">City/Town:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="form-input"
          required
        />

        {location && (
          <div className="location-info">
            <p>Location found: {location.latitude}, {location.longitude}</p>
          </div>
        )}

        {/* Conditionally render the submit button once location is available */}
        {location && (
          <button type="submit" className="submit-button">
            Submit
          </button>
        )}
      </form>

      {/* Show Thank You Modal */}
      {showModal && <ThankYouModal />}
    </div>
  );
};

export default Form;
