import { useState } from "react";
import  "./Modal.css";

export default function Modal(){
    const[isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        dob: "",
        phone: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.id]: ""
        });
    };

    const validate = () => {
        const newErrors = {};
        const { username, email, dob, phone } = formData;

        if (!username) newErrors.username = "Username is required.";
        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!email.includes("@")) {
            alert("Invalid email. Please check your email address.");
            return false;
        }
        if (!dob) {
            newErrors.dob = "Date of birth is required.";
        } else if (new Date(dob) > new Date()) {
            alert("Invalid date of birth. Date of birth cannot be in the future.");
            return false;
        }
        if (!phone) {
            newErrors.phone = "Phone number is required.";
        } else if (!/^\d{10}$/.test(phone)) {
            alert("Invalid phone number. Please enter a 10-digit phone number.");
            return false;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsOpen(false);
            setFormData({
                username: "",
                email: "",
                dob: "",
                phone: ""
            });
            setErrors({});
        }
    };

    const handleOutsideClick = (e) => {
        if (e.target.className === "modal") {
            setIsOpen(false);
        }
    };

    return (
        <div>
          <h1>User Details Modal</h1>
          <button onClick={() => setIsOpen(true)}>Open Form</button>

          {isOpen && (
            <div className="modal" onClick={handleOutsideClick}>
                <div className="modal-content">
                    <h1>Fill Details</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required  />
                        </div>

                        <div className="input-box">
                            <label htmlFor="email">Email Address:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}  />
                        </div> 

                        <div className="input-box">
                            <label htmlFor="phone">Phone Number:</label>
                            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange}  />
                        </div> 

                        <div className="input-box">
                            <label htmlFor="dob">Date of Birth:</label>
                            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange}  />
                        </div>

                        <button type="submit" className="submit-button">Submit</button>     
                    </form>
                </div>
            </div>

          )}

          

        </div>
      );
};