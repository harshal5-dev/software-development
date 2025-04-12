import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useGetModuleInfoQuery } from "@/pages/module/moduleApi";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BsBoxSeamFill } from "react-icons/bs";
import {
  clearSelectedLectureIdToRedux,
  setSelectedLectureIdToRedux,
} from "@/pages/solutionViewer/solutionViewerSlice";

const NavMain = () => {
  const { data: items } = useGetModuleInfoQuery();
  const [selectedLectureId, setSelectedLectureId] = useState(-1);
  const dispatch = useDispatch();
  const location = useLocation();

  function handleSelectLecture(id) {
    setSelectedLectureId(id);
    dispatch(setSelectedLectureIdToRedux(id));
  }

  useEffect(() => {
    dispatch(clearSelectedLectureIdToRedux());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname !== "/solution-viewer") {
      setSelectedLectureId(-1);
    }
  }, [location]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Modules</SidebarGroupLabel>
      <SidebarMenu>
        {items?.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <BsBoxSeamFill />}
                  <span className="w-[20ch] overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.title}
                  </span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={subItem.id === selectedLectureId}
                        onClick={() => handleSelectLecture(subItem.id)}
                      >
                        <Link to={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
