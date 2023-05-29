import { createContext, useContext, useReducer } from "react";
import { profileReducer } from "../reducer/profileReducer";
import { v4 as uuidv4 } from "uuid";

const profileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [state, profileDispatcher] = useReducer(profileReducer, {
    address: [
      {
        id: uuidv4(),
        name: "apnastore",
        mobile: 7346878989,
        area: "D/67-pandeypur",
        pin: 221001,
        city: "Varanasi",
        state: "Uttar Pradesh",
        country: "INDIA",
      },
    ],
    orders: [],
  });

  return (
    <profileContext.Provider value={{ ...state, profileDispatcher }}>
      {children}
    </profileContext.Provider>
  );
};

export const useProfile = () => useContext(profileContext);
