import { ping_command } from "./ping/ping.js";
import "dotenv/config";

export const GLOBAL_COMMANDS = [
  {
    ping_command,
  },
];
