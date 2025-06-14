// src/pages/Register.tsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { StickyNav } from "../components/ui/sticky-nav"; // Assuming path is correct
import { Footer } from "../components/sections/footer";   // Assuming path is correct

const RegisterPage = () => {
  console.log("RegisterPage component is rendering!"); // Add a console log

  return (
    <>
      <Helmet>
        <title>Register Page Test | Alluviance</title>
        <meta name="description" content="This is a test page." />
      </Helmet>

      <StickyNav />

      <main style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: '#0b0f2a', color: 'white' }}>
        <div style={{ textAlign: 'center', border: '2px dashed #FFE45E', padding: '40px', borderRadius: '8px' }}>
          <h1>Register Page - Hello World!</h1>
          <p>If you see this, the basic page routing and rendering are working.</p>
          <p>The current time is: {new Date().toLocaleTimeString()}</p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RegisterPage;