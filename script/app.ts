import * as $ from "jquery";
import {findUserNameById} from "./models/API/API";

export function start() {
    console.log("hello world");
    console.log(findUserNameById(12));
}