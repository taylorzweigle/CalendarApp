//Taylor Zweigle, 2023

export const getColors = (color) => {
  let colorObject = { bg: "bg-slate-50", border: "border-slate-500", text: "text-slate-700" };

  switch (color) {
    case "emerald":
      colorObject.bg = "bg-emerald-50";
      colorObject.border = "border-emerald-500";
      colorObject.text = "text-emerald-700";
      break;
    case "indigo":
      colorObject.bg = "bg-indigo-50";
      colorObject.border = "border-indigo-500";
      colorObject.text = "text-indigo-700";
      break;
    case "blue":
      colorObject.bg = "bg-blue-50";
      colorObject.border = "border-blue-500";
      colorObject.text = "text-blue-700";
      break;
  }

  return colorObject;
};
