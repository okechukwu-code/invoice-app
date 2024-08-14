
import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CustomerDataForm from './form';
import CustomerInvoice from './invoice';

const router = createBrowserRouter([
    {
        path: "/main_window",
        element: (
            <CustomerDataForm />
        ),
    },
    {
        path: "/invoice",
        element: (
            <CustomerInvoice />
        ),
    },
]);


const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}/>)

console.log('👋 This message is being logged by "renderer.js", included via webpack');
