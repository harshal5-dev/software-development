import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const ListItem = ({ children, className }) => (
  <li
    className={cn(
      "py-3 px-3 rounded-md border border-slate-200 bg-slate-100 shadow-md transition font-semibold text-sm",
      className
    )}
  >
    {children}
  </li>
);

ListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const List = ({ items, renderItem, noDataText = "No data found" }) => {
  return (
    <ul className="list-none p-0 m-0 space-y-2">
      {items.length > 0 ? (
        items.map((item, index) => (
          <ListItem key={index}>{renderItem(item, index)}</ListItem>
        ))
      ) : (
        <ListItem>
          <div className="flex flex-row items-center justify-center font-semibold text-blue-500">
            {noDataText}
          </div>
        </ListItem>
      )}
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.array,
  noDataText: PropTypes.string,
  renderItem: PropTypes.func,
};

export default List;
