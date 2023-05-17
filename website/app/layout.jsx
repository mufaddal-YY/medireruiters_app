import "@styles/globals.css";
import Nav from "../components/Nav";

export const metadata = {
  title:
    "Medirecruiters |  Hospital and Medical Recruitment Portal In India | Doctors Placement Agency",
  description:
    "1st ever healthcare placement consultancy directed by a consultant Doctor. We are focussed on strengthening the Healthcare Industry by helping motivated and talented Doctors propel their careers in India.",
};

const layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
};

export default layout;
