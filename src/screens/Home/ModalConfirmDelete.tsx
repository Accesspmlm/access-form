import { Flex } from "@/components";
import { deleteCompanyApi } from "@/connections";
import { Button, Modal, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Company } from ".";

interface ModalConfirmDeleteProps {
  closeModal: () => void;
  showModal: boolean;
  companyToDelete: Company | null;
}

const ModalConfirmDelete: React.FC<ModalConfirmDeleteProps> = ({
  closeModal,
  showModal,
  companyToDelete,
}) => {
  const queryClient = useQueryClient();
  const { mutate: deleteCompany } = useMutation({
    mutationFn: (data: Record<string, unknown>) => deleteCompanyApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      closeModal();
    },
  });

  return (
    <Modal open={showModal}>
      <Flex w="100vw" h="100vh" justify="center" align="center">
        <Flex
          w="400px"
          bg="#fafafa"
          pd="20px"
          direction="column"
          $overflowY="auto"
        >
          <Typography fontSize="20px" marginBottom={2}>
            {`¿Seguro que quieres eliminar a ${companyToDelete?.name}?`}
          </Typography>

          <Flex justify="center" gap="10px">
            <Button
              variant="contained"
              onClick={closeModal}
              style={{ background: "tomato" }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={() => deleteCompany({ companyId: companyToDelete?._id })}
            >
              Aceptar
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
};
export default ModalConfirmDelete;
