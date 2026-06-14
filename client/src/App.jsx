import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';

import Navbar from './components/Navbar';

import axios from 'axios';

export default function App() {
  const [stage, setStage] = useState('landing');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  async function handleAnalyze(username) {
    setError('');
    setStage('loading');

    try {
      const res = await axios.post(
        '/api/analyze',
        { username }
      );

      setData(res.data);
      setStage('dashboard');
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'Something went wrong. Try again.'
      );

      setStage('landing');
    }
  }

  function handleReset() {
    setData(null);
    setStage('landing');
  }

  const HomePage = () => {
    if (
      stage === 'landing' ||
      stage === 'loading'
    ) {
      return (
        <Landing
          onAnalyze={handleAnalyze}
          loading={stage === 'loading'}
          error={error}
        />
      );
    }

    return (
      <Dashboard
        data={data}
        onReset={handleReset}
      />
    );
  };

  return (
    <>
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Routes>
    </>
  );
}