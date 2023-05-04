import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AddMachine from "./pages/AddMachine";
import AddMachineSD from "./pages/AddMachineSD";
import AddMachineHD from "./pages/AddMachineHD";
import EditMachine from "./pages/EditMachine";
import EditMachineSD from "./pages/EditMachineSD";
import EditMachineHD from "./pages/EditMachineHD";
import ApplyforController from "./pages/ApplyforController";
import ControllerCard from "./components/ControllerCard";
import ApplyforControllerDetails from "./pages/ApplyforControllerDetails";
import ApplyforMachine from "./pages/ApplyforMachine";
import ApplyforMachineDetails from "./pages/ApplyforMachineDetails";
import Payment from "./pages/Payment";
import AppointmentUser from "./pages/appointmentuser";
import AdminAppointments from "./pages/appointmentadmin";
import ApplicationDetails from "./pages/ApplicationDetails";
import CtrlAdminAppointments from "./pages/ControllerRequests";
import CtrlMachineAppointments from "./pages/CtrlMachineAppointments";
import CtrlApplicationDetails from "./pages/CtrlApplicationDetails";
import EditMachineOptions from "./pages/EditMachineOptions";
import Users from "./pages/Users";
import ProfileSection from "./pages/ProfileSection";
import TypeofEquipment from "./pages/TypeofEquipment";
import TypeofOperation from "./pages/TypeofOperation";
import MultipleMachine from "./pages/MultipleMachine";
import BookAppointment from "./pages/BookAppointment";
import ApplyForMachinePg1 from "./pages/ApplyForMachinePg1";

function App() {
    const { loading } = useSelector((state) => state.alerts);
    return (
        <>
            <BrowserRouter>
                {loading ? (
                    <Spinner />
                ) : (
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <HomePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <PublicRoute>
                                    <Login />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <PublicRoute>
                                    <Register />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/addmachine"
                            element={
                                <ProtectedRoute>
                                    <AddMachine />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/addmachinesd"
                            element={
                                <ProtectedRoute>
                                    <AddMachineSD />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/machinetype/:machineType"
                            element={
                                <ProtectedRoute>
                                    <TypeofEquipment />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/machinetype/:machineType/:equipType"
                            element={
                                <ProtectedRoute>
                                    <TypeofOperation />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/machinetype/:machineType/:equipType/:opType"
                            element={
                                <ProtectedRoute>
                                    <MultipleMachine />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/addmachinehd"
                            element={
                                <ProtectedRoute>
                                    <AddMachineHD />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/editmachine"
                            element={
                                <ProtectedRoute>
                                    <EditMachineOptions />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/controller/editmachine/:machineId"
                            element={
                                <ProtectedRoute>
                                    <EditMachine />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/editmachinesd"
                            element={
                                <ProtectedRoute>
                                    <EditMachineSD />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/editmachinehd"
                            element={
                                <ProtectedRoute>
                                    <EditMachineHD />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/applyforcontroller"
                            element={
                                <ProtectedRoute>
                                    <ApplyforController />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/machine/apply-for-controller/:machineId"
                            element={
                                <ProtectedRoute>
                                    <ApplyforControllerDetails />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/applyformachine"
                            element={
                                <ProtectedRoute>
                                    <ApplyForMachinePg1 />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/machine/apply-for-machine/:machineId"
                            element={
                                <ProtectedRoute>
                                    <ApplyforMachineDetails />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/payment/:machineId"
                            element={
                                <ProtectedRoute>
                                    <Payment />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/user-appointments"
                            element={
                                <ProtectedRoute>
                                    <AppointmentUser />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/user-appointments"
                            element={
                                <ProtectedRoute>
                                    <AdminAppointments />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/applicationdetails/:applicationId"
                            element={
                                <ProtectedRoute>
                                    <ApplicationDetails />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/controller-appointments"
                            element={
                                <ProtectedRoute>
                                    <CtrlAdminAppointments />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/controller/user-appointments"
                            element={
                                <ProtectedRoute>
                                    <CtrlMachineAppointments />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/controller/applicationdetails/:applicationId"
                            element={
                                <ProtectedRoute>
                                    <CtrlApplicationDetails />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/users"
                            element={
                                <ProtectedRoute>
                                    <Users />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <ProfileSection />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="machine/book-appointment/:machineId"
                            element={
                                <ProtectedRoute>
                                    <BookAppointment />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                )}
            </BrowserRouter>
        </>
    );
}

export default App;
