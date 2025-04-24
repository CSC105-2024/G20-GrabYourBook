import React from "react";
import Navbar from "../components/Navbar";
import ConfirmBookingPopup from "../components/ConfirmBookingComponent/confirmBookingPopup";

function ConfirmBookingPage() {
    return (
        <div>
            <Navbar/>
            <ConfirmBookingPopup/>
        </div>
    )
}

export default ConfirmBookingPage;