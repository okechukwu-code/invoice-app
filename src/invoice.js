import React, { useEffect, useState } from "react";
import Header from "./header";

export default function CustomerInvoice() {
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        const customerData = JSON.parse(localStorage.getItem("customerDataBackup"));
        if (customerData) {
            setInvoice(customerData[customerData.length - 1]);
        }
    }, []);

    if (!invoice) return <div>No Customer Invoice</div>;

    const { firstName, lastName, address, city, state, zipCode, phone, items, id } = invoice;

    // Generate Invoice Number 
    const invoiceNumber = `${Math.floor(Math.random() * 100000000)}`;

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <Header />
            <div id="invoice">
                <h1>Invoice</h1>
                <div className="invoiceDetails">
                    <p><strong>Invoice Number:</strong> {invoiceNumber}</p>
                    <p><strong>Customer ID:</strong> {id}</p>
                </div>
                <div className="customerDetails">
                    <p><strong>Name:</strong> {firstName} {lastName}</p>
                    <p><strong>Address:</strong> {address}, {city}, {state} {zipCode}</p>
                    <p><strong>Phone:</strong> {phone}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Qty</th>
                            <th>Description</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.qty}</td>
                                <td className="itemDescription">{item.itemSold}</td>
                                <td>${parseFloat(item.price).toFixed(2)}</td>
                                <td>${(parseFloat(item.price) * parseInt(item.qty)).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="3">Subtotal:</th>
                            <td>${items.reduce((sum, item) => sum + parseFloat(item.price) * parseInt(item.qty), 0).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th colSpan="3">Sales Tax (10%):</th>
                            <td>${(items.reduce((sum, item) => sum + parseFloat(item.price) * parseInt(item.qty), 0) * 0.1).toFixed(2)}</td>
                        </tr>
                        <tr className="totalRow">
                            <th colSpan="3">TOTAL:</th>
                            <td>${(items.reduce((sum, item) => sum + parseFloat(item.price) * parseInt(item.qty), 0) * 1.1).toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
                <button className="printButton" onClick={handlePrint}>Print Invoice</button>
            <footer>
                <p><strong>Make all checks payable to YOUR COMPANY NAME</strong></p>
                <p><strong>THANK YOU FOR YOUR BUSINESS</strong></p>
            </footer>
            </div>
        </>
    );
}
