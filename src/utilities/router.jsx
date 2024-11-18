import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import Nature from "../components/admin/project_category/Nature";
import NatureType from "../components/admin/project_category/NatureType";
import Materials from "../components/admin/work_items/Materials";
import Equipments from "../components/admin/work_items/Equipments";
import Labors from "../components/admin/work_items/Labors";
import Sow from "../components/admin/scope_of_work/Sow";
import SowSub from "../components/admin/scope_of_work/SowSub";
import Dupa from "../components/admin/Dupa";
import DupaDetails from "../components/admin/DupaDetails";
import Measurement from "../components/admin/Measurement";
import B3TeamProj from "../components/team/projects/B3TeamProj";
import B3TeamProjDetails from "../components/team/projects/B3TeamProjDetails";
import Login from "../components/admin/authentication/Login";
import RequireAuth from "./RequireAuth";
import GuestLayout from "../components/layout/GuestLayout";
import AuthLayout from "../components/layout/AuthLayout";
import Formula from "../components/admin/takeoff_config/Formula";
import TableDupaComponent from "../components/admin/takeoff_config/TableDupaComponent";
import FormulaAssignment from "../components/admin/takeoff_config/FormulaAssignment";
import Users from "../components/admin/accounts/Users";
import AccountSettings from "../components/admin/accounts/AccountSettings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* PROTECTED ROUTES */}
      <Route element={<RequireAuth />}>
        <Route path="/">
          <Route path="/" element={<App />} />
          <Route path="project/nature" element={<Nature />} />
          <Route path="project/nature-type" element={<NatureType />} />
          <Route path="work-items/materials" element={<Materials />} />

          <Route path="work-items/equipments" element={<Equipments />} />
          <Route path="work-items/labors" element={<Labors />} />
          <Route path="take-off/sow" element={<Sow />} />

          <Route path="take-off/sow-sub" element={<SowSub />} />
          <Route path="dupa" element={<Dupa />} />
          <Route path="dupa/:id" element={<DupaDetails />} />
          <Route path="measurement" element={<Measurement />} />
          <Route path="formula" element={<Formula />} />
          <Route path="table-dupa-component" element={<TableDupaComponent />} />
          <Route path="formula-assignment" element={<FormulaAssignment />} />
          <Route path="team-project" element={<B3TeamProj />} />
          <Route path="team-project/:id" element={<B3TeamProjDetails />} />
          <Route path="users" element={<Users />} />
          <Route path='account-settings' element={<AccountSettings />} />
        </Route>
      </Route>
      {/* <Route element={<GuestLayout/>}> */}
      <Route path="/login" element={<Login />} />
      {/* </Route> */}
    </Route>
  )
);

export default router;
