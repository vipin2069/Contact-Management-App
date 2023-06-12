import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import CovidMap from "./components/CovidMap";
import CovidGraph from "./components/CovidGraph";
import { useState } from "react";
import "./App.css";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const screenSize = window.innerWidth < 768;

  const handleToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="sidebarNavigation flex">
          {screenSize &&
            (!toggleSidebar ? (
              <button
                className="openButton flex items-center gap-2 
          shadow justify-center rounded-md bg-indigo-600 px-1.5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleToggle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="openBars"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            ) : (
              <button
                className="closeButton flex items-center gap-2 
          shadow justify-center rounded-md bg-indigo-600 px-1.5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleToggle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="closeBars"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            ))}
          <nav
            className={`menu${
              screenSize && (toggleSidebar ? "open" : "close")
            } bg-gray-200 p-4`}
          >
            <ul className="space-y-4">
              <li>
                <NavLink
                  to="#"
                  className="flex gap-2 p-2 rounded hover:bg-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linejoin="round"
                  >
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                  <p>Contact List</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/map"
                  className="flex gap-2 p-2 rounded hover:bg-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <p> Map</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/chart"
                  className="flex gap-2 p-2 rounded hover:bg-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                  <p> Chart</p>
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={`${toggleSidebar ? "w-full" : "routesTabs"} p-4`}>
            <Routes>
              <Route path="#" element={<ContactList />} />
              <Route path="/add/:id" element={<ContactForm />} />
              <Route path="/add/" element={<ContactForm />} />
              <Route path="/map" element={<CovidMap />} />
              <Route path="/chart" element={<CovidGraph />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
