const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const atob = require("atob");


app.use(cors());
app.use(express.json());
port = 4040;
app.listen(port);

app.get("/bfhl", async (req, res) => {
  try {
    res.status(200);
    res.send({ operation_code: 1 });
  } catch (e) {
    res.send(e);
  }
});
app.post("/bfhl", async (req, res) => {
    try {
      const { full_name, dob, base64File, alphabet } = req.body;
  
      const user_id = `${full_name.toLowerCase().replace(/\s/g, "_")}_${dob}`;
  
      let is_success = true;
      let file_valid = false;
      let file_mime_type = null;
      let file_size_kb = 0;
      let RollN0 = "RA2111003010699";
  

      if (base64File) {
        try {

          const fileBuffer = Buffer.from(base64File, "base64");
          const fileString = atob(base64File);
  

          file_mime_type = fileString.substring(0, fileString.indexOf(";base64"));
  

          file_size_kb = Math.round(fileBuffer.length / 1024);
  

          file_valid = !!file_mime_type && file_size_kb > 0;
        } catch (e) {

          file_valid = false;
          is_success = false;
        }
      } else {

        file_valid = false;
        is_success = false;
      }
  

      let lower_case_letters = alphabet.match(/[a-z]/g) || [];
      let numbers = alphabet.match(/\d/g) || [];
  

      let highest_lower_case_letter = lower_case_letters.sort().pop() || null;
      let highest_number = numbers.sort().pop() || null;
  

      res.status(200).send({
        user_id: user_id,
        is_success: is_success,
        file_valid: file_valid,
        file_mime_type: file_mime_type,
        file_size_kb: file_size_kb,
        RollN0: RollN0,
        highest_lower_case_letter: highest_lower_case_letter,
        highest_number: highest_number,
      });
    } catch (error) {
      res.status(500).send({
        is_success: false,
        error: "An error occurred",
      });
    }
  });
  