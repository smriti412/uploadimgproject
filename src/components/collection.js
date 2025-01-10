import { Button, TextField } from "@mui/material";
import React from "react";

const Collection = ({ imagesData, setOpenModal, setImgLink }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgLink(imageUrl);
      setOpenModal(true);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("imageUpload").click();
  };
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <TextField
          label="Search Assets"
          variant="outlined"
          className="!p-0 !m-0"
        />
        <input
          type="file"
          id="imageUpload"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageUpload}
        />
        <Button variant="contained" onClick={handleButtonClick}>
          Add
        </Button>
      </div>
      <div className="flex flex-wrap !items-center  mt-2 -mx-2">
        {imagesData
          ?.slice()
          .reverse()
          .map((item, index) => {
            console.log(item);
            return (
              <div
                key={item?.name + index}
                className="h-[200px] w-[25%] border-2 border-gray-300 rounded-md flex items-center justify-center shadow-lg mx-2 my-3 relative group "
              >
                <img
                  src={item?.image}
                  alt="imagee"
                  className="w-full h-full object-contain"
                  width="100%"
                  height="100%"
                />
                <div className="h-full w-full bg-black absolute rounded-md opacity-30 hidden group-hover:!block"></div>
                <div className="absolute rounded-md hidden group-hover:!block text-primary font-bold text-center my-[50%] !bg-white px-4 py-1">
                  {item?.name}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Collection;
