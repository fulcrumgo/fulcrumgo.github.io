import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import NextPage from "./components/NextPage";
import Seo from "./components/Seo";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Resources from "./pages/Resources";
import Impact from "./pages/Impact";
import Mentorship from "./pages/Mentorship";
import GetInvolved from "./pages/GetInvolved";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

/**
 * Reset scroll on route change, but honour in-page anchors
 * (e.g. /programs#research from the footer).
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <>
      <Seo />
      <ScrollManager />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <NextPage />
      <Footer />
    </>
  );
}
