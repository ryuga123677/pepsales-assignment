import { useEffect, useState } from "react";
import { Button, Input, Radio, Slider, TextField, Alert } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
function App() {
  const [info, setInfo] = useState([]);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    currentage: "",
    grade: 0,
    gender: "female",
  });
  const [editdata, setEditData] = useState({
    firstname: "",
    lastname: "",
    currentage: "",
    grade: 0,
    gender: "male",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  var temp;
  var age;
  const handleDataChange = (dataName, value) => {
    if (dataName === "dateofbirth") {
      temp = new Date(value);
      age = year - temp.getFullYear();
    }

    setData({
      ...data,
      [dataName]: dataName === "gender" ? value === "male" : value,
    });

    if (dataName === "dateofbirth") {
      setData({
        ...data,
        [dataName]: age,
      });
    }
  };
  const handleDataChange2 = (dataName, value) => {
    setEditData({
      ...editdata,
      [dataName]: dataName === "gender" ? value === "male" : value,
    });
  };
  const handleTable = () => {
    if (data.firstname != "" && data.lastname != "" && data.grade != "") {
      setInfo([...info, data]);
    } else {
      alert("plz fill all");
    }
  };
  const handleEdit = (items) => {
    setEditingIndex(items);
  };
  const handleDelete = (index) => {
    const updatedInfo = [...info];
    updatedInfo.splice(index, 1);
    setInfo(updatedInfo);
    setEditingIndex(null);
  };
  const handleChange = (index) => {
    const temp = [...info];
    temp[index] = editdata;
    setInfo(temp);
    setEditData({
      firstname: "",
      lastname: "",
      currentage: "",
      grade: 0,
      gender: "male",
    });
    setEditingIndex(null);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen p-5 m-1 flex-wrap">
        <div className="flex-column ">
          <div className="m-3">
            <TextField
              type="text"
              label="First Name"
              onChange={(e) => handleDataChange("firstname", e.target.value)}
            />
          </div>
          <div className="m-3">
            <TextField
              type="text"
              label="Last Name"
              onChange={(e) => handleDataChange("lastname", e.target.value)}
            />
          </div>
          <div className="m-3">
            <TextField
              type="date"
              onChange={(e) => handleDataChange("dateofbirth", e.target.value)}
            />
          </div>
          <div className="m-3 flex gap-5">
            <div>Grade :</div>
            <Slider
              max={10}
              sx={{ width: 100 }}
              onChange={(e) => handleDataChange("grade", e.target.value)}
            />
            <span>{data.grade}</span>
          </div>
          <div className="m-3">
            Female :
            <Radio
              onChange={(e) => handleDataChange("gender", e.target.value)}
            />
          </div>
          <div className="m-3">
            <Button variant="contained" onClick={handleTable}>
              Add
            </Button>
          </div>
          <div className="flex ">
            <div className="overflow-auto max-h-[300px]">
              <table className="m-3 border border-collapse border-black h-max table-auto">
                <thead>
                  <tr className="">
                    <th className="border border-black p-2">First Name </th>
                    <th className="border border-black p-2">Last Name</th>
                    <th className="border border-black p-2">Current age</th>
                    <th className="border border-black p-2">Grade</th>
                    <th className="border border-black p-2">Gender</th>
                    <th className="border border-black p-2">Edit</th>
                    <th className="border border-black p-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {info.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-black p-2">
                        {item.firstname}
                      </td>
                      <td className="border border-black p-2">
                        {item.lastname}
                      </td>
                      <td className="border border-black p-2">
                        {item.dateofbirth}
                      </td>
                      <td className="border border-black p-2">{item.grade}</td>
                      <td className="border border-black p-2">
                        {item.gender ? "male" : "female"}
                      </td>
                      <td className="border border-black p-2">
                        <button onClick={() => handleEdit(index)}>
                          <EditOutlinedIcon />
                        </button>
                      </td>
                      <td className="border border-black p-2">
                        <button onClick={() => handleDelete(index)}>
                          <DeleteOutlineOutlinedIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {editingIndex !== null && (
              <div className="w-[250px] p-5 bg-slate-100 shadow-lg ">
                <div className="m-2">
                  <TextField
                    type="text"
                    label="First Name"
                    onChange={(e) =>
                      handleDataChange2("firstname", e.target.value)
                    }
                  />
                </div>
                <div className="m-2">
                  <TextField
                    type="text"
                    label="Last Name"
                    onChange={(e) =>
                      handleDataChange2("lastname", e.target.value)
                    }
                  />
                </div>
                <div className="m-2">
                  <TextField
                    type="text"
                    onChange={(e) =>
                      handleDataChange2("dateofbirth", e.target.value)
                    }
                  />
                </div>
                <div className="flex gap-4">
                  <div>Grade</div>
                  <Slider
                    max={10}
                    onChange={(e) => handleDataChange2("grade", e.target.value)}
                  />
                  <span>{editdata.grade}</span>
                </div>
                <div>
                  Female :
                  <Radio
                    onChange={(e) =>
                      handleDataChange2("gender", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => handleChange(editingIndex)}
                  >
                    Change
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
