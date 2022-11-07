import { createContext } from "react";

const emsContext = createContext({
    alertData: [],
    setAlertData: () => {}
});

export default emsContext;