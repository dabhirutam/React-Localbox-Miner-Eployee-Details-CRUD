import { useEffect, useState } from 'react';
import './EmployeeTable.css';

const getData = () => {
    const result = localStorage.getItem('Details');
    return result ? JSON.parse(result) : [];
};

const EmployeeTable = () => {

    const [formInput, setFormInput] = useState({
        id: '',
        fname: '',
        lname: '',
        email: '',
        contact: '',
        dob: '',
        designation: '',
        course: '',
        address: ''
    });
    const [details, setDetails] = useState(getData());
    const [validationErrors, setValidationErrors] = useState({});

    const handleInput = (e) => setFormInput({ ...formInput, [e.target.name]: e.target.value });

    const validateForm = () => {
        const errors = {};

        if (!formInput.fname.trim()) {
            errors.fname = "First name is required.";
        } else if (!/^[A-Za-z\s]+$/.test(formInput.fname)) {
            errors.fname = "First name should contain only letters and spaces.";
        }

        if (!formInput.lname.trim()) {
            errors.lname = "Last name is required.";
        } else if (!/^[A-Za-z\s]+$/.test(formInput.lname)) {
            errors.lname = "Last name should contain only letters and spaces.";
        }

        if (!formInput.email.trim()) {
            errors.email = "Email is required.";
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formInput.email)) {
            errors.email = "Invalid email format.";
        }

        if (!formInput.contact.trim()) {
            errors.contact = "Contact number is required.";
        } else if (!/^\d{10}$/.test(formInput.contact)) {
            errors.contact = "Contact should be a 10-digit number.";
        }

        if (!formInput.dob.trim()) {
            errors.dob = "Date of Birth is required.";
        }

        if (!formInput.designation.trim()) {
            errors.designation = "Designation is required.";
        } else if (!/^[A-Za-z\s]+$/.test(formInput.designation)) {
            errors.designation = "Designation should contain only letters and spaces.";
        }

        if (!formInput.address.trim()) {
            errors.address = "Address is required.";
        } else if (formInput.address.trim().length < 5) {
            errors.address = "Address should be at least 5 characters long.";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            if (!formInput.id) {
                setDetails([...details, { ...formInput, id: parseInt(Math.random() * 10000) }]);
            } else {
                setDetails(details.map(rec => {
                    if (formInput.id === rec.id) {
                        return formInput;
                    } else {
                        return rec;
                    }
                }))
            }

            setFormInput({ id: '', fname: '', lname: '', email: '', contact: '', designation: '', dob: '', address: '' });
            setValidationErrors({});
        }
    };

    const handleEdit = id => setFormInput(details.find(rec => id === rec.id));
    const handleDelete = id => setDetails(details.filter(rec => id !== rec.id));

    useEffect(() => {
        localStorage.setItem('Details', JSON.stringify(details));
    }, [details]);

    return (
        <>
            <div className="form-container">
                <h2>Employee Details Form</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="id" value={formInput.id} onChange={handleInput} hidden />

                    <label htmlFor="fname">First Name:</label>
                    {validationErrors.fname && <span>{validationErrors.fname}</span>}
                    <input type="text" id="fname" name="fname" placeholder="Enter your first name" value={formInput.fname} onChange={handleInput} />

                    <label htmlFor="lname">Last Name:</label>
                    {validationErrors.lname && <span>{validationErrors.lname}</span>}
                    <input type="text" id="lname" name="lname" placeholder="Enter your last name" value={formInput.lname} onChange={handleInput} />

                    <label htmlFor="email">Email:</label>
                    {validationErrors.email && <span>{validationErrors.email}</span>}
                    <input type="email" id="email" name="email" placeholder="Enter your email" value={formInput.email} onChange={handleInput} />

                    <label htmlFor="contact">Contact:</label>
                    {validationErrors.contact && <span>{validationErrors.contact}</span>}
                    <input type="tel" id="contact" name="contact" placeholder="Enter your contact number" value={formInput.contact} onChange={handleInput} />

                    <label htmlFor="designation">Designation:</label>
                    {validationErrors.designation && <span>{validationErrors.designation}</span>}
                    <input type="text" id="designation" name="designation" placeholder="Enter your designation" value={formInput.designation} onChange={handleInput} />

                    <label htmlFor="dob">DOB:</label>
                    {validationErrors.dob && <span>{validationErrors.dob}</span>}
                    <input type="date" id="dob" name="dob" value={formInput.dob} onChange={handleInput} />

                    <label htmlFor="address">Address:</label>
                    {validationErrors.address && <span>{validationErrors.address}</span>}
                    <input id="address" name="address" placeholder="Enter your address" value={formInput.address} onChange={handleInput} />

                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="table-container">
                <h2>Employee Details</h2>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Employee Id</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Designation</th>
                            <th>DOB</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((stud, i) => {
                            return (
                                <tr key={stud.id}>
                                    <td>{i + 1}</td>
                                    <td>{stud.fname + ' ' + stud.lname}</td>
                                    <td>{stud.id}</td>
                                    <td>{stud.email}</td>
                                    <td>{stud.contact}</td>
                                    <td>{stud.designation}</td>
                                    <td>{stud.dob}</td>
                                    <td>{stud.address}</td>
                                    <td>
                                        <button className="delete" onClick={() => handleDelete(stud.id)}>Delete</button>
                                        <span> || </span>
                                        <button className="edit" onClick={() => handleEdit(stud.id)}>Edit</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default EmployeeTable;