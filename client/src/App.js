import axios from "axios";
import { useState } from "react";

const App = () => {
  const [indexNumber, setIndexNumber] = useState();
  const [file, setFile] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("index", indexNumber);
    if (file.length !== 0) {
      formData.append("cv", file[0])
    }
    try {

      axios.post("http://localhost:1337/cv/submitCV", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }).then(res => {
        alert(res.data.message);
      }).catch(err => {
        console.log(err)
      })

    } catch (err) {
      alert("Network Error");
      console.log(err);
    }
  }

  return (
    <div style={{ "margin": "40px" }}>
      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">

        <input
          type="text"
          placeholder="Index Number"
          onChange={(e) => { setIndexNumber(e.target.value) }}
          value={indexNumber}
        ></input>

        <br></br>

        <input
          accept=".zip, .rar"
          type="file"
          onChange={(e) => { setFile(e.target.files) }}
        />
        <br></br>
        <font size="2">
          <strong>
            * Only <i>.zip .rar .7zip </i> Files are allowed, <br></br>
            File should be less than 5 Mega Bytes
          </strong>
        </font>
        <p></p>

        <input type="submit" value="Submit Your CV"></input>
      </form>
    </div>
  );
}
export default App;