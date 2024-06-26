import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import { SvgIcon } from "@mui/material";
import FolderMinus from "@heroicons/react/24/solid/FolderMinusIcon";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export const items = [
  {
    title: "Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Formulário",
    path: "/form",
    icon: (
      <SvgIcon fontSize="small">
        <FolderMinus />
      </SvgIcon>
    ),
  },
  {
    title: "Respostas",
    path: "/response",
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Agenda",
    path: "/calendar",
    icon: (
      <SvgIcon fontSize="small">
        <CalendarMonthIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Customers",
    path: "/customers",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Account",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Settings",
    path: "/settings",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
];
