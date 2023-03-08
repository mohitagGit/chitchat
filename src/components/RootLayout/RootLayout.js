import { Outlet } from "react-router-dom";
// import { Header } from "../Header/Header";
// import { Footer } from "../Footer/Footer";
import './RootLayout.css'

export default function RootLayout() {
    return (
        <div>
            {/* <Header/> */}
            <div className="app-layout">
                <header className="app-body">
                    <Outlet/>
                </header>
            </div>
            {/* <Footer/> */}
        </div>
    )
}