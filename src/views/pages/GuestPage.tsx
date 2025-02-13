import { useParams } from "react-router-dom";

const GuestPage: React.FC = () => {
  const { id } = useParams();
  console.log(id);
  return <div>This is Guest Page</div>;
};
export default GuestPage;
