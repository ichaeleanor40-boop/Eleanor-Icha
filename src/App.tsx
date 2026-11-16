/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { SetInduksiPage } from './pages/SetInduksiPage';
import { Langkah1Page } from './pages/Langkah1Page';
import { Langkah2Page } from './pages/Langkah2Page';
import { Langkah3Page } from './pages/Langkah3Page';
import { PenutupPage } from './pages/PenutupPage';
import { RuangGuruPage } from './pages/RuangGuruPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/set-induksi" element={<SetInduksiPage />} />
          <Route path="/langkah-1" element={<Langkah1Page />} />
          <Route path="/langkah-2" element={<Langkah2Page />} />
          <Route path="/langkah-3" element={<Langkah3Page />} />
          <Route path="/penutup" element={<PenutupPage />} />
          <Route path="/ruang-guru" element={<RuangGuruPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
