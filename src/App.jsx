import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Header from './Header/Header'
import Dashboard from './Dashboard/Dashboard'
import GuestList from './GuestList/GuestList'
import { generateEmployees } from './data/employees'
import WalkinModal from './WalkinModal/WalkinModal'
import Toast from './Toast/Toast'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [employees, setEmployees] = useState(generateEmployees());
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showWalkinModal, setShowWalkinModal] = useState(false);
  const [toast, setToast] = useState("");

  function handleWalkin(guest) {

    const now = new Date();

    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });


    const employee = {

      id: Date.now(),

      name: guest.name,

      email: guest.email,

      dept: guest.department,

      invited_on: null,

      checkin_time:
        `${new Date().toISOString().slice(0, 10)} ${time}`,

      isWalkin: true

    };

    setEmployees(current => [

      ...current,

      employee

    ]);


    setShowWalkinModal(false);


    setToast(
      `${guest.name} checked in successfully`
    );


    setTimeout(() => {

      setToast("");

    }, 3000);

  }

  function handleCheckin(id) {
    setEmployees(current =>

      current.map(employee => {

        if (employee.id === id) {

          return {
            ...employee,
            checkin_time:
              `${new Date().toISOString().slice(0, 10)}
                     ${new Date().toLocaleTimeString()}`
          };

        }
        return employee;
      })

    );

    setToast("Guest checked in successfully");

    setTimeout(() => {

      setToast("");

    }, 3000);

  }

  return (
    <>
      <Header activeTab={activeTab}
        setActiveTab={setActiveTab} />

      <main>

        {activeTab === "dashboard" ? (

          <Dashboard
            employees={employees}
          />

        ) : (

          <GuestList
            employees={employees}
            openWalkinModal={() => setShowWalkinModal(true)}
            onCheckin={handleCheckin}
          />

        )}

      </main>

      <WalkinModal
        open={showWalkinModal}
        onClose={() => setShowWalkinModal(false)}
        onSave={handleWalkin}
      />

      <Toast
        message={toast}
        onClose={() => setToast("")}
      />

    </>
  )
}

export default App
