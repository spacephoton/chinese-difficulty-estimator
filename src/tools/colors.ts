
export const colors = {
  activeText: "#ecf0f1",
  active: "#2c3e50",
  inactive: "#ecf0f1",
}

export const levelToColor = (level: number) => {
  switch (level) {
    case 1:
      return "#f1c40f";
    case 2:
      return "#f39c12";
    case 3:
      return "#e67e22";
    case 4:
      return "#d35400";
    case 5:
      return "#e74c3c";
    case 6:
      return "#c0392b";
    default:
      return "white"

  }
}