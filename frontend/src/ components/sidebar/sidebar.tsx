import { useState } from "react";
import SavedFilms from "../sections/saved-films";
import SearchBar from "../searchbar/search-bar";
import AddNew from "../sections/add-new";
import "./sidebar.css";

// Menu to right component

// SidebarCollapsed component
const SidebarCollapsed = ({
  toggleSidebar,
  setActiveSection,
}: {
  toggleSidebar: () => void;
  setActiveSection: (sectionIndex: number) => void;
}) => {
  return (
    <div className="sidebar sidebar-collapsed">
      <div className="top-sections">
        {/* Icons for the collapsed view */}
        <div
          className="sidebar-btn collapsed-btn"
          onClick={() => {
            setActiveSection(1); // Set active section to 'Search'
            toggleSidebar(); // Expand the sidebar
          }}
        >
          <img
            src="/icons/search.png"
            alt="Search"
            className="collapsed-icon"
          />
        </div>
        <div
          className="sidebar-btn collapsed-btn"
          onClick={() => {
            setActiveSection(2); // Set active section to 'Saved Films'
            toggleSidebar(); // Expand the sidebar
          }}
        >
          <img
            src="/icons/saved.png"
            alt="Saved Films"
            className="collapsed-icon"
          />
        </div>
        <div
          className="sidebar-btn collapsed-btn"
          onClick={() => {
            setActiveSection(3); // Set active section to 'Add New'
            toggleSidebar(); // Expand the sidebar
          }}
        >
          <img src="/icons/add.png" alt="New Film" className="collapsed-icon" />
        </div>
      </div>
      <div className="profile-section">
        {/* Profile Icon */}
        <img
          src="/icons/profile.png"
          alt="Profile"
          className="profile-icon collapsed-icon"
        />
      </div>
    </div>
  );
};

// Sidebar Expanded component
const SidebarExpanded = ({
  toggleSidebar,
  activeSection,
  setActiveSection,
  onOverviewShown,
  setLocations,
  films,
  user,
}: {
  toggleSidebar: () => void;
  activeSection: number | null;
  films: any[];
  user: any;
  setActiveSection: (sectionIndex: number) => void;
  onOverviewShown: (component: any) => void;
  setLocations: (locations: any[]) => void;
}) => {
  const toggleSection = (sectionIndex: number) => {
    if (activeSection === sectionIndex) {
      setActiveSection(null); // Collapse if the same section is clicked
      toggleSidebar(); // Collapse the sidebar
    } else {
      setActiveSection(sectionIndex); // Switch to the new section
    }
  };

  return (
    <>
      {activeSection !== null && (
        <div className="backdrop" onClick={() => setActiveSection(null)} />
      )}{" "}
      {/* Backdrop for when a section is active */}
      <div className="sidebar sidebar-expanded">
        {/* Conditional class for open state */}
        <div className="top-sections">
          <button
            className={`sidebar-btn ${activeSection === 1 ? "active" : ""}`}
            onClick={() => toggleSection(1)}
          >
            Search
          </button>
          <button
            className={`sidebar-btn ${activeSection === 2 ? "active" : ""}`}
            onClick={() => toggleSection(2)}
          >
            Saved Films
          </button>
          <button
            className={`sidebar-btn ${activeSection === 3 ? "active" : ""}`}
            onClick={() => toggleSection(3)}
          >
            Add New
          </button>
        </div>
        <div>
          <div className="content-section">
            {activeSection === 1 && (
              <SearchBar
                onOverviewShown={onOverviewShown}
                setLocations={setLocations}
                user={user}
                films={films}
              />
            )}
            {activeSection === 2 && (
              <SavedFilms
                films={films}
                onOverviewShown={onOverviewShown}
                setLocations={setLocations}
                user={user}
              />
            )}
            {activeSection === 3 && <AddNew user={user} films={films} />}
          </div>
          <div className="profile-section">
            <img
              src="/icons/profile.png"
              alt="Profile"
              className="profile-icon"
            />
          </div>
        </div>
      </div>
    </>
  );
};

// expandable, click handling sidebar
const Sidebar = ({ setLocations, user, films }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [OverviewComponent, setOverviewComponent] = useState<any>(null);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOverviewShown = (component: any) => {
    if (component) {
      toggleSidebar();
    }
    setOverviewComponent(component);
  };

  return (
    <div>
      {isExpanded ? (
        <SidebarExpanded
          toggleSidebar={toggleSidebar}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onOverviewShown={handleOverviewShown}
          setLocations={setLocations}
          films={films}
          user={user}
        />
      ) : (
        <SidebarCollapsed
          toggleSidebar={toggleSidebar}
          setActiveSection={setActiveSection}
        />
      )}
      {OverviewComponent ? OverviewComponent : null}
    </div>
  );
};

export default Sidebar;
