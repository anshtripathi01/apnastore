import React from "react";
import { v4 as uuidv4 } from "uuid";

import "./address-page.css";
import { toast } from "react-toastify";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillDelete,
  AiFillEdit,
  AiFillPlusCircle,
} from "react-icons/ai";
import { useProfile } from "../../context/profileContext";
import { useLocation, useNavigate } from "react-router";

export const Address = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { address, profileDispatcher } = useProfile();
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  const [show, setShow] = React.useState(false);

  const [add, setAdd] = React.useState({
    name: "",
    mobile: "",
    area: "",
    pin: "",
    city: "",
    state: "",
    country: "INDIA",
  });

  const addAddress = () => {
    setShow(true);
    setAdd({
      ...add,
      id: "",
      name: "",
      mobile: "",
      area: "",
      city: "",
      pin: "",
      state: "",
    });
  };

  //   edit addresss
  const editAddress = (addId) => {
    setAdd(address.find(({ id }) => id === addId));
    setShow(true);
  };

  //  save address
  const save = (e) => {
    e.preventDefault();
    const foundAdd = address.find(({ id }) => id === add.id);
    if (foundAdd) {
      foundAdd.name = add.name;
      foundAdd.mobile = add.mobile;
      foundAdd.city = add.city;
      foundAdd.area = add.area;
      foundAdd.pin = add.pin;
      foundAdd.state = add.state;
      profileDispatcher({ type: "EDIT_ADDRESS" });

      setShow(false);

      return toast.success("Address Updated", { autoClose: 500 });
    }
    profileDispatcher({
      type: "ADD_ADDRESS",
      payload: { ...add, id: uuidv4() },
    });
    toast.success("Address saved", { autoClose: 500 });
    setTimeout(() => {
      navigate(location?.state?.from?.pathname || setShow(false));
    }, 1000);
  };

  //   To delete addresss
  const deleteAddress = (addId) => {
    profileDispatcher({
      type: "DELETE_ADDRESS",
      payload: address.filter(({ id }) => id !== addId),
    });
    toast.error("address deleted", { autoClose: 500 });
  };

  return (
    <div className="address-main">
      <h2>Address </h2>

      <div>
        {show ? (
          <div>
            <form onSubmit={save} className="address-form">
              <input
                onChange={(e) => setAdd({ ...add, name: e.target.value })}
                type="text"
                placeholder="name"
                required
                value={add.name}
              />

              <input
                onChange={(e) => setAdd({ ...add, mobile: e.target.value })}
                type="number"
                placeholder="mobile"
                required
                value={add.mobile}
              />

              <input
                onChange={(e) => setAdd({ ...add, area: e.target.value })}
                type="text"
                placeholder="address"
                value={add.area}
                required
              />

              <input
                onChange={(e) => setAdd({ ...add, city: e.target.value })}
                type="text"
                placeholder="city"
                value={add.city}
                required
              />

              <input
                onChange={(e) => setAdd({ ...add, pin: e.target.value })}
                type="number"
                placeholder="pincode"
                value={add.pin}
                required
              />
              <select
                onChange={(e) => setAdd({ ...add, state: e.target.value })}
                value={add.state}
                required
              >
                <option value={""}>select state</option>
                {states.map((state, index) => (
                  <option key={index}>{state}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="country"
                value={"INDIA"}
                disabled={true}
                required
              />

              <div className="address-btn-container">
                <button className="address_btn" type="submit">
                  <AiFillCheckCircle size={30} />
                </button>
                <button className="address_btn" onClick={() => setShow(false)}>
                  <AiFillCloseCircle size={30} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          address?.map(
            ({ id, name, mobile, area, pin, city, state, country }) => (
              <div key={id} className="address_container">
                <p>{name} </p>

                <p>
                  {area}, {city}{" "}
                </p>

                <p> {pin} </p>
                <p> {state} </p>
                <p>{country}</p>
                <p> {mobile}</p>

                <div className="address-btn-container">
                  <button
                    className="address_btn"
                    onClick={() => editAddress(id)}
                  >
                    <AiFillEdit size={30} />
                  </button>
                  <button
                    className="address_btn"
                    onClick={() => deleteAddress(id)}
                  >
                    <AiFillDelete size={30} />
                  </button>
                </div>
              </div>
            )
          )
        )}
        <div className="address-btn-container">
          {!show && (
            <button className="address_btn" onClick={addAddress}>
              <AiFillPlusCircle size={30} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
