import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import "./navbar.css";
import { UserContext } from "../../context/UserContext";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  const { push } = useHistory();
  const classes = useStyles();
  const { user, logoutUser } = useContext(UserContext);
  const [anchorAvatar, setAnchorAvatar] = React.useState(null);
  const [anchorSide, setAnchorSide] = React.useState(null);

  const handleClickAvatar = event => {
    setAnchorAvatar(event.currentTarget);
  };

  const handleClickSide = event => {
    setAnchorSide(event.currentTarget);
  };

  const handleCloseAvatar = () => {
    setAnchorAvatar(null);
  };

  const handleCloseSide = () => {
    setAnchorSide(null);
  };

  return (
    <div className="navRoot">
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClickSide}
          >
            <MenuIcon className="menuIcon" />
          </IconButton>

          <Menu
            id="simple-menu"
            className="nav-menu-list"
            anchorEl={anchorSide}
            keepMounted
            open={Boolean(anchorSide)}
            onClose={handleCloseSide}
          >
            <MenuItem onClick={() => push("newMusic")}>
              <img
                alt="create"
                src="./icons/create.svg"
                className="icon-menu-list-side"
              />
              Novo música
            </MenuItem>
            <MenuItem onClick={() => push("editMusic")}>
              <img
                alt="edit"
                src="./icons/edit.svg"
                className="icon-menu-list-side"
              />
              Editar música
            </MenuItem>
          </Menu>

          <img
            alt="logoNav"
            src="./images/logoNav.png"
            className="logo-nav"
            onClick={() => push("homePage")}
          />
          <Typography variant="h6" className={classes.title}></Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClickAvatar}
              color="inherit"
            >
              <Avatar
                aria-controls="simple-menu"
                aria-haspopup="true"
                className="avatar"
              >
                <label className="labelAvatar">
                  {user && user.Name
                    ? user.Name.substring(0, 1).toUpperCase()
                    : "-"}
                </label>
              </Avatar>
            </IconButton>

            <Menu
              id="simple-menu"
              className="nav-menu-list"
              anchorEl={anchorAvatar}
              keepMounted
              open={Boolean(anchorAvatar)}
              onClose={handleCloseAvatar}
            >
              <MenuItem onClick={() => push("myAccount")}>
                <img
                  alt="user"
                  src="./icons/user.svg"
                  className="icon-menu-list-side"
                />
                Minha conta
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logoutUser();
                  push("login");
                }}
              >
                <img
                  alt="logout"
                  src="./icons/logout.svg"
                  className="icon-menu-list-side"
                />
                Sair
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
