import { useMutation } from "@apollo/client";
import { ADD_STAR, REMOVE_STAR } from "api/queries/repository";
import { Scalars } from "types/repository";

const useRepositoriesHandlers = () => {
  const [addStarMutation] = useMutation(ADD_STAR);
  const [removeStarMutation] = useMutation(REMOVE_STAR);

  const handleStarClick = (id: Scalars["ID"], isStarred: boolean) => {
    if (isStarred) {
      removeStarMutation({ variables: { starrableId: id } });
    } else {
      addStarMutation({ variables: { starrableId: id } });
    }
  };

  return {
    handleStarClick,
  };
};

export default useRepositoriesHandlers;
