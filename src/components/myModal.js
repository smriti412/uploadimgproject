import { Button, Modal, Tooltip } from "@mui/material";
import React, { useState } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CropOutlinedIcon from "@mui/icons-material/CropOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import FlipOutlinedIcon from "@mui/icons-material/FlipOutlined";
import FindReplaceOutlinedIcon from "@mui/icons-material/FindReplaceOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const MyModal = ({
  openModal,
  setOpenModal,
  imagesData,
  setImagesData,
  imgLink,
  setImgLink,
}) => {
  const [expandOptions, setExpandOptions] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [cropper, setCropper] = useState(null);

  const handleCrop = () => {
    setIsCropping(true);
    setExpandOptions(false);
    // if (cropper) {
    //   const croppedImage = cropper?.getCroppedCanvas();
    //   const croppedImageUrl = croppedImage.toDataURL();
    //   setImgLink(croppedImageUrl);
    // }
  };
  const handleRotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };
  const handleFlipHor = () => {
    setFlipHorizontal((prev) => !prev);
  };

  const handleFlipVer = () => {
    setFlipVertical((prev) => !prev);
  };
  const handleReplace = () => {
    document.getElementById("imageUpload").click();
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setRotation(0);
      setFlipHorizontal(false);
      setFlipVertical(false);
      const imageUrl = URL.createObjectURL(file);
      setImgLink(imageUrl);
      setOpenModal(true);
    }
  };

  const handleUpload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = imgLink;

    image.onload = () => {
      if (!rotation) {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.save();

        if (flipHorizontal) {
          ctx.scale(-1, 1);
          ctx.translate(-canvas.width, 0);
        }

        if (flipVertical) {
          ctx.scale(1, -1);
          ctx.translate(0, -canvas.height);
        }

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.restore();
      } else {
        let imageWidth = image.width;
        let imageHeight = image.height;

        const radians = (rotation * Math.PI) / 180;

        if (rotation) {
          const cos = Math.abs(Math.cos(radians));
          const sin = Math.abs(Math.sin(radians));
          imageWidth = image.width * cos + image.height * sin;
          imageHeight = image.height * cos + image.width * sin;
        }

        canvas.width = imageWidth;
        canvas.height = imageHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();

        ctx.translate(canvas.width / 2, canvas.height / 2);

        if (rotation) {
          ctx.rotate(radians);
        }

        if (flipHorizontal) {
          ctx.scale(-1, 1);
          ctx.translate(-canvas.width, 0);
        }

        if (flipVertical) {
          ctx.scale(1, -1);
          ctx.translate(0, -canvas.height);
        }

        ctx.drawImage(image, -image.width / 2, -image.height / 2);

        ctx.restore();
      }

      canvas.toBlob((blob) => {
        if (blob) {
          const blobUrl = URL.createObjectURL(blob);

          const imageObject = {
            name: `Asset ${(imagesData.length + 1)
              .toString()
              .padStart(3, "0")}`,
            image: URL.createObjectURL(blob),
          };

          setImagesData((prevData) => [...prevData, imageObject]);

          setOpenModal(false);
          setRotation(0);
          setFlipHorizontal(false);
          setFlipVertical(false);
        } else {
          console.error("Failed to convert canvas to Blob");
        }
      }, "image/png");
    };

    image.onerror = () => {
      console.error("Failed to load the image.");
    };
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
    setExpandOptions(false);
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal} className="z-10">
      <div className="bg-white w-[90%] h-max  m-auto rounded-md py-2 px-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between">
          <h1 className="font-semibold text-xl text-primary">Add Asset</h1>
          <CloseOutlinedIcon
            onClick={handleCloseModal}
            className="cursor-pointer"
          />
        </div>
        <div className=" my-6 flex space-x-4 ">
          <div className="w-[70%] relative !min-h-[250px] !max-h-[80vh] border-2 border-gray-200 rounded-md flex items-center justify-center">
            <div className="absolute right-4 top-4 p-1 bg-black bg-opacity-60 z-10 rounded-md flex flex-col space-y-2 cursor-pointer ">
              {expandOptions ? (
                <>
                  <Tooltip title="Close" placement="left">
                    <CloseOutlinedIcon
                      className="text-white"
                      onClick={() => setExpandOptions(false)}
                    />
                  </Tooltip>

                  <Tooltip title="Crop" placement="left">
                    <CropOutlinedIcon
                      className="text-white"
                      onClick={() => handleCrop()}
                    />
                  </Tooltip>

                  <Tooltip title="Rotate" placement="left">
                    <RefreshOutlinedIcon
                      className="text-white"
                      onClick={() => handleRotate()}
                    />
                  </Tooltip>

                  <Tooltip title="Flip Horizontal" placement="left">
                    <FlipOutlinedIcon
                      className="text-white"
                      onClick={() => handleFlipHor()}
                    />
                  </Tooltip>

                  <Tooltip title="Flip Vertical" placement="left">
                    <FlipOutlinedIcon
                      className="text-white rotate-90"
                      onClick={() => handleFlipVer()}
                    />
                  </Tooltip>

                  <Tooltip title="Replace" placement="left">
                    <input
                      type="file"
                      id="imageUpload"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <FindReplaceOutlinedIcon
                      className="text-white"
                      onClick={() => handleReplace()}
                    />
                  </Tooltip>
                </>
              ) : !isCropping ? (
                <Tooltip title="Edit" placement="left">
                  <ModeEditOutlinedIcon
                    className="text-white"
                    onClick={() => setExpandOptions(true)}
                  />
                </Tooltip>
              ) : null}
            </div>
            {isCropping ? (
              <div>
                <div className="absolute right-4 top-4 p-1 bg-black bg-opacity-60 z-10 rounded-md flex flex-col space-y-2 cursor-pointer ">
                  <Tooltip title="Close" placement="left">
                    <CloseOutlinedIcon
                      className="text-white"
                      onClick={() => {
                        setIsCropping(false);
                        setExpandOptions(true);
                      }}
                    />
                  </Tooltip>

                  <Tooltip title="Crop" placement="left">
                    <DoneOutlinedIcon
                      className="text-white"
                      onClick={() => {
                        setIsCropping(false);
                        setExpandOptions(true);
                      }}
                    />
                  </Tooltip>
                </div>

                <Cropper
                  src={imgLink}
                  style={{ height: "100%", width: "100%" }}
                  initialAspectRatio={1}
                  guides={false}
                  ref={(cropperInstance) => setCropper(cropperInstance)}
                  className="rounded-md w-full h-full !object-contain"
                />
              </div>
            ) : (
              <img
                src={imgLink}
                alt="img"
                style={{
                  transform: `rotate(${rotation}deg) ${
                    flipHorizontal ? "scaleX(-1)" : ""
                  } ${flipVertical ? "scaleY(-1)" : ""}`,
                  transition: "transform 0.3s ease-in-out",
                }}
                className="rounded-md w-full h-full !object-contain"
              />
            )}
          </div>
          <div className="w-[30%] mx-3">
            <div className="border-2 border-gray-300 py-1 px-3 rounded-md font-semibold w-100">
              Asset {String(imagesData.length + 1).padStart(3, "0")}
            </div>
            <Button
              variant="contained"
              onClick={handleUpload}
              className="w-full !mt-4 !bg-primary !capitalize !text-base"
            >
              <FileUploadOutlinedIcon className="mr-1" /> Upload Image
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MyModal;
