import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import { useSelector } from 'react-redux'
import Spinner from './components/Spinner'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import AddMachine from './pages/AddMachine'
import AddMachineSD from './pages/AddMachineSD'
import AddMachineHD from './pages/AddMachineHD'
import EditMachine from './pages/EditMachine'
import EditMachineSD from './pages/EditMachineSD'
import EditMachineHD from './pages/EditMachineHD'
import ApplyforController from './pages/ApplyforController'
import ControllerCard from './components/ControllerCard'
import ApplyforControllerDetails from './pages/ApplyforControllerDetails'
import ApplyforMachine from './pages/ApplyforMachine'
import ApplyforMachineDetails from './pages/ApplyforMachineDetails'

function App() {
  const {loading} = useSelector(state => state.alerts);
  return (
    <>
      <BrowserRouter>
      {loading ? (
      <Spinner/>
      ) : (
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>
          }/>
          <Route path='/login' element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
          }/>
          <Route path='/register' element={
            <PublicRoute>
              <Register/>
            </PublicRoute>
          }/>
          <Route path='/addmachine' element={
            <ProtectedRoute>
              <AddMachine/>
            </ProtectedRoute>
          }/>
          <Route path='/addmachinesd' element={
            <ProtectedRoute>
              <AddMachineSD/>
            </ProtectedRoute>
          }/>
          <Route path='/addmachinehd' element={
            <ProtectedRoute>
              <AddMachineHD/>
            </ProtectedRoute>
          }/>
          <Route path='/editmachine' element={
            <ProtectedRoute>
              <EditMachine/>
            </ProtectedRoute>
          }/>
          <Route path='/editmachinesd' element={
            <ProtectedRoute>
              <EditMachineSD/>
            </ProtectedRoute>
          }/>
          <Route path='/editmachinehd' element={
            <ProtectedRoute>
              <EditMachineHD/>
            </ProtectedRoute>
          }/>
          <Route path='/applyforcontroller' element={
            <ProtectedRoute>
              <ApplyforController/>
            </ProtectedRoute>
          }/>
          <Route path='/machine/apply-for-controller/:machineId' element={
            <ProtectedRoute>
              <ApplyforControllerDetails/>
            </ProtectedRoute>
          }/>
          <Route path='/applyformachine' element={
            <ProtectedRoute>
              <ApplyforMachine/>
            </ProtectedRoute>
          }/>
          <Route path='/machine/apply-for-machine/:machineId' element={
            <ProtectedRoute>
              <ApplyforMachineDetails/>
            </ProtectedRoute>
          }/>
        </Routes>
      )}
      </BrowserRouter>
    </>
  );
}

export default App;
