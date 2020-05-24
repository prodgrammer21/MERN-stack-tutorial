import React, { useEffect, useState } from "react";
import useForm from "./useForm";
import axios from "axios";

const App = () => {
  const { values, handleOnChange } = useForm();
  const [dataSource, setDataSource] = useState([]);

  const getUsers = async () => {
    const results = await axios({
      method: "GET",
      url: "http://localhost:3001/user/retrieve",
    });

    setDataSource(results.data);
  };

  const addUser = async () => {
    const result = await axios({
      method: "POST",
      url: "http://localhost:3001/user/create",
      data: {
        ...values,
      },
    });

    return result.data.status;
  };

  const deleteUser = async (_id) => {
    const result = await axios({
      method: "POST",
      url: "http://localhost:3001/user/delete",
      data: {
        _id,
      },
    });

    if (result.data.status) {
      await getUsers();
    } else {
      alert("Failed!");
    }
  };

  const [state, setState] = useState({});

  const updateUser = async () => {
    const { _id, name, age, gender } = state;

    const result = await axios({
      method: "POST",
      url: "http://localhost:3001/user/update",
      data: {
        _id,
        set: {
          name,
          age,
          gender,
        },
      },
    });

    if (result.data.status) {
      await getUsers();
    } else {
      alert("Failed!");
    }
  };

  const onSubmit = async () => {
    if (await addUser()) {
      await getUsers();
    } else {
      alert("Failed!");
    }
  };

  useEffect(() => {
    getUsers();

    return () => getUsers;
  }, []);

  return (
    <div className="App">
      <div className="form">
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          onChange={handleOnChange}
          value={values.name}
        />
        <input
          type="text"
          placeholder="Enter your age"
          name="age"
          onChange={handleOnChange}
          value={values.age}
        />
        <input
          type="text"
          placeholder="Enter your gender"
          name="gender"
          onChange={handleOnChange}
          value={values.gender}
        />
        <input type="submit" onClick={onSubmit} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataSource.length > 0 ? (
            dataSource.map((value) => {
              return (
                <tr key={value._id}>
                  <td>{value.name}</td>
                  <td>{value.age}</td>
                  <td>{value.gender}</td>
                  <td>
                    <button onClick={() => setState(value)}>Edit</button>
                    <button onClick={() => deleteUser(value._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3">
                <span>No data...</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {Object.keys(state).length > 0 ? (
        <>
          <input
            type="text"
            name="name"
            onChange={(e) =>
              setState({
                ...state,
                [e.target.name]: e.target.value,
              })
            }
            value={state.name}
          />
          <input
            type="text"
            name="age"
            onChange={(e) =>
              setState({
                ...state,
                [e.target.name]: e.target.value,
              })
            }
            value={state.age}
          />
          <input
            type="text"
            name="gender"
            onChange={(e) =>
              setState({
                ...state,
                [e.target.name]: e.target.value,
              })
            }
            value={state.gender}
          />
          <input type="submit" value="Update" onClick={updateUser} />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
