import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";

export default function CustomerDataForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        items: [{ itemSold: '', price: '', qty: '' }],
    });

    const navigate = useNavigate();

    function handleChange(e, index) {
        const { name, value } = e.target;
        if (index !== undefined) {
            const newItems = [...formData.items];
            newItems[index][name] = value;
            setFormData((prevFormData) => ({
                ...prevFormData,
                items: newItems,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    }

    function handleAddItem() {
        setFormData((prevFormData) => ({
            ...prevFormData,
            items: [...prevFormData.items, { itemSold: '', price: '', qty: '' }],
        }));
    }

    function handleRemoveItem(index) {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData((prevFormData) => ({
            ...prevFormData,
            items: newItems,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const customerData = {
            ...formData,
            id: `${Date.now()}`,
        };

        let customerDataBackup = JSON.parse(localStorage.getItem("customerDataBackup")) || [];
        customerDataBackup.push(customerData);
        localStorage.setItem("customerDataBackup", JSON.stringify(customerDataBackup));

        console.log(customerDataBackup);

        setFormData({
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            phone: '',
            items: [{ itemSold: '', price: '', qty: '' }],
        });

        navigate("/invoice")
    }

    return (
        <>
            <Header />
            <form onSubmit={handleSubmit} className="form">
                <div className="formGroup">
                    <label className="label">First Name</label>
                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="input"
                        required
                    />
                </div>
                <div className="formGroup">
                    <label className="label">Last Name</label>
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="input"
                        required
                    />
                </div>
                <div className="formGroup">
                    <label className="label">Street Address</label>
                    <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Street Address"
                        className="input"
                        required
                    />
                </div>
                <div className="formGroupRow">
                    <div className="formGroup">
                        <label className="label">City</label>
                        <input
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="input"
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label className="label">State</label>
                        <input
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="State"
                            className="input"
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label className="label">Zip Code</label>
                        <input
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            placeholder="Zip Code"
                            className="input"
                            required
                        />
                    </div>
                </div>
                <div className="formGroup">
                    <label className="label">Phone Number</label>
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="input"
                        required
                    />
                </div>

                {formData.items.map((item, index) => (
                    <div key={index} className="itemGroup">
                        <div className="formGroup">
                            <label className="label">Item Sold</label>
                            <input
                                name="itemSold"
                                value={item.itemSold}
                                onChange={(e) => handleChange(e, index)}
                                placeholder="Item Sold"
                                className="input"
                                required
                            />
                        </div>
                        <div className="formGroup">
                            <label className="label">Price</label>
                            <input
                                name="price"
                                value={item.price}
                                onChange={(e) => handleChange(e, index)}
                                placeholder="Price"
                                className="input"
                                required
                            />
                        </div>
                        <div className="formGroup">
                            <label className="label">Quantity</label>
                            <input
                                name="qty"
                                value={item.qty}
                                onChange={(e) => handleChange(e, index)}
                                placeholder="Quantity"
                                className="input"
                                required
                            />
                        </div>
                        <button type="button" onClick={() => handleRemoveItem(index)} className="removeButton">
                            Remove Item
                        </button>
                    </div>
                ))}

                <button type="button" onClick={handleAddItem} className="addButton">
                    Add More Items
                </button>
                <button type="submit" className="submitButton">
                    Generate Invoice
                </button>
            </form>
        </>
    );
}
