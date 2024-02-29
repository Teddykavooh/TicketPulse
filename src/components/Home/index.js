import "./index.scss";
import { IoPulseSharp, IoChevronDownCircle } from "react-icons/io5";

const Home = () => {
  return (
    <div className="container home">
      <h1>Who are we, What are we about?</h1>
      <IoPulseSharp />
      <p className="desc">
        Welcome to TicketPouls, where the heartbeat of seamless ticket booking
        meets the pulse of your journey. Embark on a new era of convenience and
        efficiency as TicketPouls revolutionizes the way you secure tickets.
        PoulsPass, the core of our system, ensures a synchronized and
        hassle-free experience, guiding you through a rhythm of accessibility
        and reliability. Get ready to pulse your journey with TicketPouls, where
        every ticket becomes a gateway to an effortlessly orchestrated
        adventure.
      </p>
      <IoChevronDownCircle className="smaller" />
      <p className="shortDesc">Rythmez votre voyage.</p>
    </div>
  );
};
export default Home;
