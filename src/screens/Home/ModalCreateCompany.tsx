import { useEffect, useState } from "react";
import { Flex } from "@/components";
import { createCompanyApi, updateCompanyApi } from "@/connections";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORIES, DAYS, INDUSTRIES, TAGS, inputs } from "./constants";
import { Company } from ".";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { Category, Tag } from "./types";

const schema = z.object({
  name: z.string(),
  descriptionEs: z.string(),
  descriptionEn: z.string(),
  phone: z.number(),
  facebook: z.string(),
  lat: z.number(),
  lng: z.number(),
  ubication: z.string(),
  industry: z.string(),
});

type FormValues = z.infer<typeof schema>;

interface ModalCreateCompanyProps {
  showModal: boolean;
  closeModal: () => void;
  resetInitials: () => void;
  initialValues: Company | null;
}

const ModalCreateCompany: React.FC<ModalCreateCompanyProps> = ({
  showModal,
  closeModal,
  resetInitials,
  initialValues,
}) => {
  const [openingDays, setOpeningDays] = useState<string[]>(
    initialValues?.openingDays || []
  );
  const [categories, setCategories] = useState<string[]>(
    initialValues?.categories || []
  );
  const [tags, setTags] = useState<string[]>(initialValues?.tags || []);
  const [hourInit, setHourInit] = useState(initialValues?.hourInit);
  const [hourEnd, setHourEnd] = useState(initialValues?.hourEnd);

  const queryClient = useQueryClient();
  const { mutate: createCompany } = useMutation({
    mutationFn: (data: Record<string, unknown>) => createCompanyApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      reset();
      closeModal();
      setOpeningDays([]);
      setCategories([]);
      setTags([]);
      setHourInit("");
      setHourEnd("");
      resetInitials();
    },
  });
  const { mutate: updateCompany } = useMutation({
    mutationFn: (data: Record<string, unknown>) => updateCompanyApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      reset();
      closeModal();
      setOpeningDays([]);
      setCategories([]);
      setTags([]);
      setHourInit("");
      setHourEnd("");
      resetInitials();
    },
  });

  const {
    register,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "all" as const,
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialValues?.name,
      descriptionEs: initialValues?.descriptionEs || "",
      descriptionEn: initialValues?.descriptionEn || "",
      phone: initialValues?.phone,
      facebook: initialValues?.facebook || "",
      lat: initialValues?.lat,
      lng: initialValues?.lng,
      ubication: initialValues?.ubication || "",
    },
  });

  useEffect(() => {
    setOpeningDays(initialValues?.openingDays || []);
    if (initialValues) {
      reset({
        name: initialValues.name,
        descriptionEs: initialValues.descriptionEs || "",
        descriptionEn: initialValues.descriptionEn || "",
        phone: initialValues.phone,
        facebook: initialValues.facebook || "",
        lat: initialValues.lat,
        lng: initialValues.lng,
        ubication: initialValues.ubication || "",
      });
    } else {
      reset({
        name: "",
        descriptionEs: "",
        descriptionEn: "",
        phone: undefined,
        facebook: "",
        lat: undefined,
        lng: undefined,
        ubication: "",
        industry: "",
      });
    }
  }, [initialValues, reset]);

  const dataForm = watch();
  const handleCompany = () => {
    if (initialValues?.name) {
      updateCompany({
        ...dataForm,
        id: initialValues._id,
        openingDays,
        categories,
        tags,
        hourInit,
        hourEnd,
      });
    } else {
      createCompany({
        ...dataForm,
        categories,
        tags,
        openingDays,
        hourInit,
        hourEnd,
      });
    }
  };

  const handleCloseModal = () => {
    closeModal();
    reset();
    resetInitials();
    setOpeningDays([]);
    setCategories([]);
    setTags([]);
    setHourInit("");
    setHourEnd("");
  };

  const toggleDays = (name: string) => {
    if (name == "all") {
      const existAll = openingDays?.some((day) => day == name);
      if (existAll) {
        setOpeningDays([]);
      } else {
        const newDays = DAYS.map((d) => d.name);
        setOpeningDays(newDays);
      }
    } else {
      const exist = openingDays?.some((day) => day == name);
      if (exist) {
        const newDays = openingDays?.filter((d) => d != name);
        setOpeningDays(newDays);
      } else {
        setOpeningDays([...openingDays, name]);
      }
    }
  };

  const toggleCategories = (name: string) => {
    if (name == "all") {
      const existAll = categories?.some((cat) => cat == name);
      if (existAll) {
        setCategories([]);
      } else {
        const newCategories = CATEGORIES[dataForm?.industry].map((d) => d.name);
        setCategories(newCategories);
      }
    } else {
      const exist = categories?.some((cat) => cat == name);
      if (exist) {
        const newCategories = categories?.filter((d) => d != name);
        setCategories(newCategories);
      } else {
        setCategories([...categories, name]);
      }
    }
  };

  const toggleTags = (name: string) => {
    if (name == "all") {
      const existAll = tags?.some((tag) => tag == name);
      if (existAll) {
        setTags([]);
      } else {
        const newTags = TAGS[dataForm?.industry].map((d) => d.name);
        setTags(newTags);
      }
    } else {
      const exist = tags?.some((tag) => tag == name);
      if (exist) {
        const newTags = tags?.filter((d) => d != name);
        setTags(newTags);
      } else {
        setTags([...tags, name]);
      }
    }
  };

  const handleHourInit = (hour: dayjs.Dayjs | null, type: string) => {
    let _hour = "";
    let _minutes = "";
    const h = hour?.hour();
    const m = hour?.minute();
    if (h !== undefined) {
      _hour = h < 10 ? `0${h}` : `${h}`;
    }
    if (m !== undefined) {
      _minutes = m < 10 ? `0${m}` : `${m}`;
    }
    if (type == "init") {
      setHourInit(`${_hour}:${_minutes}`);
    } else {
      setHourEnd(`${_hour}:${_minutes}`);
    }
  };

  const validateForm = () => {
    return (
      isValid &&
      openingDays.length > 0 &&
      categories.length > 0 &&
      tags.length > 0
    );
  };

  const currentCategories: Category[] = CATEGORIES[dataForm?.industry];
  const currentTags: Tag[] = TAGS[dataForm?.industry];

  return (
    <Modal open={showModal}>
      <Flex w="100vw" h="100vh" justify="center" align="center">
        <Flex
          w="500px"
          h="80vh"
          bg="#fafafa"
          pd="24px"
          direction="column"
          $overflowY="auto"
          radius="8px"
        >
          <Typography fontSize="20px" fontWeight={500} mb={1}>
            Datos generales de la empresa
          </Typography>
          <Flex direction="column" mb="20px">
            {inputs.map((inp) => (
              <Input
                key={inp.id}
                fullWidth
                color="primary"
                placeholder={inp.placeholder}
                {...register(inp.name, {
                  valueAsNumber: inp.valueAsNumber,
                })}
                error={errors[inp.name]?.message}
                type={inp.type}
                style={{ marginBottom: 18 }}
              />
            ))}
            <Typography fontSize="20px" fontWeight={500} mt={2} mb={1}>
              Industria
            </Typography>
            <Flex mb="15px">
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Industria
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Industria"
                  {...register("industry")}
                  defaultValue={initialValues?.industry}
                >
                  {INDUSTRIES.map((ind) => (
                    <MenuItem key={ind.name} value={ind.name}>
                      {ind.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Flex>
            {currentCategories && (
              <>
                <Typography fontSize="20px" fontWeight={500} mt={2} mb={1}>
                  Categorías
                </Typography>
                <Flex gap="10px" mb="10px" wrap="wrap">
                  {currentCategories.map((cat) => (
                    <Flex
                      key={cat.name}
                      w="fit-content"
                      pd="10px 20px"
                      bg={categories?.includes(cat.name) ? "tomato" : "none"}
                      radius="10px"
                      cursor="pointer"
                      style={{
                        border: categories?.includes(cat.name)
                          ? "1px solid tomato"
                          : "1px solid black",
                      }}
                      onClick={() => toggleCategories(cat.name)}
                    >
                      <Typography
                        color={
                          categories?.includes(cat.name) ? "white" : "black"
                        }
                      >
                        {cat.label}
                      </Typography>
                    </Flex>
                  ))}
                </Flex>
              </>
            )}
            {currentCategories && currentTags && (
              <>
                <Typography fontSize="20px" fontWeight={500} mt={2} mb={1}>
                  Tags
                </Typography>
                <Flex gap="10px" mb="10px" wrap="wrap">
                  {currentTags.map((tag) => (
                    <Flex
                      key={tag.name}
                      w="fit-content"
                      pd="10px 20px"
                      bg={tags?.includes(tag.name) ? "tomato" : "none"}
                      radius="10px"
                      cursor="pointer"
                      style={{
                        border: tags?.includes(tag.name)
                          ? "1px solid tomato"
                          : "1px solid black",
                      }}
                      onClick={() => toggleTags(tag.name)}
                    >
                      <Typography
                        color={tags?.includes(tag.name) ? "white" : "black"}
                      >
                        {tag.label}
                      </Typography>
                    </Flex>
                  ))}
                </Flex>
              </>
            )}
            <Typography fontSize="20px" fontWeight={500} mt={2} mb={1}>
              Horarios
            </Typography>
            <Flex gap="10px">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["TimePicker"]}
                  sx={{ width: "50%" }}
                >
                  <TimePicker
                    label="Hora de apertura"
                    onChange={(value) => handleHourInit(value, "init")}
                    ampm={false}
                    value={dayjs(hourInit, "HH:mm")}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["TimePicker"]}
                  sx={{ width: "50%" }}
                >
                  <TimePicker
                    label="Hora de cierre"
                    onChange={(value) => handleHourInit(value, "end")}
                    ampm={false}
                    value={dayjs(hourEnd, "HH:mm")}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Flex>
            <Typography fontSize="20px" fontWeight={500} mt={2} mb={1}>
              Días de apertura
            </Typography>
            <Flex wrap="wrap" gap="10px">
              {DAYS.map((day) => (
                <Flex
                  key={day.name}
                  w="fit-content"
                  pd="10px 15px"
                  bg={openingDays?.includes(day.name) ? "tomato" : "none"}
                  radius="10px"
                  cursor="pointer"
                  style={{
                    border: openingDays?.includes(day.name)
                      ? "1px solid tomato"
                      : "1px solid black",
                  }}
                  onClick={() => toggleDays(day.name)}
                >
                  <Typography
                    color={openingDays?.includes(day.name) ? "white" : "black"}
                  >
                    {day.label}
                  </Typography>
                </Flex>
              ))}
            </Flex>
          </Flex>
          <Flex justify="center" align="center" gap="10px">
            <Button
              variant="contained"
              style={{ background: "tomato" }}
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              disabled={!validateForm()}
              onClick={handleCompany}
            >
              {initialValues?.name ? "Actualizar" : "Agregar"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
};
export default ModalCreateCompany;
