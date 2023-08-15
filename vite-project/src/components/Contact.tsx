import React, { useState } from "react";
import "./Contact.css"; // Import the CSS file

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here, you can implement the logic to handle form submission, such as sending the form data to a server or performing any necessary actions.
    // You can access the form field values using the `name`, `email`, and `message` state variables.
    console.log("Form submitted!");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    // Clear form fields after submission
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-container">
      <h2 className="ji">Contact Here!</h2><br></br>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="fh">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="fh">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message" className="fh">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
