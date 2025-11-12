import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookBookmark,
  faListUl,
  faArrowUp,
  faArrowDown,
  faEye,
  faEyeSlash,
  faPlus,
  faXmark,
  faTrash,
  faFloppyDisk,
  faHouse,
  faArrowLeft,
  faRightToBracket,
  faBars,
  faBoxOpen,
  faT,
  faImage,
  faLink,
  faFillDrip,
  faBold,
  faUnderline,
  faItalic,
  faStrikethrough,
  faMinus,
  faTable,
  faList,
  faGripLines,
  faGrip,
  faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";

export default function getIcon(
  type,
  {
    className = "size-6", // come nel codice originale (Tailwind)
    color = "currentColor", // coerente con Heroicons (stroke="currentColor")
    style = {},
  } = {}
) {
  const props = { className, color, style };

  switch (type) {
    case "cover":
      return <FontAwesomeIcon icon={faBookBookmark} {...props} />;
    case "index":
      return <FontAwesomeIcon icon={faListUl} {...props} />;
    case "arrowUp":
      return <FontAwesomeIcon icon={faArrowUp} {...props} />;
    case "arrowDown":
      return <FontAwesomeIcon icon={faArrowDown} {...props} />;
    case "eye":
      return <FontAwesomeIcon icon={faEye} {...props} />;
    case "eyeOff":
      return <FontAwesomeIcon icon={faEyeSlash} {...props} />;
    case "plus":
      return <FontAwesomeIcon icon={faPlus} {...props} />;
    case "x":
      return <FontAwesomeIcon icon={faXmark} {...props} />;
    case "trash":
      return <FontAwesomeIcon icon={faTrash} {...props} />;
    case "save":
      return <FontAwesomeIcon icon={faFloppyDisk} {...props} />;
    case "home":
      return <FontAwesomeIcon icon={faHouse} {...props} />;
    case "back":
      return <FontAwesomeIcon icon={faArrowLeft} {...props} />;
    case "enter":
      return <FontAwesomeIcon icon={faRightToBracket} {...props} />;
    case "bars":
      return <FontAwesomeIcon icon={faBars} {...props} />;
    case "section":
      return <FontAwesomeIcon icon={faBoxOpen} {...props} />;
    case "row":
      return <FontAwesomeIcon icon={faGrip} {...props} />;
    case "text":
      return <FontAwesomeIcon icon={faT} {...props} />;
    case "imagesContainer":
      return <FontAwesomeIcon icon={faImage} {...props} />;
    case "link":
      return <FontAwesomeIcon icon={faLink} {...props} />;
    case "bgColor":
      return <FontAwesomeIcon icon={faFillDrip} {...props} />;
    case "color":
      return <FontAwesomeIcon icon={faPaintBrush} {...props} />;
    case "bold":
      return <FontAwesomeIcon icon={faBold} {...props} />;
    case "underline":
      return <FontAwesomeIcon icon={faUnderline} {...props} />;
    case "italic":
      return <FontAwesomeIcon icon={faItalic} {...props} />;
    case "strike":
      return <FontAwesomeIcon icon={faStrikethrough} {...props} />;
    case "line":
      return <FontAwesomeIcon icon={faMinus} {...props} />;
    case "table":
      return <FontAwesomeIcon icon={faTable} {...props} />;
    case "list":
      return <FontAwesomeIcon icon={faList} {...props} />;
    case "space":
      return <FontAwesomeIcon icon={faGripLines} {...props} />;
    default:
      return null;
  }
}