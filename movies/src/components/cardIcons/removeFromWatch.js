import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromToWatchIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromToWatch = (e) => {
    e.preventDefault();
    context.removeFromToWatch(movie);
  };
  return (
    <IconButton
      aria-label="remove from To Watch"
      onClick={handleRemoveFromToWatch}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromToWatchIcon;