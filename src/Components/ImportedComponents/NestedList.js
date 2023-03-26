import React, { useState, useEffect } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const NestedList = (props) => {
  const [open, setOpen] = useState(true);
  const [sortedList, setSortedList] = useState([]);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const list = props.data.sort((a, b) => a.id - b.id);
    setSortedList(list);
  }, [props.data]);

  return (
    <List
      sx={{ width: "95%", marginLeft: ".8rem", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {props.header}
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Goals" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {sortedList.map((goal) => {
            return (
              <ListItemButton key={goal.id} sx={{ pl: 4 }}>
                <ListItemText primary={`${goal.id}: ${goal.Goal}`} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
};

export default NestedList;
