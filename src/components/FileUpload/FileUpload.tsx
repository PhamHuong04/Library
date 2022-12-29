import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";

import "./FileUpload.css";

interface FileUploadProps {
  accept?: string;
  url?: string;
  labelText?: string;
  getImageItem: (file: File | null) => void;
  disabled: boolean;
}

function FileUpload({
  accept = "image/*",
  labelText = "Select file",
  url,
  getImageItem,
  disabled,
}: FileUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(() => url);

  React.useEffect(() => {
    setImageUrl(url);
  }, [url]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && event.target.files[0]) {
      const imgUrl = URL.createObjectURL(event.target.files[0]);
      setImageUrl(imgUrl);
      getImageItem(event.target.files[0]);
      //   @ts-ignore
      event.target.value = [];
    }
  };

  const onClearImg = () => {
    setImageUrl("");
    getImageItem(null);
  };

  return (
    <Box height="100%" width="100%" className={""}>
      <input
        onChange={handleChange}
        accept={accept}
        className="hidden"
        id="file-upload"
        type="file"
      />
      {imageUrl ? (
        <ClearIcon
          fontSize="large"
          onClick={onClearImg}
          sx={{ pointerEvents: disabled ? "none" : "inherit" }}
        />
      ) : null}
      {imageUrl ? (
        <Box position="relative">
          <img alt="file upload" src={imageUrl} className="img-preview" />
        </Box>
      ) : null}
      <label htmlFor="file-upload" className="upload-container">
        <CloudUploadIcon
          fontSize="large"
          sx={{ pointerEvents: disabled ? "none" : "inherit" }}
        />
        <Typography>{labelText}</Typography>
      </label>
    </Box>
  );
}

export default FileUpload;
