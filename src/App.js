import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar"
import AddLab from "./pages/AddLab";
import EditLab from "./pages/EditLab";
import LabView from "./pages/LabView";
import manageLab from "./components/LabService/manageLab";
import calCost from "./pages/calCost";
import viewcalCost from "./pages/viewcalCost";


function App() {
  return (
    <Router>
     
      <Navbar/>
      <br/>
        <Route path="/add" component={AddLab} />
        <Route path="/" exact component={LabView} />
        <Route path="/edit/:id" component={EditLab} />
        <Route path="/manageLab" component={manageLab} />
        <Route path="/calCost" component={calCost} />
        <Route path="/viewcalCost" component={viewcalCost} />
       
    </Router>
  );
}

export default App;
