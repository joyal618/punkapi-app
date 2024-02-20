import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import {
  Drawer,
  DrawerContent,
  DrawerSelectEvent,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import {
  homeIcon,
  starIcon,
  menuIcon,
} from "@progress/kendo-svg-icons";

interface DrawerRouterContainerProps {
  children: ReactNode;
}

const items = [
  { text: "Home", svgIcon: homeIcon, selected: true, route: "/home" },
  {
    text: "Dummy Menu",
    svgIcon: starIcon,
    selected: true,
    route: "/dummy-route",
  },
  { separator: true },
  { text: "Dummy Menu", svgIcon: starIcon, route: "/dummy-route" },
  { text: "Dummy Menu", svgIcon: starIcon, route: "/dummy-route" },
  { separator: true },
  { text: "Dummy Menu", svgIcon: starIcon, route: "/dummy-route" },
  { text: "Dummy Menu", svgIcon: starIcon, route: "/dummy-route" },
];

const DrawerRouterContainer: React.FC<DrawerRouterContainerProps> = ({
  children,
}: any) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(true);
  const [selected, setSelected] = React.useState(
    items.findIndex((x) => x.selected === true)
  );

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const onSelect = (e: DrawerSelectEvent) => {
    navigate(e.itemTarget.props.route);
    setSelected(e.itemIndex);
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className="custom-toolbar">
        <Button svgIcon={menuIcon} fillMode="flat" onClick={handleClick} />
        <span className="mail-box">PUNK API</span>
      </div>
      <Drawer
        expanded={expanded}
        position={"start"}
        mode={"push"}
        mini={true}
        items={items.map((item, index) => ({
          ...item,
          selected: index === selected,
        }))}
        onSelect={onSelect}
      >
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerRouterContainer;
