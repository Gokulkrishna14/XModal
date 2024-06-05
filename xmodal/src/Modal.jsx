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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const validate = () => {
        const { dob, phone } = formData;

        if (new Date(dob) > new Date()) {
            alert("Invalid date of birth. Date of birth cannot be in the future.");
            return false;
        }
        if (phone.trim().length !== 10) {
            alert("Invalid phone number. Please enter a 10-digit phone number.");
            return false;
        }

        return true;

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
          <button onClick={() => setIsOpen(true)} className="open-button">Open Form</button>

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
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required  />
                        </div> 

                        <div className="input-box">
                            <label htmlFor="phone">Phone Number:</label>
                            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required  />
                        </div> 

                        <div className="input-box">
                            <label htmlFor="dob">Date of Birth:</label>
                            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required  />
                        </div>

                        <button type="submit" className="submit-button">Submit</button>     
                    </form>
                </div>
            </div>

          )}

          

        </div>
      );
};