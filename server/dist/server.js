"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const checkTimeout_1 = require("./utils/checkTimeout");
const PORT = process.env.PORT || 5000;
// Run timeout check every 30 minutes
setInterval(checkTimeout_1.checkAndUpdateTimeoutTasks, 30 * 60 * 1000);
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    (0, checkTimeout_1.checkAndUpdateTimeoutTasks)();
});
