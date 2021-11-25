import { Space } from "antd";
import styled from "styled-components";

const IconTextSpace = styled(Space)`
  color: ${(props) => props.color};
  cursor: pointer;
`;

const IconText = ({
  icon,
  text,
  onClick,
  color,
}: {
  icon: object;
  text: string | number;
  onClick: () => void;
  color: string;
}) => (
  <IconTextSpace color={color} onClick={onClick}>
    {icon}
    {text}
  </IconTextSpace>
);

export default IconText;
