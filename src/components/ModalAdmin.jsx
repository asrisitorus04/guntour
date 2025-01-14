import React, { useState } from "react";
import { apiRequest } from "../utils/apiRequest";

import { InputCustom, InputForModal } from "components/Input";
import { ButtonCustom } from "components/Button";

import { AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";

const ModalEditRanger = () => {
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my-modal-6" className="cursor-pointer">
        <AiFillEdit />
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom py-5 sm:modal-middle">
        <div className="bg-white modal-box w-[600px] overflow-auto border p-6">
          <h3 className="font-bold text-lg text-center">Edit Status Ranger</h3>
          <hr className="text-line mt-6" />

          {/* Form Product */}
          <div className="mt-6 mb-5">
            <p className="text-left font-normal text-lg">Status</p>
            <select
              // value={objSubmit.category}
              // onChange={(e) => handleChange(e.target.value, "category")}
              id="category"
              class="w-full h-14 border pl-4 rounded-lg text-base mt-2 text-secondary"
            >
              <option value="avaliable">Avaliable</option>
              <option value="duty">Duty</option>
              <option value="off">Off Work</option>
            </select>
          </div>

          <div>
            <p className="text-left font-normal text-lg">Phone Number</p>
            <InputCustom
              // value={objSubmit.phone}
              // onChange={(e) => handleChange(e.target.value, "phone")}
              className="w-full h-14 border pl-4 rounded-lg text-base mt-2 text-secondary"
              placeholder="085797556123"
            />
          </div>

          {/* Button Add and Close */}
          <hr className="mt-9" />
          <div>
            <ButtonCustom
              // onClick={() => handleEditProduct()}
              className="bg-primary mt-6 rounded-lg h-11 w-full flex items-center justify-center font-normal text-sm text-white cursor-pointer"
              label="Edit Info"
            />

            <div className="modal-action">
              <label htmlFor="my-modal-6">
                <ButtonCustom
                  className="border h-11 w-[464px] rounded-lg  flex items-center justify-center font-normal text-sm text-[#999999] cursor-pointer"
                  label="Close"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalAdminProduct = () => {
  const [loading, setLoading] = useState(true);
  const [objSubmit, setObjSubmit] = useState("");

  const handleAddProduct = async () => {
    setLoading(true);
    const formData = new FormData();
    for (const key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    apiRequest("admin/product", "post", objSubmit, "multipart/form-data")
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Data added successfully",
        });
        setObjSubmit({});
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          title: "There is an error please check again",
        });
      })
      .finally(() => setLoading(false));
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  return (
    <div>
      <label
        htmlFor="my-modal-3"
        className="cursor-pointer font-normal text-base text-center justify-center h-12 w-[180px] rounded-lg text-white bg-primary transform active:scale-95 transition-transform flex items-center"
      >
        Add Product
      </label>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box rounded-lg relative">
          <h3 className="font-semibold text-xl text-secondary text-center">
            Data Product
          </h3>
          <div className="divider m-0" />

          {/* Add Photo Product */}
          <div className="mt-6 mb-5">
            <h3 className="font-normal text-secondary text-lg text-left mb-3">
              Photo Product
            </h3>
            <div className="text-left">
              <input
                value={objSubmit.product_picture}
                onChange={(e) =>
                  handleChange(e.target.value, "product_picture")
                }
                type="file"
                className="file-input w-full max-w-xs"
              />
            </div>
          </div>

          {/* Input Product Name*/}
          <div className="mb-5">
            <p className="font-normal text-lg text-secondary text-left mb-3">
              Product Name
            </p>
            <InputForModal
              value={objSubmit.product_name}
              onChange={(e) => handleChange(e.target.value, "product_name")}
              placeholder="Enter your product name"
            />
          </div>

          {/* Input Rent Price*/}
          <div className="mb-5">
            <p className="font-normal text-lg text-secondary text-left mb-3">
              Rent Price
            </p>
            <InputForModal
              value={objSubmit.rent_price}
              onChange={(e) => handleChange(e.target.value, "rent_price")}
              placeholder="100K"
            />
          </div>

          {/* Input Description*/}
          <div className="mb-5">
            <p className="font-normal text-lg text-secondary text-left mb-3">
              Description
            </p>
            <textarea
              value={objSubmit.detail}
              onChange={(e) => handleChange(e.target.value, "detail")}
              className="w-full border border-[#B3B3B3] textarea mt-2 rounded-lg h-40 text-base font-normal"
              placeholder="Enter your product description"
            ></textarea>
          </div>

          {/* Input Note Warning*/}
          <div className="mb-5">
            <p className="font-normal text-lg text-secondary text-left mb-3">
              Warning
            </p>
            <textarea
              value={objSubmit.note}
              onChange={(e) => handleChange(e.target.value, "note")}
              className="w-full border border-[#B3B3B3] textarea mt-2 rounded-lg h-40 text-base font-normal"
              placeholder="Enter your product description"
            ></textarea>
          </div>

          <div className="divider m-0" />
          <ButtonCustom
            onClick={() => handleAddProduct()}
            className="cursor-pointer font-medium text-center justify-center h-11 w-full mt-5 mb-3 rounded-lg text-white bg-primary transform active:scale-95 transition-transform flex items-center"
            label="Save Data"
          />

          <label htmlFor="my-modal-3">
            <ButtonCustom
              className="cursor-pointer font-medium text-center justify-center h-11 w-full rounded-lg text-slate-400 border bg-white transform active:scale-95 transition-transform flex items-center"
              label="Close"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

const ModalEditAdminProduct = () => {
  return (
    <div>
      <label htmlFor="my-modal-3" className="text-2xl text-gray-600">
        <AiFillEdit />
      </label>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box rounded-lg relative">
          <h3 className="font-semibold text-xl text-secondary text-center">
            Edit Product
          </h3>
          <div className="divider m-0" />

          {/* Add Photo Product */}
          <div className="mt-6 mb-5">
            <h3 className="font-normal text-secondary text-lg text-left mb-3">
              Photo Product
            </h3>
            <div className="text-left">
              <input type="file" className="file-input w-full max-w-xs" />
            </div>
          </div>

          {/* Input Product Name*/}
          <div className="mb-5">
            <p className="font-normal text-lg text-secondary text-left mb-3">
              Product Name
            </p>
            <InputForModal placeholder="Enter your product name" />
          </div>

          {/* Input Rent Price*/}
          <div className="mb-5">
            <p className="font-normal text-lg text-secondary text-left mb-3">
              Rent Price
            </p>
            <InputForModal placeholder="100K" />
          </div>

          {/* Input Description*/}
          <div className="mb-5">
            <p className="font-normal text-lg text-secondary text-left mb-3">
              Description
            </p>
            <textarea
              className="w-full border border-[#B3B3B3] textarea mt-2 rounded-lg h-40 text-base font-normal"
              placeholder="Enter your product description"
            ></textarea>
          </div>

          <div className="divider m-0" />
          <ButtonCustom
            className="cursor-pointer font-medium text-center justify-center h-11 w-full mt-5 mb-3 rounded-lg text-white bg-primary transform active:scale-95 transition-transform flex items-center"
            label="Edit Product"
          />

          <label htmlFor="my-modal-3">
            <ButtonCustom
              className="cursor-pointer font-medium text-center justify-center h-11 w-full rounded-lg text-slate-400 border bg-white transform active:scale-95 transition-transform flex items-center"
              label="Close"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

const ModalAdminUSer = () => {
  return (
    <div>
      <label
        htmlFor="my-modal-3"
        className="cursor-pointer font-medium text-lg text-center justify-center h-12 w-[183px] rounded-lg px-6 py-1 text-white bg-[#E5640E] transform active:scale-75 transition-transform flex items-center hover:bg-primary hover:text-black"
      >
        Edit Data
      </label>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <h3 className="font-semibold text-xl text-secondary text-center">
            Edit Climbers Data
          </h3>
          <div className="divider text-[#E2E7E9]" />
          <p className="font-normal text-lg text[#373737] text-left">
            Is Climbers
          </p>
          <InputForModal />
          <p className="font-normal text-lg text[#373737] text-left">
            Male Climbers
          </p>
          <InputForModal />
          <p className="font-normal text-lg text[#373737] text-left">
            Female Climbers
          </p>
          <InputForModal />
          <div className="divider text-[#E2E7E9]" />
          <ButtonCustom
            className="cursor-pointer font-medium text-center justify-center h-11 w-full px-6 py-1 rounded-lg text-white bg-primary transform active:scale-75 transition-transform flex items-center hover:bg-primary hover:text-white"
            label="Save"
          />
          <br />
          <label htmlFor="my-modal-3">
            <ButtonCustom
              className="cursor-pointer font-medium text-center justify-center h-11 w-full px-6 py-1 rounded-lg text-[#999999] bg-white transform active:scale-75 transition-transform flex items-center hover:bg-primary hover:text-white"
              label="Close"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export {
  ModalEditRanger,
  ModalAdminProduct,
  ModalEditAdminProduct,
  ModalAdminUSer,
};
