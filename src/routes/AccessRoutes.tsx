import { Route, Routes } from "react-router-dom";

//Screens
import { Home } from "@/screens";
import { Layout } from "@/components";

const AccessRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  );
};

export default AccessRoutes;
