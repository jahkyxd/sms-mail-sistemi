import Login from "./src/Base/Login.js";
import Loaders from "./src/Base/Load.js";
import Jahky from "./src/Base/Jahky.Client.js";
global.client = new Jahky();

// system required \\

Login.On();
Loaders.LoadEvents("./src/events");
