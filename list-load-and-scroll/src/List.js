import React from "react";

const List = React.forwardRef(({ item }, ref) => {
  const handleClick = (item) => () => {
    console.log(item);
  };

  return (
    <div className="list-item" ref={ref}>
      <div onClick={handleClick(item)}>
        {item.firstName} {item.lastName}
      </div>
    </div>
  );
});

export default List;
