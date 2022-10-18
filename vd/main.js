import { readFile } from "fs";
readFile("./test.txt", "utf-8", (err, data) => {
    if (err) {
        return console.log("err");
    }
    console.log(data);
})