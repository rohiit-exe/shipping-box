# Box Tracking Application

A simple web application built with React and Tailwind CSS for tracking boxes, their weight, color, destination country, and calculating the shipping cost.

## Getting Started

Follow these steps to get a copy of the project up and running on your local machine.

### Prerequisites

You need to have **Node.js** and **npm** (or **Yarn**) installed on your system.

* **Node.js (LTS recommended):** [nodejs.org](https://nodejs.org/en/)

### 🛠️ Installation and Setup

1.  **Clone the Repository**

    Open your terminal or command prompt and clone the project:

    ```bash
    git clone https://github.com/rohiit-exe/shipping-box.git
    cd shipping-box
    ```

2.  **Install Dependencies**

    Install the necessary packages, including React, React Router, and Tailwind CSS configuration:

    ```bash
    npm install
    # OR
    yarn install
    ```

3.  **Start the Development Server**

    Once the dependencies are installed, you can start the application in development mode. This will typically open the app in your browser at `http://localhost:5173`.

    ```bash
    npm start
    # OR
    yarn start
    ```

    The application should now be running and accessible in your web browser.

---

## Project Structure

The key files and folders you'll interact with are:

| File/Folder | Description |
| :--- | :--- |
| `src/components/Navbar.js` | The main navigation menu. |
| `src/components/BoxTable.js` | The component displaying the list of boxes. |
| `src/context/boxProvider.js` | Manages the global state of the boxes. |
| `src/utils/functionUtils.js` | Contains the `calculateCost` and `hexToRgb` logic. |
| `src/App.js` | Defines the routing for `/form` (Add Box) and `/list` (View Boxes). |

---

##  Usage

1.  **Add Box:** Navigate to the **"Add Box"** tab (or `/form`). Enter the receiver's name, weight, choose a color, and select a country. Submitting the form will add the box to the global state.
2.  **View Boxes:** Navigate to the **"View Boxes"** tab (or `/list`). You will see a table listing all the added boxes, along with the calculated shipping cost for each item.