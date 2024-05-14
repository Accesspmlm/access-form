import { Flex, Text } from "@/components";
import { getCompanies, uploadBannerApi, uploadLogoApi } from "@/connections";
import { Button, CircularProgress } from "@mui/material";
import { Edit, GalleryEdit, Trash } from "iconsax-react";
import { ChangeEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ModalCreateCompany from "./ModalCreateCompany";
import ModalConfirmDelete from "./ModalConfirmDelete";

export interface Company {
  _id: string;
  name: string;
  descriptionEs: string;
  descriptionEn: string;
  stars: number;
  activePromotions: number;
  logo?: string;
  banner?: string;
  country: string;
  state: string;
  city: string;
  cp: number;
  lat: number;
  lng: number;
  phone: number;
  whatsapp?: number;
  facebook?: string;
  categories: string[];
  openingDays: string[];
  hourInit?: string;
  hourEnd?: string;
  active: boolean;
  industry: string;
  tags: string[];
  ubication: string;
}

const Home = () => {
  const [idLoadingLogo, setIdLoadingLogo] = useState<string | null>(null);
  const [idLoadingBanner, setIdLoadingBanner] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<Company | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);

  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ["companies"], queryFn: getCompanies });
  const { mutate: uploadLogo, isPending: loadingLogo } = useMutation({
    mutationFn: (data: Record<string, unknown>) => uploadLogoApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      setIdLoadingLogo(null);
    },
  });
  const { mutate: uploadBanner, isPending: loadingBanner } = useMutation({
    mutationFn: (data: Record<string, unknown>) => uploadBannerApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      setIdLoadingBanner(null);
    },
  });

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChangeLogo = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      uploadLogo({ file: formData, companyId: id });
      setIdLoadingLogo(id);
    } else {
      console.log("No file selected.");
    }
  };

  const handleChangeBanner = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      uploadBanner({ file: formData, companyId: id });
      setIdLoadingBanner(id);
    } else {
      console.log("No file selected.");
    }
  };

  const handleEdit = (value: Company) => {
    setInitialValues(value);
    setShowModal(true);
  };

  const handleDelete = (value: Company) => {
    setCompanyToDelete(value);
    setShowModalDelete(true);
  };

  const resetInitials = () => {
    setInitialValues(null);
  };

  const companies: Company[] = data?.data as Company[];

  return (
    <Flex>
      {showModal && (
        <ModalCreateCompany
          closeModal={closeModal}
          showModal={true}
          initialValues={initialValues}
          resetInitials={resetInitials}
        />
      )}
      <ModalConfirmDelete
        showModal={showModalDelete}
        closeModal={() => setShowModalDelete(false)}
        companyToDelete={companyToDelete}
      />
      <Flex direction="column">
        <Flex justify="flex-end">
          <Button variant="contained" onClick={() => setShowModal(true)}>
            Agregar empresa
          </Button>
        </Flex>
        {companies?.length <= 0 ? (
          <Flex
            w="100%"
            h="100%"
            direction="column"
            justify="center"
            align="center"
          >
            <Text clave="No hay empresas" mb="20px" />
          </Flex>
        ) : (
          <Flex mt="20px" wrap="wrap" gap="20px">
            {companies?.map((com: Company) => (
              <Flex
                key={com._id}
                style={{ border: `1px solid #dcdcdcff`, overflow: "hidden" }}
                w="300px"
                radius="15px"
                align="center"
                gap="10px"
                justify="space-between"
                direction="column"
              >
                <Flex h="150px" bg="#606060" position="relative">
                  <label
                    htmlFor={`banner_${com._id}`}
                    style={{ position: "absolute", right: 10, top: 10 }}
                  >
                    <Flex
                      bg="#00a2ff"
                      h="30px"
                      w="30px"
                      radius="100px"
                      justify="center"
                      align="center"
                      cursor="pointer"
                    >
                      <GalleryEdit size={20} color="#fff" />
                    </Flex>
                  </label>
                  <input
                    id={`banner_${com._id}`}
                    type="file"
                    style={{ display: "none " }}
                    onChange={(event) => handleChangeBanner(event, com._id)}
                  />
                  <Flex
                    position="absolute"
                    direction="column"
                    gap="10px"
                    w="fit-contnet"
                    style={{ right: 10, top: 50 }}
                  >
                    <Flex
                      bg="#e8be00"
                      h="30px"
                      w="30px"
                      radius="100px"
                      justify="center"
                      align="center"
                      cursor="pointer"
                      onClick={() => handleEdit(com)}
                    >
                      <Edit size={20} color="#fff" />
                    </Flex>
                    <Flex
                      bg="#ff5100"
                      h="30px"
                      w="30px"
                      radius="100px"
                      justify="center"
                      align="center"
                      cursor="pointer"
                      onClick={() => handleDelete(com)}
                    >
                      <Trash size={20} color="#fff" />
                    </Flex>
                  </Flex>
                  {loadingBanner && idLoadingBanner == com._id ? (
                    <Flex h="100%" w="100%" justify="center" align="center">
                      <CircularProgress />
                    </Flex>
                  ) : (
                    <>
                      {com.banner && (
                        <Flex
                          style={{
                            backgroundImage: `url(${com.banner})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                          w="100%"
                          h="100%"
                        ></Flex>
                      )}
                    </>
                  )}
                </Flex>
                <Flex
                  w="fit-content"
                  align="center"
                  gap="10px"
                  mt="-40px"
                  bg="#eaeaea"
                  style={{ borderRadius: 100 }}
                  position="relative"
                >
                  {loadingLogo && idLoadingLogo == com._id ? (
                    <Flex h="70px" w="70px" justify="center" align="center">
                      <CircularProgress />
                    </Flex>
                  ) : (
                    <img
                      src={com?.logo}
                      width={70}
                      height={70}
                      style={{ borderRadius: 100 }}
                    />
                  )}
                  <label
                    htmlFor={`logo_${com._id}`}
                    style={{ position: "absolute", right: -10, bottom: 0 }}
                  >
                    <Flex
                      bg="#00a2ff"
                      h="30px"
                      w="30px"
                      radius="100px"
                      justify="center"
                      align="center"
                      cursor="pointer"
                    >
                      <GalleryEdit size={20} color="#fff" />
                    </Flex>
                  </label>
                  <input
                    id={`logo_${com._id}`}
                    type="file"
                    style={{ display: "none " }}
                    onChange={(event) => handleChangeLogo(event, com._id)}
                  />
                </Flex>
                <Text clave={com.name} size="18px" />
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
export default Home;
