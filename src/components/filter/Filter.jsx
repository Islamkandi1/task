import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { getAllCategoriesAction } from "../../api/category.api";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const ITEM_HEIGHT = 70;

export default function LongMenu() {
  const [categoryData, setCategoryData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl;
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // get categories======================================================
  async function getAllCategories() {
    try {
      const data = await getAllCategoriesAction();
      setCategoryData(data);
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    getAllCategories();
  }, []);
  // jsx code===================================================================
  return (
    <div className="mt-5">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          border: "1px solid #1976d2",
          borderRadius: "8px",
          color: "#1976d2",
          padding: "2px 8px",
          "&:hover": {
            borderColor: "#1565c0",
            color: "#1565c0",
          },
        }}
      >
        <p className="capitalize text-[1.4rem]">categories</p>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
          list: {
            "aria-labelledby": "long-button",
          },
        }}
      >
        <MenuItem
          key="all"
          onClick={() => {
            handleClose();
            searchParams.delete("category_id");
            setSearchParams(searchParams);
          }}
        >
          All Tasks
        </MenuItem>

        {categoryData?.map((option) => (
          <MenuItem
            key={option.id}
            onClick={() => {
              handleClose();
              setSearchParams({ category_id: option.id });
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
