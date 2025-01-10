//Techstack used-> react.js, MUI, TailwindCSS
//When flipping and rotating together, sometimes image is shifting out of canvas (due to which final image rendered is white.)

import React, { useState } from "react";
import boxImg from "../assets/images/box.png";
import { Button } from "@mui/material";
import Collection from "../components/collection";
import MyModal from "../components/myModal";

const AddAssetPage = () => {
  const [imagesData, setImagesData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [imgLink, setImgLink] = useState(null);

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

  console.log(imagesData.length);

  return (
    <>
      {imagesData.length ? (
        <Collection
          imagesData={imagesData}
          setOpenModal={setOpenModal}
          imgLink={imgLink}
          setImgLink={setImgLink}
        />
      ) : (
        <div className="w-max text-center m-auto mt-24">
          <img src={boxImg} alt="box-img" width="300px" height="270px" />
          <h1 className="text-sm text-gray-500 font-semibold">
            Add Assets Here
          </h1>
          <input
            type="file"
            id="imageUpload"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageUpload}
          />
          <Button
            variant="contained"
            onClick={handleButtonClick}
            className="!bg-primary  hover:!bg-primary text-white !capitalize !m-6 !text-base"
          >
            + Add
          </Button>
        </div>
      )}
      <MyModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        imagesData={imagesData}
        setImagesData={setImagesData}
        imgLink={imgLink}
        setImgLink={setImgLink}
      />
    </>
  );
};

export default AddAssetPage;
