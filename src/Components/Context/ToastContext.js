import { createContext, useContext, useState } from "react";
import MySnackBar from "../MySnackBar";

const TastContext = createContext({});

export const TastProjeder = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [massage, setMassage] = useState("");

  function showHightTost(massage) {
    setOpen(true);
    setMassage(massage);
    setTimeout(() => {
      setOpen(false);
    }, 4000);
  }
  return (
    <TastContext.Provider value={{ showHightTost }}>
      <MySnackBar open={open} massage={massage} />
      {children}
    </TastContext.Provider>
  );
};

export const useTast = () => {
  return useContext(TastContext);
};
